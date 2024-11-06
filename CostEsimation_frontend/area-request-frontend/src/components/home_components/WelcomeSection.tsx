// import React from 'react';
// import { Box, Typography, Button } from '@mui/material';
// import { Link as RouterLink } from 'react-router-dom'; // Import Link from react-router-dom
// import backgroundImage from '../images/welcome_bg.jpg'; // Update the path to your image

// const WelcomeSection: React.FC = () => {
//   return (
//     <Box
//       sx={{
//         position: 'relative',
//         textAlign: 'center',
//         paddingTop: '200px', // Set top padding to 200px
//         paddingBottom: '2rem',
//         backgroundImage: `url(${backgroundImage})`,
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         color: '#fff',
//         height: '400px',
//       }}
//     >
//       {/* Overlay for better text visibility */}
//       <Box
//         sx={{
//           position: 'absolute',
//           top: 0,
//           left: 0,
//           right: 0,
//           bottom: 0,
//           backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay with 50% opacity
//           zIndex: 1,
//         }}
//       />
//       <Typography
//         variant="h2"
//         sx={{
//           position: 'relative',
//           zIndex: 2,
//           marginBottom: '20px', // Space below the title
//         }}
//       >
//         Welcome to our Construction Cost Estimator
//       </Typography>
//       <Typography
//         variant="subtitle1"
//         sx={{
//           position: 'relative',
//           zIndex: 2,
//           marginBottom: '30px', // Space below the subtitle
//         }}
//       >
//         Calculate your project costs accurately
//       </Typography>
//       <RouterLink to="/welcome-community" style={{ textDecoration: 'none' }}>
//         <Button variant="contained" sx={{ marginTop: '1rem', backgroundColor: '#4A90E2', zIndex: 2 }}>
//           Get Started
//         </Button>
//       </RouterLink>
//     </Box>
//   );
// };

// export default WelcomeSection;

import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom'; // Import Link from react-router-dom
import backgroundImage from '../images/welcome_bg.jpg'; // Update the path to your image

const WelcomeSection: React.FC = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        textAlign: 'center',
        paddingTop: '200px', // Set top padding to 200px
        paddingBottom: '2rem',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#fff',
        height: '400px',
        borderRadius: '10px', // Add rounded corners
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.5)', // Soft shadow for depth
      }}
    >
      {/* Overlay for better text visibility */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay with 50% opacity
          zIndex: 1,
          borderRadius: '10px', // Match overlay to the main box
        }}
      />
      <Typography
        variant="h2"
        sx={{
          position: 'relative',
          zIndex: 2,
          marginBottom: '20px', // Space below the title
          fontWeight: 'bold', // Make the title bold
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)', // Text shadow for better visibility
        }}
      >
        Welcome to our Construction Cost Estimator
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{
          position: 'relative',
          zIndex: 2,
          marginBottom: '30px', // Space below the subtitle
          fontStyle: 'italic', // Italicize the subtitle
          textShadow: '1px 1px 3px rgba(0, 0, 0, 0.7)', // Text shadow for better visibility
        }}
      >
        Calculate your project costs accurately
      </Typography>
      <RouterLink to="/welcome-community" style={{ textDecoration: 'none' }}>
        <Button
          variant="contained"
          sx={{
            marginTop: '1rem',
            backgroundColor: '#4A90E2',
            color: '#fff', // Change button text color
            zIndex: 2,
            '&:hover': {
              backgroundColor: '#357ABD', // Darken button on hover
              transform: 'translateY(-2px)', // Lift button on hover
              boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.3)', // Add shadow on hover
            },
            borderRadius: '5px', // Rounded button corners
            padding: '10px 20px', // Add padding to button
          }}
        >
          Get Started
        </Button>
      </RouterLink>
    </Box>
  );
};

export default WelcomeSection;

