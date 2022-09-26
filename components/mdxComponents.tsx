import {
  Badges,
  NavbarNotion,
  Social,
  TagDate,
  Title,
} from "@/components/notionBoost";
import { FORMTYPE, SubscribeForm } from "@/components/subscribe";
import { TweetEmbed } from "@/components/twitterEmbed";
import {
  A,
  Img,
  TwitterIcon,
  Video,
  ShareInlineBtn,
  ShareLink,
} from "@/components/tags";
import Link from "next/link";

const MDXComponents = {
  Link,
  Title,
  Social,
  NavbarNotion,
  TagDate,
  Img,
  Video,
  A,
  TwitterIcon,
  FORMTYPE,
  SubscribeForm,
  Badges,
  ShareInlineBtn,
  ShareLink,
  TweetEmbed,
};

export default MDXComponents;
