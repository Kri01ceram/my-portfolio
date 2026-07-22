import { site } from "@/lib/site";

export type SocialLink = {
  platform: string;
  username: string;
  href: string;
};

export const socialLinks: SocialLink[] = [
  { platform: "GitHub", username: "@Kri01ceram", href: site.links.github },
  { platform: "X", username: "@yourhandle", href: "https://x.com/" },
  { platform: "LinkedIn", username: "Krishna Singh", href: site.links.linkedin },
  { platform: "LeetCode", username: "@0_Krishna_01", href: site.links.leetcode },
  { platform: "Discord", username: "yourname", href: "https://discord.com/" },
  { platform: "Telegram", username: "@yourhandle", href: "https://t.me/" },
];
