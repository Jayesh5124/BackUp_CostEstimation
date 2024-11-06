import React from 'react';
import WelcomeSection from './WelcomeSection'; // Import your WelcomeSection
import UserFeedback from './UserFeedback'; // Import your UserFeedback
import ContactUs from './ContactUs'; // Import your ContactUs

const Home: React.FC = () => {
  return (
    <div>
      <WelcomeSection />
      <UserFeedback />
      <ContactUs />
    </div>
  );
};

export default Home;
