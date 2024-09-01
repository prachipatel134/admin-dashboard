import React, { useEffect, useState } from 'react';
import { Table, Card } from 'antd';
import { fetchTweetVolume } from '../services/api'; // Import your API functions

const Dashboard = () => {
  const [tweetVolume, setTweetVolume] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const volumeData = await fetchTweetVolume();
        setTweetVolume(volumeData); // Update state with fetched data
      } catch (error) {
        console.error('Error fetching Twitter data', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
    <h1>    Hey</h1>
      {/* Add more cards for other data points */}
    </div>
  );
};

export default Dashboard;
