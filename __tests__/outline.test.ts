import type { Element, Root, Text } from 'hast';
import { h } from 'hastscript';
import { describe, expect, it } from 'vitest';
import { rehypeOutline } from '../lib/rehypeOutline';

/** adds the outline to the page as blog posts get it, and returns the outline */
function outlineOf(page: Root): Element {
    rehypeOutline({ show: true, navClass: 'page-outline mobile', linkClass: 'page-link mobile' })(page);
    return page.children[0] as Element;
}

/** the outline of a page with these headings, each heading's text being its tag */
function outlineLinesOf(...tags: string[]): string[] {
    const page = h(
        null,
        tags.map((tag, i) => {
            return h(tag, { id: `heading-${i}` }, tag);
        }),
    );
    return linesOf(outlineOf(page).children[0] as Element);
}

/** a list's links as lines of text, indented by two spaces per level of nesting */
function linesOf(list: Element, indent = ''): string[] {
    return list.children.flatMap((item) => {
        const [link, nested] = (item as Element).children as Element[];
        const line = indent + (link.children[0] as Text).value;
        return nested ? [line, ...linesOf(nested, `${indent}  `)] : [line];
    });
}

describe('rehypeOutline', () => {
    it('adds a nav at the start of the page with nested lists of links to the headings', () => {
        const page = h(null, [
            h('h2', { id: 'install' }, [
                h('a', { className: ['anchor'], href: '#install' }, [h('svg', [h('path')])]),
                'Install ',
                h('code', 'pnpm'),
            ]),
            h('p', 'text'),
            h('blockquote', [h('h3', 'No id')]),
        ]);
        expect(outlineOf(page)).toEqual(
            h('nav', { className: 'page-outline mobile' }, [
                h('ol', { className: 'toc-level toc-level-1' }, [
                    h('li', { className: 'toc-item toc-item-h2' }, [
                        h('a', { className: 'page-link mobile page-link mobile-h2', href: '#install' }, 'Install pnpm'),
                        h('ol', { className: 'toc-level toc-level-2' }, [
                            h('li', { className: 'toc-item toc-item-h3' }, [
                                h('a', { className: 'page-link mobile page-link mobile-h3', href: '#' }, 'No id'),
                            ]),
                        ]),
                    ]),
                ]),
            ]),
        );
        expect(page.children).toHaveLength(4);
    });

    it('nests headings by level the way rehype-toc did, including headings out of order', () => {
        // a higher heading goes back to the list of the latest open heading of its level
        expect(outlineLinesOf('h2', 'h3', 'h4', 'h3', 'h2')).toEqual(['h2', '  h3', '    h4', '  h3', 'h2']);
        // without one, it joins the current list, as in posts that start with an h3 and go on with h2s
        expect(outlineLinesOf('h3', 'h2', 'h3')).toEqual(['h3', 'h2', '  h3']);
        expect(outlineLinesOf('h2', 'h4', 'h5', 'h3', 'h4')).toEqual(['h2', '  h4', '    h5', '    h3', '      h4']);
    });

    it('adds an empty list to a page without headings, and nothing when not shown', () => {
        expect(outlineOf(h(null, [h('p', 'text')]))).toEqual(
            h('nav', { className: 'page-outline mobile' }, [h('ol', { className: 'toc-level toc-level-1' })]),
        );

        const page = h(null, [h('h2', { id: 'title' }, 'Title')]);
        rehypeOutline({ show: false, navClass: 'page-outline', linkClass: 'page-link' })(page);
        expect(page).toEqual(h(null, [h('h2', { id: 'title' }, 'Title')]));
    });
});
