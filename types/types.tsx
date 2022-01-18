import { LayoutType } from "@/components/layout";

export class FrontMatter {
  date = "";
  title = "";
  desc = "";
  layout: LayoutType;
  preview? = false;
  // below ones are auto retrieve at build time
  slug? = "";
  toc? = false;
  mobileToc? = false;
  comments? = false;
  ogURL? = "";
}
