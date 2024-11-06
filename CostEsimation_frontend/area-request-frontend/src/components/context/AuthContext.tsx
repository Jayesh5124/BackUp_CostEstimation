





// import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
// import axios from 'axios';

// interface AuthContextType {
//   isAuthenticated: boolean;
//   login: (email: string, password: string, userType: 'user' | 'constructor') => Promise<void>;
//   logout: () => void;
//   userType: 'user' | 'constructor' | null; // Track user type
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
//   const [userType, setUserType] = useState<'user' | 'constructor' | null>(null);

//   useEffect(() => {
//     // Check session storage for existing token
//     const token = sessionStorage.getItem('token');
//     if (token) {
//       setIsAuthenticated(true);
//       // Optionally, you can also decode the token to get userType if it's stored in the token
//       // For simplicity, here we're just assuming the userType is stored in your context
//       // If your token contains user type, decode it and set it here
//       // setUserType(decodeToken(token).userType);
//     }
//   }, []);

//  const login = async (email: string, password: string, type: 'user' | 'constructor') => {
//     const endpoint = type === 'user'
//       ? 'http://localhost:3001/api/users/login'
//       : 'http://localhost:3002/api/constructors/login';

//     try {
//       const response = await axios.post(endpoint, { email, password });
//       console.log(response.data);
//       if (response.data.token) {
//         // Store token in session storage and update authentication state
//         sessionStorage.setItem('token', response.data.token); // Change to sessionStorage
//         setIsAuthenticated(true);
//         setUserType(type); // Set user type based on login response
//       } else {
//         throw new Error('Login failed');
//       }
//     } catch (error) {
//       console.error('Login failed:', error);
//       throw error; // Propagate error to handle in the component
//     }
//   };

//   const logout = () => {
//     sessionStorage.removeItem('token'); // Clear token on logout
//     setIsAuthenticated(false);
//     setUserType(null);
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, login, logout, userType }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };








import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string, userType: 'user' | 'constructor') => Promise<void>;
  logout: () => void;
  userType: 'user' | 'constructor' | null; // Track user type
  userEmail: string | null;
  userName: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    // Initialize `isAuthenticated` based on the presence of a token in sessionStorage
    return !!sessionStorage.getItem('token');
  });
  const [userType, setUserType] = useState<'user' | 'constructor' | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    // Check session storage for existing token
    const token = sessionStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      // Optionally, you can also decode the token to get userType if it's stored in the token
      // For simplicity, here we're just assuming the userType is stored in your context
      // If your token contains user type, decode it and set it here
      // setUserType(decodeToken(token).userType);
      setUserEmail(sessionStorage.getItem('userEmail'));
      setUserName(sessionStorage.getItem('userName'));
    }
  }, []);
  const login = async (email: string, password: string, type: 'user' | 'constructor') => {
    const endpoint = type === 'user'
      ? 'http://localhost:3001/api/users/login'
      : 'http://localhost:3002/api/constructors/login';
  
    try {
      const response = await axios.post(endpoint, { email, password });
      console.log(response.data);
  
      if (response.data.token) {
        // Store token and user details in session storage
        if(type==='user'){
          sessionStorage.setItem('token', response.data.token);
        sessionStorage.setItem('userEmail', response.data.user_email);  // Access `user_email` directly
        sessionStorage.setItem('userName', response.data.user_name);    // Access `user_name` directly
  
        // Update state variables
        setIsAuthenticated(true);
        setUserType(type);
        setUserEmail(response.data.user_email);  // Set state for `userEmail`
        setUserName(response.data.user_name);  
        }
        else{
        sessionStorage.setItem('token', response.data.token);
        sessionStorage.setItem('userEmail', response.data.user.email);  // Access `user_email` directly
        sessionStorage.setItem('userName', response.data.user.name);    // Access `user_name` directly
  
        // Update state variables
        setIsAuthenticated(true);
        setUserType(type);
        setUserEmail(response.data.user.email);  // Set state for `userEmail`
        setUserName(response.data.user.name);  
        }  // Set state for `userName`
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error; // Propagate error to handle in the component
    }
  };
  

  const logout = () => {
    sessionStorage.removeItem('token'); // Clear token on logout
    sessionStorage.removeItem('userEmail');
    sessionStorage.removeItem('userName');



    setIsAuthenticated(false);
    setUserType(null);

    setUserEmail(null);
    setUserName(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated,
      login,
      logout,
      userType,
      userEmail,
      userName, }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
