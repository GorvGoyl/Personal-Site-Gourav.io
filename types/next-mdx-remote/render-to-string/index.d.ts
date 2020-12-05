declare module "next-mdx-remote/render-to-string" {
  function renderToString(content: string, obj: any): Promise<string>;
  export default renderToString;
}
