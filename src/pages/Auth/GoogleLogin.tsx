import React from 'react';
import { GoogleCredentialResponse, GoogleLogin } from "@react-oauth/google";
import googleLogo from '@/assets/images/google.png';
import { authApi } from '@/apis/authApi';
// import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface ApiError {
  response?: {
    data?: {
      message?: string;
      errors?: {
        [key in keyof FormData]?: string;
      };
    };
  };
}

export default function GoogleLoginButton() {
  const { login: loginContext } = useAuth();
  const navigate = useNavigate();
  const handleSuccess = async (credentialResponse: GoogleCredentialResponse) => {
    try{
      const data = { id_token: credentialResponse.credential } as { id_token: string };
      
      if (credentialResponse.credential) {
        const res = await authApi.loginWithGoogle(data);
        const accessToken = res?.data?.result?.access_token;

        if ([200,201].includes(res.status)) {
          loginContext(accessToken);
          toast.success("Login with Google", 
            {
              description: res.status === 200 ? "Welcome back!" : "Account created successfully!",
            });
          navigate('/');
        } 
      }
    } catch (err : unknown) {
      const error = err as ApiError;

      const generalMessage = error.response?.data?.message;

      if (generalMessage) {
        toast.error("Login Failed", {
          description: generalMessage,
        });
      }
      // 3. Fallback for any other kind of error (e.g., network failure).
      else {
        toast.error("An Error Occurred", {
          description: "Could not connect to the server. Please try again.",
        });
      }
    }
  }

  return (
    <div className="relative h-[45px] w-full flex">
      <button
        type="button"
        className="flex items-center justify-center gap-3 h-[44px] w-full bg-white text-gray-700 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition-colors px-4 py-2 font-medium"
        onClick={() => {
          const googleLoginButton = document.querySelector('[aria-labelledby="button-label"]');
          if (googleLoginButton) {
            (googleLoginButton as HTMLElement).click();
          }
        }}
      >
        <img src={googleLogo} alt="Google" className="w-5 h-5" />
        <span>Continue with Google</span>
      </button>
      <div className="absolute opacity-0 ml-8">
        <GoogleLogin
          onSuccess={handleSuccess}
          width="600"
          useOneTap
        />
      </div>
    </div>
  )
}
