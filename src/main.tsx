import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import { GoogleOAuthProvider } from '@react-oauth/google'

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import './index.css'

// import App from './App'
// import ENV from './utils/environment';
import { RoleProvider } from './contexts/RoleContext';
import AppRouter from './Application/router/AppRouter';
{/* <GoogleOAuthProvider clientId={ENV.GG_CLIENT_ID}>
    <App />
  </GoogleOAuthProvider> */}
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RoleProvider>
      <AppRouter />
    </RoleProvider>
  </StrictMode>
)
