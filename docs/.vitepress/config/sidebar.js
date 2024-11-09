export default [
  {
    text: 'Guide',
    items: [
      { text: "Introduction", link: "/guide/" },
      { text: "Guide Overview", link: "/guide/overview" },
      { text: "Getting Started", link: "/guide/getting-started" },
    ],
  },
  {
    text: 'Backend',
    collapsible: true,
    collapsed: true,
    items: [
      { text: "项目概述", link: "/guide/backend/" },
      { text: "项目结构", link: "/guide/backend/project-structure" },
      { text: "API 设计", link: "/guide/backend/api-design" },
      { text: "数据库配置", link: "/guide/backend/database-setup" },
      { text: "项目部署", link: "/guide/backend/deployment" },
    ],
  },
  {
    text: 'Admin',
    collapsible: true,
    collapsed: true,
    items: [
      { text: "项目概述", link: "/guide/admin/" },
      { text: "项目结构", link: "/guide/admin/project-structure" },
      { text: "项目部署", link: "/guide/admin/deployment" },
    ],
  },
  {
    text: 'UniApp',
    collapsible: true,
    collapsed: true,
    items: [
      { text: "项目概述", link: "/guide/uniapp/" },
      { text: "项目结构", link: "/guide/uniapp/project-structure" },
      { text: "项目部署", link: "/guide/uniapp/deployment" },
    ],
  },
];
