// import React from 'react';
// import { Container, Typography, Paper, Grid, Box } from '@mui/material';

// const AboutUs: React.FC = () => {
//   return (
//     <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
//       <Paper elevation={3} sx={{ padding: 3 }}>
//         <Typography variant="h4" component="h1" gutterBottom>
//           About Us
//         </Typography>
//         <Typography variant="body1" paragraph>
//           Welcome to the Construction Cost Estimator, where we connect homeowners with skilled constructors to simplify the construction project planning process.
//         </Typography>
//         <Typography variant="body1" paragraph>
//           Our platform allows users to create detailed cost estimation requests and receive multiple estimates from various construction professionals. We understand that every project is unique, which is why we enable users to specify their requirements and preferences, ensuring they find the perfect match for their needs.
//         </Typography>
//         <Typography variant="body1" paragraph>
//           Our mission is to provide transparency in the construction process and empower homeowners with the information they need to make informed decisions. We strive to build a community of trustworthy constructors and satisfied clients.
//         </Typography>
//         <Typography variant="h5" component="h2" gutterBottom>
//           Why Choose Us?
//         </Typography>
//         <Grid container spacing={2}>
//           <Grid item xs={12} sm={6}>
//             <Box sx={{ mb: 2 }}>
//               <Typography variant="h6" component="h3">
//                 User-Friendly Interface
//               </Typography>
//               <Typography variant="body2" paragraph>
//                 Our platform is designed with the user in mind, making it easy to navigate and submit requests.
//               </Typography>
//             </Box>
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <Box sx={{ mb: 2 }}>
//               <Typography variant="h6" component="h3">
//                 Competitive Estimates
//               </Typography>
//               <Typography variant="body2" paragraph>
//                 Receive multiple cost estimates from various constructors to find the best deal for your project.
//               </Typography>
//             </Box>
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <Box sx={{ mb: 2 }}>
//               <Typography variant="h6" component="h3">
//                 Verified Constructors
//               </Typography>
//               <Typography variant="body2" paragraph>
//                 We ensure that all constructors on our platform are verified, giving you peace of mind when selecting a service provider.
//               </Typography>
//             </Box>
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <Box sx={{ mb: 2 }}>
//               <Typography variant="h6" component="h3">
//                 Transparent Process
//               </Typography>
//               <Typography variant="body2" paragraph>
//                 Our system promotes transparency, enabling you to view detailed cost breakdowns and project timelines.
//               </Typography>
//             </Box>
//           </Grid>
//         </Grid>
//         <Typography variant="body1" paragraph>
//           Thank you for choosing us for your construction needs! We look forward to helping you make your project a success.
//         </Typography>
//       </Paper>
//     </Container>
//   );
// };

// export default AboutUs;
import React from 'react';
import { Container, Typography, Paper, Grid, Box } from '@mui/material';

const AboutUs: React.FC = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper 
        elevation={4} 
        sx={{ 
          padding: 4, 
          backgroundColor: '#ffffff', // Light background color
          borderRadius: 2, 
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)', // Subtle shadow
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          About Us
        </Typography>
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.6 }}>
          Welcome to the Construction Cost Estimator, where we connect homeowners with skilled constructors to simplify the construction project planning process.
        </Typography>
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.6 }}>
          Our platform allows users to create detailed cost estimation requests and receive multiple estimates from various construction professionals. We understand that every project is unique, which is why we enable users to specify their requirements and preferences, ensuring they find the perfect match for their needs.
        </Typography>
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.6 }}>
          Our mission is to provide transparency in the construction process and empower homeowners with the information they need to make informed decisions. We strive to build a community of trustworthy constructors and satisfied clients.
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 3 }}>
          Why Choose Us?
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold' }}>
                User-Friendly Interface
              </Typography>
              <Typography variant="body2" paragraph>
                Our platform is designed with the user in mind, making it easy to navigate and submit requests.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold' }}>
                Competitive Estimates
              </Typography>
              <Typography variant="body2" paragraph>
                Receive multiple cost estimates from various constructors to find the best deal for your project.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold' }}>
                Verified Constructors
              </Typography>
              <Typography variant="body2" paragraph>
                We ensure that all constructors on our platform are verified, giving you peace of mind when selecting a service provider.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold' }}>
                Transparent Process
              </Typography>
              <Typography variant="body2" paragraph>
                Our system promotes transparency, enabling you to view detailed cost breakdowns and project timelines.
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.6 }}>
          Thank you for choosing us for your construction needs! We look forward to helping you make your project a success.
        </Typography>
      </Paper>
    </Container>
  );
};

export default AboutUs;
