import React from 'react';
import { Container, Typography, Box, Button, Grid, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import backgroundImage from '../assets/background.jpg'; // Ensure this file exists
import featureIcon1 from '../assets/feature1.png'; // Ensure this file exists
import featureIcon2 from '../assets/feature2.png'; // Ensure this file exists

const Welcome = () => {
  return (
    <div style={{ 
      backgroundImage: `url(${backgroundImage})`, 
      backgroundSize: 'cover', 
      backgroundPosition: 'center', 
      height: '100vh', 
      color: 'white', 
      textAlign: 'center', 
      padding: '20px'
    }}>
      <Container maxWidth="lg">
        <Box my={4}>
          <Typography variant="h2" component="h1" gutterBottom style={{ color: 'white' }}>
            Welcome to Animal Tracking
          </Typography>
          <Typography variant="h5" component="p" gutterBottom style={{ color: 'white' }}>
            Efficient and reliable tracking of wildlife and domestic animals.
          </Typography>
          <Button variant="contained" color="primary" component={Link} to="/real_time" style={{ margin: '20px' }}>
            Start Tracking
          </Button>
          <Button variant="outlined" color="secondary" component={Link} to="/learn_more">
            Learn More
          </Button>
        </Box>

        <Box my={4}>
          <Typography variant="h4" component="h2" gutterBottom style={{ color: 'white' }}>
            Features
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Paper elevation={3} style={{ padding: '20px', backgroundColor: 'rgba(0,0,0,0.7)' }}>
                <img src={featureIcon1} alt="Feature 1" style={{ width: '50px' }} />
                <Typography variant="h6" component="h3" style={{ color: 'white' }}>
                  Real-time Tracking
                </Typography>
                <Typography component="p" style={{ color: 'white' }}>
                  Monitor animals in real-time with live updates and alerts.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper elevation={3} style={{ padding: '20px', backgroundColor: 'rgba(0,0,0,0.7)' }}>
                <img src={featureIcon2} alt="Feature 2" style={{ width: '50px' }} />
                <Typography variant="h6" component="h3" style={{ color: 'white' }}>
                  Data Analysis
                </Typography>
                <Typography component="p" style={{ color: 'white' }}>
                  Analyze tracking data to gain insights into animal behavior and migration patterns.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>

        <Box my={4}>
          <Typography variant="h4" component="h2" gutterBottom style={{ color: 'white' }}>
            Statistics
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Paper elevation={3} style={{ padding: '20px', backgroundColor: 'rgba(0,0,0,0.7)' }}>
                <Typography variant="h2" component="p" style={{ color: 'white' }}>
                  1,234
                </Typography>
                <Typography component="p" style={{ color: 'white' }}>
                  Animals Tracked
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={3} style={{ padding: '20px', backgroundColor: 'rgba(0,0,0,0.7)' }}>
                <Typography variant="h2" component="p" style={{ color: 'white' }}>
                  567
                </Typography>
                <Typography component="p" style={{ color: 'white' }}>
                  Species Covered
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={3} style={{ padding: '20px', backgroundColor: 'rgba(0,0,0,0.7)' }}>
                <Typography variant="h2" component="p" style={{ color: 'white' }}>
                  89
                </Typography>
                <Typography component="p" style={{ color: 'white' }}>
                  Countries Reached
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
