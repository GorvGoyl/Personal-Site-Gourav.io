export enum LayoutType {
    Homepage = 'py-20 px-5 mx-auto max-w-screen-md',
    Blog = 'pt-2 pb-20 px-5 mx-auto max-w-screen-md',
    Devtools = 'pt-2 pb-20 px-5 mx-auto max-w-screen-xl',
}

export function Container(Props: { layout?: LayoutType; children: JSX.Element | JSX.Element[] }): JSX.Element {
    // const styles: LayoutType = {
    //   default: "py-20 px-5 mx-auto max-w-screen-md",
    //   blog: "pt-2 pb-20 px-5 mx-auto max-w-screen-md",
    // };

    const layout = Props.layout || LayoutType.Homepage;

    return <div className={layout}>{Props.children}</div>;
}
