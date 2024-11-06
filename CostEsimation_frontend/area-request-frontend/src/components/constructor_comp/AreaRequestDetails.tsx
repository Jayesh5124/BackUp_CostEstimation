import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';// Adjust this path as necessary
import { Container, Paper, Typography, Button } from '@mui/material';
import { Property } from '../types/Property';

// Define styles for the component
const styles = {
    container: {
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f8f9fa 0%, #e0f7fa 100%)',
        padding: '40px 20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    paper: {
        padding: '32px',
        marginTop: '20px',
        borderRadius: '16px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
        maxWidth: '800px',
        width: '100%',
        background: 'rgba(255, 255, 255, 0.95)',
    },
    titleContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px',
        borderBottom: '2px solid #e0e0e0',
        paddingBottom: '16px',
    },
    backButton: {
        backgroundColor: '#1976d2',
        color: 'white',
        '&:hover': {
            backgroundColor: '#1565c0',
        },
    },
    title: {
        marginBottom: '24px',
        fontWeight: 'bold',
        color: '#1a237e',
        borderBottom: '2px solid #e0e0e0',
        paddingBottom: '16px',
    },
    detailText: {
        marginBottom: '16px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
    },
    label: {
        minWidth: '160px',
        color: '#546e7a',
        fontWeight: 500,
    },
    value: {
        color: '#263238',
        flex: 1,
    },
};

const PropertyDetail: React.FC<{ properties: Property[] }> = ({ properties }) => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const property = properties.find(prop => prop._id === id);

    if (!property) {
        return (
            <Container style={styles.container}>
                <Typography variant="h6" color="error">
                    Property not found.
                </Typography>
            </Container>
        );
    }

    // Render the property details
    return (
        <Container style={styles.container}>
            <Paper elevation={3} style={styles.paper}>
                <div style={styles.titleContainer}>
                    <Typography variant="h4" style={{ ...styles.title, marginBottom: 0, borderBottom: 'none' }}>
                        {property.property_name}
                    </Typography>
                    <Button 
                        variant="contained" 
                        style={styles.backButton}
                        onClick={() => navigate('/list_property')}
                    >
                        Back to List
                    </Button>
                </div>
                <Typography variant="body1" style={styles.detailText}>
                    <span style={styles.label}>Owner</span>
                    <span style={styles.value}>{property.user_name}</span>
                </Typography>
                <Typography variant="body1" style={styles.detailText}>
                    <span style={styles.label}>Email</span>
                    <span style={styles.value}>{property.user_email}</span>
                </Typography>
                <Typography variant="body1" style={styles.detailText}>
                    <span style={styles.label}>City</span>
                    <span style={styles.value}>{property.city}</span>
                </Typography>
                <Typography variant="body1" style={styles.detailText}>
                    <span style={styles.label}>State</span>
                    <span style={styles.value}>{property.state}</span>
                </Typography>
                <Typography variant="body1" style={styles.detailText}>
                    <span style={styles.label}>Built-up Area</span>
                    <span style={styles.value}>{property.builtup_area} sq ft</span>
                </Typography>
                <Typography variant="body1" style={styles.detailText}>
                    <span style={styles.label}>Property Type</span>
                    <span style={styles.value}>{property.property_type}</span>
                </Typography>
                <Typography variant="body1" style={styles.detailText}>
                    <span style={styles.label}>Land Clearance</span>
                    <span style={styles.value}>{property.land_clearance_needed ? 'Yes' : 'No'}</span>
                </Typography>
                <Typography variant="body1" style={styles.detailText}>
                    <span style={styles.label}>Floors Needed</span>
                    <span style={styles.value}>{property.floors_needed}</span>
                </Typography>
            </Paper>
        </Container>
    );
};

export default PropertyDetail;
