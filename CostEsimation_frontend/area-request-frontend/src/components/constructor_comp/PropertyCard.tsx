import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Card, CardContent, Icon, TextField, Pagination, Tooltip, Badge, Dialog, DialogTitle, DialogContent, List, ListItem, ListItemText, Grid, Snackbar, Alert } from '@mui/material';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MessageIcon from '@mui/icons-material/Message';

interface Property {
  user_email: string;
  user_name: string;
  city: string;
  state: string;
  builtup_area: number;
  property_name?: string;
  isStartBuild?: boolean;
  _id: string;
}

interface PropertyListingProps {
  properties: Property[];
  onEstimate: (id: string) => void;
}

const PropertyListing: React.FC<PropertyListingProps> = ({ properties, onEstimate }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const propertiesPerPage = 5;
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Property[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [estimatingId, setEstimatingId] = useState('');

  useEffect(() => {
    const checkBuildingRequests = async () => {
      try {
        const constructorEmail = sessionStorage.getItem('userEmail');
        
        // Fetch all reports for the constructor
        const response = await axios.get(`http://localhost:3006/api/reports/email/${constructorEmail}`);
        const reports = response.data.data;
        console.log("reports", reports);
        
        
        // For each report, check if there's a corresponding property with isStartBuild
        for (const report of reports) {
          try {
            const areaRequestResponse = await axios.get(`http://localhost:3003/api/area-requests/${report.mongoId}`);
            console.log("constructor email", constructorEmail);
            console.log("areaRequestResponse", areaRequestResponse.data);
            
            if (areaRequestResponse.data && 
                areaRequestResponse.data.isStartBuild && 
                report.constructorEmail === constructorEmail) {
              // Find matching property from properties array
              const matchingProperty = properties.find(p => p._id === report.mongoId);
              if (matchingProperty) {
                setNotifications(prev => {
                  if (!prev.some(p => p._id === matchingProperty._id)) {
                    return [...prev, matchingProperty];
                  }
                  return prev;
                });
              }
            }
          } catch (error) {
            console.error(`Error checking area request for mongoId ${report.mongoId}:`, error);
          }
        }
      } catch (error) {
        console.error('Error fetching building requests:', error);
      }
    };

    checkBuildingRequests();
  }, [properties]);

  const filteredProperties = properties.filter((property) => {
    // First check if isStartBuild is false (or undefined)
    if (property.isStartBuild) {
      return false;
    }
    
    // Then apply the existing search filters
    const builtUpAreaMatch = property.builtup_area.toString().includes(searchTerm);
    const nameMatch = property.property_name?.toLowerCase().includes(searchTerm.toLowerCase() || '');
    return nameMatch || builtUpAreaMatch;
  });

  const startIndex = (currentPage - 1) * propertiesPerPage;
  const endIndex = startIndex + propertiesPerPage;
  const paginatedProperties = filteredProperties.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page <= totalPages ? page : totalPages);
  };

  const getCityType = (city: string): number => {
    const tier1Cities = [
      'mumbai', 'delhi', 'bangalore', 'chennai', 'kolkata',
      'hyderabad', 'pune', 'ahmedabad', 'bengaluru', 'new delhi',
      'surat', 'lucknow', 'jaipur', 'kanpur', 'nagpur',
      'indore', 'thane', 'bhopal', 'visakhapatnam', 'pimpri-chinchwad',
      'patna', 'vadodara', 'ghaziabad', 'ludhiana', 'coimbatore',
      'agra', 'madurai', 'nashik', 'faridabad', 'meerut',
      'rajkot', 'varanasi', 'srinagar', 'aurangabad', 'dhanbad',
      'amritsar', 'navi mumbai', 'allahabad', 'ranchi', 'howrah',
      'jabalpur', 'gwalior', 'vijayawada', 'jodhpur', 'raipur',
      'kota', 'guwahati', 'chandigarh', 'thiruvananthapuram', 'solapur',
      'hubli-dharwad', 'mysore', 'tiruchirappalli', 'bareilly', 'aligarh',
      'tiruppur', 'gurgaon', 'moradabad', 'jalandhar', 'bhubaneswar',
      'salem', 'warangal', 'guntur', 'bhiwandi', 'saharanpur'
    ];
    return tier1Cities.includes(city.toLowerCase()) ? 2 : 1;
  };

  const handleEstimate = async (property: Property) => {
    try {
      setEstimatingId(property._id);
      setOpenSnackbar(true);

      const type = getCityType(property.city);
      const response = await axios.post(`http://localhost:3005/api/cost-estimates/calculate/${property.builtup_area}/${type}`, {
        builtup_area: property.builtup_area,
        type: type,
        mongoId: property._id
      });
      
      console.log(property._id);
      
      
      navigate('/cost_estimation', {
        state: {
          id: property._id,
          mongoId: property._id,
          user_email: property.user_email,
          email: property.user_email,
          estimationResult: response.data,
          total_cost: response.data,
          builtup_area: property.builtup_area,
        },
      });

      onEstimate(property._id);
    } catch (error) {
      console.error('Error calculating estimation:', error);
    }
  };

  const handleViewDetails = (id: string) => {
    navigate(`/area-request-details/${id}`, {
      state: { id },
    });
  };
  const handleIconClick = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
  return (
    <Box sx={{ padding: 2, background: 'linear-gradient(to right, #f8f9fa, #e0f7fa)', minHeight: '100vh' }}>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="info" sx={{ width: '100%' }}>
          Estimating property for ID: {estimatingId}
        </Alert>
      </Snackbar>

      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        mb: 3,
        gap: 2  // Add spacing between elements
      }}>
        {notifications.length > 0 && (
          <Badge badgeContent={notifications.length} color="error">
            <Tooltip title="Construction Requests">
              <Icon
                sx={{
                  fontSize: 30,
                  color: '#1976d2',
                  cursor: 'pointer',
                }}
                onClick={handleIconClick}
              >
                <MessageIcon fontSize="inherit" />
              </Icon>
            </Tooltip>
          </Badge>
        )}
        
        <TextField
          label="Search by Name or Built-Up Area"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            width: '300px',
            '& .MuiOutlinedInput-root': {
              borderRadius: '20px',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
              backgroundColor: '#fff',
              '& fieldset': { borderColor: '#1976d2' },
              '&:hover fieldset': { borderColor: '#0d47a1' },
              '&.Mui-focused fieldset': { borderColor: '#0d47a1' },
            },
            '& .MuiInputLabel-outlined': {
              color: '#1976d2',
            },
          }}
        />
        
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>

      <Dialog open={isModalOpen} onClose={handleCloseModal} maxWidth="md" fullWidth>
        <DialogTitle sx={{ backgroundColor: '#f5f5f5', fontWeight: 'bold' }}>
          Construction Requests
        </DialogTitle>
        <DialogContent>
          <List>
            {notifications.map((property) => (
              <ListItem 
                key={property._id}
                sx={{
                  mb: 2,
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  '&:hover': { backgroundColor: '#f5f5f5' }
                }}
              >
                <ListItemText
                  primary={
                    <Typography variant="h6" sx={{ color: '#1976d2' }}>
                      {property.property_name || 'Unnamed Property'}
                    </Typography>
                  }
                  secondary={
                    <Box>
                      <Typography variant="body2">Owner: {property.user_name}</Typography>
                      <Typography variant="body2">Location: {property.city}, {property.state}</Typography>
                      <Typography variant="body2">Built-up Area: {property.builtup_area} sq ft</Typography>
                    </Box>
                  }
                />
                <Button 
                  variant="contained"
                  onClick={() => handleViewDetails(property._id)}
                  sx={{ ml: 2 }}
                >
                  View Details
                </Button>
              </ListItem>
            ))}
          </List>
        </DialogContent>
      </Dialog>

      {paginatedProperties.map((property) => (
        <Card
          key={property._id}
          sx={{
            display: 'flex',
            mb: 2,
            p: 2,
            alignItems: 'stretch',
            borderRadius: '12px',
            maxWidth: '1000px',
            margin: '0 auto 16px',
            background: '#ffffff',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
            transition: 'all 0.2s ease',
            '&:hover': {
              transform: 'translateY(-3px)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.12)',
            },
          }}
        >
          <Box sx={{ 
            display: 'flex', 
            width: '70%',
            alignItems: 'center',
            position: 'relative',
            pr: 3,
            '&::after': {
              content: '""',
              position: 'absolute',
              right: 0,
              height: '100%',
              width: '1px',
              background: '#e0e0e0',
            }
          }}>
            <Box sx={{
              backgroundColor: 'rgba(25, 118, 210, 0.1)',
              borderRadius: '8px',
              p: 1,
              mr: 2,
              display: 'flex',
              alignItems: 'center',
            }}>
              <HomeWorkIcon sx={{ 
                fontSize: 40,
                color: '#1976d2'
              }} />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 600,
                  color: '#2c3e50',
                  mb: 1,
                  fontSize: '1.1rem'
                }}
              >
                {property.property_name || 'Unnamed Property'}
              </Typography>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={6} sx={{
                  borderRight: '1px solid #e0e0e0',
                  pr: 2
                }}>
                  <Typography sx={{ 
                    color: '#34495e',
                    fontSize: '0.9rem',
                    mb: 0.5
                  }}>
                    <strong>Owner:</strong> {property.user_name}
                  </Typography>
                  <Typography sx={{ 
                    color: '#34495e',
                    fontSize: '0.9rem',
                    mb: 0.5
                  }}>
                    <strong>Email:</strong> {property.user_email}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} sx={{ pl: 2 }}>
                  <Typography sx={{ 
                    color: '#34495e',
                    fontSize: '0.9rem',
                    mb: 0.5
                  }}>
                    <strong>Location:</strong> {`${property.city}, ${property.state}`}
                  </Typography>
                  <Typography sx={{ 
                    color: '#34495e',
                    fontSize: '0.9rem',
                    mb: 0.5
                  }}>
                    <strong>Built-up Area:</strong> {`${property.builtup_area} sq ft`}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Box>

          <CardContent sx={{ 
            width: '30%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2,
            py: 1,
            pl: 3
          }}>
            <Button
              variant="outlined"
              fullWidth
              startIcon={<Icon>visibility</Icon>}
              sx={{
                borderRadius: '6px',
                textTransform: 'none',
                color: '#1976d2',
                borderColor: '#1976d2',
                py: 1,
                '&:hover': {
                  backgroundColor: 'rgba(25, 118, 210, 0.08)',
                  borderColor: '#1976d2',
                },
              }}
              onClick={() => handleViewDetails(property._id)}
            >
              View Details
            </Button>
            
            <Button
              variant="contained"
              fullWidth
              sx={{
                borderRadius: '6px',
                backgroundColor: '#1976d2',
                color: 'white',
                textTransform: 'none',
                py: 1,
                '&:hover': {
                  backgroundColor: '#1565c0',
                },
              }}
              onClick={() => handleEstimate(property)}
            >
              Estimate
            </Button>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default PropertyListing;
