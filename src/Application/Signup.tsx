import SignupForm from './SignupForm';

const SignupPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center bg-[url('/images/bs2.webp')] 
                    h-[calc(100dvh-96px)] bg-no-repeat bg-center bg-cover relative">
      <div className="overlay absolute inset-0 bg-black/20"></div>
      <SignupForm />
    </div>
  );
};

export default SignupPage;