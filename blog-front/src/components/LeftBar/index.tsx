import React from 'react';
import { Row, Col } from 'antd';
import './index.less';

import avatar from '../../assets/avatar.jpg';
import { userInfo } from '../../config';

const LeftBar: React.FC = () => {
  return (
    <div className="left-bar">
      <img src={avatar} alt="avatar" className="avatar" />
      <div>
        <div>{userInfo.username}</div>
        <div>{userInfo.desc}</div>
      </div>

      <Row>
        <Col span={8}>
          <div>日志</div>
          <div>10</div>
        </Col>
        <Col span={8}>
          <div>分类</div>
          <div>10</div>
        </Col>
        <Col span={8}>
          <div>标签</div>
          <div>10</div>
        </Col>
      </Row>
    </div>
  );
};

export default LeftBar;