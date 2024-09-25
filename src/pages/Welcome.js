import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Button, Grid, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import { ref, onValue } from 'firebase/database';
import { database } from '../firebase'; // Adjust the import path as needed
import backgroundImage from '../assets/background.jpg';


const Welcome = () => {
  const [stats, setStats] = useState({
    animalsTracked: 0,
    speciesCovered: 0,
    patrolOfficers: 0
  });

  useEffect(() => {
    const animalsRef = ref(database, 'Animals');
    const patrolOfficersRef = ref(database, 'PatrolOfficers');

    const fetchData = async () => {
      try {
        const animalsSnapshot = await new Promise((resolve, reject) => {
          onValue(animalsRef, resolve, reject);
        });

        const patrolOfficersSnapshot = await new Promise((resolve, reject) => {
          onValue(patrolOfficersRef, resolve, reject);
        });

        const animalsData = animalsSnapshot.val();
        const patrolOfficersData = patrolOfficersSnapshot.val();

        let totalAnimals = 0;
        const species = new Set();

        if (animalsData) {
          Object.keys(animalsData).forEach(speciesKey => {
            species.add(speciesKey);
            const speciesData = animalsData[speciesKey];
            totalAnimals += Object.keys(speciesData).length;
          });
        }

        const patrolOfficersCount = patrolOfficersData ? Object.keys(patrolOfficersData).length : 0;

        setStats({
          animalsTracked: totalAnimals,
          speciesCovered: species.size,
          patrolOfficers: patrolOfficersCount
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ 
      backgroundImage: `url(${backgroundImage})`, 
      backgroundSize: 'cover', 
      backgroundPosition: 'center', 
      height: '100%', 
      color: 'white', 
      textAlign: 'center', 
      padding: '20px',
      overflowY: 'auto'
    }}>
      <Container maxWidth='lg' style={{ height: '100%' }}>
        <Box my={1}>
          <Typography variant="h2" component="h1" gutterBottom style={{ color: 'white' }}>
            Welcome to AI-Powered Animal Tracking System
          </Typography>
          <Typography variant="h5" component="p" gutterBottom style={{ color: 'white' }}>
            Efficient and reliable tracking of wildlife and domestic animals.
          </Typography>
          <Button variant="contained" color="primary" component={Link} to="/real_time" style={{ margin: '20px' }}>
            Start Tracking
          </Button>
          {/* <Button variant="outlined" color="secondary" component={Link} to="/learn_more">
            Learn More
          </Button> */}
        </Box>

        <Box my={4}>
          <Typography variant="h4" component="h2" gutterBottom style={{ color: 'white' }}>
            Statistics
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Paper elevation={3} style={{ padding: '20px', backgroundColor: 'rgba(0,0,0,0.7)' }}>
                <Typography variant="h2" component="p" style={{ color: 'white' }}>
                  {stats.animalsTracked.toLocaleString()}
                </Typography>
                <Typography component="p" style={{ color: 'white' }}>
                  Animals Tracked
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={3} style={{ padding: '20px', backgroundColor: 'rgba(0,0,0,0.7)' }}>
                <Typography variant="h2" component="p" style={{ color: 'white' }}>
                  {stats.speciesCovered.toLocaleString()}
                </Typography>
                <Typography component="p" style={{ color: 'white' }}>
                  Species Covered
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={3} style={{ padding: '20px', backgroundColor: 'rgba(0,0,0,0.7)' }}>
                <Typography variant="h2" component="p" style={{ color: 'white' }}>
                  {stats.patrolOfficers.toLocaleString()}
                </Typography>
                <Typography component="p" style={{ color: 'white' }}>
                  Patrol Officers
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>


        <Box my={4}>
          <Typography variant="h4" component="h2" gutterBottom style={{ color: 'white' }}>
            Success Stories
          </Typography>
          <Box display="flex" justifyContent="center">
            <Paper elevation={3} style={{ padding: '20px', width: '80%', backgroundColor: 'rgba(0,0,0,0.7)' }}>
              <Typography component="p" style={{ color: 'white' }}>
                "Using the Animal Tracking system has revolutionized how we monitor wildlife. The real-time data and analytics have been invaluable."
              </Typography>
              <Typography variant="h6" component="p" style={{ color: 'white' }}>
                - Jane Doe, Wildlife Researcher
              </Typography>
            </Paper>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default Welcome;
