import React from 'react';
import Home from '../components/Home';
import About from '../components/About';
import Team from '../components/Team';
import News from '../components/News';
import Appointment from '../components/Appointment';

const HomePage: React.FC = () => {
  return (
    <>
      <Home />
      <About />
      <Team />
      <News />
      <Appointment />
    </>
  );
};

export default HomePage;
