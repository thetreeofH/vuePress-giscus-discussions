import { arraySidebar } from "vuepress-theme-hope";

export const posts = arraySidebar([
    "",
    {
        text: "数据结构和算法",
        icon: "info",
        link: "algorithm/",
        prefix: "algorithm/",
        children: [
            "Balanced-Binary-Tree",
            "Binary-Sort-Tree",
            "Binary-Tree",
            "Btree",
            "Data-Structures-and-Algorithms",
            "hash-table",
            "Heapsort",
            "Huffman-tree",
            "linkedList",
            "picture",
            "Prefix-infix-postfix-expressions",
            "recurse",
            "search",
            "Sequentially-store-binary-tree",
            "stack",
            "Threaded-Binary-Tree",
        ],
    },
    {
        text: "随笔",
        icon: "file",
        link: "article/",
        prefix: "article/",
        children: ["article1", "article2"],
    },
]);