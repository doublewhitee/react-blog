import { lazy } from 'react';

const Home = lazy(() => import('../pages/Home'));

export const defalutRoutes = [
  {
    path: '/',
    element: Home
  }
]
