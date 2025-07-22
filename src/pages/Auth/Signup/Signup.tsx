import SignupForm from './SignupForm'

const SignupPage: React.FC = () => {
  return (
    <div className="relative flex min-h-[calc(100vh-59px)] flex-col items-center justify-center bg-[url('/images/bs2.webp')] bg-cover bg-center bg-no-repeat">
      <div className='overlay absolute inset-0 z-0 bg-black/20' />
      <SignupForm />
    </div>
  )
}

export default SignupPage
