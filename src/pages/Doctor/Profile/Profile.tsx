import { useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { differenceInYears } from 'date-fns'
import {
  Mail,
  Phone,
  Cake,
  PencilLine,
  Mars,
  Venus,
  Calendar,
  KeyRound,
  LogOut,
  Loader2,
  Stethoscope,
  Circle,
  Fingerprint,
  Microscope,
  UserRoundCheck,
  VenusAndMars
} from 'lucide-react'

import { ChangePasswordForm } from '@/pages/Customer/Profile/ChangePasswordForm'
import { formatDate } from '@/utils/formatDate'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { useOutletContext } from 'react-router-dom'
import { DashboardLayoutContext } from '@/components/layouts/Dashboard/DashboardLayout'
import { useDoctorProfile } from '@/hooks/doctor/useDoctorProfile'
import { EditProfileForm } from '@/pages/Customer/Profile/EditProfileForm'

const InfoItem = ({
  icon,
  label,
  value,
  iconColor
}: {
  icon: React.ReactNode
  label: string
  value: string | number
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

// Helper function to display doctor status attractively.
const getStatusInfo = (status: number) => {
  if (status === 1) {
    return {
      label: 'Online',
      icon: <Circle className='h-2.5 w-2.5 -translate-y-[0.5px] fill-current' />,
      color: 'border-green-400/50 bg-green-500/10 text-green-700 dark:text-green-300 dark:bg-green-700/20'
    }
  }
  return {
    label: 'Offline',
    icon: <Circle className='h-2.5 w-2.5 -translate-y-[0.5px]' />,
    color: 'border-slate-500/50 bg-slate-500/10 text-slate-700 dark:text-slate-400 dark:bg-slate-700/50'
  }
}

// Helper to make specialization codes readable.
const formatSpecialization = (specCode: string | null | undefined) => {
  if (!specCode) return 'N/A'
  return specCode
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}

function DoctorProfilePage() {
  const { setBreadcrumb } = useOutletContext<DashboardLayoutContext>()

  const [activeView, setActiveView] = useState<'details' | 'password'>('details')
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  const { data: staff, isLoading, isError, error } = useDoctorProfile()

  // ========== SET BREADCRUMB ==========
  useEffect(() => {
    setBreadcrumb({
      title: 'Your Profile',
      parent: 'Dashboard',
      parentHref: '/doctor'
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
        <p>Error loading profile: {error?.message}</p>
      </div>
    )
  }

  if (!staff) {
    return (
      <div className='flex min-h-[80vh] items-center justify-center text-gray-500'>
        <p>Doctor profile not found.</p>
      </div>
    )
  }

  const getInitials = (name: string) =>
    name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()

  const statusInfo = getStatusInfo(staff.status)
  const birthDate = formatDate(staff.date_of_birth, 'MMMM d, yyyy')
  const age = birthDate === 'N/A' ? 'N/A' : differenceInYears(new Date(), staff.date_of_birth)

  const handlePasswordUpdateSuccess = () => {
    setActiveView('details')
  }

  return (
    <div className='container mx-auto max-h-[calc(84vh)] min-h-[calc(83vh)] space-y-2 overflow-y-auto px-4 py-8'>
      {/* === CARD 1: MAIN PROFILE HEADER & PERSONAL INFO === */}
      <Card className='animate-fade-in-up w-full overflow-hidden rounded-2xl border-0 bg-gradient-to-t from-white via-white to-slate-200/80 shadow-lg [animation-delay:100ms] [animation-fill-mode:backwards]'>
        <CardHeader className='relative p-0'>
          <div className='from-semi-dark-blue h-24 bg-gradient-to-r to-[#4F80E1]' />
          <div className='absolute top-10 left-10'>
            <Avatar className='border-semi-dark-blue h-32 w-32 border-6 bg-gray-200/70 shadow-lg'>
              <AvatarImage src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${staff.name}`} alt={staff.name} />
              <AvatarFallback className='bg-muted text-4xl font-bold'>{getInitials(staff.name)}</AvatarFallback>
            </Avatar>
          </div>
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
              <DialogContent className='sm:max-w-[520px]'>
                <DialogHeader>
                  <DialogTitle>Edit Your Professional Profile</DialogTitle>
                  <DialogDescription>Update your details here. Click save when you're done.</DialogDescription>
                </DialogHeader>
                <EditProfileForm currentUser={staff} onSuccess={() => setIsEditDialogOpen(false)} />
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent className='space-y-6 px-8 pt-6 pb-8'>
          <div className='space-y-2'>
            <div className='flex items-baseline gap-3'>
              <h1 className='text-3xl font-bold text-gray-900 dark:text-white'>{staff.name}</h1>
              <Badge className={`flex items-center text-xs font-medium ${statusInfo.color}`}>
                {statusInfo.icon} {statusInfo.label}
              </Badge>
            </div>
            <div className='flex flex-wrap items-center gap-x-4 gap-y-2'>
              <Badge className='flex items-center border-blue-300 bg-blue-100 text-[13px] text-blue-800 dark:bg-blue-900/50 dark:text-blue-300'>
                <Mail className='mr-2 h-4 w-4' />
                <span>{staff.email}</span>
              </Badge>
              <Badge className={`flex items-center border-purple-300 bg-purple-500/10 text-[13px] text-purple-700`}>
                <UserRoundCheck className='mr-1.5 h-4 w-4' />
                Doctor
              </Badge>
            </div>
          </div>

          <div className='grid grid-cols-1 gap-4 pt-2 md:grid-cols-2'>
            <InfoItem
              icon={<Phone />}
              label='Phone Number'
              value={staff.phone_number || 'N/A'}
              iconColor='text-sky-500'
            />
            <InfoItem icon={<Cake />} label='Birthday' value={birthDate} iconColor='text-pink-500' />
            <InfoItem
              icon={staff.gender === 'male' ? <Mars /> : staff.gender === 'female' ? <Venus /> : <VenusAndMars />}
              label='Gender'
              value={staff.gender.charAt(0).toUpperCase() + staff.gender.slice(1)}
              iconColor={
                staff.gender === 'male'
                  ? 'text-blue-500'
                  : staff.gender === 'female'
                    ? 'text-rose-500'
                    : 'text-slate-500'
              }
            />
            <InfoItem icon={<Calendar />} label='Age' value={`${age}`} iconColor='text-violet-500' />
          </div>
        </CardContent>
      </Card>

      {/* === CARD 2: PROFESSIONAL PROFILE === */}
      <Card className='animate-fade-in-up w-full rounded-2xl pt-7 pb-7 shadow-lg [animation-delay:300ms] [animation-fill-mode:backwards]'>
        <CardHeader>
          <CardTitle className='flex items-center gap-3 text-xl font-bold text-gray-800'>
            <Microscope className='text-blue-900' /> Professional Profile
          </CardTitle>
          <CardDescription>Your specialization, credentials, and experience.</CardDescription>
        </CardHeader>
        <CardContent className='grid grid-cols-1 gap-4 md:grid-cols-2'>
          <InfoItem
            icon={<Stethoscope />}
            label='Specialization'
            value={formatSpecialization(staff.specialization)}
            iconColor='text-teal-500'
          />
          {/* <InfoItem icon={<TrendingUp />} label="Years of Experience" value={`${staff.experienceYears} years`} iconColor="text-lime-600" /> */}
        </CardContent>
      </Card>

      {/* === CARD 3: AUTHENTICATION & SECURITY === */}
      <Card className='animate-fade-in-up w-full rounded-2xl pt-7 pb-7 shadow-lg [animation-delay:500ms] [animation-fill-mode:backwards]'>
        <CardHeader>
          <CardTitle className='flex items-center gap-3 text-xl font-bold text-gray-800'>
            <Fingerprint className='text-blue-900' /> Authentication & Security
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-2'>
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
            className={`overflow-hidden transition-all duration-800 ease-in-out ${activeView === 'password' ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}
          >
            <ChangePasswordForm onCancel={() => setActiveView('details')} onSuccess={handlePasswordUpdateSuccess} />
          </div>
        </CardContent>
      </Card>

      <div className='animate-fade-in-up pt-4 [animation-delay:700ms] [animation-fill-mode:backwards]'>
        <Button
          variant='destructive'
          className='text-md h-12 w-full rounded-xl bg-red-500/90 font-bold text-white transition-all duration-300 hover:bg-red-500 hover:shadow-lg hover:shadow-red-500/30'
        >
          <LogOut className='mr-2 h-5 w-5' /> Logout
        </Button>
      </div>
    </div>
  )
}

export default DoctorProfilePage
