// import User, { IUser } from '../models/User';

// export class UserService {
   
//     async getUserById(id: string): Promise<IUser | null> {
//         return await User.findById(id); // Fetch user by ID
//     }
//     async getAllUsers() {
//         return await User.find();
       
//     }
//     // Method to create a user
//     async createUser(userData: { name: string; email: string; password: string; projectId: string }): Promise<IUser> {
//         const user = new User(userData);
//         await user.save();
//         return user;
//     }
//     export const login_user = async (email: string) => {
//         try {
//           // Find the user by email
//           const user = await User.findOne({ email });
//           return user;
//         } catch (error) {
//           console.error('Error finding user:', error);
//           throw new Error('Error finding user');
//         }
//       };

//     // Method to update a user
//     async updateUser(id: string, updateData: { name?: string; email?: string; password?: string; projectId?: string }): Promise<IUser | null> {
//         return await User.findByIdAndUpdate(id, updateData, { new: true });
//     }

//     // Additional methods can be added here, such as finding users by projectId
// }
import User, { IUser } from '../models/User';
import bcrypt from 'bcrypt';

export class UserService {
   async login_user(email: any) {
       
        try {
            const user = await User.findOne({ email });
            return user;
          } catch (error) {
            console.error('Error finding user:', error);
            throw new Error('Error finding user');
          }
    }

    

    // Method to get a user by ID
    async getUserById(id: string): Promise<IUser | null> {
        return await User.findById(id); // Fetch user by ID
    }

    // Method to get all users
    async getAllUsers() {
        return await User.find();
    }

    // Method to create a user
    // async createUser(userData: { name: string; email: string; password: string; projectId: string }): Promise<IUser> {
    //     const user = new User(userData);
    //     await user.save();
    //     return user;
    //  }
    async createUser(userData: { name: string; email: string; password: string; projectId?: string }): Promise<Partial<IUser>> {
  const { name, email, password, projectId } = userData;

  // Check if the email is already registered
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('Email already registered');
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user with hashed password
  const user = new User({
    name,
    email,
    password: hashedPassword,
    projectId
  });
  await user.save();

  // Convert to plain object and omit password
//   const userWithoutPassword = user.toObject();
//   delete userWithoutPassword.password;

 const userWithoutPassword = { ...user.toObject(), password: undefined };
//   const userWithoutPassword = user.toObject() as Omit<IUser, 'password'>;
//   delete userWithoutPassword.password;

  // Cast to Partial<IUser> to avoid Mongoose-specific fields in the return type
  return userWithoutPassword as Partial<IUser>;
}


    // Method to update a user
    async updateUser(id: string, updateData: { name?: string; email?: string; password?: string; projectId?: string }): Promise<IUser | null> {
        return await User.findByIdAndUpdate(id, updateData, { new: true });
    }
}


