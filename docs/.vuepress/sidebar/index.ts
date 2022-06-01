import { sidebar } from "vuepress-theme-hope";

export default sidebar([
  "/",
  "/home",
  "/slide",
  {
    text: "如何使用",
    icon: "creative",
    prefix: "/guide/",
    link: "/guide/",
    children: "structure",
  },
  {
    text: "面试资料",
    icon: "creative",
    prefix: "/pdf/",
    link: "/pdf/",
    children: "structure",
  },
  {
    text: "文章",
    icon: "note",
    prefix: "/posts/",
    children: [
      {
        text: "数据结构和算法",
        icon: "note",
        collapsable: true,
        prefix: "algorithm/",
        children: "structure"
      },
      {
        text: "其他文章",
        icon: "note",
        collapsable: true,
        prefix: "article/",
        children: "structure",
      },
      
    ],
  },
]);
