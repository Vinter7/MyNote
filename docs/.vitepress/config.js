export default {
  title: 'Blog',
  titleTemplate: '高枕枕のBlog',
  head: [
    [
      'link',
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
    ],
  ],
  themeConfig: {
    siteTitle: '高枕枕のBlog',
    logo: '/favicon.png',
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Vinter7' },
    ],
    nav: [
      {
        text: 'Front End',
        items: [
          { text: 'HTML&CSS', link: '/front-end/html&css/' },
          { text: 'JavaScript', link: '/front-end/javascript/' },
          { text: 'Vue.js', link: '/front-end/vue/' },
          { text: 'React', link: '/front-end/react/' },
          { text: 'Node.js', link: '/front-end/node/' },
        ],
      },
      {
        text: 'Others',
        items: [
          { text: 'Python基础', link: '/others/python1' },
          { text: 'Python进阶', link: '/others/python2' },
          { text: 'FastAPI', link: '/others/fastapi' },
          { text: '算法', link: '/others/algorithm' },
          { text: 'TensorFlow', link: '/others/tensorflow' },
          { text: 'Git 使用', link: '/others/git' },
          { text: '正则表达式', link: '/others/regexp' },
          { text: 'Vim 使用', link: '/others/vim' },
        ],
      },
      {
        text: 'Demo',
        items: [
          { text: '2048', link: '/demo/2048' },
          { text: '扫雷', link: '/demo/mine' },
          { text: '风花诗琴', link: '/demo/windsong' },
          { text: 'iPhone7 仿绘', link: '/demo/iphone' },
        ],
      },
    ],
    sidebar: {
      '/others/': [
        {
          text: 'Python',
          items: [
            { text: 'Python基础', link: '/others/python1' },
            { text: 'Python进阶', link: '/others/python2' },
            { text: 'FastAPI', link: '/others/fastapi' },
            { text: 'TensorFlow', link: '/others/tensorflow' },
          ],
        },
        {
          text: 'Others',
          items: [
            { text: '算法', link: '/others/algorithm' },
            { text: 'Git', link: '/others/git' },
            { text: '正则表达式', link: '/others/regexp' },
            { text: 'Vim', link: '/others/vim' },
          ],
        },
      ],

      '/demo/': [
        {
          text: 'Demo',
          items: [
            { text: '2048', link: '/demo/2048' },
            { text: '扫雷', link: '/demo/mine' },
            { text: '风花诗琴', link: '/demo/windsong' },
            { text: 'iPhone7 仿绘', link: '/demo/iphone' },
          ],
        },
      ],

      '/front-end/': [
        {
          text: 'HTML & CSS',
          collapsible: true,
          collapsed: true,
          items: [
            { text: 'HTML', link: '/front-end/html&css/html' },
            { text: 'CSS', link: '/front-end/html&css/css' },
            { text: 'SASS', link: '/front-end/html&css/sass' },
          ],
        },
        {
          text: 'JavaScript',
          collapsible: true,
          items: [
            {
              text: '基础语法',
              link: '/front-end/javascript/fundamentals',
            },
            {
              text: '使用对象',
              link: '/front-end/javascript/object',
            },
            { text: '原型和类', link: '/front-end/javascript/class' },
            {
              text: 'Promise',
              link: '/front-end/javascript/promise',
            },
            {
              text: '网络请求',
              link: '/front-end/javascript/request',
            },
            { text: '文档对象', link: '/front-end/javascript/dom' },
            {
              text: '浏览器事件',
              link: '/front-end/javascript/events',
            },
            { text: 'Others', link: '/front-end/javascript/others' },
          ],
        },
        {
          text: 'Vue.js',
          collapsible: true,
          items: [
            { text: '快速上手', link: '/front-end/vue/start' },
            { text: '使用组件', link: '/front-end/vue/components' },
            { text: '深入原理', link: '/front-end/vue/extra' },
            { text: 'Vue Router', link: '/front-end/vue/router' },
            { text: 'Pinia', link: '/front-end/vue/pinia' },
            { text: 'NuxtJS', link: '/front-end/vue/nuxt' },
          ],
        },
        {
          text: 'React',
          collapsible: true,
          items: [{ text: '快速上手', link: '/front-end/react/' }],
        },

        {
          text: 'Node.js',
          collapsible: true,
          items: [
            { text: 'Node', link: '/front-end/node/modules' },
            { text: 'Express', link: '/front-end/node/express' },
            { text: 'Koa', link: '/front-end/node/koa' },
            { text: 'NestJS', link: '/front-end/node/nestjs' },
          ],
        },
      ],
    },
  },
}
