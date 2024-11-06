import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/routes';
import cors from 'cors';

// Add type declaration
declare global {
  namespace Express {
    interface Request {
      rawBody?: Buffer;
    }
  }
}

const app = express();
const PORT = process.env.PORT || 3002;

// Add JSON parsing middleware
app.use(express.json({
  limit: '10mb'
}));

app.use(express.urlencoded({ 
  extended: true, 
  limit: '10mb'
}));

// Add timeout middleware
app.use((req, res, next) => {
  req.setTimeout(300000); // 5 minutes
  res.setTimeout(300000);
  next();
});

// Update CORS configuration
app.use(cors({
  origin: 'http://localhost:3000', // Your API gateway URL
  credentials: true
}));

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/cost-estimate')
.then(() => {
  console.log('Connected to MongoDB');
})
.catch(err => {
  console.error('MongoDB connection error:', err);
});

app.use('/api/constructors', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
