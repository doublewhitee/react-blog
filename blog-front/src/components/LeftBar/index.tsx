import React, { useEffect, useState } from 'react';
import { Row, Col, Modal, Form, Input, message } from 'antd';
import { createFromIconfontCN } from '@ant-design/icons';
import Cookies from 'js-cookie';
import './index.less';

import ModeBadge from '../ModeBadge';
import InlineMenu from '../InlineMenu';

import { userInfo } from '@config/index';
import { reqLogin } from '@api/user';
import { setEncrypt } from '@utils/secret';
import { useAppSelector, useAppDispatch } from '@redux/hooks';
import { setLoginStatus } from '@redux/reducers/userSlice';
const avatar = require(`@assets/${userInfo.avatar}`)

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_3307767_9o41ucoy8as.js',
})

interface LeftBarProps {
  hasBadge?: boolean
  handleDayNightMode: React.MouseEventHandler
}

const LeftBar: React.FC<LeftBarProps> = props => {
  const { hasBadge, handleDayNightMode } = props
  // redux
  const dispatch = useAppDispatch()
  const isLogin = useAppSelector(state => state.user.isLogin)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [form] = Form.useForm()

  // 初次加载时，redux初始化登陆状态
  useEffect(() => {
    const token = Cookies.get('token')
    if (token) {
      dispatch(setLoginStatus(true))
    }
  }, [])

  const handleClickAccount = (url: string) => {
    window.open(url)
  }

  const handleOpenLoginModal = () => {
    if (!isLogin) {
      setIsModalOpen(true)
      form.resetFields()
    } else {
      Modal.confirm({
        title: '退出登录',
        content: '您确认要退出登录吗？',
        cancelText: '取消',
        okText: '确定',
        onOk: () => {
          dispatch(setLoginStatus(false))
          Cookies.remove('token')
          message.success('退出登陆成功！')
        }
      })
    }
  }

  const handleLogin = () => {
    form.validateFields().then(async () => {
      const { username, password } = form.getFieldsValue()
      const res = await reqLogin(username, setEncrypt(password))
      // 登陆成功，设置cookie
      if (res.data.status === 1) {
        message.success('登陆成功！')
        Cookies.set('token', res.data.token, { expires: 1 })
        dispatch(setLoginStatus(true))
        setIsModalOpen(false)
      }
    })
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
          onClick={handleOpenLoginModal}
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
        onOk={handleLogin}
        onCancel={() => setIsModalOpen(false)}
        okText="确认"
        cancelText="取消"
      >
        <Form
          form={form}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[
              { required: true, message: '请输入密码' },
              { pattern: new RegExp(/^([a-zA-Z0-9]{6,20})$/, 'g'), message: '密码应由6-20位的大小写字母和数字组成' }
            ]}
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