import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ThankuPageCons: React.FC = () => {
  const navigate = useNavigate();

  const handleExploreMore = () => {
    navigate('/list_property'); // Redirect to home page
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(to right, #f8f9fa, #e0f7fa)',
        textAlign: 'center',
        padding: 3,
      }}
    >
      <Typography
        variant="h3"
        sx={{
          fontWeight: 'bold',
          color: '#0d47a1',
          marginBottom: 3,
          textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
        }}
      >
        Thank You for Partnering with Us!
      </Typography>
      <Typography
        variant="h6"
        sx={{ color: '#555', maxWidth: '600px', lineHeight: 1.6, mb: 4 }}
      >
        <span style={{ fontWeight: 'bold', color: '#0d47a1' }}>
        We’re thrilled to have you on board as a valued construction partner. Whether you're working on a new project or adding another successful build to your portfolio, 
        our team is here to support you every step of the way.
        </span>
        We’re committed to helping you bring each vision to life and reach new milestones. Thank you for choosing us to be a part of your journey, and let’s build something extraordinary together!
      </Typography>
      <Button
        variant="contained"
        onClick={handleExploreMore}
        sx={{
          padding: '10px 20px',
          fontSize: '16px',
          fontWeight: 'bold',
          borderRadius: '8px',
          backgroundColor: '#ff7043', // Coral orange for button
          color: '#fff',
          boxShadow: '0px 6px 16px rgba(255, 112, 67, 0.3)',
          '&:hover': {
            backgroundColor: '#d84315', // Burnt orange on hover
            boxShadow: '0px 8px 20px rgba(255, 112, 67, 0.5)',
          },
        }}
      >
        Estimate More Properties
      </Button>
    </Box>
  );
};

export default ThankuPageCons;
