import sidebar from "./config/sidebar.js";

export default {
    title: 'CPU Wall Wiki',
    description: 'Documentation for NottinghamWall',
    base: "/",
    themeConfig: {
      logo: "https://avatars.githubusercontent.com/u/178354211?s=200&v=4",
      nav: [
        { text: 'Home', link: '/' },
        { text: 'Guide', link: '/guide/' }
      ],
      sidebar: sidebar,
      search: {
        provider: 'local'
      },
      socialLinks: [
        { icon: 'github', link: 'https://github.com/CompPsyUnion/' }
      ],
      footer: {
        message: "MIT Licensed",
        copyright: "Copyright © 2024-present CompPsyUnion",
      },
      docFooter: {
        prev: "上一页",
        next: "下一页",
      },
      editLink: {
        text: "在 GitHub 上编辑此页",
        pattern:
          "https://github.com/CompPsyUnion/NottinghamWall/edit/main/docs/:path",
      },
      lastUpdated: {
        text: "最后更新于",
        formatOptions: {
          dateStyle: "short",
          timeStyle: "medium",
        },
      },
    }
  }
  
