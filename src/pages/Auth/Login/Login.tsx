import LoginForm from './LoginForm';

const LoginPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100dvh-96px)]
                    bg-[url('/images/bs2.webp')] bg-no-repeat bg-center bg-cover relative">
      <div className="overlay absolute inset-0 bg-black/20 z-0" />
      <LoginForm />
    </div>
  );
};

export default LoginPage;