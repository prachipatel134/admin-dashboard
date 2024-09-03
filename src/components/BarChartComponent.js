import React, { useState, useEffect, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { DatePicker,Card } from 'antd';


ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const { RangePicker } = DatePicker;

const BarChartComponent = () => {
    const [chartData, setChartData] = useState(null);
    const [dateRange, setDateRange] = useState([null, null]);
    const chartRef = useRef(null);
  
    const fetchData = async (startDate, endDate) => {
      try {
        const response = await fetch('/data/TotalClients.json');
        const data = await response.json();
        console.log('Fetched data:', data);
  
        
        const parseDate = (dateStr) => {
          const [month, day, year] = dateStr.split('/').map(Number);
          return new Date(year, month - 1, day);
        };
  
        
        const isWithinRange = (date) => date >= startDate && date <= endDate;
  
      
        const filteredData = data.freelancers
          .map(item => ({
            ...item,
            date: parseDate(item.date)
          }))
          .filter(item => isWithinRange(item.date))
          .sort((a, b) => a.date - b.date);
  
       
        const displayByDay = dateRange[0] && dateRange[1] && Math.abs(dateRange[1] - dateRange[0]) < 31 * 24 * 60 * 60 * 1000; // less than a month
  
        
        const aggregatedData = filteredData.reduce((acc, item) => {
          const date = item.date;
          const key = displayByDay ? date.toISOString().substring(0, 10) : date.toISOString().substring(0, 7); 
          if (!acc[key]) {
            acc[key] = { date, clients: item.clients };
          } else if (displayByDay) {
            acc[key].clients += item.clients; 
          }
          return acc;
        }, {});
  
        const labels = Object.keys(aggregatedData).map(key => displayByDay ? new Date(key) : new Date(key + '-01'));
        const counts = Object.values(aggregatedData).map(data => data.clients);
  
        setChartData({
          labels: labels,
          datasets: [
            {
              label: 'Total Clients',
              data: counts,
              fill: false,
              backgroundColor:'#4BC0C0',
              borderColor: 'rgba(75,192,192,1)',
              tension: 0.1,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    useEffect(() => {
       const today = new Date();
      const sixMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 6, 1);
      setDateRange([sixMonthsAgo, today]);
      fetchData(sixMonthsAgo, today);
    }, []);
  
    const handleDateRangeChange = (dates) => {
      if (dates && dates.length === 2) {
        setDateRange(dates);
        fetchData(dates[0].startOf('day').toDate(), dates[1].endOf('day').toDate());
      }
    };
  

    const getXAxisUnit = () => {
      if (dateRange[0] && dateRange[1]) {
        const rangeInDays = Math.ceil((dateRange[1] - dateRange[0]) / (1000 * 60 * 60 * 24));
        console.log("range",rangeInDays);
        return rangeInDays <= 200 ? 'day' : 'month'; 
      }
      return 'month'; 
    };
  
    const options = {
      responsive: true,
      plugins: {
        legend: {
            display: false, 
          },
      },
      scales: {
        x: {
          type: 'time',
          time: {
            unit: getXAxisUnit(), 
            tooltipFormat: getXAxisUnit() === 'day' ? 'MMM dd, yyyy' : 'MMM yyyy',
          },
          grid: {
            display: false, 
          },
          ticks: {
            autoSkip: true,
            maxTicksLimit: 12, 
          },
        },
        y: {
          title: {
            display: false,
            
          },
          grid: {
            display: false, 
          },
          beginAtZero: true,
        },
      },
    };
  
    return (
      <div>
        <Card className='custom-card' >
        <h2>Customer Growth</h2>
        <div style={{display:'flex',alignItems:'end',justifyContent:'end'}}>
      <RangePicker
        format="MM/DD/YYYY"
        onChange={handleDateRangeChange} 
      />
      </div>
        {chartData ? <Bar ref={chartRef} data={chartData} options={options} /> : <p>Loading...</p>}
        </Card>
      </div>
    );
  };
  

export default BarChartComponent;
