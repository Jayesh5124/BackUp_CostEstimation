import React, { useEffect, useState } from 'react';
import { Container, Paper, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Property } from '../types/Property';
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
};

const ViewProperty: React.FC = () => {
    const [properties, setProperties] = useState<Property[]>([]);
    const [userProperties, setUserProperties] = useState<Property[]>([]);
    const userEmail = sessionStorage.getItem('userEmail');
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

    useEffect(() => {
        if (userEmail) {
            // Filter properties by user email
            const filteredProperties = properties.filter(prop => prop.user_email === userEmail); // Adjust this field based on your property structure
            setUserProperties(filteredProperties);
        }
    }, [properties, userEmail]);

    return (
        <Container style={styles.container}>
            <div style={styles.buttonContainer}>
                <Button 
                    variant="contained" 
                    style={styles.button}
                    onClick={() => navigate('/property_details')}
                >
                    Back to Area Form
                </Button>
            </div>
            {userProperties.length > 0 ? (
                userProperties.map(property => (
                    <Paper elevation={3} style={styles.paper} key={property._id}>
                        <Typography variant="h4" style={styles.title}>
                            {property.property_name}
                        </Typography>
                        <Typography variant="body1" style={styles.detailText}><strong>City:</strong> {property.city}</Typography>
                        <Typography variant="body1" style={styles.detailText}><strong>State:</strong> {property.state}</Typography>
                        <Typography variant="body1" style={styles.detailText}><strong>Built-up Area:</strong> {property.builtup_area} sq ft</Typography>
                        <Typography variant="body1" style={styles.detailText}><strong>Property Type:</strong> {property.property_type}</Typography>
                        <Typography variant="body1" style={styles.detailText}><strong>Land Clearance Needed:</strong> {property.land_clearance_needed ? 'Yes' : 'No'}</Typography>
                        <Typography variant="body1" style={styles.detailText}><strong>Floors Needed:</strong> {property.floors_needed}</Typography>
                    </Paper>
                ))
            ) : (
                <Typography variant="h6" color="error">
                    No properties found for your account.
                </Typography>
            )}
        </Container>
    );
};

export default ViewProperty;
