// import { Request, Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';

// const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'; // In production, use environment variable

// export interface AuthRequest extends Request {
//   user?: {
//     id: string;
//     [key: string]: any;
//   };
// }

// export const authMiddleware = async (
//   req: AuthRequest,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const token = req.header('Authorization')?.replace('Bearer ', '');

//     if (!token) {
//       return res.status(401).json({ error: 'Please authenticate' });
//     }

//     const decoded = jwt.verify(token, JWT_SECRET) as { id: string, [key: string]: any };
//     req.user = decoded;
//     next();
//   } catch (error) {
//     res.status(401).json({ error: 'Please authenticate' });
//   }
// };
