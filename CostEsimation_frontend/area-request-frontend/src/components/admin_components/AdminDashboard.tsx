// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Container, Grid, Card, CardContent, Typography, Box, Button } from '@mui/material';
// import { People as PeopleIcon, Build as BuildIcon, Home as HomeIcon, CheckCircle as CheckCircleIcon } from '@mui/icons-material';
// import { Pie } from 'react-chartjs-2';
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
// import { useNavigate } from 'react-router-dom';

// // Register chart components
// ChartJS.register(ArcElement, Tooltip, Legend);

// const AdminDashboard: React.FC = () => {
//   const [userCount, setUserCount] = useState<number>(0);
//   const [constructorCount, setConstructorCount] = useState<number>(0);
//   const [totalPropertyCount, setTotalPropertyCount] = useState<number>(0);
//   const [startBuildingCount, setStartBuildingCount] = useState<number>(0);

//   const navigate = useNavigate();

//   // Fetch data from the backend
//   useEffect(() => {
//     // Fetch user count
//     axios.get('http://localhost:3001/api/users')
//       .then((response) => {
//         setUserCount(response.data.length);
//       })
//       .catch((error) => {
//         console.error("Error fetching user count:", error);
//       });

//     // Fetch constructor count
//     axios.get('http://localhost:3002/api/constructors/all-reports')
//       .then((response) => {
//         setConstructorCount(response.data.length);
//       })
//       .catch((error) => {
//         console.error("Error fetching constructor count:", error);
//       });

//     // Fetch area request data
//     axios.get('http://localhost:3003/api/area-requests')
//       .then((response) => {
//         const totalProperties = response.data.length;
//         const startBuildingProperties = response.data.filter((request: any) => request.isStartBuild).length;
//         setTotalPropertyCount(totalProperties);
//         setStartBuildingCount(startBuildingProperties);
//       })
//       .catch((error) => {
//         console.error("Error fetching area request data:", error);
//       });
//   }, []);

//   // Pie chart data
//   const pieData = {
//     labels: ['Users', 'Constructors', 'Total Properties', 'Started Properties'],
//     datasets: [
//       {
//         data: [userCount, constructorCount, totalPropertyCount, startBuildingCount],
//         backgroundColor: ['#3f51b5', '#f44336', '#ff9800', '#4caf50'],
//         borderColor: ['#3f51b5', '#f44336', '#ff9800', '#4caf50'],
//         borderWidth: 1,
//       },
//     ],
//   };

//   const pieOptions = {
//     responsive: true,
//     maintainAspectRatio: false, // Allow chart resizing
//     plugins: {
//       legend: {
//         position: 'top' as const, // Explicitly assert the type as 'top' to avoid TypeScript error
//       },
//       tooltip: {
//         enabled: true,
//       },
//     },
//   };

//   return (
//     <Container maxWidth="lg" sx={{ py: 4 }}>
//       <Typography variant="h4" component="h2" gutterBottom>
//         Admin Dashboard
//       </Typography>

//       <Grid container spacing={3}>
//         {/* Users Count */}
//         <Grid item xs={12} md={3}>
//           <Card>
//             <CardContent sx={{ textAlign: 'center' }}>
//               <PeopleIcon fontSize="large" color="primary" sx={{ mb: 1 }} />
//               <Typography variant="h6">Users</Typography>
//               <Typography>Total Users: {userCount}</Typography>
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* Constructors Count */}
//         <Grid item xs={12} md={3}>
//           <Card>
//             <CardContent sx={{ textAlign: 'center' }}>
//               <BuildIcon fontSize="large" color="error" sx={{ mb: 1 }} />
//               <Typography variant="h6">Constructors</Typography>
//               <Typography>Total Constructors: {constructorCount}</Typography>
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* Total Property Listings */}
//         <Grid item xs={12} md={3}>
//           <Card>
//             <CardContent sx={{ textAlign: 'center' }}>
//               <HomeIcon fontSize="large" color="secondary" sx={{ mb: 1 }} />
//               <Typography variant="h6">Total Properties</Typography>
//               <Typography>Total Listings: {totalPropertyCount}</Typography>
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* Start Building Properties */}
//         <Grid item xs={12} md={3}>
//           <Card>
//             <CardContent sx={{ textAlign: 'center' }}>
//               <CheckCircleIcon fontSize="large" color="success" sx={{ mb: 1 }} />
//               <Typography variant="h6">Start Building Properties</Typography>
//               <Typography>Started Properties: {startBuildingCount}</Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>

//       {/* Button to navigate to Start Building Properties */}
//       <Box mt={4} display="flex" justifyContent="flex-end">
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={() => navigate('/startProperty')}
//         >
//           View Started Properties
//         </Button>
//       </Box>

//       {/* Pie Chart Section */}
//       <Box mt={4} sx={{ maxHeight: '400px', overflow: 'hidden' }}> {/* Use hidden overflow here */}
//         <Card sx={{ height: '100%' }}>
//           <CardContent sx={{ height: '100%', display: 'flex', justifyContent: 'center' }}>
//             <Pie data={pieData} options={pieOptions} height={300} width={300} />
//           </CardContent>
//         </Card>
//       </Box>
//     </Container>
//   );
// };

// export default AdminDashboard;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Grid, Card, CardContent, Typography, Box, Button, Modal, Paper } from '@mui/material';
import { People as PeopleIcon, Build as BuildIcon, Home as HomeIcon, CheckCircle as CheckCircleIcon } from '@mui/icons-material';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useNavigate } from 'react-router-dom';

// Register chart components
ChartJS.register(ArcElement, Tooltip, Legend);

const AdminDashboard: React.FC = () => {
  const [userCount, setUserCount] = useState<number>(0);
  const [constructorCount, setConstructorCount] = useState<number>(0);
  const [totalPropertyCount, setTotalPropertyCount] = useState<number>(0);
  const [startBuildingCount, setStartBuildingCount] = useState<number>(0);
  const [users, setUsers] = useState<any[]>([]); // State to store user data
  const [constructors, setConstructors] = useState<any[]>([]); // State to store constructor data
  const [openUserModal, setOpenUserModal] = useState(false); // State for opening user modal
  const [openConstructorModal, setOpenConstructorModal] = useState(false); // State for opening constructor modal
  const [selectedUsers, setSelectedUsers] = useState<any[]>([]); // Store selected users for modal
  const [selectedConstructors, setSelectedConstructors] = useState<any[]>([]); // Store selected constructors for modal

  const navigate = useNavigate();

  // Fetch data from the backend
  useEffect(() => {
    // Fetch user count and data
    axios.get('http://localhost:3001/api/users')
      .then((response) => {
        setUserCount(response.data.length);
        setUsers(response.data); // Set users data
      })
      .catch((error) => {
        console.error("Error fetching user count:", error);
      });

    // Fetch constructor count and data
    axios.get('http://localhost:3002/api/constructors/all-reports')
      .then((response) => {
        setConstructorCount(response.data.length);
        setConstructors(response.data); // Set constructors data
      })
      .catch((error) => {
        console.error("Error fetching constructor count:", error);
      });

    // Fetch area request data
    axios.get('http://localhost:3003/api/area-requests')
      .then((response) => {
        const totalProperties = response.data.length;
        const startBuildingProperties = response.data.filter((request: any) => request.isStartBuild).length;
        setTotalPropertyCount(totalProperties);
        setStartBuildingCount(startBuildingProperties);
      })
      .catch((error) => {
        console.error("Error fetching area request data:", error);
      });
  }, []);

  // Pie chart data
  const pieData = {
    labels: ['Users', 'Constructors', 'Total Properties', 'Started Properties'],
    datasets: [
      {
        data: [userCount, constructorCount, totalPropertyCount, startBuildingCount],
        backgroundColor: ['#3f51b5', '#f44336', '#ff9800', '#4caf50'],
        borderColor: ['#3f51b5', '#f44336', '#ff9800', '#4caf50'],
        borderWidth: 1,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  // Handle opening the user modal
  const handleUserClick = () => {
    setSelectedUsers(users); // Set selected users
    setOpenUserModal(true); // Open the modal
  };

  // Handle opening the constructor modal
  const handleConstructorClick = () => {
    setSelectedConstructors(constructors); // Set selected constructors
    setOpenConstructorModal(true); // Open the modal
  };

  // Close the modal
  const handleCloseUserModal = () => {
    setOpenUserModal(false);
  };

  const handleCloseConstructorModal = () => {
    setOpenConstructorModal(false);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Admin Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* Users Count */}
        <Grid item xs={12} md={3}>
          <Card onClick={handleUserClick}>
            <CardContent sx={{ textAlign: 'center' }}>
              <PeopleIcon fontSize="large" color="primary" sx={{ mb: 1 }} />
              <Typography variant="h6">Users</Typography>
              <Typography>Total Users: {userCount}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Constructors Count */}
        <Grid item xs={12} md={3}>
          <Card onClick={handleConstructorClick}>
            <CardContent sx={{ textAlign: 'center' }}>
              <BuildIcon fontSize="large" color="error" sx={{ mb: 1 }} />
              <Typography variant="h6">Constructors</Typography>
              <Typography>Total Constructors: {constructorCount}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Total Property Listings */}
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <HomeIcon fontSize="large" color="secondary" sx={{ mb: 1 }} />
              <Typography variant="h6">Total Properties</Typography>
              <Typography>Total Listings: {totalPropertyCount}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Start Building Properties */}
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <CheckCircleIcon fontSize="large" color="success" sx={{ mb: 1 }} />
              <Typography variant="h6">Start Building Properties</Typography>
              <Typography>Started Properties: {startBuildingCount}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Button to navigate to Start Building Properties */}
      <Box mt={4} display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/startProperty')}
        >
          View Started Properties
        </Button>
      </Box>

      {/* Pie Chart Section */}
      <Box mt={4} sx={{ maxHeight: '400px', overflow: 'hidden' }}>
        <Card sx={{ height: '100%' }}>
          <CardContent sx={{ height: '100%', display: 'flex', justifyContent: 'center' }}>
            <Pie data={pieData} options={pieOptions} height={300} width={300} />
          </CardContent>
        </Card>
      </Box>

      {/* Modal for Users */}
      <Modal open={openUserModal} onClose={handleCloseUserModal}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <Paper
            sx={{
              width: '80%',
              maxWidth: 800,
              overflowY: 'auto', // Allow scroll when content overflows
              maxHeight: '80vh', // Set a max height for the modal
              margin: 'auto',
              mt: 10,
              p: 3,
              borderRadius: '8px',
              boxShadow: 24,
              backdropFilter: 'blur(8px)', // Background blur effect
              backgroundColor: 'rgba(255, 255, 255, 0.9)', // Slight white background
            }}
          >
            <Typography variant="h5" gutterBottom>User List</Typography>
            <Box sx={{ maxHeight: '60vh', overflowY: 'auto' }}>
              {selectedUsers.map((user, index) => (
                <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography>{user.name}</Typography>
                  <Typography>{user.email}</Typography>
                </Box>
              ))}
            </Box>
            <Button variant="outlined" onClick={handleCloseUserModal} sx={{ mt: 2 }}>
              Close
            </Button>
          </Paper>
        </Box>
      </Modal>

      {/* Modal for Constructors */}
      <Modal open={openConstructorModal} onClose={handleCloseConstructorModal}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <Paper
            sx={{
              width: '80%',
              maxWidth: 800,
              overflowY: 'auto', // Allow scroll when content overflows
              maxHeight: '80vh', // Set a max height for the modal
              margin: 'auto',
              mt: 10,
              p: 3,
              borderRadius: '8px',
              boxShadow: 24,
              backdropFilter: 'blur(8px)', // Background blur effect
              backgroundColor: 'rgba(255, 255, 255, 0.9)', // Slight white background
            }}
          >
            <Typography variant="h5" gutterBottom>Constructor List</Typography>
            <Box sx={{ maxHeight: '60vh', overflowY: 'auto' }}>
              {selectedConstructors.map((constructor, index) => (
                <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography>{constructor.name}</Typography>
                  <Typography>{constructor.email}</Typography>
                </Box>
              ))}
            </Box>
            <Button variant="outlined" onClick={handleCloseConstructorModal} sx={{ mt: 2 }}>
              Close
            </Button>
          </Paper>
        </Box>
      </Modal>
    </Container>
  );
};

export default AdminDashboard;

