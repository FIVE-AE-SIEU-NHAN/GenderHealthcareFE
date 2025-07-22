import LoginForm from './LoginForm'

const LoginPage: React.FC = () => {
  return (
    <div className="relative flex min-h-[calc(100dvh-59px)] flex-col items-center justify-center bg-[url('/images/bs2.webp')] bg-cover bg-center bg-no-repeat">
      <div className='overlay absolute inset-0 z-0 bg-black/20' />
      <LoginForm />
    </div>
  )
}

export default LoginPage
