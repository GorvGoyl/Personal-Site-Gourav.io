import type { Client } from "@notionhq/client";
import { describe, expect, it } from "vitest";
import { notionPageToMarkdown } from "../lib/notionToMarkdown";

type Annotations = { bold?: boolean; italic?: boolean; code?: boolean };

function text(content: string, annotations: Annotations = {}, href: string | null = null) {
  return {
    type: "text",
    text: { content, link: href ? { url: href } : null },
    annotations: { bold: false, italic: false, strikethrough: false, underline: false, code: false, color: "default", ...annotations },
    plain_text: content,
    href,
  };
}

function block(id: string, type: string, content: Record<string, unknown>, hasChildren = false) {
  return { object: "block", id, type, has_children: hasChildren, [type]: content };
}

/** a client whose blocks.children.list returns `children[block_id]` */
function notion(children: Record<string, unknown[]>) {
  const list = ({ block_id }: { block_id: string }) => {
    return Promise.resolve({ results: children[block_id] ?? [], next_cursor: null, has_more: false });
  };
  return { blocks: { children: { list } } } as unknown as Client;
}

async function toMarkdown(children: Record<string, unknown[]>) {
  return await notionPageToMarkdown(notion(children), "page", {
    image: () => {return "<Img />"},
    child_database: () => {return ""},
  });
}

describe("notionPageToMarkdown", () => {
  it("converts headings and annotated text", async () => {
    const md = await toMarkdown({
      page: [
        block("h", "heading_2", { rich_text: [text("Title")] }),
        block("p", "paragraph", { rich_text: [text("Hello "), text("bold", { bold: true }), text(" and "), text("code", { code: true }), text(" "), text("link", {}, "https://example.com")] }),
      ],
    });
    expect(md).toBe("\n## Title\n\n\nHello **bold** and `code` [link](https://example.com)\n\n");
  });

  it("numbers lists, restarting after other blocks, and indents nested items", async () => {
    const md = await toMarkdown({
      page: [
        block("n1", "numbered_list_item", { rich_text: [text("one")] }, true),
        block("n2", "numbered_list_item", { rich_text: [text("two")] }),
        block("p", "paragraph", { rich_text: [text("break")] }),
        block("n3", "numbered_list_item", { rich_text: [text("again")] }),
      ],
      n1: [block("b", "bulleted_list_item", { rich_text: [text("nested")] })],
    });
    expect(md).toBe("1. one\n    - nested\n2. two\n\nbreak\n\n1. again\n");
  });

  it("joins a code block's rich text items as one text", async () => {
    const md = await toMarkdown({
      page: [block("c", "code", { rich_text: [text("const a"), text(" = 1;\n")], language: "javascript", caption: [] })],
    });
    expect(md).toBe("\n```javascript\nconst a = 1;\n```\n\n");
  });

  it("keeps a quote's children inside the quote", async () => {
    const md = await toMarkdown({
      page: [block("q", "quote", { rich_text: [text("Quote")] }, true)],
      q: [block("p", "paragraph", { rich_text: [text("inside")] })],
    });
    expect(md).toBe("> Quote\n>\n> inside\n>\n>\n");
  });

  it("renders toggles, synced blocks and columns through their children", async () => {
    const md = await toMarkdown({
      page: [
        block("t", "toggle", { rich_text: [text("More")] }, true),
        block("s", "synced_block", { synced_from: { type: "block_id", block_id: "original" } }, true),
        block("cl", "column_list", {}, true),
      ],
      t: [block("p1", "paragraph", { rich_text: [text("hidden")] })],
      original: [block("p2", "paragraph", { rich_text: [text("synced")] })],
      cl: [block("c1", "column", {}, true), block("c2", "column", {}, true)],
      c1: [block("p3", "paragraph", { rich_text: [text("left")] })],
      c2: [block("p4", "paragraph", { rich_text: [text("right")] })],
    });
    expect(md).toBe("<details>\n<summary>More</summary>\n\nhidden\n\n\n</details>\n\n\nsynced\n\n\nleft\n\n\nright\n\n");
  });

  it("converts tables", async () => {
    const md = await toMarkdown({
      page: [block("t", "table", { table_width: 2, has_column_header: true, has_row_header: false }, true)],
      t: [
        block("r1", "table_row", { cells: [[text("a")], [text("b|c")]] }),
        block("r2", "table_row", { cells: [[text("1")], [text("2")]] }),
      ],
    });
    expect(md).toBe("\n| a | b\\|c |\n| --- | --- |\n| 1 | 2 |\n\n");
  });

  it("uses transformers, skips unsupported blocks and throws on unhandled ones", async () => {
    const md = await toMarkdown({
      page: [block("i", "image", {}), block("d", "child_database", { title: "Tracker" }), block("u", "unsupported", {})],
    });
    expect(md).toBe("\n<Img />\n\n");
    await expect(toMarkdown({ page: [block("f", "pdf", {})] })).rejects.toThrow("unhandled Notion block type: pdf");
  });
});
