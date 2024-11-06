import { Box, Typography, TextField, Button, Radio, RadioGroup, FormControlLabel, Link, Snackbar, Alert } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface User {
  email: string;
  name: string;
  password: string;
  userType: string;
  userId: number;
}

// interface LoginFormProps {
//   onLogin: (userType: 'user' | 'constructor') => void;
// }

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState<'user' | 'constructor'>('user');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); // Use the context
  const [openToast, setOpenToast] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await login(email, password, userType);
      setOpenToast(true); // Show success toast
      console.log(response);
      
      // Wait a brief moment before navigation to show the toast
      setTimeout(() => {
        navigate(userType === 'user' ? '/property_details' : '/list_property');
      }, 1500);
    } catch (error) {
      setError('Invalid email or password');
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '73vh', backgroundColor: '#f0f0f0', padding: '2rem' }}>
      <Box sx={{ backgroundColor: '#ffffff', borderRadius: '12px', boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)', padding: '2.5rem', width: '100%', maxWidth: '400px' }}>
        <Typography variant="h4" gutterBottom textAlign="center" fontWeight="bold">
          Login
        </Typography>
        
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

        <RadioGroup value={userType} onChange={(e) => setUserType(e.target.value as 'user' | 'constructor')} sx={{ marginBottom: '1rem' }}>
          <FormControlLabel value="user" control={<Radio />} label="User" />
          <FormControlLabel value="constructor" control={<Radio />} label="Constructor" />
        </RadioGroup>

        <Button onClick={handleLogin} variant="contained" color="primary" fullWidth sx={{ padding: '0.75rem', fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          Login
        </Button>

        <Typography variant="body2" color="textSecondary" align="center">
          Don't have an account? <Link href="/registration">Register</Link>
        </Typography>

        {error && (
          <Typography color="error" textAlign="center" sx={{ marginTop: '1rem' }}>
            {error}
          </Typography>
        )}
      </Box>
      
      <Snackbar
        open={openToast}
        autoHideDuration={1500}
        onClose={() => setOpenToast(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          Login successful! Welcome {userType}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default LoginForm;
