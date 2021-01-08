import scrollBtnCls from "./css/tags.module.scss";

export function Img(Props: {
  src: string;
  alt?: string;
  caption?: string;
  type?: string;
  className?: string;
}): JSX.Element {
  let cls = "rounded";
  if (Props.type === "ss") cls += " border-2";

  // add any more classes provided by prop
  if (Props.className) {
    cls += Props.className;
  }

  // set alt text from alt or caption
  const altText = Props.alt ?? Props.caption;
  const imgTag = <img src={Props.src} alt={altText} className={cls} />;
  if (Props.caption) {
    return (
      <figure>
        {imgTag}
        <figcaption className="text-center">{Props.caption}</figcaption>
      </figure>
    );
  }
  return imgTag;
}

export function A(Props: {
  href: string;
  text: string;
  new: boolean;
  title?: string;
}): JSX.Element {
  const target = Props.new ? "_blank" : "";
  return (
    <a href={Props.href} target={target} title={Props.href}>
      {Props.text}
    </a>
  );
}

export function ScrollTopBtn(): JSX.Element {
  return (
    <div
      className="scrollBtnCls"
      title="Scroll back to top"
      role="button"
      tabIndex={0}
    >
      ⭡
    </div>
  );
}
