import { Request, Response } from 'express';
import { UserService } from '../services/userService'; // Import the user service
// Adjust the path based on your file structure
import User, { IUser } from '../models/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';



const userService = new UserService(); // Instantiate the user service
const sendResponse = (res: Response, status: number, data: any) => {
  res.status(status).json(data);
};
// export const createUser = async (req: Request, res: Response) => {
//     try {
//         const { name, email, password, projectId } = req.body;

//         if (!email?.trim() || !password?.trim() || !name?.trim()) {
//           return sendResponse(res, 400, { error: 'name, email and password are required' });
//         }
    
//         const user = await userService.createUser({ name, email, password, projectId });
//         const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = await User.create({
//       name,
//       email,
//       password: hashedPassword
//     });
//     const userWithoutPassword = { ...newUser.toObject(), password: undefined };
//     sendResponse(res, 201, userWithoutPassword);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Failed to create user' });
//     }
// };


export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    // Validate required fields
    if (!email?.trim() || !password?.trim() || !name?.trim()) {
      return sendResponse(res, 400, { error: 'name, email and password are required' });
    }

    // Call UserService to create the user
    const user = await userService.createUser({ name, email, password });

    // Send response with user details excluding password
    sendResponse(res, 201, user);
  } catch (error: any) {
    if (error.message === 'Email already registered') {
      sendResponse(res, 400, { error: error.message });
    } else {
      console.error('Error creating user:', error);
      sendResponse(res, 500, { error: 'Failed to create user', details: error.message });
    }
  }
};

export const updateUser = async (req: Request, res: Response) => {
    // try {
    //     const { id } = req.params;
    //     const { name, email, password, projectId } = req.body;
    //     const user = await userService.updateUser(id, { name, email, password, projectId });

    //     if (!user) return res.status(404).json({ error: 'User not found' });
    //     res.status(200).json(user);
    // } catch (error) {
    //     console.error(error);
    //     res.status(500).json({ error: 'Failed to update user' });
    // }
};
export const getAllUsers = async(req: Request, res: Response)=>
{
    const users = await userService.getAllUsers();
    res.status(200).json(users);

}

export const getUserById = async (req: Request, res: Response) => {
 
    // try{
    //     const { id } = req.params;
    //     const user = await userService.getUserById(id);
    //     if(!user) return res.status(404).json({ error: 'User not found' });
    //     res.status(200).json(user);
    // }
    // catch(error){
    //     console.error(error);
    //     res.status(500).json({ error: 'Failed to get user' });
    
    try {
        const { id } = req.params;
        const user = await userService.getUserById(id);
        if (user) {
          res.json(user);
        } else {
          res.status(404).json({ message: 'User not found' });
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          res.status(500).json({ error: error.message });
        } else {
          res.status(500).json({ error: 'An unknown error occurred' });
        }
      }
    }
      
// export const loginUser = async (req: Request, res: Response) => {
//   const { email, password } = req.body;

//   try {
//     // Fetch user by email
//     const user = await userService.login_user(email);
//     if (!user) {
//       return res.status(401).json({ message: 'Invalid email or password' });
//     }

//     // Compare the provided password with the stored password
//     // (assuming you haven’t hashed passwords, but it's recommended to do so)
//     if (user.password !== password) {
//       return res.status(401).json({ message: 'Invalid email or password' });
//     }

//     // Login successful, respond with user information (optionally add JWT token)
//     res.json({
//       message: 'Login successful',
//     // Add role information if needed
//     });
//   } catch (error) {
//     console.error('Login error:', error);
//     res.status(500).json({ message: 'Error logging in', error });
//   }
// // }
// export const loginUser = async (req: Request, res: Response) => {
//   const { email, password } = req.body;

//   try {
//     // Fetch user by email
//     const user = await userService.login_user(email);
//     if (!user) {
//       return res.status(401).json({ message: 'Invalid email or password' });
//     }

//     // Compare provided password with stored password
//     if (user.password !== password) {
//       return res.status(401).json({ message: 'Invalid email or password' });
//     }

//     // Login successful
//     return res.json({
//      user_email: user.email,
//      user_name: user.name,
//     });
//   } catch (error) {
//     console.error('Login error:', error);
//     return res.status(500).json({ message: 'Error logging in', error });
//   }
// };
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';


export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
      // Fetch user by email
      const user = await userService.login_user(email);
      if (!user) {
          return res.status(401).json({ message: 'Invalid email or password' });
      }

      // Compare provided password with stored hashed password
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
          return res.status(401).json({ message: 'Invalid email or password' });
      }

      // Generate JWT token
      const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

      // Login successful
      return res.json({
          token,  // Send token to client
          user_email: user.email,
          user_name: user.name,
      });
  } catch (error) {
      console.error('Login error:', error);
      return res.status(500).json({ message: 'Error logging in', error });
  }
};