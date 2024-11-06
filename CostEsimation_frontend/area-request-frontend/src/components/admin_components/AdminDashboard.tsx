import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Grid, Card, CardContent, Typography, Box, List, ListItem } from '@mui/material';
import { People as PeopleIcon, Build as BuildIcon } from '@mui/icons-material';

const AdminDashboard: React.FC = () => {
  const [userCount, setUserCount] = useState<number>(0);
  const [constructorCount, setConstructorCount] = useState<number>(0);

  // Fetch data from the backend
  useEffect(() => {
    // Fetch user count
    axios.get('http://localhost:3001/api/users')
      .then((response) => {
        console.log(response);
        setUserCount(response.data.count);
      })
      .catch((error) => {
        console.error("Error fetching user count:", error);
      });

    // Fetch constructor count
    axios.get('http://localhost:3002/api/constructors/allConstructors')
      .then((response) => {
        setConstructorCount(response.data.count);
      })
      .catch((error) => {
        console.error("Error fetching constructor count:", error);
      });
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Admin Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <PeopleIcon fontSize="large" color="primary" sx={{ mb: 1 }} />
              <Typography variant="h6">Users</Typography>
              <Typography>Total Users: {userCount}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <BuildIcon fontSize="large" color="error" sx={{ mb: 1 }} />
              <Typography variant="h6">Constructors</Typography>
              <Typography>Total Constructors: {constructorCount}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box mt={4}>
        <Card>
          <CardContent>
            <Typography variant="h6">Recent Activity</Typography>
            <List>
              <ListItem>New user registration - John Doe</ListItem>
              <ListItem>Area request submitted - Project A</ListItem>
              <ListItem>Request approved - Project B</ListItem>
              <ListItem>Cost estimation updated - Project C</ListItem>
            </List>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default AdminDashboard;
