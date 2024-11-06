import mongoose from 'mongoose';

const ReportSchema = new mongoose.Schema({
  mongoId: {
    type: String,
    required: true,
    trim: true
  },
  clientEmail: {
    type: String,
    required: true,
    trim: true
  },
  constructorEmail: {
    type: String,
    required: true,
    trim: true
  },
  builtupArea: {
    type: Number,
    required: true
  },
  totalCost: {
    type: Number,
    required: true
  },
  resourcesData: [{
    resource: String,
    quantity: String,
    amount: Number,
    quality: String
  }],
  pdfReport: {
    type: String,  // Store PDF as base64 string
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const Report = mongoose.model('Report', ReportSchema);