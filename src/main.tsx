// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google'

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import 'sal.js/dist/sal.css';
import './index.css'

import ENV from './utils/environment';
import AppRouter from './Application/router/AppRouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './contexts/AuthContext';

const queryClient = new QueryClient()
createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <GoogleOAuthProvider clientId={ENV.GG_CLIENT_ID}>
        <AppRouter />
      </GoogleOAuthProvider>
    </AuthProvider>
  </QueryClientProvider>
  // </StrictMode>
)
