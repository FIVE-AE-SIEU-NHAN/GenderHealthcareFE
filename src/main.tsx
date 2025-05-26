import { createRoot } from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google'

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import './index.css'

const GG_CLIENT_ID = '341901301220-b5u6ijfcfjbrejjjjj3av5ncislncet7.apps.googleusercontent.com'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId={GG_CLIENT_ID}>
    <App />
  </GoogleOAuthProvider>
)
