import {
  Box, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Button, RadioGroup, FormControlLabel, Radio, Snackbar, Alert, Container, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions
} from '@mui/material';
import { useState, useEffect } from 'react';
import CostBreakdownChart from '../user_components/breakDownCharts';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { CurrencyExchange } from '@mui/icons-material';

interface ResourceData {
  resource: string;
  quantity: string;
  amount: number;
  id: number;
}

interface ExcavationData {
  length: number;
  width: number;
  depth: number;
  volumeCubicYards: number;
  cost: number;
}

interface QuantityResponse {
  cementReq: number;
  cementCost: number;
  sandReq: number;
  sandCost: number;
  aggregateReq: number;
  aggregateCost: number;
  steelReq: number;
  steelCost: number;
  paintReq: number;
  bricks: number;
  fittings: number;
  finishers: number;
}

interface SaveReportResponse {
  success: boolean;
  message: string;
}

interface AreaRequestResponse {
  _id: string;  // MongoDB ID
  // ... other fields if needed
}

const CostByResourceAllocation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { 
    estimationResult, 
    total_cost, 
    builtup_area, 
    email, 
    user_email,
    land_clearance_needed,
    mongoId: locationMongoId,
    id
  } = location.state || { 
    estimationResult: 0, 
    total_cost: 0, 
    builtup_area: 0,
    email: '',
    user_email: '',
    land_clearance_needed: false,
    mongoId: '',
    id: ''
  };

  const clientEmail = email || user_email || 'Not provided';

  console.log('MongoDB IDs:', {
    locationMongoId,
    id,
    mongoIdFromState: location.state?.mongoId
  });

  const [resourcesData, setResourcesData] = useState<ResourceData[]>([]);
  const [selectedQuality, setSelectedQuality] = useState<{ [key: number]: string }>({});
  const [costData, setCostData] = useState<{ resource: string; amount: number }[]>([]);
  const [isEstimateCalculated, setIsEstimateCalculated] = useState(false);
  const [hasAttemptedFetch, setHasAttemptedFetch] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [baseResourceData, setBaseResourceData] = useState<ResourceData[]>([]);
  const [excavationData, setExcavationData] = useState<ExcavationData>({
    length: Math.sqrt(builtup_area),
    width: Math.sqrt(builtup_area),
    depth: 3,
    volumeCubicYards: 0,
    cost: 0
  });
  const [mongoId, setMongoId] = useState<string>('');
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error'
  });
  const [currentTotalCost, setCurrentTotalCost] = useState<number>(total_cost);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  useEffect(() => {
    if (total_cost && estimationResult && !hasAttemptedFetch) {
      setHasAttemptedFetch(true);
      fetchQuantities();
      if (land_clearance_needed) {
        calculateExcavation();
      }
    } else if (!total_cost || !estimationResult) {
      setResourcesData([]);
      console.warn('Missing required data:', { total_cost, estimationResult });
    }
  }, [total_cost, estimationResult, hasAttemptedFetch]);

  useEffect(() => {
    const fetchMongoId = async () => {
      try {
        if (locationMongoId) {
          console.log('Using mongoId from location state:', locationMongoId);
          setMongoId(locationMongoId);
          return;
        }

        if (id) {
          console.log('Using id as mongoId:', id);
          setMongoId(id);
          return;
        }

        if (clientEmail && clientEmail !== 'Not provided') {
          console.log('Fetching mongoId by email:', clientEmail);
          const response = await axios.get<AreaRequestResponse>(
            `http://localhost:3003/api/area-requests/by-email/${clientEmail}`
          );
          if (response.data && response.data._id) {
            console.log('Fetched mongoId:', response.data._id);
            setMongoId(response.data._id);
          }
        }
      } catch (error) {
        console.error('Error fetching mongoId:', error);
      }
    };

    fetchMongoId();
  }, [clientEmail, locationMongoId, id]);

  const fetchQuantities = async () => {
    try {
      if (!total_cost || !estimationResult || total_cost <= 0 || estimationResult <= 0) {
        throw new Error('Invalid total_cost or estimationResult');
      }

      const response = await axios.get(
        `http://localhost:3005/api/cost-estimates/quantity-wise/${builtup_area}/${total_cost}`,
        { timeout: 5000 }
      );
      
      console.log(total_cost, estimationResult);
      
      console.log('API Response:', response.data);
      
      if (!response.data) {
        throw new Error('No data received from API');
      }
      
      const data: QuantityResponse = response.data;

      if (data.cementReq === undefined || data.sandReq === undefined || 
          data.aggregateReq === undefined || data.steelReq === undefined || 
          data.paintReq === undefined || data.bricks === undefined) {
        throw new Error('Missing required data fields');
      }

      const newResourcesData: ResourceData[] = [
        { id: 1, resource: 'Cement', quantity: `${data.cementReq.toFixed(2)} bags`, amount: data.cementCost || 0 },
        { id: 2, resource: 'Sand', quantity: `${data.sandReq.toFixed(2)} m³`, amount: data.sandCost || 0 },
        { id: 3, resource: 'Aggregate', quantity: `${data.aggregateReq.toFixed(2)} m³`, amount: data.aggregateCost || 0 },
        { id: 4, resource: 'Steel', quantity: `${data.steelReq.toFixed(2)} kg`, amount: data.steelCost || 0 },
        { id: 5, resource: 'Paint', quantity: `${data.paintReq.toFixed(2)} L`, amount: data.finishers || 0 },
        { id: 6, resource: 'Bricks', quantity: `${data.bricks.toString()} pcs`, amount: data.fittings || 0 },
      ];

      setBaseResourceData(newResourcesData);
      setResourcesData(newResourcesData);
      setCostData(newResourcesData.map(resource => ({
        resource: resource.resource,
        amount: resource.amount
      })));
    } catch (error) {
      console.error('Error fetching quantities:', error);
      if (axios.isAxiosError(error)) {
        if (error.code === 'ECONNABORTED') {
          console.error('Request timed out');
        }
        console.error('Axios error details:', {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status
        });
      }
      setResourcesData([]);
      setCostData([]);
    }
  };

  const calculateExcavation = () => {
    if (!land_clearance_needed) return;

    const volumeCubicFeet = excavationData.length * excavationData.width * excavationData.depth;
    const volumeCubicYards = volumeCubicFeet / 27;
    const costPerCubicYard = 150; // Average cost in rupees
    const totalExcavationCost = volumeCubicYards * costPerCubicYard;

    setExcavationData(prev => ({
      ...prev,
      volumeCubicYards,
      cost: totalExcavationCost
    }));

    // Add excavation to resources
    setResourcesData(prev => [
      ...prev,
      {
        id: prev.length + 1,
        resource: 'Land Excavation',
        quantity: `${volumeCubicYards.toFixed(2)} cubic yards`,
        amount: totalExcavationCost
      }
    ]);
  };

  const handleQualityChange = (resourceId: number, quality: string) => {
    setSelectedQuality(prev => ({
      ...prev,
      [resourceId]: quality,
    }));
  };

  const handleCalculateEstimate = () => {
    try {
      const calculatedCosts = baseResourceData.map((resource) => {
        const baseAmount = resource.amount;
        let adjustment = 0;
        
        switch (selectedQuality[resource.id]) {
          case 'Basic':
            adjustment = -11234;
            break;
          case 'Moderate':
            adjustment = 15677;
            break;
          case 'Premium':
            adjustment = 30289;
            break;
          default:
            adjustment = 0;
        }

        return {
          ...resource,
          amount: Math.max(0, baseAmount + adjustment),
        };
      });
      
      const newTotalCost = calculatedCosts.reduce((sum, resource) => sum + resource.amount, 0);
      setCurrentTotalCost(newTotalCost);
      
      setResourcesData(calculatedCosts);
      setCostData(calculatedCosts.map(resource => ({
        resource: resource.resource,
        amount: resource.amount
      })));
      setIsEstimateCalculated(true);
      setShowReport(true);
    } catch (error) {
      console.error('Error calculating estimate:', error);
    }
  };

  const handleDownloadReport = async () => {
    const reportElement = document.getElementById('report-section');
    const chartElement = document.getElementById('cost-breakdown-chart');
    if (!reportElement || !chartElement) return;

    try {
      const reportCanvas = await html2canvas(reportElement);
      const chartCanvas = await html2canvas(chartElement);
      
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      
      const reportImgData = reportCanvas.toDataURL('image/png');
      const reportHeight = (reportCanvas.height * pageWidth) / reportCanvas.width;
      pdf.addImage(reportImgData, 'PNG', 0, 0, pageWidth, reportHeight);
      
      pdf.addPage();
      const chartImgData = chartCanvas.toDataURL('image/png');
      const chartHeight = (chartCanvas.height * pageWidth) / chartCanvas.width;
      pdf.addImage(chartImgData, 'PNG', 0, 0, pageWidth, chartHeight);
      
      pdf.save('construction-cost-report.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const handleSaveReport = async () => {
    if (!showReport || !isEstimateCalculated) {
      console.warn('No report to save');
      return;
    }

    setIsSaving(true);
    try {
      const constructorEmail = sessionStorage.getItem('userEmail');
      
      if (!constructorEmail) {
        throw new Error('Constructor email not found');
      }

      const currentMongoId = mongoId || locationMongoId || id;
      if (!currentMongoId) {
        throw new Error('MongoDB ID is missing');
      }

      // Generate PDF data
      const reportElement = document.getElementById('report-section');
      const chartElement = document.getElementById('cost-breakdown-chart');
      if (!reportElement || !chartElement) {
        throw new Error('Required elements not found');
      }

      const reportCanvas = await html2canvas(reportElement);
      const chartCanvas = await html2canvas(chartElement);
      
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      
      const reportImgData = reportCanvas.toDataURL('image/png');
      const reportHeight = (reportCanvas.height * pageWidth) / reportCanvas.width;
      pdf.addImage(reportImgData, 'PNG', 0, 0, pageWidth, reportHeight);
      
      pdf.addPage();
      const chartImgData = chartCanvas.toDataURL('image/png');
      const chartHeight = (chartCanvas.height * pageWidth) / chartCanvas.width;
      pdf.addImage(chartImgData, 'PNG', 0, 0, pageWidth, chartHeight);
      
      const pdfData = pdf.output('datauristring');
      console.log("CurrentMongoId",currentMongoId);
      

      const reportData = {
        clientEmail,
        constructorEmail,
        builtupArea: builtup_area,
        totalCost: currentTotalCost,
        resourcesData,
        pdfReport: pdfData,
        createdAt: new Date().toISOString(),
        mongoId: currentMongoId
      };
      
      console.log('Sending report data:', {
        clientEmail,
        constructorEmail,
        mongoId: currentMongoId
      });
      
      const saveReportResponse = await axios.post<SaveReportResponse>(
        'http://localhost:3006/api/reports/save',
        reportData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if(saveReportResponse.data.success){
        setSnackbar({
          open: true,
          message: 'Report saved successfully!',
          severity: 'success'
        });
        setTimeout(() => {
          navigate('/thanku_cons');
        }, 2000);
      }
    } catch (error) {
      console.error('Error in save process:', error);
      setSnackbar({
        open: true,
        message: `Failed to save report: ${error instanceof Error ? error.message : 'Unknown error'}`,
        severity: 'error'
      });
    } finally {
      setIsSaving(false);
    }
  };

  const renderReport = () => {
    if (!showReport || !isEstimateCalculated) return null;

    return (
      <Box id="report-section" sx={{ mt: 4, mb: 4, backgroundColor: '#fff', padding: 3, borderRadius: '8px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
        <Typography variant="h4" sx={{ textAlign: 'center', mb: 3, color: '#0d47a1' }}>
          Construction Cost Report
        </Typography>

        <Typography variant="h6" sx={{ mb: 2 }}>Project Details:</Typography>
        <Box sx={{ mb: 3 }}>
          <Typography>Client Email: {clientEmail}</Typography>
          <Typography>Built-up Area: {builtup_area} sq ft</Typography>
          <Typography>Total Estimated Cost: ₹{currentTotalCost.toLocaleString()}</Typography>
          {land_clearance_needed && (
            <>
              <Typography sx={{ mt: 1, fontWeight: 'bold' }}>Land Excavation Details:</Typography>
              <Typography>Length: {excavationData.length.toFixed(2)} ft</Typography>
              <Typography>Width: {excavationData.width.toFixed(2)} ft</Typography>
              <Typography>Depth: {excavationData.depth} ft</Typography>
              <Typography>Volume: {excavationData.volumeCubicYards.toFixed(2)} cubic yards</Typography>
              <Typography>Excavation Cost: ₹{excavationData.cost.toLocaleString()}</Typography>
            </>
          )}
        </Box>

        <Typography variant="h6" sx={{ mb: 2 }}>Resource Breakdown:</Typography>
        <TableContainer component={Paper} sx={{ mb: 3 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Resource</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Quantity</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Quality</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Amount (₹)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {resourcesData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.resource}</TableCell>
                  <TableCell>{row.quantity}</TableCell>
                  <TableCell>{selectedQuality[row.id] || 'Standard'}</TableCell>
                  <TableCell>{row.amount.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Button
            variant="contained"
            onClick={handleDownloadReport}
            sx={{
              backgroundColor: '#1976d2',
              color: 'white',
              padding: '10px 24px',
              fontSize: '1rem',
              fontWeight: 'bold',
              textTransform: 'none',
              '&:hover': { 
                backgroundColor: '#1565c0',
                transform: 'translateY(-2px)',
                transition: 'all 0.2s ease-in-out'
              },
              boxShadow: '0 3px 5px rgba(0,0,0,0.2)',
              transition: 'all 0.2s ease-in-out'
            }}
          >
            Download Report
          </Button>
        </Box>
      </Box>
    );
  };

  const totalCostDisplay = (
    <Box
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        backgroundColor: '#ffffff',
        padding: 2,
        borderRadius: '8px',
        marginBottom: 3,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 1,
        width: '100%',
        maxWidth: '600px',
        margin: '0 auto'
      }}
    >
      <Typography variant="h6" color="text.secondary">
        Total Estimated Cost
      </Typography>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 'bold',
          color: '#0d47a1',
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}
      >
        <CurrencyExchange sx={{ fontSize: 32 }} />
        ₹{isEstimateCalculated ? currentTotalCost.toLocaleString() : total_cost.toLocaleString()}
      </Typography>
    </Box>
  );

  const tableStyles = {
    maxWidth: '900px',
    margin: '0 auto',
    marginTop: 4,
    '& .MuiTable-root': {
      minWidth: 'unset',
    },
    '& .MuiTableCell-root': {
      padding: '12px 16px',
    }
  };

  const confirmationDialog = (
    <Dialog
      open={openConfirmDialog}
      onClose={() => setOpenConfirmDialog(false)}
    >
      <DialogTitle>Confirm Report Submission</DialogTitle>
      <DialogContent>
        <DialogContentText>
          This report will be sent to the user ({clientEmail}). Are you sure you want to proceed?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenConfirmDialog(false)} color="primary">
          Cancel
        </Button>
        <Button
          onClick={() => {
            setOpenConfirmDialog(false);
            handleSaveReport();
          }}
          color="primary"
          variant="contained"
        >
          Confirm Send
        </Button>
      </DialogActions>
    </Dialog>
  );

  const saveReportButton = (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, mb: 2 }}>
      <Button
        variant="contained"
        onClick={() => setOpenConfirmDialog(true)}
        disabled={!showReport || !isEstimateCalculated || isSaving}
        sx={{
          backgroundColor: '#2e7d32',
          color: 'white',
          padding: '10px 24px',
          fontSize: '1rem',
          fontWeight: 'bold',
          textTransform: 'none',
          '&:hover': { 
            backgroundColor: '#1b5e20',
            transform: 'translateY(-2px)',
            transition: 'all 0.2s ease-in-out'
          },
          '&:disabled': { 
            backgroundColor: '#cccccc',
            color: '#666666' 
          },
          boxShadow: '0 3px 5px rgba(0,0,0,0.2)',
          transition: 'all 0.2s ease-in-out'
        }}
      >
        {isSaving ? 'Sending...' : 'Send Report'}
      </Button>
    </Box>
  );

  if (!total_cost || !estimationResult) {
    return (
      <Box sx={{ padding: 2, textAlign: 'center' }}>
        <Typography color="error">
          Missing required data. Please ensure all values are provided.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      padding: 2, 
      background: 'linear-gradient(to bottom, #f0f0f0, #e0e0e0)',
      minHeight: '100vh'
    }}>
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          sx={{
            fontWeight: 'bold',
            color: '#263238',
            textAlign: 'center',
            marginBottom: 4,
            textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
            fontFamily: 'Arial, sans-serif',
          }}
        >
          Cost By Resource Allocation
        </Typography>

        {totalCostDisplay}
        {saveReportButton}

        <TableContainer component={Paper} sx={tableStyles}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', color: '#ffffff', backgroundColor: '#0d47a1' }}>Resource</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#ffffff', backgroundColor: '#0d47a1' }}>Quantity</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#ffffff', backgroundColor: '#0d47a1', textAlign: 'center' }}>Quality</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#ffffff', backgroundColor: '#0d47a1' }}>Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {resourcesData.map((row) => (
                <TableRow key={row.id} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f5f5f5' } }}>
                  <TableCell component="th" scope="row" sx={{ color: '#45591c', borderBottom: '1px solid #ccc' }}>
                    {row.resource}
                  </TableCell>
                  <TableCell sx={{ color: '#45591c', borderBottom: '1px solid #ccc' }}>{row.quantity}</TableCell>
                  <TableCell sx={{ color: '#45591c', borderBottom: '1px solid #ccc', minWidth: '300px' }}>
                    <RadioGroup
                      value={selectedQuality[row.id] || ''}
                      onChange={(event) => handleQualityChange(row.id, event.target.value)}
                      row
                      sx={{
                        justifyContent: 'space-between',
                        '& .MuiFormControlLabel-root': {
                          margin: '0 8px'
                        }
                      }}
                    >
                      <FormControlLabel value="Basic" control={<Radio />} label="Basic" />
                      <FormControlLabel value="Moderate" control={<Radio />} label="Moderate" />
                      <FormControlLabel value="Premium" control={<Radio />} label="Premium" />
                    </RadioGroup>
                  </TableCell>
                  <TableCell sx={{ color: '#45591c', borderBottom: '1px solid #ccc' }}>
                    ₹{row.amount.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button
            variant="contained"
            onClick={handleCalculateEstimate}
            sx={{
              backgroundColor: '#9c27b0',
              color: 'white',
              padding: '12px 32px',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#7b1fa2',
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 12px rgba(0,0,0,0.3)',
                transition: 'all 0.2s ease-in-out'
              },
              borderRadius: '25px',
              boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
              transition: 'all 0.2s ease-in-out'
            }}
          >
            Calculate Estimate
          </Button>
        </Box>

        {renderReport()}

        {isEstimateCalculated && costData.length > 0 && (
          <Box sx={{ mt: 4 }} id="cost-breakdown-chart">
            <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: 2 }}>
              Cost Breakdown
            </Typography>
            <CostBreakdownChart data={costData} />
          </Box>
        )}

        {confirmationDialog}
      </Container>
    </Box>
  );
};

export default CostByResourceAllocation;