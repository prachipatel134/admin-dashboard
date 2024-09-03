import React, { useState ,useEffect} from 'react';
import { Table,Tag,Rate ,Card} from 'antd';
import { Bar } from 'react-chartjs-2';
import { render } from '@testing-library/react';


const categoryColors = {
  "Web Development": "geekblue",
  "Graphic Design": "green",
  "Content Writing": "volcano",
  "SEO": "purple",
  "Digital Marketing": "orange",
  "Virtual Assistance": "magenta",
  "Mobile App Development": "cyan",
  "Data Entry": "lime",
  "Video Editing": "red",
  "Social Media Management": "gold",
};

const TopRatedFreelancers = () => {
  const [dataSource, setDataSource] = useState();
  useEffect(() => {
    fetch('/data/TopFreelancer.json')
      .then((response) => response.json())
      .then((data) => {
        setDataSource(data.freelancer);
        console.log("data",data.freelancer);
      })
      .catch((error) => console.error('Error fetching job data:', error));
  }, []);

  


  const columns = [
    {
      title: 'Name',
      dataIndex: 'user_name',
      key: 'name',
      sorter: (a, b) => a.user_name.localeCompare(b.user_name),
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      sorter: (a, b) => a.category.localeCompare(b.category),
      render: (category) => {
        const color = categoryColors[category] || 'blue';
        return <Tag color={color}>{category}</Tag>;
      },
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      sorter: (a, b) => a.rating - b.rating,
      render: (rating) => <Rate disabled allowHalf defaultValue={rating} />,
    },
    {
      title: 'Earnings (USD)',
      dataIndex: 'earnings',
      key: 'earnings',
      sorter: (a, b) => a.earnings - b.earnings,
      render: (earnings) => `$${earnings.toLocaleString()}`,

    },
    {
      title: 'Projects Completed',
      dataIndex: 'projects_completed',
      key: 'projectsCompleted',
      sorter: (a, b) => a.projects_completed - b.projects_completed,
     
    },
    {
      title: 'Hourly Rate (USD)',
      dataIndex: 'hourlyrate',
      key: 'hourlyRate',
      sorter: (a, b) => a.hourlyrate - b.hourlyrate,
    },
    {
      title: 'Completion Rate (%)',
      dataIndex: 'completetionRate',
      key: 'completionRate',
      sorter: (a, b) => a.completetionRate - b.completetionRate,
      render:(completetionRate) =>`${completetionRate}%`
    },
  ];

  // const chartData = {
  //   labels: dataSource?.map(f => f.user_name),
  //   datasets: [
  //     {
  //       label: 'Earnings',
  //       data: dataSource?.map(f => f.earnings),
  //       backgroundColor: 'rgba(75,192,192,0.6)',
  //     },
  //     {
  //       label: 'Completion Rate (%)',
  //       data: dataSource?.map(f => f.completionRate),
  //       backgroundColor: 'rgba(153,102,255,0.6)',
  //     },
  //   ],
  // };

  return (
    <div>
      <Card className='custom-card'>
      <h2>Top-Rated Freelancers</h2>
      <Table dataSource={dataSource} columns={columns} rowKey="name" />
      </Card>
      {/* <Bar data={chartData} /> */}
    </div>
  );
};

export default TopRatedFreelancers;
