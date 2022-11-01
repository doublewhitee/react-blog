import { lazy } from 'react';

const Home = lazy(() => import('../pages/Home'));
const Tags = lazy(() => import('../pages/Tags'));

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
        element: Tags
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

export const getRoutesInfo = (router: RoutersObj[], basePath: string) => {
  let res: RoutersObj[] = []
  router.forEach(i => {
    if (i.element) {
      res.push({ path: basePath + i.path, name: i.name })
    } else if (i.children) {
      const children = getRoutesInfo(i.children, i.path)
      res.push({ path: i.path, name: i.name, children })
    }
  })
  return res
}
