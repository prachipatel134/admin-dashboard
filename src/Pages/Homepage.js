import React,{useState,useEffect} from 'react'
import {Row,Col} from 'antd';
import FreelancerChart from '../components/FreelancerChart';
import BarChartComponent from '../components/BarChartComponent';
import PieChartComponent from '../components/PieChartComponent';
import KPIComponent from '../components/KPIComponent';
import TopRatedFreelancers from '../components/TopRatedFreelancers';

import MonthlyRevenueChart from '../components/MonthlyRevenueChart';

export default function Homepage() {
    const [pieChartData, setPieChartData] = useState(null);

  useEffect(() => {
    fetch('/data/TopCategoeirs.json') 
      .then((response) => response.json())
      .then((data) => {
        setPieChartData(data);
      })
      .catch((error) => console.error('Error fetching job data:', error));
  }, []);
  return (
    <div>
      <h2>Dashboard</h2>
        <Row gutter={[32,32]}>
            <Col span={24}>
            <KPIComponent />
            </Col>
            <Col span={12}>
           
            <FreelancerChart/>
            </Col>
            <Col span={12} >
           
           <BarChartComponent/>
           </Col>
<Col span={8}>
<PieChartComponent data={pieChartData} />
</Col>
<Col span={16}>
<MonthlyRevenueChart />
</Col>
<Col span={24}>
<TopRatedFreelancers />
</Col>

        </Row>

        
    </div>
  )
}
