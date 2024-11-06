import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const PropertyDetailsForm: React.FC = () => {
  const location = useLocation();
  const { userEmail, userName } = useAuth();
  const navigate = useNavigate();

  const [city, setCity] = useState('');
  const [stateName, setStateName] = useState('');
  const [builtUpArea, setBuiltUpArea] = useState('');
  const [propertyName, setPropertyName] = useState('');
  const [propertyType, setPropertyType] = useState<string>(''); 
  const [constructionType, setConstructionType] = useState<string>(''); 
  const [floorType, setFloorType] = useState<string>(''); 
  const [flatsPerFloor, setFlatsPerFloor] = useState<number | ''>(''); 
  const [cabinsNeeded, setCabinsNeeded] = useState<number | ''>(''); 
  const [landClearanceNeeded, setLandClearanceNeeded] = useState<string>('No'); 
  const [landClearance, setLandClearance] = useState<number | ''>(''); 
  const [floorsNeeded, setFloorsNeeded] = useState<number | ''>(''); 

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const areaRequest = {
      user_email: userEmail,
      user_name: userName,
      city: city,
      state: stateName,
      builtup_area: Number(builtUpArea),
      property_name: propertyName,
      property_type: propertyType,
      construction_type: constructionType,
      floor_type: floorType,
      flats_per_floor: propertyType === 'Residential' ? Number(flatsPerFloor) : undefined,
      cabins_needed: propertyType === 'Commercial' ? Number(cabinsNeeded) : undefined,
      land_clearance_needed: landClearanceNeeded === 'Yes',
      land_clearance: landClearanceNeeded === 'Yes' ? Number(landClearance) : undefined,
      floors_needed: Number(floorsNeeded),
    };

    console.log(areaRequest);

    try {
      await axios.post('http://localhost:3003/api/area-requests', areaRequest);
      alert('Property details submitted successfully!');
      navigate('/user_properties')
    } catch (error) {
      console.error('Error submitting property details:', error);
      alert('Failed to submit property details. Please try again.');
    }
  };

  const handleViewBids = () => {
    navigate('/bid_property');
  };

  const handleViewProperties = () => {
    navigate('/user_properties');
  };

  return (
    <Box
      sx={{
        padding: 4,
        backgroundColor: '#f7f9fc',
        minHeight: '73vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          padding: 4,
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
          maxWidth: '600px',
          width: '100%',
        }}
      >
       <Grid container spacing={2}>
          <Grid item xs={6}>
            <Button
              variant="contained"
              onClick={handleViewBids}
              fullWidth
              sx={{
                padding: '10px 20px',
                fontSize: '16px',
                fontWeight: 'bold',
                borderRadius: '8px',
                backgroundColor: '#ff7043',
                color: '#fff',
                boxShadow: '0px 6px 16px rgba(255, 112, 67, 0.3)',
                '&:hover': {
                  backgroundColor: '#d84315',
                  boxShadow: '0px 8px 20px rgba(255, 112, 67, 0.5)',
                },
              }}
            >
              View Bids
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              onClick={handleViewProperties}
              fullWidth
              sx={{
                padding: '10px 20px',
                fontSize: '16px',
                fontWeight: 'bold',
                borderRadius: '8px',
                backgroundColor: '#ff7043',
                color: '#fff',
                boxShadow: '0px 6px 16px rgba(255, 112, 67, 0.3)',
                '&:hover': {
                  backgroundColor: '#d84315',
                  boxShadow: '0px 8px 20px rgba(255, 112, 67, 0.5)',
                },
              }}
            >
              View Properties
            </Button>
          </Grid>
        </Grid>

        <Typography variant="h4" gutterBottom textAlign="center" fontWeight="bold" color="#333" sx={{ marginTop: 4 }}>
          Enter Property Details
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* Property Name Input */}
            <Grid item xs={12}>
              <TextField
                label="Property Name"
                variant="outlined"
                fullWidth
                value={propertyName}
                onChange={(e) => setPropertyName(e.target.value)}
                required
                sx={{ marginBottom: 2 }}
              />
            </Grid>

            {/* City Input */}
            <Grid item xs={12} md={6}>
              <TextField
                label="Enter City"
                variant="outlined"
                fullWidth
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
                sx={{ marginBottom: 2 }}
              />
            </Grid>

            {/* State Input */}
            <Grid item xs={12} md={6}>
              <TextField
                label="Enter State"
                variant="outlined"
                fullWidth
                value={stateName}
                onChange={(e) => setStateName(e.target.value)}
                required
                sx={{ marginBottom: 2 }}
              />
            </Grid>

            {/* Built-Up Area Input */}
            <Grid item xs={12} md={6}>
              <TextField
                label="Built-Up Area (sq ft)"
                variant="outlined"
                fullWidth
                value={builtUpArea}
                onChange={(e) => setBuiltUpArea(e.target.value)}
                required
                sx={{ marginBottom: 2 }}
              />
            </Grid>

            {/* Construction Type Selection */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth required sx={{ marginBottom: 2 }}>
                <InputLabel>Construction Type</InputLabel>
                <Select
                  value={constructionType}
                  onChange={(e) => setConstructionType(e.target.value)}
                  label="Construction Type"
                >
                  <MenuItem value="New Foundation">New Foundation</MenuItem>
                  <MenuItem value="Add Construction">Add Construction</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Floor Type Selection */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth required sx={{ marginBottom: 2 }}>
                <InputLabel>Floor Type</InputLabel>
                <Select
                  value={floorType}
                  onChange={(e) => setFloorType(e.target.value)}
                  label="Floor Type"
                >
                  <MenuItem value="Tiles">Tiles</MenuItem>
                  <MenuItem value="Granite">Granite</MenuItem>
                  <MenuItem value="Marble">Marble</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Property Type Selection */}
            <Grid item xs={12}>
              <FormControl fullWidth required sx={{ marginBottom: 2 }}>
                <InputLabel>Property Type</InputLabel>
                <Select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  label="Property Type"
                >
                  <MenuItem value="Residential">Residential Construction</MenuItem>
                  <MenuItem value="Commercial">Commercial Construction</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Floors Needed Input */}
            <Grid item xs={12}>
              <TextField
                label="Number of Floors Needed"
                variant="outlined"
                fullWidth
                type="number"
                value={floorsNeeded}
                onChange={(e) => setFloorsNeeded(Number(e.target.value))}
                required
                sx={{ marginBottom: 2 }}
              />
            </Grid>

            {/* Conditional Inputs for Residential Construction */}
            {propertyType === 'Residential' && (
              <Grid item xs={12}>
                <TextField
                  label="Flats per Floor"
                  variant="outlined"
                  fullWidth
                  type="number"
                  value={flatsPerFloor}
                  onChange={(e) => setFlatsPerFloor(Number(e.target.value))}
                  required
                  sx={{ marginBottom: 2 }}
                />
              </Grid>
            )}

            {/* Conditional Inputs for Commercial Construction */}
            {propertyType === 'Commercial' && (
              <Grid item xs={12}>
                <TextField
                  label="Cabins per Floor"
                  variant="outlined"
                  fullWidth
                  type="number"
                  value={cabinsNeeded}
                  onChange={(e) => setCabinsNeeded(Number(e.target.value))}
                  required
                  sx={{ marginBottom: 2 }}
                />
              </Grid>
            )}

            {/* Land Clearance Needed Input */}
            <Grid item xs={12}>
              <FormControl fullWidth required sx={{ marginBottom: 2 }}>
                <InputLabel>Is Land Clearance Needed?</InputLabel>
                <Select
                  value={landClearanceNeeded}
                  onChange={(e) => setLandClearanceNeeded(e.target.value)}
                  label="Is Land Clearance Needed?"
                >
                  <MenuItem value="Yes">Yes</MenuItem>
                  <MenuItem value="No">No</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Land Clearance Amount Input */}
            {landClearanceNeeded === 'Yes' && (
              <Grid item xs={12}>
                <TextField
                  label="Land Clearance Needed (sq ft)"
                  variant="outlined"
                  fullWidth
                  type="number"
                  value={landClearance}
                  onChange={(e) => setLandClearance(Number(e.target.value))}
                  required
                  sx={{ marginBottom: 2 }}
                />
              </Grid>
            )}

            {/* Post Property Button */}
            <Grid item xs={12}>
              <Button 
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                sx={{ fontWeight: 'bold' }}
              >
                Post Property Details
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
};

export default PropertyDetailsForm;

