import { defineUserConfig } from "vuepress";
import theme from "./theme";

export default defineUserConfig({
  lang: "zh-CN",
  title: "Zichun'Blog",
  description: "vuepress-theme-hope 的演示",

  base: "/hope/",

  theme,
});
