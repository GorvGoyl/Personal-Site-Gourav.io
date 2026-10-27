export enum LayoutType {
    Homepage = 'py-20 px-5 mx-auto max-w-(--breakpoint-md)',
    Blog = 'pt-2 pb-20 px-5 mx-auto max-w-(--breakpoint-md)',
    Devtools = 'pt-2 px-5 mx-auto max-w-(--breakpoint-xl)',
}

export function Container(Props: { layout?: LayoutType; children: React.ReactNode | React.ReactNode[] }) {
    // const styles: LayoutType = {
    //   default: "py-20 px-5 mx-auto max-w-(--breakpoint-md)",
    //   blog: "pt-2 pb-20 px-5 mx-auto max-w-(--breakpoint-md)",
    // };

    const layout = Props.layout || LayoutType.Homepage;

    return <div className={layout}>{Props.children}</div>;
}
