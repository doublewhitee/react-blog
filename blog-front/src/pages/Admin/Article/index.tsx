import React, { useEffect } from 'react';
import { Table, Button, Input } from 'antd';
import { PlusOutlined }  from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '../../../redux/hooks';
import { reqArticleList } from '../../../api/collect';

import './index.less';

const dataSource = [
  {
    key: '1',
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号',
  },
  {
    key: '2',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
  },
];

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
  },
];

const Admin: React.FC = () => {
  const isLogin = useAppSelector(state => state.user.isLogin)
  const navigate = useNavigate()

  useEffect(() => {
    reqArticleList().then(r => console.log(r))
  }, [isLogin])

  return (
    <div className="admin-articles">
      <div className="admin-articles-title">文章管理</div>
      <div className="admin-articles-subtitle">
        <Input.Search
          allowClear
          placeholder="请输入搜索内容"
          style={{ width: 304 }}
        />
        <Button icon={<PlusOutlined />} type="primary" onClick={() => navigate('/admin/work')}>新建</Button>
      </div>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
};

export default Admin;