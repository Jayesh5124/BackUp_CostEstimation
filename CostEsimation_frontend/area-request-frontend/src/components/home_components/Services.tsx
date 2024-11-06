
import React from 'react';
import { Container, Typography, Grid, Paper } from '@mui/material';

const servicesData = [
  {
    title: 'Cost Estimation',
    description:
      'We provide accurate and detailed cost estimations for construction projects, helping you plan your budget effectively.',
  },
  {
    title: 'Project Management',
    description:
      'Our project management tools help you track your construction progress and communicate effectively with your constructor.',
  },
  {
    title: 'Constructor Matching',
    description:
      'We connect you with verified constructors who match your specific needs and requirements for your construction projects.',
  },
  {
    title: 'Consultation Services',
    description:
      'Get professional advice from our experts to help you make informed decisions throughout your construction journey.',
  },
  {
    title: 'User Support',
    description:
      'Our dedicated support team is here to assist you with any questions or issues you may encounter.',
  },
  {
    title: 'Transparent Pricing',
    description:
      'We ensure transparent pricing with detailed breakdowns to avoid any hidden costs during your project.',
  },
];

const Services: React.FC = () => {
  return (
    <Container
      maxWidth="md"
      sx={{
        mt: 4,
        mb: 4,
        padding: 3,
        borderRadius: 2,
        backgroundColor: 'white', // Optional: Add a background color for the container
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Our Services
      </Typography>
      <Grid container spacing={3}>
        {servicesData.map((service, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Typography variant="h5" component="h2" gutterBottom>
                {service.title}
              </Typography>
              <Typography variant="body2">{service.description}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Services;
