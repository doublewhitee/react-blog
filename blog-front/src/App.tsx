import React, { Suspense, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Col, Row } from 'antd';
import './App.less';

import TopBar from './components/TopBar';
import LeftBar from './components/LeftBar';
import NProgress from './components/NProgress';
import Drawer from './components/Drawer';

import storage from './utils/storage';
import { defaultPageTheme } from './config';

const Home = React.lazy(() => import('./pages/Home'));

interface Setting {
  isDarkMode: boolean
  theme: string
}

const App: React.FC = () => {
  const [settings, setSettings] = useState<Setting | null>()
  const [isDrawerVisible, setIsDrawerVisible] = useState<boolean>(false)
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
        <Col flex="auto" className="app-content" style={{ minHeight: 'calc(100vh - 64px)' }}>
        <Suspense fallback={<NProgress />}>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Suspense>
        </Col>
      </Row>
    </div>
  );
}

export default App;
