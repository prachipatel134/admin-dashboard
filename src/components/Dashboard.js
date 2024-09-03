import React from 'react';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import Sidebar from './Sidebar';
import Homepage from '../Pages/Homepage';

const { Header, Content, Footer, Sider } = Layout;

const App = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout>
<Sidebar />
      <Layout>
        <Header
          style={{
            paddingTop:8,
            paddingBottom:4,
            paddingInline:24,
            height:75,
            
            background: colorBgContainer,
          }}
        >
          <h2>Welcome to upwork Dashboard</h2>
          </Header>
        <Content
          
        >
          <div
            style={{
              padding: 24,
              minHeight: 360,
              backgroundColor: '#ecf0f4',
              borderRadius: borderRadiusLG,
            }}
          >
            <Homepage/>
          </div>
        </Content>
      
      </Layout>
    </Layout>
  );
};
export default App;