import React from 'react';
import { Row, Col } from 'antd';
import { createFromIconfontCN } from '@ant-design/icons';
import './index.less';

import ModeBadge from '../ModeBadge';

import { userInfo } from '../../config';
const avatar = require(`../../assets/${userInfo.avatar}`)

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_3307767_hzgxhex6clk.js',
})

interface LeftBarProps {
  hasBadge?: boolean
  handleDayNightMode: React.MouseEventHandler
}

const LeftBar: React.FC<LeftBarProps> = props => {
  const { hasBadge, handleDayNightMode } = props
  const handleClickAccount = (url: string) => {
    window.open(url)
  }

  return (
    <div className="left-bar">
      {
        hasBadge ? <ModeBadge handleClickBadge={handleDayNightMode} /> : null
      }
      <img src={avatar} alt="avatar" className="avatar" />
      <div className="user-info">
        <div className="user-name">{userInfo.username}</div>
        <div className="user-desc">{userInfo.desc}</div>
      </div>

      <Row>
        <Col span={8}>
          <div className="info-title">日志</div>
          <div className="info-detail">10</div>
        </Col>
        <Col span={8}>
          <div className="info-title">分类</div>
          <div className="info-detail">10</div>
        </Col>
        <Col span={8}>
          <div className="info-title">标签</div>
          <div className="info-detail">10</div>
        </Col>
      </Row>
      
      <Row justify="center" style={{ padding: '10px 0' }}>
        {
          userInfo.accounts.map(i => (
            <Col span={3} key={i.icon}>
              <IconFont
                type={i.icon}
                className="account-icon"
                onClick={() => handleClickAccount(i.url!)}
              />
            </Col>
          ))
        }
      </Row>
    </div>
  );
};

LeftBar.defaultProps = {
  hasBadge: true
}

export default LeftBar;