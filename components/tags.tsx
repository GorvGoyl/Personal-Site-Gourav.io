export function Img(Props: {
  src: string;
  alt?: string;
  caption?: string;
}): JSX.Element {
  const imgTag = <img src={Props.src} alt={Props.alt} />;

  if (Props.caption) {
    return (
      <figure>
        {imgTag}
        <figcaption>{Props.caption}</figcaption>
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
