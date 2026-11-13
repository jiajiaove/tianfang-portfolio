import keygoldImages from "./projects/keygold.json";
import mangatoonImages from "./projects/mangatoon.json";

export interface PortfolioImage {
  id: string;
  title: string;
  category: string;
  categoryLabel: string;
  version: string;
  versionLabel: string;
  width: number;
  height: number;
  src: string;
  thumbnail: string;
  source?: string;
}

export interface PortfolioProject {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  url?: string;
  tags: string[];
  theme: { background: string; accent: string };
  versions: string[];
  categories: string[];
  images: PortfolioImage[];
}

// Add another project object and its own image manifest here.
// Public assets: public/images/<project>/<business>/<version>/.
export const projects: PortfolioProject[] = [
  {
    id: "keygold",
    name: "KeyGold",
    subtitle: "GAME COMMERCE PLATFORM",
    description:
      "游戏充值平台界面设计，覆盖商品浏览、购买支付、订单追踪与会员运营。沿着业务流程，查看不同终端与版本的设计。",
    url: "https://keygold.gg/",
    tags: ["UI DESIGN", "PURPLE + YELLOW", "DESKTOP / MOBILE"],
    theme: { background: "#5321b1", accent: "#ffdc39" },
    versions: ["responsive", "desktop-legacy", "mobile-legacy"],
    categories: [
      "navigation",
      "commerce",
      "orders",
      "account",
      "rewards",
      "affiliate",
      "support",
      "content",
    ],
    images: keygoldImages,
  },
  {
    id: "mangatoon",
    name: "MangaToon",
    subtitle: "READING · SOCIAL · AVATAR EXPERIENCE",
    description:
      "漫画与小说社区产品界面设计，覆盖内容阅读、互动社交、角色装扮、福利成长与作者创作流程。按业务与设计范围浏览完整设计稿。",
    tags: ["MOBILE UI", "CONTENT COMMUNITY", "AVATAR EXPERIENCE"],
    theme: { background: "#FF526E", accent: "#FFFFFF" },
    versions: ["app-experience", "avatar-customization", "creator-studio"],
    categories: ["home", "reading", "social", "avatar", "rewards", "profile", "creator"],
    images: mangatoonImages,
  },
];
