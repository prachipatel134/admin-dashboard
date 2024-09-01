import React from 'react';
import { Card } from 'antd';
import { Bar } from 'react-chartjs-2';

const ChartComponent = ({ data }) => {
  const chartData = {
    labels: data.labels,
    datasets: [{
      label: 'Revenue',
      data: data.values,
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    }],
  };

  return (
    <Card title="Revenue Chart">
      <Bar data={chartData} />
    </Card>
  );
};

export default ChartComponent;
