import { useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { differenceInYears } from 'date-fns'
import {
  Mail,
  Phone,
  Cake,
  User as UserIcon,
  PencilLine,
  CheckCircle,
  Mars,
  Venus,
  Calendar,
  KeyRound,
  LogOut,
  CalendarRange,
  Loader2,
  VenusAndMars
} from 'lucide-react'
import Google from '@/assets/images/google.png'

import { useProfile } from '@/hooks/customer/useProfile'
import { ChangePasswordForm } from './ChangePasswordForm'
import { formatDate } from '@/utils/formatDate'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { EditProfileForm } from './EditProfileForm'
import { useOutletContext } from 'react-router-dom'
import { DashboardLayoutContext } from '@/components/layouts/Dashboard/DashboardLayout'

const InfoItem = ({
  icon,
  label,
  value,
  iconColor
}: {
  icon: React.ReactNode
  label: string
  value: string
  iconColor: string
}) => (
  <div className='flex items-center gap-4 rounded-xl bg-gray-400/10 p-4 transition-all duration-300 hover:bg-gray-400/10 hover:shadow-md dark:bg-gray-900/40 dark:hover:bg-gray-900/60'>
    <div className={`flex-shrink-0 text-xl ${iconColor} shadow-current drop-shadow-[0_0_12px_var(--tw-shadow-color)]`}>
      {icon}
    </div>
    <div>
      <p className='text-xs font-medium text-gray-500 dark:text-gray-400'>{label}</p>
      <p className='text-sm font-semibold text-gray-800 dark:text-gray-200'>{value}</p>
    </div>
  </div>
)

function CustomerProfilePage() {
  const { setBreadcrumb } = useOutletContext<DashboardLayoutContext>()

  const [activeView, setActiveView] = useState<'details' | 'password'>('details')

  const { data: user, isLoading, isError, error } = useProfile()

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  // ========== SET BREADCRUMB ==========
  useEffect(() => {
    setBreadcrumb({
      title: 'Your Profile',
      parent: 'Dashboard',
      parentHref: '/user'
    })
  }, [setBreadcrumb])

  if (isLoading) {
    return (
      <div className='flex min-h-[80vh] items-center justify-center'>
        <Loader2 className='text-primary h-12 w-12 animate-spin' />
        <p className='ml-4 text-lg'>Loading Profile...</p>
      </div>
    )
  }

  if (isError) {
    return (
      <div className='flex min-h-[80vh] items-center justify-center text-red-500'>
        <p>Error loading profile: {error.message}</p>
      </div>
    )
  }

  if (!user) {
    return (
      <div className='flex min-h-[80vh] items-center justify-center text-gray-500'>
        <p>User profile not found.</p>
      </div>
    )
  }

  // Get first characters from name
  const getInitials = (name: string) =>
    name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()

  // Styled roles
  const getRoleInfo = (role: number) => {
    if (role === 3)
      return {
        name: 'Customer',
        icon: <UserIcon className='mr-1.5 h-4 w-4' />,
        color: 'border-slate-500/50 bg-slate-500/10 text-slate-700 dark:text-slate-400 dark:bg-slate-700/50'
      }
    return { name: 'User', icon: <UserIcon className='mr-1.5 h-4 w-4' />, color: 'bg-slate-100 text-slate-800' }
  }

  const roleInfo = getRoleInfo(user.role)
  const birthDate = formatDate(user.date_of_birth, 'MMMM d, yyyy')
  const age = birthDate === 'N/A' ? 'N/A' : differenceInYears(new Date(), user.date_of_birth)

  const handlePasswordUpdateSuccess = () => {
    setActiveView('details')
  }

  return (
    <div className='max-h-[calc(84vh)] min-h-[calc(83vh)] overflow-y-auto'>
      <div className='flex translate-y-6 items-center justify-center bg-gray-50 pt-11 pb-5 dark:bg-gray-900'>
        <Card className='w-full max-w-4xl overflow-hidden rounded-2xl border-0 bg-gradient-to-t from-white via-white to-slate-200 shadow-lg'>
          <CardHeader className='gap-0 p-0'>
            <div className='absolute z-2 translate-x-10 -translate-y-16'>
              <Avatar className='border-semi-dark-blue h-30 w-30 border-6 bg-gray-200/70 p-2 shadow-md backdrop-blur-xs'>
                <AvatarImage src={`https://api.dicebear.com/8.x/adventurer/svg?seed=${user.name}`} alt={user.name} />
                <AvatarFallback className='bg-muted text-3xl font-bold'>{getInitials(user.name)}</AvatarFallback>
              </Avatar>
            </div>
            {/* Colored Line */}
            <div className='from-semi-dark-blue h-2 bg-gradient-to-r to-[#4F80E1]'></div>

            {/* EDIT PROFILE */}
            <div className='flex justify-end p-4'>
              <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant='outline'
                    className='rounded-lg bg-white text-sm font-semibold text-gray-800 shadow-sm transition-all duration-300 hover:bg-gray-100 hover:shadow-sm/20 active:scale-95 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
                  >
                    <PencilLine className='mr-2 h-4 w-4' /> Edit Profile
                  </Button>
                </DialogTrigger>
                <DialogContent className='sm:max-w-[480px]'>
                  <DialogHeader>
                    <DialogTitle>Edit Your Profile</DialogTitle>
                    <DialogDescription>
                      Make changes to your profile here. Click save when you're done.
                    </DialogDescription>
                  </DialogHeader>

                  {/* FORM */}
                  <EditProfileForm currentUser={user} onSuccess={() => setIsEditDialogOpen(false)} />
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent className='-mt-5 space-y-6 px-8 pb-8'>
            <div className='space-y-1.5'>
              <h1 className='text-3xl font-bold text-gray-900 dark:text-white'>{user.name}</h1>
              <div className='flex flex-wrap items-center gap-x-4 gap-y-2 text-gray-500 dark:text-gray-400'>
                <Badge className='flex items-center border-blue-300 bg-blue-100 text-[13px] text-blue-800 dark:bg-blue-900/50 dark:text-blue-300'>
                  <Mail className='mr-2 h-4 w-4' />
                  <span>{user.email}</span>
                </Badge>
                <Badge className={`flex items-center border-blue-300 text-[13px] ${roleInfo.color}`}>
                  {roleInfo.icon} {roleInfo.name}
                </Badge>
              </div>
            </div>

            {/* Details */}
            <div
              className={`overflow-hidden pb-1 transition-all duration-700 ease-in-out ${activeView === 'details' ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
            >
              <div className='grid grid-cols-1 gap-3 pt-2 md:grid-cols-2'>
                <InfoItem
                  icon={<Phone />}
                  label='Phone Number'
                  value={user.phone_number || 'N/A'}
                  iconColor='text-sky-500'
                />
                <InfoItem icon={<Cake />} label='Birthday' value={birthDate} iconColor='text-pink-500' />
                <InfoItem
                  icon={user.gender === 'male' ? <Mars /> : user.gender === 'female' ? <Venus /> : <VenusAndMars />}
                  label='Gender'
                  value={user.gender.charAt(0).toUpperCase() + user.gender.slice(1) || 'N/A'}
                  iconColor={
                    user.gender === 'male'
                      ? 'text-blue-500'
                      : user.gender === 'female'
                        ? 'text-rose-500'
                        : 'text-slate-500'
                  }
                />
                <InfoItem icon={<CalendarRange />} label='Age' value={`${age}`} iconColor='text-violet-500' />
                <InfoItem
                  icon={<Calendar />}
                  label='Member Since'
                  value={formatDate(user.created_at, 'MMMM d, yyyy')}
                  iconColor='text-green-500'
                />
              </div>
            </div>

            <Separator className='bg-gray-300 dark:bg-gray-700' />

            <div className='space-y-2'>
              <h3 className='text-lg font-semibold text-gray-800 dark:text-gray-200'>Authentication & Security</h3>
              {user.havePassword === true ? (
                <>
                  <div className='flex items-center justify-between rounded-xl border border-slate-200 bg-slate-100 p-4 dark:border-slate-700 dark:bg-slate-800/60'>
                    <div className='flex items-center gap-3'>
                      <KeyRound className='h-5 w-5 text-amber-500' />
                      <span className='font-semibold text-gray-700 dark:text-gray-300'>Password</span>
                    </div>
                    <div className='flex items-center gap-4'>
                      <span className='text-sm tracking-widest text-gray-400 dark:text-gray-500'>••••••••••</span>
                      <Button
                        onClick={() => setActiveView(activeView === 'details' ? 'password' : 'details')}
                        size='sm'
                        className='w-[80px] rounded-lg bg-blue-200 text-center text-sm font-semibold text-blue-600 shadow-sm/20 transition-all duration-500 hover:bg-blue-300 hover:shadow-md/20 active:translate-y-0.5'
                      >
                        {activeView === 'details' ? 'Change' : 'Close'}
                      </Button>
                    </div>
                  </div>

                  <div
                    className={`overflow-hidden transition-all duration-600 ease-in-out ${activeView === 'password' ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    <ChangePasswordForm
                      onCancel={() => setActiveView('details')}
                      onSuccess={handlePasswordUpdateSuccess}
                    />
                  </div>
                </>
              ) : (
                // <div className="pt-2 animate-in fade-in-50 duration-500">
                //   <GoogleAuthNotice />
                <div className='opacity-0'></div>
              )}

              {user.google_id && (
                <div className='flex items-center justify-between rounded-xl border border-slate-200 bg-slate-100 p-4 dark:border-slate-700 dark:bg-slate-800/60'>
                  <div className='flex items-center gap-3 text-gray-700 dark:text-gray-300'>
                    <img src={Google} alt='Google Icon' width='30px' />
                    <span className='font-semibold'>Google</span>
                  </div>
                  <Badge className='text-md flex items-center gap-2 bg-green-100 font-medium text-green-700 shadow-sm dark:bg-green-900/50 dark:text-green-300'>
                    <CheckCircle className='h-5 w-5' />
                    <span>Connected</span>
                  </Badge>
                </div>
              )}
            </div>
            <div className='pt-4'>
              <Button
                variant='destructive'
                className='text-md h-14 w-full rounded-xl bg-red-500/90 font-bold text-white transition-all duration-300 hover:bg-red-500 hover:shadow-lg hover:shadow-red-500/30'
              >
                <LogOut className='mr-2 h-5 w-5' /> Logout
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default CustomerProfilePage
