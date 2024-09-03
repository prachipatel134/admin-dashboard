import React from 'react';
import { Card, Col, Row } from 'antd';
import { UserAddOutlined, ProjectOutlined, DollarOutlined, BellOutlined } from '@ant-design/icons';

// Define card data with unique colors
const cardData = [
  {
    title: 'New Users',
    value: '1,250',
    icon: <UserAddOutlined style={{ fontSize: '40px', color: '#ffffff' }} />,
    color: '#56a459', 
  },
  {
    title: 'Active Projects',
    value: '320',
    icon: <ProjectOutlined style={{ fontSize: '40px', color: '#ffffff' }} />,
    color: '#3e86bf',
  },
  {
    title: 'Total Earnings',
    value: '$3,500,000',
    icon: <DollarOutlined style={{ fontSize: '40px', color: '#ffffff' }} />,
    color: '#eca919', 
  },
  {
    title: 'Pending Requests',
    value: '75',
    icon: <BellOutlined style={{ fontSize: '40px', color: '#ffffff' }} />,
    color: '#e14d42', 
  },
];

const DashboardCards = () => {
  return (
    <Row gutter={16}>
      {cardData.map((card, index) => (
        <Col span={6} key={index}>
          <Card
            style={{ backgroundColor: card.color, color: '#ffffff'}}
            bodyStyle={{padding: '18px' }}
          >
           
              <div style={{display:'flex',justifyContent:'space-around',alignItems:'center'}}>
           <span style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
              {card.icon}
              </span>
              <div style={{paddingRight:'10px',fontSize:'24px'}}>
              
              <div style={{fontSize:'18px'}}>{card.title}</div>
              <div style={{fontSize:'24px'}}>{card.value}</div>
              </div>
              </div>
              
            {/* <div style={{ marginBottom: '16px' }}>
            
            </div> */}
           
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default DashboardCards;
