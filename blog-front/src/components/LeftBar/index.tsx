import React, { useState } from 'react';
import { Row, Col, Modal, Form, Input } from 'antd';
import { createFromIconfontCN } from '@ant-design/icons';
import { useAppSelector } from '../../redux/hooks';
import './index.less';

import ModeBadge from '../ModeBadge';
import InlineMenu from '../InlineMenu';

import { userInfo } from '../../config';
const avatar = require(`../../assets/${userInfo.avatar}`)

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_3307767_9o41ucoy8as.js',
})

interface LeftBarProps {
  hasBadge?: boolean
  handleDayNightMode: React.MouseEventHandler
}

const LeftBar: React.FC<LeftBarProps> = props => {
  const { hasBadge, handleDayNightMode } = props
  // 登陆状态
  const isLogin = useAppSelector(state => state.user.isLogin)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleClickAccount = (url: string) => {
    window.open(url)
  }

  return (
    <div className="left-bar">
      {
        hasBadge ? <ModeBadge handleClickBadge={handleDayNightMode} /> : null
      }
      <div className="avatar-con">
        <img src={avatar} alt="avatar" className="avatar" />
        <div
          className="avatar-bagde"
          onClick={() => setIsModalOpen(true)}
          style={{ backgroundColor: isLogin ? 'var(--success-color)' : 'var(--info-color)' }}
        />
      </div>
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

      <Row>
        <Col span={24}><InlineMenu /></Col>
      </Row>

      <Modal
        title="用户登录"
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
      >
        <Form>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

LeftBar.defaultProps = {
  hasBadge: true
}

export default LeftBar;