// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google'

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import './index.css'

import App from './App'
import ENV from './utils/environment';

createRoot(document.getElementById('root')!).render(
<GoogleOAuthProvider clientId={ENV.GG_CLIENT_ID}>
    <App />
  </GoogleOAuthProvider>
)
