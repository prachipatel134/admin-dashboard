import React, { useState, useEffect } from 'react';
import {Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Card } from 'antd';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChartComponent = ({ data }) => {
  const [chartData, setChartData] = useState(null);

  const processData = (data) => {
    const categoryTotals = data.categories.reduce((acc, item) => {
      const { category } = item;
      const { jobposted } = item.data;
      
      if (!acc[category]) {
        acc[category] = 0;
      }
      acc[category] += jobposted;
      
      return acc;
    }, {});
    
    const labels = Object.keys(categoryTotals);
    const values = Object.values(categoryTotals);
    
    return { labels, values };
  };
  

  useEffect(() => {
    if (data) {
      const { labels, values } = processData(data);
      setChartData({
        labels: labels,
        datasets: [
          {
            label: 'Job Postings by Category',
            data: values,
            backgroundColor: [
                '#FF6384', 
                '#36A2EB',  
                '#FFCE56', 
                '#4BC0C0',  
                '#9966FF',  
                '#FF9F40',  
                '#FFCD56',  
                '#C9CBCF',  
                '#001529',  
                '#a52a2a',  
              ],
              borderColor: [
                '#FF6384', 
                '#36A2EB',  
                '#FFCE56',  
                '#4BC0C0', 
                '#9966FF',  
                '#FF9F40',  
                '#FFCD56', 
                '#C9CBCF',  
                '#001529',  
                '#a52a2a',
              ],
            borderWidth: 1,
          },
        ],
      });
    }
  }, [data]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw}`,
        },
      },
    },
  };

  return (
    <div>
        <Card className='custom-card'>
      <h2>Job Postings by Category</h2>
      {chartData ? <Doughnut data={chartData} options={options} /> : <p>Loading...</p>}
      </Card>
    </div>
  );
};

export default PieChartComponent;
