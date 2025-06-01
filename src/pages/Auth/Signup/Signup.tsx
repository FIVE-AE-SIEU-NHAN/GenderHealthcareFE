import SignupForm from './SignupForm';

const SignupPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-68px)]
                    bg-[url('/images/bs2.webp')] bg-no-repeat bg-center bg-cover relative">
      <div className="overlay absolute inset-0 bg-black/20 z-0" />
      <SignupForm />
    </div>
  );
};

export default SignupPage;
