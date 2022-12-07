import React, { Suspense, useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Col, Row } from 'antd';
import './App.less';

import TopBar from './components/TopBar';
import LeftBar from './components/LeftBar';
import NProgress from './components/NProgress';
import Drawer from './components/Drawer';
import ToolBox from './components/ToolBox';

import storage from './utils/storage';
import { defaultPageTheme } from './config';
import { defaultRoutes, adminRoutes, getRoutesInfo } from './config/router';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { setRoute } from './redux/reducers/userSlice';

interface Setting {
  isDarkMode: boolean
  theme: string
}

interface RoutersObj {
  path: string
  name?: string
  title?: string
  element?: React.LazyExoticComponent<React.FC<{}>>
  children?: RoutersObj[]
  redirect?: string
}

const App: React.FC = () => {
  const [settings, setSettings] = useState<Setting | null>()
  const [isDrawerVisible, setIsDrawerVisible] = useState<boolean>(false)
  const [routesList, setRoutesList] = useState<JSX.Element[]>([])
  // redux
  const dispatch = useAppDispatch()
  const isLogin = useAppSelector(state => state.user.isLogin)
  // location
  const location = useLocation()

  // 进入时根据localstorage选择主题
  useEffect(() => {
    const app = document.getElementById('app')!
    if (!storage.get('setting')) {
      // 不存在localstorage，保存默认设置
      storage.save('setting', defaultPageTheme)
      setSettings(defaultPageTheme)
      app.classList.add(defaultPageTheme.theme)
    } else {
      const setting: Setting = JSON.parse(storage.get('setting')!)
      setSettings(setting)
      if (setting.isDarkMode) {
        app.classList.add('night')
      } else {
        app.classList.add(setting.theme)
      }
    }
  }, [])

  // 登陆状态发生变化时更新路由信息
  useEffect(() => {
    if (isLogin) {
      // 路由初始化
      setRoutesList([...getRoutes(defaultRoutes, ''), ...getRoutes(adminRoutes, '')])
      // 路由信息传递给redux
      dispatch(setRoute([...getRoutesInfo(defaultRoutes, ''), ...getRoutesInfo(adminRoutes, '')]))
    } else {
      // 只加载基本路由
      setRoutesList(getRoutes(defaultRoutes, ''))
      // 路由信息传递给redux
      dispatch(setRoute(getRoutesInfo(defaultRoutes, '')))
    }
  }, [isLogin])

  // 修改日间/夜间模式
  const handleDayNightMode = () => {
    const app = document.getElementById('app')!
    const setting: Setting = settings!
    const isDarkMode = setting.isDarkMode
    storage.save('setting', { ...setting, isDarkMode: !isDarkMode })
    setSettings({ ...setting, isDarkMode: !isDarkMode })
    if (isDarkMode) {
      app.classList.remove('night')
      app.classList.add(setting.theme)
    } else {
      app.classList.remove(setting.theme)
      app.classList.add('night')
    }
  }

  // get Routes list
  const getRoutes = (routeList: RoutersObj[], basePath: string) => {
    let arr: JSX.Element[] = []
    routeList.forEach(i => {
      if (i.element) {
        arr.push(<Route key={basePath + i.path} path={basePath + i.path} element={<i.element />} />)
      } else if (i.children) {
        arr.push(...getRoutes(i.children, i.path + basePath))
      } else if (i.redirect) {
        arr.push(<Route key={basePath + i.path} path={basePath + i.path} element={<Navigate to={i.redirect!} replace />} />)
      }
    })
    return arr
  }

  return (
    <div id="app">
      {/* 顶部 */}
      <Row>
        <Col xs={24} sm={24} md={0} lg={0} xl={0} xxl={0}>
          <TopBar
            handleDayNightMode={handleDayNightMode}
            isDarkMode={settings ? settings.isDarkMode : false}
            isMenuVisible={isDrawerVisible}
            setIsMenuVisible={setIsDrawerVisible}
          />

          <Drawer
            width="280px"
            id="user-drawer"
            visible={isDrawerVisible}
            onClose={() => setIsDrawerVisible(val => !val)}
          >
            <LeftBar handleDayNightMode={() => {}} hasBadge={false} />
          </Drawer>
        </Col>
      </Row>

      <Row>
        {/* 侧边栏 */}
        <Col xs={0} sm={0} md={8} lg={6} xl={6} xxl={4}>
          <LeftBar handleDayNightMode={handleDayNightMode} />
        </Col>
        {/* 内容 */}
        <Col flex="auto" id="app-content">
        <ToolBox hasMenuIcon={location.pathname.startsWith('/collect')} />
        <Suspense fallback={<NProgress />}>
          <Routes>
            {
              routesList.map(i => i)
            }
          </Routes>
        </Suspense>
        </Col>
      </Row>
    </div>
  );
}

export default App;
