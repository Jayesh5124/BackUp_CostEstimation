"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const cost_estimate_routes_1 = __importDefault(require("./routes/cost_estimate-routes"));
// Initialize environment variables
dotenv_1.default.config();
// Initialize express app
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
// Routes
app.use('/api', cost_estimate_routes_1.default);
// Port configuration
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;
// Connect to MongoDB
if (!MONGO_URI) {
    console.error('Error: MONGO_URI is not defined in the environment variables');
    process.exit(1);
}
mongoose_1.default.connect(MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(error => console.error('MongoDB connection error:', error));
// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
