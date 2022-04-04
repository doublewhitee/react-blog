import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Col, Row } from 'antd';
import './App.less';

import TopBar from './components/TopBar';
import LeftBar from './components/LeftBar';
import NProgress from './components/NProgress';

const Home = React.lazy(() => import('./pages/Home'));

const App: React.FC = () => {
  return (
    <div id="app">
      {/* 顶部 */}
      <Row>
        <Col xs={24} sm={24} md={0} lg={0} xl={0} xxl={0}>
          <TopBar />
        </Col>
      </Row>

      <Row>
        {/* 侧边栏 */}
        <Col xs={0} sm={0} md={8} lg={6} xl={6} xxl={4}>
          <LeftBar />
        </Col>
        {/* 内容 */}
        <Col flex="auto">
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
