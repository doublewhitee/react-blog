import { lazy } from 'react';

const Home = lazy(() => import('../pages/Home'));
const Tags = lazy(() => import('../pages/Collect/Tags'));
const Archives = lazy(() => import('../pages/Collect/Archives'));
const Articles = lazy(() => import('../pages/Admin/Article'));
const Work = lazy(() => import('../pages/Admin/Work'));

interface RoutersObj {
  path: string
  name?: string
  title?: string
  element?: React.LazyExoticComponent<React.FC<{}>>
  children?: RoutersObj[]
  redirect?: string
}

export const defaultRoutes: RoutersObj[] = [
  {
    path: '/',
    name: '首页',
    title: 'Home',
    element: Home
  },
  {
    path: '/collect',
    name: '整理',
    children: [
      {
        path: '/archives',
        name: '归档',
        title: 'Archives',
        element: Archives
      },
      {
        path: '/categories',
        name: '分类',
        title: 'Categories',
        element: Tags
      },
      {
        path: '/tags',
        name: '标签',
        title: 'Tags',
        element: Tags
      }
    ]
  },
  {
    path: '*',
    redirect: '/'
  }
]

export const adminRoutes: RoutersObj[] = [
  {
    path: '/admin',
    name: '管理',
    children: [
      {
        path: '/articles',
        name: '文章管理',
        title: 'AdminArticles',
        element: Articles
      },
      {
        path: '/work',
        element: Work
      }
    ]
  },
]

export const getRoutesInfo = (router: RoutersObj[], basePath: string) => {
  let res: RoutersObj[] = []
  router.forEach(i => {
    if (i.element && i.name) {
      res.push({ path: basePath + i.path, name: i.name })
    } else if (i.children) {
      const children = getRoutesInfo(i.children, i.path)
      res.push({ path: i.path, name: i.name, children })
    }
  })
  return res
}
