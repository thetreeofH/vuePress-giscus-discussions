import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  "/home",
  {
    text: "分类", 
    icon: "box", 
    prefix: "/category/",
    children: [
      {
        text: "分类",
        icon: "box",
        children: [
          { text: "面试题", icon: "box", link: "面试题" },
          { text: "数据结构和算法", icon: "box", link: "数据结构和算法" },
          { text: "使用指南", icon: "box", link: "使用指南" },
          { text: "数据结构和算法", icon: "box", link: "数据结构和算法" },
          { text: "hexo", icon: "box", link: "hexo" },
          { text: "项目学习", icon: "box", link: "项目学习" }
        ],
      }
    ],
  },
  { text: "标签", icon: "tag", link: "/tag/" },
  { text: "使用指南", icon: "creative", link: "/guide/" },
  {
    text: "博文",
    icon: "edit",
    prefix: "/posts/",
    children: [
      {
        text: "文章",
        icon: "edit",
        prefix: "article/",
        children: [
          { text: "主题新增心知天气插件", icon: "edit", link: "article1.md" },
          { text: "谷粒商城笔记", icon: "edit", link: "谷粒商城笔记.md" },
        ],
      },
      {
        text: "数据结构和算法",
        icon: "edit",
        prefix: "algorithm/",
        children: [
          { text: "查找", icon: "edit", link: "查找.md" },
          { text: "递归", icon: "edit", link: "递归.md" },
          { text: "堆排序", icon: "edit", link: "堆排序.md" },
          { text: "二叉排序树", icon: "edit", link: "二叉排序树.md" },
          { text: "二叉树", icon: "edit", link: "二叉树.md" },
          { text: "哈希表", icon: "edit", link: "哈希表.md" },
          { text: "赫夫曼树", icon: "edit", link: "赫夫曼树.md" },
          { text: "链表", icon: "edit", link: "链表.md" },
          { text: "平衡二叉树", icon: "edit", link: "平衡二叉树.md" },
          { text: "前缀、中缀、后缀表达式", icon: "edit", link: "前缀、中缀、后缀表达式.md" },
          { text: "数据结构和算法", icon: "edit", link: "数据结构和算法.md" },
          { text: "顺序存储二叉树", icon: "edit", link: "顺序存储二叉树.md" },
          { text: "图", icon: "edit", link: "图.md" },
          { text: "线索化二叉树", icon: "edit", link: "线索化二叉树.md" },
          { text: "栈", icon: "edit", link: "栈.md" },
          { text: "B树", icon: "edit", link: "B树.md" },

        ],
      }
    ],
  },
  {
    text: "主题文档",
    icon: "note",
    link: "https://vuepress-theme-hope.github.io/v2/zh/",
  },
]);
