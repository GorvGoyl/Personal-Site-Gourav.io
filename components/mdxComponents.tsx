import Link from "next/link";
import { Announce } from "./announce";
import {
  Badges,
  NavbarNotion,
  Social,
  TagDate,
  Title,
} from "./notionBoost";
import { FORMTYPE, SubscribeForm } from "./subscribe";
import {
  A,
  Img,
  ShareInlineBtn,
  ShareLink,
  TwitterIcon,
  Video,
} from "./tags";
import { TweetEmbed } from "./twitterEmbed";

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
  Announce,
};

export default MDXComponents;
