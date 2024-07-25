import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Container, Typography, Box } from '@mui/material';

const socket = io('http://localhost:5000'); // Adjust the server URL accordingly

const RealTimeTracking = () => {
  const [trackingData, setTrackingData] = useState(null);

  useEffect(() => {
    socket.on('trackingData', (data) => {
      setTrackingData(data);
    });

    return () => {
      socket.off('trackingData');
    };
  }, []);

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4">Real-Time Animal Tracking</Typography>
        {trackingData ? (
          <Box my={2}>
            <Typography variant="h6">Animal ID: {trackingData.id}</Typography>
            <Typography>Latitude: {trackingData.location.lat}</Typography>
            <Typography>Longitude: {trackingData.location.lng}</Typography>
            <Typography>Timestamp: {trackingData.timestamp}</Typography>
          </Box>
        ) : (
          <Typography>Loading tracking data...</Typography>
        )}
      </Box>
    </Container>
  );
};

export default RealTimeTracking;
