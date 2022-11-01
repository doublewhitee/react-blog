import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu } from 'antd';
import './index.less'

import { useAppSelector } from '../../redux/hooks';

interface ItemObj {
  label: string
  key: string
  children?: ItemObj[]
}

interface RoutersObj {
  path: string
  name?: string
  title?: string
  children?: RoutersObj[]
}

const InlineMenu: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  // routes menu
  const routes = useAppSelector(state => state.user.routesList)
  const [items, setItems] = useState<ItemObj[]>([])
  
  useEffect(() => {
    const getItemList = (arr: RoutersObj[]) => {
      let res: ItemObj[] = []
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].children && Array.isArray(arr[i].children)) {
          let ch = getItemList(arr[i].children!)
          res.push({ label: arr[i].name || '', key: arr[i].path || arr[i].name!, children: ch })
        } else {
          res.push({ label: arr[i].name || '', key: arr[i].path || arr[i].name! })
        }
      }
      return res
    }
    setItems(getItemList(routes))
  }, [routes])

  const handleClickMenu = (info: { key: string }) => {
    navigate(info.key, { replace: true })
  }
  return (
    <div className="inline-menu">
      <Menu
        onClick={handleClickMenu}
        style={{ width: 'calc(100%)' }}
        defaultSelectedKeys={[location.pathname]}
        defaultOpenKeys={[`/${location.pathname.split('/')[1]}`]}
        mode="inline"
        items={items}
      />
    </div>
  );
};

export default InlineMenu;
