import type { Element, Root, RootContent } from 'hast';
import { h } from 'hastscript';

type OutlineOptions = {
    /** whether to add the outline */
    show: boolean;
};

const headingTags = new Set(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']);

/**
 * Rehype plugin that adds the page outline: a `<nav>` at the start of the page with nested lists of links to the
 * page's headings, shown on wide screens only (styles/md.module.scss). A page without headings gets none.
 * Replaces @jsdevtools/rehype-toc (unmaintained) and keeps its HTML.
 */
export function rehypeOutline({ show }: OutlineOptions) {
    return (tree: Root) => {
        if (!show) {
            return;
        }
        const headings = findHeadings(tree);
        if (headings.length === 0) {
            return;
        }
        tree.children.unshift(h('nav', { className: 'page-outline' }, [outlineList(headings)]));
    };
}

/** The h1–h6 elements in the tree, in document order */
function findHeadings(node: Root | RootContent, headings: Element[] = []): Element[] {
    if (node.type === 'element' && headingTags.has(node.tagName)) {
        headings.push(node);
    }
    if ('children' in node) {
        for (const child of node.children) {
            findHeadings(child, headings);
        }
    }
    return headings;
}

/**
 * Nests the links in `<ol>`s by heading level, as rehype-toc did: a deeper heading starts a list in the previous
 * heading's item, and a higher one goes back to the list of the latest open heading of its level. If there's none
 * (headings out of order, like an h2 after an h3), it joins the current list, which takes its level.
 */
function outlineList(headings: Element[]): Element {
    // the open lists from the outermost in, with the heading level of each
    const levels: { level: number; list: Element }[] = [];
    let previousItem: Element | undefined;
    for (const heading of headings) {
        const level = Number(heading.tagName.slice(1));
        const item = outlineItem(heading);
        let current = levels.at(-1);
        if (current && level < current.level) {
            const index = levels.findLastIndex((open) => {
                return open.level === level;
            });
            if (index === -1) {
                current.level = level;
            } else {
                levels.splice(index + 1);
                current = levels[index];
            }
        }
        if (current?.level === level) {
            current.list.children.push(item);
        } else {
            const list = h('ol', { className: `toc-level toc-level-${levels.length + 1}` }, [item]);
            previousItem?.children.push(list);
            levels.push({ level, list });
        }
        previousItem = item;
    }
    return levels[0].list;
}

/** A list item linking to the heading. As in rehype-toc, each class comes with a copy suffixed with the heading's tag */
function outlineItem(heading: Element): Element {
    const tag = heading.tagName;
    return h('li', { className: `toc-item toc-item-${tag}` }, [
        h('a', { className: `page-link page-link-${tag}`, href: `#${heading.properties.id ?? ''}` }, textOf(heading)),
    ]);
}

/** The text in a node and its descendants, like the DOM's textContent */
function textOf(node: RootContent): string {
    if (node.type === 'text') {
        return node.value;
    }
    if ('children' in node) {
        return node.children.map(textOf).join('');
    }
    return '';
}
