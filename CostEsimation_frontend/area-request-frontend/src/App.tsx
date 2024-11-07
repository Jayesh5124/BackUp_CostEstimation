// import React, { useState, useEffect } from 'react';
// import Navbar from './components/home_components/Navbar';
// import { Routes, Route } from 'react-router-dom';
// import Home from './components/home_components/Home';
// import WelcomeCommunity from './components/login_components/WelcomeCommunity';
// import LoginForm from './components/login_components/Login';
// import PropertyDetailsForm from './components/user_components/PropertyDetailsForm';
// import PropertyListing from './components/constructor_comp/PropertyCard';
// import CostByResourceAllocation from './components/constructor_comp/costEstimation';
// import axios from 'axios';
// import PropertyDetail from './components/constructor_comp/AreaRequestDetails';
// import { Property } from './components/types/Property';

// import ContactUs from './components/home_components/ContactUs';
// import Services from './components/home_components/Services';
// import AboutUs from './components/home_components/AboutUs';

// import { AuthProvider, useAuth } from './components/context/AuthContext';
// import RegistrationPage from './components/login_components/Resgistration';
// import PrivateRoute from './components/context/privateRount';
// import PropertyBid from './components/user_components/BidProperty';
// import ThankYouPage from './components/user_components/ThankYouPage';
// import ThankuPageCons from './components/constructor_comp/ThankuPageCons';
// import ViewProperty from './components/user_components/viewProperty';
// import AdminDashboard from './components/admin_components/AdminDashboard';
// import startProperty from './components/admin_components/startProperty';

// // import 'bootstrap/dist/css/bootstrap.min.css';

// const App: React.FC = () => {
//   const [properties, setProperties] = useState<Property[]>([]);

//   useEffect(() => {
//     const fetchProperties = async () => {
//       try {
//         const response = await axios.get('http://localhost:3003/api/area-requests');
//         setProperties(response.data);
//       } catch (error) {
//         console.error('Error fetching properties:', error);
//       }
//     };

//     fetchProperties();
//   }, []);

//   const handleStartBuilding = (id: string) => {
//     console.log('Start building for property ID:', id);
//   };

//   return (
//     <AuthProvider> {/* Ensure the AuthProvider wraps the application */}
//       <div style={{ minHeight: '100vh', background: 'linear-gradient(to right, #f8f9fa, #e0f7fa)' }}>
//         <Navbar isAuthenticated={false} />
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/contact" element={<ContactUs />} />
//           <Route path="/services" element={<Services />} />
//           <Route path="/about" element={<AboutUs />} />
//           <Route path="/welcome-community" element={<WelcomeCommunity />} />
//           <Route path="/registration" element={<RegistrationPage />} />
//           <Route path="/login" element={<LoginForm />} />
//           <Route path="/property_details" element={<PrivateRoute><PropertyDetailsForm /></PrivateRoute>} />
//           <Route path="/cost_estimation" element={<PrivateRoute><CostByResourceAllocation /></PrivateRoute>} />
//           <Route path="/list_property" element={<PrivateRoute><PropertyListing properties={properties} onEstimate={handleStartBuilding} /></PrivateRoute>} />
//           <Route path="/area-request-details/:id" element={<PrivateRoute><PropertyDetail properties={properties} /></PrivateRoute>} />
//           <Route path="/bid_property" element={<PrivateRoute>
//             <PropertyBid 
//               onViewDetails={(id) => console.log('View details:', id)}
//               onEstimate={(id) => console.log('Estimate:', id)}
//             />
//           </PrivateRoute>} />
//         <Route path="/thanku_user" element={<PrivateRoute><ThankYouPage /></PrivateRoute>} />
//         <Route path="/thanku_cons" element={<PrivateRoute><ThankuPageCons /></PrivateRoute>} />
//         <Route path="/user_properties" element={<PrivateRoute><ViewProperty /></PrivateRoute>} />
//         <Route path="/admin" element={<AdminDashboard />} /></Routes>
        
//         <Route path="/startProperty" element={<startProperty />} />

//         </Routes>
//       </div>
//     </AuthProvider>
//   );
// };

// export default App;
import React, { useState, useEffect } from 'react';
import Navbar from './components/home_components/Navbar';
import { Routes, Route } from 'react-router-dom';
import Home from './components/home_components/Home';
import WelcomeCommunity from './components/login_components/WelcomeCommunity';
import LoginForm from './components/login_components/Login';
import PropertyDetailsForm from './components/user_components/PropertyDetailsForm';
import PropertyListing from './components/constructor_comp/PropertyCard';
import CostByResourceAllocation from './components/constructor_comp/costEstimation';
import axios from 'axios';
import PropertyDetail from './components/constructor_comp/AreaRequestDetails';
import { Property } from './components/types/Property';

import ContactUs from './components/home_components/ContactUs';
import Services from './components/home_components/Services';
import AboutUs from './components/home_components/AboutUs';

import { AuthProvider, useAuth } from './components/context/AuthContext';
import RegistrationPage from './components/login_components/Resgistration';
 
import PropertyBid from './components/user_components/BidProperty';
import ThankYouPage from './components/user_components/ThankYouPage';
import ThankuPageCons from './components/constructor_comp/ThankuPageCons';
import ViewProperty from './components/user_components/viewProperty';
import AdminDashboard from './components/admin_components/AdminDashboard';
import StartProperty from './components/admin_components/startProperty';
import PrivateRoute from './components/context/privateRount';

const App: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get('http://localhost:3003/api/area-requests');
        setProperties(response.data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };

    fetchProperties();
  }, []);

  const handleStartBuilding = (id: string) => {
    console.log('Start building for property ID:', id);
  };

  return (
    <AuthProvider> {/* Ensure the AuthProvider wraps the application */}
      <div style={{ minHeight: '100vh', background: 'linear-gradient(to right, #f8f9fa, #e0f7fa)' }}>
        <Navbar isAuthenticated={false} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/welcome-community" element={<WelcomeCommunity />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginForm />} />

          {/* Protected Routes */}
          <Route path="/property_details" element={<PrivateRoute><PropertyDetailsForm /></PrivateRoute>} />
          <Route path="/cost_estimation" element={<PrivateRoute><CostByResourceAllocation /></PrivateRoute>} />
          <Route path="/list_property" element={<PrivateRoute><PropertyListing properties={properties} onEstimate={handleStartBuilding} /></PrivateRoute>} />
          <Route path="/area-request-details/:id" element={<PrivateRoute><PropertyDetail properties={properties} /></PrivateRoute>} />
          <Route path="/bid_property" element={<PrivateRoute>
            <PropertyBid 
              onViewDetails={(id) => console.log('View details:', id)}
              onEstimate={(id) => console.log('Estimate:', id)}
            />
          </PrivateRoute>} />
          <Route path="/thanku_user" element={<PrivateRoute><ThankYouPage /></PrivateRoute>} />
          <Route path="/thanku_cons" element={<PrivateRoute><ThankuPageCons /></PrivateRoute>} />
          <Route path="/user_properties" element={<PrivateRoute><ViewProperty /></PrivateRoute>} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/startProperty" element={<StartProperty />} />
        </Routes>
      </div>
    </AuthProvider>
  );
};

export default App;
