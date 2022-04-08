import React, { useEffect } from 'react';
import { Row, Col, Switch } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import './index.less'
import { SwitchChangeEventHandler } from 'antd/lib/switch';

interface TopBarProps {
  height?: number
  isDarkMode: boolean
  handleDayNightMode: SwitchChangeEventHandler
  isMenuVisible: boolean
  setIsMenuVisible: Function
}

const TopBar: React.FC<TopBarProps> = props => {
  const { height, isDarkMode, handleDayNightMode, isMenuVisible, setIsMenuVisible } = props

  useEffect(() => {
    const menuIcon = document.getElementById('menu-icon')!
    if (isMenuVisible) {
      // 未展开
      menuIcon.classList.add('menu-icon-close')
    } else {
      menuIcon.classList.remove('menu-icon-close')
    }
  }, [isMenuVisible])

  return (
    <div
      className="top-bar"
      style={{ height: `${height}px` }}
    >
      <Row align="middle" justify="space-between" style={{ height: '100%' }}>
        <Col><SearchOutlined className="top-bar-icon" /></Col>
        <Col>
          <Row align="middle">
            <Col style={{ paddingRight: '20px' }}>
              <Switch
                checked={isDarkMode}
                checkedChildren="日间"
                unCheckedChildren="夜间"
                onChange={handleDayNightMode}
              />
            </Col>
            <Col onClick={() => setIsMenuVisible(!isMenuVisible)}>
              <div id="menu-icon">
                <div className="menu-icon-top" />
                <div className="menu-icon-middle" />
                <div className="menu-icon-bottom" />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

TopBar.defaultProps = {
  height: 64
}

export default TopBar;
