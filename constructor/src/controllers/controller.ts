import { Request, Response } from 'express';
import Constructor from '../models/constructorSchema';
import bcrypt from 'bcryptjs';

const sendResponse = (res: Response, status: number, data: any) => {
  res.status(status).json(data);
};

export const createConstructor = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;

    if (!email?.trim() || !password?.trim() || !name?.trim()) {
      return sendResponse(res, 400, { error: 'name, email and password are required' });
    }

    const existingEmail = await Constructor.findOne({ email });

    if (existingEmail) {
      return sendResponse(res, 400, { error: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await Constructor.create({
      name,
      email,
      password: hashedPassword
    });

    const userWithoutPassword = { ...newUser.toObject(), password: undefined };
    sendResponse(res, 201, userWithoutPassword);
  } catch (error: any) {
    console.error('Error details:', error);
    sendResponse(res, 500, { 
      error: 'Error creating user',
      details: error.message
    });
  }
};

export const allConstructors = async (req: Request, res: Response) => {
  try {
    const constructors = await Constructor.find({});
    
    // Optional: If you want to send a specific count in the response
    const count = constructors.length;

    // Sending constructors and count
    sendResponse(res, 200, { count, constructors });
  } catch (error: any) {
    console.error('Error fetching constructors:', error);
    sendResponse(res, 500, { error: 'Error fetching constructors', details: error.message });
  }
};

// export const loginConstructor = async (req: Request, res: Response) => {
//   try {
//     const { email, password } = req.body;
    
//     const user = await Constructor.findOne({ email });
//     if (!user || !(await bcrypt.compare(password, user.password))) {
//       return sendResponse(res, 401, { error: 'Invalconsid credentials' });
//     }
    
//     const userWithoutPassword = { ...user.toObject(), password: undefined };
//     sendResponse(res, 200, userWithoutPassword);
//   } catch (error) {
//     sendResponse(res, 500, { error: 'Error logging in' });
//   }
// };
export const loginConstructor = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    console.log('Login response:');
    const user = await Constructor.findOne({ email });
    console.log('Login response:', user);

    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log('Login response:', user);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Successful login logic (e.g., generating a token)
    const jwt = require('jsonwebtoken');

// After validating user credentials
const token = jwt.sign({ id: user.email }, '5cc7844fa22abc6d1a5b25a1aa9460e01670918d7638144c483d76b005b18728', { expiresIn: '1h' });

    return res.status(200).json({ message: 'Login successful',token, user });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Error logging in', error });
  }
};

export const getConstructor = async (req: Request, res: Response) => {
  try {
    const user = await Constructor.findOne({ consid: req.params.consid }).select('-password');
    if (!user) return sendResponse(res, 404, { error: 'User not found' });
    sendResponse(res, 200, user);
  } catch (error) {
    sendResponse(res, 500, { error: 'Error fetching user' });
  }
};

export const getListings = async (_req: Request, res: Response) => {
  try {
    const users = await Constructor.find().select('-password');
    sendResponse(res, 200, users);
  } catch (error) {
    sendResponse(res, 500, { error: 'Error fetching listings' });
  }
};

export const getReports = async (_req: Request, res: Response) => {
  try {
    const reports = await Constructor.find().select('estimations');
    sendResponse(res, 200, reports);
  } catch (error) {
    sendResponse(res, 500, { error: 'Error fetching reports' });
  }
};

export const getDashboard = async (req: Request, res: Response) => {
    try {
        // Add your dashboard logic here
        res.status(200).json({ message: "Dashboard data" });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getViewProject = async (req: Request, res: Response) => {
    try {
        const projectconsid = req.params.consid;
        // Add your project view logic here
        res.status(200).json({ message: "Project details retrieved" });
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve project details" });
    }
};
