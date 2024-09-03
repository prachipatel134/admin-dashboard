import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import { Card } from 'antd';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend, Filler);

const IncomeChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/data/MonthlyRevenue.json');
      const incomeData = await response.json();

     
      const parseDate = (dateStr) => new Date(dateStr);
      const sortedData = incomeData.sort((a, b) => parseDate(a.date) - parseDate(b.date));

      const labels = sortedData.map(item => parseDate(item.date));
      const data = sortedData.map(item => item.amount);
   
      const aggregatedData = incomeData.reduce((acc, item) => {
        const date = parseDate(item.date);
        const monthKey = date.toISOString().substring(0, 7); 

        if (!acc[monthKey]) {
          acc[monthKey] = { date: monthKey, amount: 0,  service_fees: 0 };
        }

        acc[monthKey].amount += item.amount;
       
        acc[monthKey].service_fees += item.service_fees;

        return acc;
      }, {});

      
      const aggregatedArray = Object.values(aggregatedData);

      setChartData({
        labels: aggregatedArray.map(item => item.date),
        datasets: [
          {
            label: 'Total Revenue (USD)',
            data: aggregatedArray.map(item => item.amount),
            fill: true,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            pointBackgroundColor: 'rgba(75, 192, 192, 1)',
            tension: 0.4,
          },
       
          {
            label: 'Service Fees (USD)',
            data: aggregatedArray.map(item => item.service_fees),
            fill: true,
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderColor: 'rgba(153, 102, 255, 1)',
            pointBackgroundColor: 'rgba(153, 102, 255, 1)',
            tension: 0.4,
          },
        ],
      });
    };

    fetchData();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Amount (USD)',
        },
        grid: {
          display: false, 
        },
      },
      x: {
        type: 'time',
        time: {
          unit: 'month', 
          tooltipFormat: 'MMM yyyy', 
        },
        grid: {
          display: false, 
        },
        title: {
          display: true,
          text: 'Date',
        },
      },
    },
  };

  return (
    <div>
      <Card className="custom-card">
      <h2>Income Overview</h2>
      {chartData ? <Line data={chartData} options={options} /> : <p>Loading...</p>}</Card>
    </div>
  );
};

export default IncomeChart;
