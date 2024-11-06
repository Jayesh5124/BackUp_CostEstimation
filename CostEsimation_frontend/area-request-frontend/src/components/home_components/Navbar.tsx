
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import BuildIcon from '@mui/icons-material/Build';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import { useAuth } from '../context/AuthContext';
import LoginIcon from '@mui/icons-material/ExitToApp'; // Change to use ExitToApp for Login
import LogoutIcon from '@mui/icons-material/Logout';

// Use Link as the base component for styling compatibility with `to` prop
const NavButton = styled(Link)(({ theme }) => ({
  color: '#fff',
  marginLeft: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  padding: '6px 12px',
  borderRadius: '4px',
  transition: 'background-color 0.3s, transform 0.2s',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    transform: 'scale(1.05)',
  },
}));

const Navbar: React.FC<{ isAuthenticated: boolean }> = () => {
  const { isAuthenticated, logout } = useAuth(); 
  const handleLogout = () => {
    logout(); // Call logout from context
  };
  return (
    <AppBar 
      position="static" 
      style={{ 
        backgroundColor: 'black', 
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
        padding: '0.5rem 1rem',
      }}
    >
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1, fontSize: '1.5rem', fontWeight: 'bold' }}>
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
            Construction Cost Estimator
          </Link>
        </Typography>
        
        <NavButton to="/">
          <HomeIcon style={{ marginRight: '0.5rem' }} /> Home
        </NavButton>
        <NavButton to="/about">
          <InfoIcon style={{ marginRight: '0.5rem' }} /> About
        </NavButton>
        <NavButton to="/services">
          <BuildIcon style={{ marginRight: '0.5rem' }} /> Services
        </NavButton>
        <NavButton to="/contact">
          <ContactMailIcon style={{ marginRight: '0.5rem' }} /> Contact
        </NavButton>

       

{isAuthenticated ? (
          <Button onClick={handleLogout} style={{ color: '#fff', marginLeft: '1rem' }}>
            <LogoutIcon style={{ marginRight: '0.5rem' }} /> Logout
          </Button>
        ) : (
          <NavButton to="/login">
            <LoginIcon style={{ marginRight: '0.5rem' }} /> Login
          </NavButton>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;







// import React from 'react';
// import AppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import { Link } from 'react-router-dom';
// import { styled } from '@mui/material/styles';
// import HomeIcon from '@mui/icons-material/Home';
// import InfoIcon from '@mui/icons-material/Info';
// import BuildIcon from '@mui/icons-material/Build';
// import ContactMailIcon from '@mui/icons-material/ContactMail';
// import { useAuth } from '../context/AuthContext';
// import LoginIcon from '@mui/icons-material/ExitToApp'; // Change to use ExitToApp for Login
// import LogoutIcon from '@mui/icons-material/Logout';

// // Use Link as the base component for styling compatibility with `to` prop
// const NavButton = styled(Link)(({ theme }) => ({
//   color: '#fff',
//   marginLeft: theme.spacing(2),
//   display: 'flex',
//   alignItems: 'center',
//   textDecoration: 'none',
//   padding: '6px 12px',
//   borderRadius: '4px',
//   transition: 'background-color 0.3s, transform 0.2s',
//   '&:hover': {
//     backgroundColor: 'rgba(255, 255, 255, 0.2)',
//     transform: 'scale(1.05)',
//   },
// }));
// const Navbar: React.FC = () => {
//   const { isAuthenticated, logout } = useAuth(); 

//   const handleLogout = () => {
//     logout(); // Call logout from context
//   };

//   return (
//     <AppBar 
//       position="static" 
//       style={{ 
//         backgroundColor: 'black', 
//         boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
//         padding: '0.5rem 1rem',
//       }}
//     >
//       <Toolbar>
//         <Typography variant="h6" style={{ flexGrow: 1, fontSize: '1.5rem', fontWeight: 'bold' }}>
//           <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
//             Construction Cost Estimator
//           </Link>
//         </Typography>
        
//         <NavButton to="/">
//           <HomeIcon style={{ marginRight: '0.5rem' }} /> Home
//         </NavButton>
//         <NavButton to="/about">
//           <InfoIcon style={{ marginRight: '0.5rem' }} /> About
//         </NavButton>
//         <NavButton to="/services">
//           <BuildIcon style={{ marginRight: '0.5rem' }} /> Services
//         </NavButton>
//         <NavButton to="/contact">
//           <ContactMailIcon style={{ marginRight: '0.5rem' }} /> Contact
//         </NavButton>

//         {isAuthenticated ? (
//           <Button onClick={handleLogout} style={{ color: '#fff', marginLeft: '1rem' }}>
//             <LogoutIcon style={{ marginRight: '0.5rem' }} /> Logout
//           </Button>
//         ) : (
//           <NavButton to="/login">
//             <LoginIcon style={{ marginRight: '0.5rem' }} /> Login
//           </NavButton>
//         )}
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default Navbar;
