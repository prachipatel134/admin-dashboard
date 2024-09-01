import React from 'react';
import { Menu } from 'antd';
import { PieChartOutlined, UserOutlined, DollarOutlined } from '@ant-design/icons';

const Sidebar = () => {
  return (
    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
      <Menu.Item key="1" icon={<PieChartOutlined />}>
        Dashboard
      </Menu.Item>
      <Menu.Item key="2" icon={<UserOutlined />}>
        Users
      </Menu.Item>
      <Menu.Item key="3" icon={<DollarOutlined />}>
        Revenue
      </Menu.Item>
      {/* Add more menu items as needed */}
    </Menu>
  );
};

export default Sidebar;
