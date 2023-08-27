import {DataNode} from "antd/lib/tree";

export const initTreeData: DataNode[] = [
    {
        title: '第一章 时间复杂度基础',
        key: '0',
        children: [
            {
                title: '第一节 渐进时间复杂度',
                key: '0-0',
                children: [
                    {
                        title: '课程',
                        key: '0-0-0',
                    },
                    {
                        title: '作业',
                        key: '0-0-1',
                    },
                    {
                        title: '课件',
                        key: '0-0-2',
                    },
                ],
            },
        ],
    },
];

export const md_str: string =
    "# Hello, Markdown!\n" +
    "\n" +
    "This is a sample Markdown document to demonstrate its syntax.\n" +
    "\n" +
    "## Sub-heading\n" +
    "\n" +
    "Here is a paragraph with **bold text** and *italic text*.\n" +
    "\n" +
    "### Sub-sub-heading\n" +
    "\n" +
    "Here is a list:\n" +
    "\n" +
    "- Item 1\n" +
    "- Item 2\n" +
    "  - Sub-item 2.1\n" +
    "  - Sub-item 2.2\n" +
    "\n" +
    "And a numbered list:\n" +
    "\n" +
    "1. First item\n" +
    "2. Second item\n" +
    "\n" +
    "You can also insert hyperlinks, like [this link to OpenAI](https://www.openai.com/).\n" +
    "\n" +
    "Here is a blockquote:\n" +
    "\n" +
    "> \"Markdown is a lightweight markup language with plain-text-formatting syntax. Its design allows it to be converted to many output formats.\" - [Wikipedia](https://en.wikipedia.org/wiki/Markdown)\n" +
    "\n" +
    "Lastly, here is some code:\n" +
    "\n" +
    "```python\n" +
    "print(\"Hello, world!\")\n" +
    "```\n";

export const ProOptions=[
    {
        key: '实验',
        value: '实验'
    },
    {
        key: '活动',
        value: '活动'
    },
    {
        key: '竞赛',
        value: '竞赛'
    },
    {
        key: '课程',
        value: '课程'
    }
]

export const CntOptions = [
    {
        key:0,
        value:'通知/规则'
    },
    {
        key:1,
        value:'学习资料'
    },
    {
        key:2,
        value: '作业/实验/考试'
    }
]

export const tagOptions = [
    {
        key:'1',
        value:'国家精品',
    }
]


export const activeType = [
    {
        key: 0,
        value: '未开始'
    },
    {
        key: 1,
        value: '进行中',
    },
    {
        key: 2,
        value: '归档'
    }
]