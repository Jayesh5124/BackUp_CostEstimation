import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Button, Card, CardContent, Icon, TextField, Pagination, Modal, Paper, Snackbar, Alert, Dialog, DialogTitle, DialogContent, DialogActions, Grid } from '@mui/material';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

interface Report {
  _id: string;
  clientEmail: string;
  constructorEmail: string;
  builtupArea: number;
  totalCost: number;
  resourcesData: any[];
  pdfReport: string;
  createdAt: string;
  mongoId: string;
  __v: number;
  isStarted?: boolean;
}

interface PropertyBidProps {
  onViewDetails: (id: string) => void;
  onEstimate: (id: string) => void;
}

const PropertyBid: React.FC<PropertyBidProps> = ({ onViewDetails, onEstimate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const reportsPerPage = 5;
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [selectedReportId, setSelectedReportId] = useState<string>('');

  useEffect(() => {
    const fetchReports = async () => {
      setIsLoading(true);
      console.log(sessionStorage.getItem('userEmail'));
      
      try {
        const response = await axios.get(`http://localhost:3006/api/reports/client/${sessionStorage.getItem('userEmail')}`);
        setReports(response.data.data);
      } catch (error) {
        console.error('Error fetching reports:', error);
        setReports([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReports();
  }, []);

  const handleSearch = () => {
    setCurrentPage(1);
  };

  const filteredReports = Array.isArray(reports) ? reports.filter((report) => {
    const builtUpAreaMatch = report.builtupArea?.toString().includes(searchTerm);
    const emailMatch = report.clientEmail?.toLowerCase().includes(searchTerm.toLowerCase());
    return emailMatch || builtUpAreaMatch;
  }) : [];

  const startIndex = (currentPage - 1) * reportsPerPage;
  const endIndex = startIndex + reportsPerPage;
  const paginatedReports = filteredReports.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredReports.length / reportsPerPage);

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page > totalPages ? totalPages : page);
  };

  const handleOpenModal = async (reportId: string) => {
    try {
      const response = await axios.get(`http://localhost:3006/api/reports/${reportId}`);
      setSelectedReport(response.data.data);
      setModalOpen(true);
    } catch (error) {
      console.error('Error fetching report details:', error);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedReport(null);
  };

  const handleDownloadPDF = async () => {
    if (selectedReport?.pdfReport) {
      try {
        window.open(selectedReport.pdfReport, '_blank');
      } catch (error) {
        console.error('Error downloading PDF:', error);
      }
    }
  };

  const handleStartBuildingClick = (reportId: string) => {
    setSelectedReportId(reportId);
    setConfirmDialogOpen(true);
  };

  const handleConfirmStartBuilding = async () => {
    setConfirmDialogOpen(false);
    try {
      console.log(selectedReportId);
      
      const response = await axios.get(`http://localhost:3006/api/reports/${selectedReportId}`);
      const reportData = response.data.data;
      const fetchedMongoId = reportData.mongoId;
      

      const response2 = await axios.put(`http://localhost:3003/api/area-requests/${fetchedMongoId}`);
      
      if (response2.data.success) {
        setReports(prevReports => 
          prevReports.map(report => 
            report._id === selectedReportId 
              ? { ...report, isStarted: true }
              : report
          )
        );

        
        
        setSnackbarMessage('Successfully notified constructor!');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        onEstimate(selectedReportId);
      } else {
        setSnackbarMessage('Failed to notify constructor');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      }
    } catch (error) {
      setSnackbarMessage('Error notifying constructor');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ padding: 2, background: 'linear-gradient(to right, #f8f9fa, #e0f7fa)', minHeight: '100vh' }}>
      {/* Page Heading */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          color: '#1976d2',
          textAlign: 'center',
          mb: 3,
          pt: 3,
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
        }}
      >
        Estimated Properties
      </Typography>

      {/* Search Box */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        mb: 4,
        mt: 2
      }}>
        <TextField
          label="Search by Email or Built-Up Area"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            handleSearch();
          }}
          sx={{
            width: '400px',
            '& .MuiOutlinedInput-root': {
              borderRadius: '12px',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.05)',
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
      </Box>

      {/* Add loading state */}
      {isLoading && (
        <Typography variant="h6" sx={{ textAlign: 'center', my: 4 }}>
          Loading reports...
        </Typography>
      )}

      {/* Add empty state */}
      {!isLoading && reports.length === 0 && (
        <Typography variant="h6" sx={{ textAlign: 'center', my: 4 }}>
          No reports available
        </Typography>
      )}

      {/* Report Cards */}
      {paginatedReports.map((report) => (
        <Card
          key={report._id}
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
                Estimated Property Report
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
                    <strong>Client:</strong> {report.clientEmail}
                  </Typography>
                  <Typography sx={{ 
                    color: '#34495e',
                    fontSize: '0.9rem',
                    mb: 0.5
                  }}>
                    <strong>Constructor:</strong> {report.constructorEmail}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} sx={{ pl: 2 }}>
                  <Typography sx={{ 
                    color: '#34495e',
                    fontSize: '0.9rem',
                    mb: 0.5
                  }}>
                    <strong>Built-up Area:</strong> {report.builtupArea} sq ft
                  </Typography>
                  <Typography sx={{ 
                    color: '#34495e',
                    fontSize: '0.9rem',
                    mb: 0.5
                  }}>
                    <strong>Total Cost:</strong> ₹{report.totalCost?.toLocaleString()}
                  </Typography>
                  <Typography sx={{ 
                    color: '#34495e',
                    fontSize: '0.9rem',
                    mb: 0.5
                  }}>
                    <strong>Created:</strong> {new Date(report.createdAt).toLocaleDateString()}
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
              onClick={() => handleOpenModal(report._id)}
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
            >
              View Details
            </Button>
            
            <Button
              variant="contained"
              fullWidth
              onClick={() => handleStartBuildingClick(report._id)}
              disabled={report.isStarted}
              sx={{
                borderRadius: '6px',
                backgroundColor: report.isStarted ? '#9e9e9e' : '#1976d2',
                color: 'white',
                textTransform: 'none',
                py: 1,
                '&:hover': {
                  backgroundColor: report.isStarted ? '#9e9e9e' : '#1565c0',
                },
              }}
            >
              {report.isStarted ? 'Constructor Notified' : 'Start Building'}
            </Button>
          </CardContent>
        </Card>
      ))}

      {/* Pagination */}
      {!isLoading && reports.length > 0 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      )}

      {/* Add Modal */}
      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        aria-labelledby="report-details-modal"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Paper
          sx={{
            width: '80%',
            maxWidth: 800,
            maxHeight: '90vh',
            overflow: 'auto',
            p: 4,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
          }}
        >
          {selectedReport && (
            <>
              <Typography variant="h4" sx={{ mb: 3, color: '#0d47a1' }}>
                Report Details
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Client Information
                </Typography>
                <Typography><strong>Report ID:</strong> {selectedReport._id}</Typography>
                <Typography><strong>Email:</strong> {selectedReport.clientEmail}</Typography>
                <Typography><strong>Estimated By:</strong> {selectedReport.constructorEmail}</Typography>
                <Typography><strong>Built-up Area:</strong> {selectedReport.builtupArea} sq ft</Typography>
                <Typography><strong>Total Cost:</strong> ₹{selectedReport.totalCost?.toLocaleString() || '0'}</Typography>
                <Typography><strong>Created:</strong> {new Date(selectedReport.createdAt).toLocaleString()}</Typography>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Resources
                </Typography>
                {selectedReport?.resourcesData?.map((resource: any, index: number) => (
                  <Paper key={index} sx={{ p: 2, mb: 2, bgcolor: '#f5f5f5' }}>
                    <Typography><strong>Resource Name:</strong> {resource.resource}</Typography>
                    <Typography><strong>Quantity:</strong> {resource.quantity}</Typography>
                    <Typography><strong>Cost:</strong> ₹{resource.amount?.toLocaleString() || '0'}</Typography>
                  </Paper>
                ))}
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                {selectedReport.pdfReport && (
                  <Button
                    variant="contained"
                    startIcon={<FileDownloadIcon />}
                    onClick={() => {
                      // Create a link element and trigger download using base64 PDF data
                      const link = document.createElement('a');
                      link.href = selectedReport.pdfReport;
                      link.download = `report-${selectedReport._id}.pdf`;
                      link.click();
                    }}
                    sx={{
                      bgcolor: '#0288d1',
                      '&:hover': { bgcolor: '#01579b' },
                    }}
                  >
                    Download PDF
                  </Button>
                )}
                <Button
                  variant="outlined"
                  onClick={handleCloseModal}
                  sx={{ ml: 'auto' }}
                >
                  Close
                </Button>
              </Box>
            </>
          )}
        </Paper>
      </Modal>

      <Dialog
        open={confirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}
      >
        <DialogTitle>Confirm Start Building</DialogTitle>
        <DialogContent>
          Are you sure you want to start the building process? This will notify the constructor.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleConfirmStartBuilding} variant="contained" color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default PropertyBid;
