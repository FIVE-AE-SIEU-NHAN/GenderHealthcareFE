import React from 'react';
import Home from '../components/Home';
import About from '../components/About';
// import Team from '../components/Team';
import News from '../components/News';
import { Doctors } from '../components/Doctors';


const HomePage: React.FC = () => {
  return (
    <>
      <Home />
      <About />
      {/* <Team /> */}
      <Doctors />
      <News />
    </>
  );
};

export default HomePage;
