import React, { useEffect, useState } from 'react';
import { Container, Paper, Typography, Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Property } from '../types/Property'; // Make sure Property type is correct
import axios from 'axios';

const styles = {
    container: {
        minHeight: '100vh',
        background: 'linear-gradient(to right, #f8f9fa, #e0f7fa)',
        padding: '20px',
    },
    paper: {
        padding: '20px',
        marginTop: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    },
    title: {
        marginBottom: '15px',
        fontWeight: 'bold',
        color: '#00796b',
    },
    detailText: {
        marginBottom: '10px',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginBottom: '20px',
    },
    button: {
        backgroundColor: '#00796b',
        color: 'white',
        '&:hover': {
            backgroundColor: '#005a4f',
        },
    },
    searchContainer: {
        marginBottom: '20px',
        display: 'flex',
        justifyContent: 'center', // Center the search input
    },
    searchField: {
        width: '300px',
    },
    searchButtonContainer: {
        display: 'flex',
        justifyContent: 'center', // Center the search button
        marginTop: '20px', // Add some spacing between the input and button
    },
    searchButton: {
        backgroundColor: '#00796b',
        color: 'white',
        '&:hover': {
            backgroundColor: '#005a4f',
        },
        marginTop: '10px',
    },
};

const StartProperty: React.FC = () => {
    const [properties, setProperties] = useState<Property[]>([]); // All properties
    const [searchTerm, setSearchTerm] = useState<string>(''); // Store the search term
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch all properties from the API
        const fetchProperties = async () => {
            try {
                const response = await axios.get('http://localhost:3003/api/area-requests'); // Adjust the API endpoint
                setProperties(response.data);
            } catch (error) {
                console.error("Error fetching properties:", error);
            }
        };

        fetchProperties();
    }, []);

    // Filter properties where isStartBuild is true and match the search term
    const filteredProperties = properties.filter((prop) => {
        const matchesSearchTerm =
            prop.property_name.toLowerCase().includes(searchTerm.toLowerCase()) || // Match property name
            prop.user_email.toLowerCase().includes(searchTerm.toLowerCase()) ||  // Match user email
            prop.city.toLowerCase().includes(searchTerm.toLowerCase()) ||       // Match city
            prop.state.toLowerCase().includes(searchTerm.toLowerCase());        // Match state
        return prop.isStartBuild === true && matchesSearchTerm;
    });

    return (
        <Container style={styles.container}>
            {/* Back to Admin Dashboard Button */}
            <div style={styles.buttonContainer}>
                <Button
                    variant="contained"
                    style={styles.button}
                    onClick={() => navigate('/admin')} // Back to Admin Dashboard
                >
                    Back Admin Dashboard
                </Button>
            </div>

            {/* Search Bar */}
            <div style={styles.searchContainer}>
                <TextField
                    label="Search Properties"
                    variant="outlined"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={styles.searchField}
                    placeholder="Search by name, email, city, or state"
                />
            </div>

            {/* Search Button (placed below the search input field) */}
            <div style={styles.searchButtonContainer}>
                <Button
                    variant="contained"
                    style={styles.searchButton}
                    onClick={() => {} /* You can handle specific search button actions if needed */}
                >
                    Search
                </Button>
            </div>

            {/* Display Properties */}
            {filteredProperties.length > 0 ? (
                filteredProperties.map((property) => (
                    <Paper elevation={3} style={styles.paper} key={property._id}>
                        <Typography variant="h4" style={styles.title}>
                            {property.property_name}
                        </Typography>
                        <Typography variant="body1" style={styles.detailText}>
                            <strong>User Name:</strong> {property.user_name}
                        </Typography>
                        <Typography variant="body1" style={styles.detailText}>
                            <strong>User Email:</strong> {property.user_email}
                        </Typography>
                        <Typography variant="body1" style={styles.detailText}>
                            <strong>City:</strong> {property.city}
                        </Typography>
                        <Typography variant="body1" style={styles.detailText}>
                            <strong>State:</strong> {property.state}
                        </Typography>
                        <Typography variant="body1" style={styles.detailText}>
                            <strong>Built-up Area:</strong> {property.builtup_area} sq ft
                        </Typography>
                        <Typography variant="body1" style={styles.detailText}>
                            <strong>Property Type:</strong> {property.property_type}
                        </Typography>
                        <Typography variant="body1" style={styles.detailText}>
                            <strong>Land Clearance Needed:</strong> {property.land_clearance_needed ? 'Yes' : 'No'}
                        </Typography>
                        <Typography variant="body1" style={styles.detailText}>
                            <strong>Floors Needed:</strong> {property.floors_needed}
                        </Typography>
                    </Paper>
                ))
            ) : (
                <Typography variant="h6" color="error">
                    No properties found that are marked to start building.
                </Typography>
            )}
        </Container>
    );
};

export default StartProperty;
