import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu } from 'antd';
import './index.less'

import { useAppSelector } from '../../redux/hooks';

const { SubMenu } = Menu;

const InlineMenu: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  // routes menu
  const routes = useAppSelector(state => state.user.routesList)

  const handleClickMenu = (info: { key: string }) => {
    navigate(info.key, { replace: true })
  }
  return (
    <div className="inline-menu">
      <Menu
          onClick={handleClickMenu}
          style={{ width: 'calc(100%)' }}
          defaultSelectedKeys={[location.pathname]}
          defaultOpenKeys={[location.pathname.split('/')[0]]}
          mode="inline"
      >
        {
          routes.map(i => {
            if (!i.children) {
              return <Menu.Item key={i.path}>{i.name}</Menu.Item>
            } else {
              return (
              <SubMenu key={i.path} title={i.name}>
                {i.children.map(ch => <Menu.Item key={ch.path}>{ch.name}</Menu.Item>)}
              </SubMenu>)
            }
          })
        }
      </Menu>
    </div>
  );
};

export default InlineMenu;
