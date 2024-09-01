import React from 'react';
import { Row, Col, Card, Statistic } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

const KPIComponent = () => (
  <Row gutter={16}>
    <Col span={6}>
      <Card>
        <Statistic
          title="New Users"
          value={1128}
          valueStyle={{ color: '#3f8600' }}
          prefix={<ArrowUpOutlined />}
          suffix="%"
        />
      </Card>
    </Col>
    <Col span={6}>
      <Card>
        <Statistic
          title="Revenue"
          value={9302}
          valueStyle={{ color: '#cf1322' }}
          prefix={<ArrowDownOutlined />}
          suffix="$"
        />
      </Card>
    </Col>
    {/* Add more KPI cards as needed */}
  </Row>
);

export default KPIComponent;
