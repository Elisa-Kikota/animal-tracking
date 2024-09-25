import React, { useRef, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Typography } from '@mui/material';
import ChartJS from './chartConfig';

function PieChart({ data }) {
  const chartRef = useRef(null);

  useEffect(() => {
    // Destroy the previous chart instance when component unmounts or data changes
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [data]);

  const chartData = {
    labels: Object.keys(data),
    datasets: [{
      data: Object.values(data),
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false
  };

  return (
    <>
      <Typography variant="h6">Species Distribution</Typography>
      <Pie ref={chartRef} data={chartData} options={options} />
    </>
  );
}

export default PieChart;