import React from 'react';
import { Menu } from 'antd';
import './index.less'

const { SubMenu } = Menu;

const InlineMenu: React.FC = () => {
  const handleClickMenu = () => {
    console.log('click')
  }
  return (
    <div className="inline-menu">
      <Menu
          onClick={handleClickMenu}
          style={{ width: 'calc(100%)' }}
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
      >
        <SubMenu key="sub1" title="Navigation One">
          <Menu.Item key="1">Option 1</Menu.Item>
          <Menu.Item key="2">Option 2</Menu.Item>
        </SubMenu>
      </Menu>
    </div>
  );
};

export default InlineMenu;
