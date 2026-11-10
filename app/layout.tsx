import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "田芳 · UI 设计师个人作品集",
  description:
    "田芳的个人设计空间，拥有 5 年设计经验，分享 UI 设计作品与设计思考。",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
