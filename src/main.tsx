import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import './index.css'

import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
