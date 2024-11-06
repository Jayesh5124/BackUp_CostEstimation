import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  Alert,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegistrationPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('user');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();


  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    try {
      const endpoint = userType === 'user' 
        ? 'http://localhost:3001/api/users'
        : 'http://localhost:3002/api/constructors/register';

      const response = await axios.post(endpoint, {
        name,
        email,
        password,
      });

      setSuccess('Registration successful!');
      console.log(response.data);
      navigate('/login');
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Registration failed. Please try again.';
      setError(errorMessage);
      console.error(err);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '86vh',
       background: 'linear-gradient(to right, #f8f9fa, #e0f7fa)',
        padding: '2rem',
      }}
    >
      <Box
        sx={{
          backgroundColor: '#fff',
          borderRadius: '8px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
          padding: '2rem',
          width: '100%',
          maxWidth: '600px',
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', color: '#4A90E2' }}>
          Create Account
        </Typography>

        {error && <Alert severity="error">{error}</Alert>} {/* Error alert */}
        {success && <Alert severity="success">{success}</Alert>} {/* Success alert */}

        <Grid container spacing={2} component="form" onSubmit={handleSubmit}>
          <Grid item xs={12}>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              sx={{ marginBottom: '1rem' }}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              label="Email"
              variant="outlined"
              type="email"
              fullWidth
              sx={{ marginBottom: '1rem' }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              sx={{ marginBottom: '1rem' }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom sx={{ marginTop: '2rem', textAlign: 'center', color: '#4A90E2' }}>
              Select User Type
            </Typography>
            <RadioGroup
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              <FormControlLabel value="user" control={<Radio />} label="User" />
              <FormControlLabel value="constructor" control={<Radio />} label="Constructor" />
            </RadioGroup>
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth sx={styles.registerButton}>
              Register
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

const styles = {
  registerButton: {
    backgroundColor: '#4A90E2',
    '&:hover': {
      backgroundColor: '#357ABD',
    },
    padding: '0.75rem',
    fontWeight: 'bold',
  },
};

export default RegistrationPage;
