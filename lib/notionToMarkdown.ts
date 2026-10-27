import { collectPaginatedAPI, isFullBlock } from "@notionhq/client";
import type { BlockObjectResponse, Client, RichTextItemResponse } from "@notionhq/client";

/** Converts a block itself instead of the default conversion; the block's children aren't converted */
export type BlockTransformers = {
  [Type in BlockObjectResponse["type"]]?: (block: Extract<BlockObjectResponse, { type: Type }>) => Promise<string> | string;
};

type MdBlock = {
  type: BlockObjectResponse["type"];
  markdown: string;
  children: MdBlock[];
};

/** blocks that end with a single line break, so consecutive items stay in one list or quote */
const singleLineBreakTypes = new Set<BlockObjectResponse["type"]>(["bulleted_list_item", "numbered_list_item", "to_do", "quote"]);

/**
 * Converts a Notion page's content to markdown.
 * Replaces notion-to-md (unmaintained) with the same output for the block types this blog uses.
 * Block types not handled here throw, so a post never silently loses content.
 */
export async function notionPageToMarkdown(notion: Client, pageId: string, transformers: BlockTransformers): Promise<string> {
  const mdBlocks = await blocksToMdBlocks(notion, await listChildren(notion, pageId), transformers);
  return mdBlocksToString(mdBlocks, 0);
}

async function listChildren(notion: Client, blockId: string): Promise<BlockObjectResponse[]> {
  const blocks = await collectPaginatedAPI(notion.blocks.children.list, { block_id: blockId });
  return blocks.filter(isFullBlock);
}

async function blocksToMdBlocks(notion: Client, blocks: BlockObjectResponse[], transformers: BlockTransformers): Promise<MdBlock[]> {
  const mdBlocks: MdBlock[] = [];
  let listNumber = 0;
  for (const block of blocks) {
    listNumber = block.type === "numbered_list_item" ? listNumber + 1 : 0;
    if (block.type === "unsupported") {
      // block types the Notion API can't return
      continue;
    }

    const transformer = transformers[block.type] as ((block: BlockObjectResponse) => Promise<string> | string) | undefined;
    if (transformer) {
      mdBlocks.push({ type: block.type, markdown: await transformer(block), children: [] });
      continue;
    }

    // a synced block that shows another block's content has to list the original's children
    const childrenId = block.type === "synced_block" ? (block.synced_block.synced_from?.block_id ?? block.id) : block.id;
    const children = block.has_children ? await listChildren(notion, childrenId) : [];
    if (block.type === "table") {
      mdBlocks.push({ type: block.type, markdown: tableToMarkdown(children), children: [] });
      continue;
    }

    const mdChildren = await blocksToMdBlocks(notion, children, transformers);
    mdBlocks.push({ type: block.type, markdown: blockToMarkdown(block, listNumber, mdChildren), children: mdChildren });
  }
  return mdBlocks;
}

function blockToMarkdown(block: BlockObjectResponse, listNumber: number, children: MdBlock[]): string {
  switch (block.type) {
    case "paragraph":
      return richTextToMarkdown(block.paragraph.rich_text);
    case "heading_1":
      return `# ${richTextToMarkdown(block.heading_1.rich_text)}`;
    case "heading_2":
      return `## ${richTextToMarkdown(block.heading_2.rich_text)}`;
    case "heading_3":
      return `### ${richTextToMarkdown(block.heading_3.rich_text)}`;
    case "bulleted_list_item":
      return `- ${richTextToMarkdown(block.bulleted_list_item.rich_text).trim()}`;
    case "numbered_list_item":
      return `${listNumber}. ${richTextToMarkdown(block.numbered_list_item.rich_text).trim()}`;
    case "to_do":
      return `- [${block.to_do.checked ? "x" : " "}] ${richTextToMarkdown(block.to_do.rich_text)}`;
    case "quote":
      return `> ${richTextToMarkdown(block.quote.rich_text).replace(/\n/gu, "  \n> ")}`;
    case "callout": {
      const emoji = block.callout.icon?.type === "emoji" ? `${block.callout.icon.emoji} ` : "";
      return quoteLines(`${emoji}${richTextToMarkdown(block.callout.rich_text)}\n\n${mdBlocksToString(children, 0)}`.trim());
    }
    case "toggle":
      return richTextToMarkdown(block.toggle.rich_text);
    case "code": {
      // a code block's text can come in several rich text items; they're one text, so join them as is
      const code = block.code.rich_text.map((item) => {return item.plain_text}).join("").trim();
      if (!code) {
        return "";
      }
      return `\`\`\`${block.code.language}\n${code}\n\`\`\``;
    }
    case "divider":
      return "---";
    case "bookmark":
      return link(block.bookmark.caption, block.bookmark.url);
    case "embed":
      return link(block.embed.caption, block.embed.url);
    case "synced_block":
    case "column_list":
    case "column":
      // their children carry the content
      return "";
    default:
      throw new Error(`unhandled Notion block type: ${block.type}`);
  }
}

function mdBlocksToString(mdBlocks: MdBlock[], nestingLevel: number): string {
  let output = "";
  for (const { type, markdown, children } of mdBlocks) {
    // a toggle's text becomes the summary of its children
    if (markdown && type !== "toggle") {
      output += singleLineBreakTypes.has(type) ? `${indent(markdown, nestingLevel)}\n` : `\n${indent(markdown, nestingLevel)}\n\n`;
    }
    if (children.length === 0 || type === "callout") {
      continue;
    }
    if (type === "synced_block" || type === "column_list" || type === "column") {
      output += mdBlocksToString(children, 0);
    } else if (type === "toggle") {
      output += markdown ? `<details>\n<summary>${markdown}</summary>\n${mdBlocksToString(children, 0)}\n</details>\n\n` : mdBlocksToString(children, 0);
    } else if (type === "quote") {
      output += `${quoteLines(mdBlocksToString(children, nestingLevel))}\n`;
    } else {
      output += mdBlocksToString(children, nestingLevel + 1);
    }
  }
  return output;
}

function richTextToMarkdown(richText: RichTextItemResponse[]): string {
  return richText
    .map((item) => {
      if (item.type === "equation") {
        return `$${item.equation.expression}$`;
      }
      const text = annotate(item.plain_text, item.annotations);
      if (item.href) {
        return `[${text}](${item.href})`;
      }
      return text;
    })
    .join("");
}

/** markdown markers have to hug the text, so surrounding whitespace stays outside them */
function annotate(text: string, annotations: RichTextItemResponse["annotations"]): string {
  if (!text.trim()) {
    return text;
  }
  const leadingSpace = /^\s*/u.exec(text)?.[0] ?? "";
  const trailingSpace = /\s*$/u.exec(text)?.[0] ?? "";
  let annotated = text.trim();
  if (annotations.code) {
    annotated = `\`${annotated}\``;
  }
  if (annotations.bold) {
    annotated = `**${annotated}**`;
  }
  if (annotations.italic) {
    annotated = `_${annotated}_`;
  }
  if (annotations.strikethrough) {
    annotated = `~~${annotated}~~`;
  }
  if (annotations.underline) {
    annotated = `<u>${annotated}</u>`;
  }
  return leadingSpace + annotated + trailingSpace;
}

function link(caption: RichTextItemResponse[], url: string): string {
  return `[${richTextToMarkdown(caption) || url}](${url})`;
}

function tableToMarkdown(rows: BlockObjectResponse[]): string {
  const lines = rows.map((row) => {
    if (row.type !== "table_row") {
      throw new Error(`unhandled table child: ${row.type}`);
    }
    const cells = row.table_row.cells.map((cell) => {return richTextToMarkdown(cell).replace(/\|/gu, "\\|")});
    return `| ${cells.join(" | ")} |`;
  });
  // markdown tables need a delimiter row under the first row
  const columnCount = rows[0]?.type === "table_row" ? rows[0].table_row.cells.length : 0;
  return [lines[0], `|${" --- |".repeat(columnCount)}`, ...lines.slice(1)].join("\n");
}

function quoteLines(markdown: string): string {
  return markdown
    .split("\n")
    .map((line) => {return line.trim() ? `> ${line}` : ">"})
    .join("\n")
    .trim();
}

function indent(text: string, nestingLevel: number): string {
  const tab = "    ";
  let indented = text;
  for (let i = 0; i < nestingLevel; i++) {
    indented = indented.includes("\n") ? tab + indented.split(/^|\n/u).join(`\n${tab}`) : tab + indented;
  }
  return indented;
}
