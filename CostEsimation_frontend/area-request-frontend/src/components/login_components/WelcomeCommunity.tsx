// // import React from 'react';
// // import { Box, Typography, Button, Grid } from '@mui/material';
// // import { Link } from 'react-router-dom';
// // import communityImage from '../images/community_image.jpg'; // Update the path to your image

// // const WelcomeCommunity: React.FC = () => {
// //   return (
// //     <Box
// //       sx={{
// //         padding: '0',
// //         paddingLeft:'20px',
// //         paddingRight:'20px',

// //         display: 'flex',
// //         alignItems: 'center',
// //         height: '86vh',
// //         backgroundColor: 'gray', // Light gray background color
// //         overflow: 'hidden', // Prevent scrolling
         
// //       }}
// //     >
// //       <Grid container spacing={2}>
// //         <Grid item xs={12} md={6} sx={{ textAlign: 'left' }}>
// //           <Typography variant="h2" gutterBottom>
// //             Welcome to Our Community
// //           </Typography>
// //           <Typography variant="h5" gutterBottom>
// //             Sign up to connect with others and explore exciting features!
// //           </Typography>
// //           <Link to="/registration" style={{ textDecoration: 'none' }}>
// //   <Button variant="contained" color="primary">
// //     Sign Up
// //   </Button>
// // </Link>
// //         </Grid>
// //         <Grid item xs={12} md={6}>
// //           <img src={communityImage} alt="Community" style={{ width: '100%', height: 'auto' }} />
// //         </Grid>
// //       </Grid>
// //     </Box>
// //   );
// // };

// // export default WelcomeCommunity;
// import React from 'react';
// import { Box, Typography, Button, Grid } from '@mui/material';
// import { Link } from 'react-router-dom';
// import communityImage from '../images/community_image.jpg'; // Update the path to your image

// const WelcomeCommunity: React.FC = () => {
//   return (
//     <Box
//       sx={{
//         padding: '0 20px',
//         display: 'flex',
//         alignItems: 'center',
//         height: '86vh',
//         backgroundColor: '#f5f5f5', // Light gray background color
//         overflow: 'hidden', // Prevent scrolling
//       }}
//     >
//       <Grid container spacing={4}>
//         <Grid item xs={12} md={6} sx={{ textAlign: 'left' }}>
//           <Typography variant="h2" gutterBottom sx={{ fontWeight: 'bold', color: '#4A90E2' }}>
//             Welcome to Our Community
//           </Typography>
//           <Typography variant="h5" gutterBottom sx={{ color: '#555', marginBottom: '1rem' }}>
//             Sign up to connect with others and explore exciting features!
//           </Typography>
//           <Link to="/registration" style={{ textDecoration: 'none' }}>
//             <Button variant="contained" color="primary" sx={styles.signupButton}>
//               Sign Up
//             </Button>
//           </Link>
//         </Grid>
//         <Grid item xs={12} md={6}>
//           <Box
//             component="img"
//             src={communityImage}
//             alt="Community"
//             sx={{
//               width: '100%',
//               height: 'auto',
//               borderRadius: '8px', // Rounded corners
//               boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)', // Soft shadow
//             }}
//           />
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// const styles = {
//   signupButton: {
//     backgroundColor: '#4A90E2',
//     '&:hover': {
//       backgroundColor: '#357ABD',
//     },
//     padding: '0.75rem 1.5rem', // Padding for the button
//     fontWeight: 'bold', // Bold font for the button
//   },
// };

// export default WelcomeCommunity;
import React from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import communityImage from '../images/community_image.jpg'; // Update the path to your image

const WelcomeCommunity: React.FC = () => {
  return (
    <Box
      sx={{
        padding: '0 20px',
        display: 'flex',
        alignItems: 'center',
        height: '83vh',
        backgroundColor: '#f5f5f5', // Light gray background color
        overflow: 'hidden', // Prevent scrolling
      }}
    >
      <Grid container spacing={4}>
        <Grid item xs={12} md={6} sx={{ textAlign: 'left' }}>
          <Typography variant="h2" gutterBottom sx={{ fontWeight: 'bold', color: '#4A90E2' }}>
            Welcome to Our Community
          </Typography>
          <Typography variant="h5" gutterBottom sx={{ color: '#555', marginBottom: '1rem' }}>
            Sign up to connect with others and explore exciting features!
          </Typography>
          <Box sx={{ display: 'flex', gap: '1rem' }}> {/* Flex container for buttons */}
            <Link to="/registration" style={{ textDecoration: 'none' }}>
              <Button variant="contained" color="primary" sx={styles.signupButton}>
                Sign Up
              </Button>
            </Link>
            <Link to="/login" style={{ textDecoration: 'none' }}> {/* Add Link to Login */}
              <Button variant="contained" color="primary" sx={styles.signupButton}>
                Login
              </Button>
            </Link>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src={communityImage}
            alt="Community"
            sx={{
              width: '100%',
              height: 'auto',
              borderRadius: '8px', // Rounded corners
              boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)', // Soft shadow
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

const styles = {
  signupButton: {
    backgroundColor: '#4A90E2',
    '&:hover': {
      backgroundColor: '#357ABD',
    },
    padding: '0.75rem 1.5rem', // Padding for the button
    fontWeight: 'bold', // Bold font for the button
  },
  loginButton: {
    borderColor: '#4A90E2', // Match border color with the primary color
    color: '#4A90E2', // Text color for the outlined button
    padding: '0.75rem 1.5rem', // Padding for the button
    fontWeight: 'bold', // Bold font for the button
    '&:hover': {
      borderColor: '#357ABD', // Change border color on hover
      color: '#357ABD', // Change text color on hover
    },
  },
};

export default WelcomeCommunity;
