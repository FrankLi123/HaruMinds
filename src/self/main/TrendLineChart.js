import React, { useEffect, useState } from 'react';
import Chart from 'react-google-charts';
import config from '../../config.json';
// import getTrendData from '../api/test';

const TrendOptions = {
  title: 'Response Yes Count vs. usedDate, int date',
  hAxis: { title: 'Yes Count' },
  vAxis: { title: 'Date' },
  legend: 'none',
  trendlines: { 0: {} },
  lineWidth: 1, // Add this option to set the line width
}


const getTrendData = async (userId) => {
    
    try {
      const url = `${config.apiBaseUrl}/retrieve?userId=${encodeURIComponent(userId)}}`;
      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      };
  
      const response = await fetch(url, requestOptions);
  

      if (response.status !== 200) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      console.log("response is : ", response) 
      
      const response_data = await response.json();
      return response_data

    } catch (error) {
      // Handle errors if needed
      return null
    }
  };


const TrendLineChart = () => {
  const [TrendData, setTrendData] = useState([]);

  const userId = sessionStorage.getItem('user_id');

  useEffect(() => {
    const fetchGraphData = async () => {
      try {
        const response_data = await getTrendData(userId);

        console.log("response_data dates is :", response_data.dates);
        console.log("response_data yesCounts is :", response_data.yesCounts);

        const newTrendData = [['Dates', 'yesCount']];

        for (let i = 0; i < response_data.dates.length; i++) {
          newTrendData.push([response_data.dates[i], response_data.yesCounts[i]]);
        }

        setTrendData(newTrendData);

      } catch (error) {
        console.error(error);
      }
    };

    fetchGraphData();
  }, []);

  return (
    <div>
      {/* <h2>React Trend Line Chart Example</h2> */}
      <Chart
        width={'600px'}
        height={'350px'}
        chartType="ScatterChart"
        loader={<div>Loading Chart</div>}
        data={TrendData}
        options={TrendOptions}
        rootProps={{ 'data-testid': '1' }}
      />
    </div>
  )
}

export default TrendLineChart;