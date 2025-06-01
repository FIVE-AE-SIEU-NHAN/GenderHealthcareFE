import React from 'react';
import Home from './components/Landing';
import About from './components/About';
import News from './components/News';
import Doctors from './components/Doctors';
import FAQSection from './components/FAQ';
import { ScrollToTopButton } from '@/components/ui/button';


const HomePage: React.FC = () => {
  return (
    <>
      <Home />
      <div className="w-full relative">
        <About />
        <svg id="wave" viewBox="0 0 1440 100" xmlns="http://www.w3.org/2000/svg"
          className="absolute -bottom-14 left-0 w-full z-1">
        <path fill="#e4e8ff" 
            d="M0,20L20,21.7C40,23,80,27,120,38.3C160,50,200,70,240,73.3C280,77,320,63,360,50C400,37,440,23,480,23.3C520,23,560,37,600,50C640,63,680,77,720,83.3C760,90,800,90,840,86.7C880,83,920,77,960,71.7C1000,67,1040,63,1080,61.7C1120,60,1160,60,1200,61.7C1240,63,1280,67,1320,58.3C1360,50,1400,30,1440,33.3C1480,37,1520,63,1560,71.7C1600,80,1640,70,1680,55C1720,40,1760,20,1800,21.7C1840,23,1880,47,1920,56.7C1960,67,2000,63,2040,51.7C2080,40,2120,20,2160,10C2200,0,2240,0,2280,6.7C2320,13,2360,27,2400,28.3C2440,30,2480,20,2520,28.3C2560,37,2600,63,2640,61.7C2680,60,2720,30,2760,25C2800,20,2840,40,2860,50L2880,60L2880,100L2860,100C2840,100,2800,100,2760,100C2720,100,2680,100,2640,100C2600,100,2560,100,2520,100C2480,100,2440,100,2400,100C2360,100,2320,100,2280,100C2240,100,2200,100,2160,100C2120,100,2080,100,2040,100C2000,100,1960,100,1920,100C1880,100,1840,100,1800,100C1760,100,1720,100,1680,100C1640,100,1600,100,1560,100C1520,100,1480,100,1440,100C1400,100,1360,100,1320,100C1280,100,1240,100,1200,100C1160,100,1120,100,1080,100C1040,100,1000,100,960,100C920,100,880,100,840,100C800,100,760,100,720,100C680,100,640,100,600,100C560,100,520,100,480,100C440,100,400,100,360,100C320,100,280,100,240,100C200,100,160,100,120,100C80,100,40,100,20,100L0,100Z"></path></svg>
        </div>
      
      <div className="w-full bg-gradient-to-b from-[#e4e8ff] to-[#f0f4ff] relative">
        <Doctors />
        <svg
          className="absolute lg:-bottom-18 md:-bottom-13 sm:-bottom-0 left-0 w-full -z-2"
          viewBox="0 0 1440 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#f0f4ff"
            d="M0,64L60,74.7C120,85,240,107,360,101.3C480,96,600,64,720,64C840,64,960,96,1080,101.3C1200,107,1320,85,1380,74.7L1440,64L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
          />
        </svg>
      </div>
      <FAQSection />
      <div className="relative overflow-hidden">
        {/* Decorative blob background */}
        <div className="absolute top-20 -left-70 w-137 h-144 opacity-12 blur-2xl bg-blue-300 rounded-full -z-10" />
        <div className="absolute -bottom-20 -right-60 w-120 h-140 opacity-12 blur-2xl bg-purple-300 rounded-full -z-10" />
        <News />
      </div>
      <ScrollToTopButton />
    </>
  );
};

export default HomePage;