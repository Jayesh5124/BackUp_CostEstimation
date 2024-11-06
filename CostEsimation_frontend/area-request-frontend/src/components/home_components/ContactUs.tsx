// import React from 'react';

// const ContactUs: React.FC = () => {
//   return (
//     <section id="contact" style={styles.contactSection}>
//       <h3>Contact Us</h3>
//       <p>Email: support@constructioncost.com</p>
//       <p>Phone: +123 456 7890</p>
//     </section>
//   );
// };

// const styles: { contactSection: React.CSSProperties } = {
//   contactSection: {
//     textAlign: 'center', // Ensure 'center' is interpreted as a valid TextAlign value
//     padding: '2rem 0',
//     backgroundColor: '#f0f0f0'
//   }
// };

// export default ContactUs;


import React from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';

const ContactUs: React.FC = () => {
  return (
    <Box sx={styles.contactSection}>
      <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', color: '#4A90E2' }}>
        Contact Us
      </Typography>
      <Typography variant="body1" sx={{ color: '#555', marginBottom: '1rem' }}>
        We would love to hear from you! Reach out to us using the information below.
      </Typography>
      <Typography variant="body2" sx={{ marginBottom: '1rem' }}>
        Email: <strong>support@constructioncost.com</strong>
      </Typography>
      <Typography variant="body2" sx={{ marginBottom: '1.5rem' }}>
        Phone: <strong>+123 456 7890</strong>
      </Typography>

      {/* Contact Form */}
      <Box component="form" sx={styles.formContainer}>
        <TextField
          label="Your Name"
          variant="outlined"
          fullWidth
          sx={{ marginBottom: '1rem' }}
        />
        <TextField
          label="Your Email"
          variant="outlined"
          fullWidth
          sx={{ marginBottom: '1rem' }}
        />
        <TextField
          label="Your Message"
          variant="outlined"
          multiline
          rows={4}
          fullWidth
          sx={{ marginBottom: '1rem' }}
        />
        <Button variant="contained" sx={styles.submitButton}>
          Send Message
        </Button>
      </Box>
    </Box>
  );
};

const styles = {
  contactSection: {
    textAlign: 'center',
    padding: '2rem 1rem',
    backgroundColor: '#f0f0f0',
    borderRadius: '10px',
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
  },
  formContainer: {
    marginTop: '2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: '400px',
    margin: '0 auto',
  },
  submitButton: {
    backgroundColor: '#4A90E2',
    '&:hover': {
      backgroundColor: '#357ABD',
    },
  },
};

export default ContactUs;
