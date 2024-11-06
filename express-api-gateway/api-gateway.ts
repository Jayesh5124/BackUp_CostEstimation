import express from 'express';
import axios from 'axios';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Example microservice URLs
const SERVICE_A_URL = 'http://localhost:4000';
const SERVICE_B_URL = 'http://localhost:5000';

// Replace the individual GET routes with this more comprehensive approach
app.use('/service-a', async (req, res) => {
  try {
    const fullUrl = `${SERVICE_A_URL}/api/constructors${req.path}${req.url.includes('?') ? req.url.substring(req.url.indexOf('?')) : ''}`;
    console.log(`Forwarding ${req.method} request to:`, fullUrl);
    console.log('Request body:', req.body);
    
    const response = await axios({
      method: req.method,
      url: fullUrl,
      data: req.body,
      headers: {
        ...req.headers,
        host: new URL(SERVICE_A_URL).host
      },
      validateStatus: () => true  // Changed from `false` to a function that returns true
    });
    
    console.log(`Response status: ${response.status}`);
    console.log('Response data:', response.data);
    
    res.status(response.status).json(response.data);
  } catch (error: unknown) {
    console.error('Gateway Error:', error);
    if (axios.isAxiosError(error)) {
      const status = error.response?.status || 500;
      const message = error.response?.data || error.message || 'Internal Server Error';
      res.status(status).json({ error: message });
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
});

app.get('/service-b/*', async (req, res) => {
    try {
      const response = await axios.get(`${SERVICE_B_URL}${req.originalUrl.replace('/service-b', '')}`);
      res.json(response.data);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        res.status(error.response?.status || 500).json(error.response?.data || 'Internal Server Error');
      } else {
        console.error(error);
        res.status(500).json('Internal Server Error');
      }
    }
});
  

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
