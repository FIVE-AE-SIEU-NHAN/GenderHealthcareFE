import { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { differenceInYears } from 'date-fns';
import {
  Mail, Phone, Cake, User as UserIcon, PencilLine, CheckCircle,
  Mars, Venus, Calendar, KeyRound, LogOut, CalendarRange, VenusAndMars
} from 'lucide-react';
import Google from "@/assets/images/google.png";

import { ChangePasswordForm } from './ChangePasswordForm';
import { formatDate } from '@/utils/formatDate';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { EditProfileForm } from './EditProfileForm';
import { useProfile } from '@/hooks/customer/useProfile';
import { Skeleton } from '@/components/ui/skeleton';

const InfoItem = ({ icon, label, value, iconColor }: { icon: React.ReactNode; label: string; value: string; iconColor: string; }) => (
  <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-400/10 dark:bg-gray-900/40">
    <div className={`flex-shrink-0 text-xl ${iconColor}`}>
      {icon}
    </div>
    <div>
      <p className="text-xs font-medium text-gray-500 dark:text-gray-400">{label}</p>
      <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{value}</p>
    </div>
  </div>
);

const CustomerProfilePage = () => {
  const [activeView, setActiveView] = useState<'details' | 'password'>('details');
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  // Sử dụng hook để fetch user profile từ API
  const { data: user, isLoading, isError, error } = useProfile();

  // Loading state
  if (isLoading) {
    return (
      <div className="overflow-y-auto min-h-[calc(83vh)] max-h-[calc(84vh)]">
        <div className="pt-11 pb-5 bg-gray-50 dark:bg-gray-900 flex items-center justify-center translate-y-6">
          <Card className="w-full max-w-4xl shadow-lg rounded-2xl overflow-hidden border-0 bg-gradient-to-t from-white via-white to-slate-200">
            <CardHeader className="p-0 gap-0">
              <div className="h-2 bg-gradient-to-r from-semi-dark-blue to-[#4F80E1]"></div>
              <div className="flex justify-end p-4">
                <Skeleton className="h-10 w-32" />
              </div>
            </CardHeader>
            <CardContent className="px-8 pb-8 space-y-6 -mt-5">
              <div className="space-y-1.5">
                <Skeleton className="h-9 w-64" />
                <div className="flex gap-4">
                  <Skeleton className="h-6 w-48" />
                  <Skeleton className="h-6 w-20" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-16 w-full rounded-xl" />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="overflow-y-auto min-h-[calc(83vh)] max-h-[calc(84vh)]">
        <div className="pt-11 pb-5 bg-gray-50 dark:bg-gray-900 flex items-center justify-center translate-y-6">
          <Card className="w-full max-w-4xl shadow-lg rounded-2xl overflow-hidden border-0">
            <CardContent className="p-8 text-center">
              <h2 className="text-xl font-bold text-red-600 mb-2">Error Loading Profile</h2>
              <p className="text-gray-600">{error?.message || 'Failed to load user profile'}</p>
              <Button 
                onClick={() => window.location.reload()} 
                className="mt-4"
                variant="outline"
              >
                Try Again
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Nếu không có user data
  if (!user) {
    return (
      <div className="overflow-y-auto min-h-[calc(83vh)] max-h-[calc(84vh)]">
        <div className="pt-11 pb-5 bg-gray-50 dark:bg-gray-900 flex items-center justify-center translate-y-6">
          <Card className="w-full max-w-4xl shadow-lg rounded-2xl overflow-hidden border-0">
            <CardContent className="p-8 text-center">
              <h2 className="text-xl font-bold text-gray-600 mb-2">No Profile Data</h2>
              <p className="text-gray-600">Unable to load profile information</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }


  const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('').toUpperCase();

  const getRoleInfo = (role: number) => {
    if (role === 3)
      return { name: "Customer", icon: <UserIcon className="h-4 w-4 mr-1.5" />, color: "border-slate-500/50 bg-slate-500/10 text-slate-700 dark:text-slate-400 dark:bg-slate-700/50" };
    return { name: "User", icon: <UserIcon className="h-4 w-4 mr-1.5" />, color: "bg-slate-100 text-slate-800" };
  };

  const roleInfo = getRoleInfo(user.role);
  const birthDate = formatDate(user.date_of_birth, 'MMMM d, yyyy');
  console.log(user.date_of_birth, 'MMMM d, yyyy');
  const age = birthDate === "N/A" ? "N/A" : differenceInYears(new Date(), user.date_of_birth);

  const handlePasswordUpdateSuccess = () => {
    setActiveView('details');
  };

  return (
    <div className="overflow-y-auto min-h-[calc(83vh)] max-h-[calc(84vh)]">
      <div className="pt-11 pb-5 bg-gray-50 dark:bg-gray-900 flex items-center justify-center translate-y-6">
        <Card className="w-full max-w-4xl shadow-lg rounded-2xl overflow-hidden border-0 bg-gradient-to-t from-white via-white to-slate-200">
          <CardHeader className="p-0 gap-0">
            <div className="absolute translate-x-10 -translate-y-16 z-2">
              <Avatar className="h-30 w-30 p-2 border-6 border-semi-dark-blue bg-gray-200/70 shadow-md">
                <AvatarImage src={`https://api.dicebear.com/8.x/adventurer/svg?seed=${user.name}`} alt={user.name} />
                <AvatarFallback className="text-3xl font-bold bg-muted">{getInitials(user.name)}</AvatarFallback>
              </Avatar>
            </div>
            <div className="h-2 bg-gradient-to-r from-semi-dark-blue to-[#4F80E1]"></div>
            <div className="flex justify-end p-4">
              <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="rounded-lg">
                    <PencilLine className="mr-2 h-4 w-4" /> Edit Profile
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[480px]">
                  <DialogHeader>
                    <DialogTitle>Edit Your Profile</DialogTitle>
                    <DialogDescription>Make changes to your profile here. Click save when you're done.</DialogDescription>
                  </DialogHeader>
                  <EditProfileForm currentUser={user} onSuccess={() => setIsEditDialogOpen(false)} />
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent className="px-8 pb-8 space-y-6 -mt-5">
            <div className="space-y-1.5">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{user.name}</h1>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-gray-500 dark:text-gray-400">
                <Badge className="flex items-center text-[13px] border-blue-300 bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300">
                  <Mail className="h-4 w-4 mr-2" /><span>{user.email}</span>
                </Badge>
                <Badge className={`flex text-[13px] items-center border-blue-300 ${roleInfo.color}`}>
                  {roleInfo.icon} {roleInfo.name}
                </Badge>
              </div>
            </div>

            <div className={`pb-1 ${activeView === 'details' ? 'block' : 'hidden'}`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                <InfoItem icon={<Phone />} label="Phone Number" value={user.phone_number || "N/A"} iconColor="text-sky-500" />
                <InfoItem icon={<Cake />} label="Birthday" value={birthDate} iconColor="text-pink-500" />
                <InfoItem
                  icon={user.gender === 'male' ? <Mars /> : user.gender === 'female' ? <Venus /> : <VenusAndMars />}
                  label="Gender"
                  value={(user.gender.charAt(0).toUpperCase() + user.gender.slice(1)) || 'N/A'}
                  iconColor={user.gender === 'male' ? 'text-blue-500' : user.gender === 'female' ? 'text-rose-500' : 'text-slate-500'}
                />
                <InfoItem icon={<CalendarRange />} label="Age" value={`${age}`} iconColor="text-violet-500" />
                <InfoItem icon={<Calendar />} label="Member Since" value={formatDate(user.created_at, 'MMMM d, yyyy')} iconColor="text-green-500" />
              </div>
            </div>

            <Separator className="bg-gray-300 dark:bg-gray-700" />

            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Authentication & Security</h3>
              {user.havePassword && (
                <>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-slate-100 dark:bg-slate-800/60 border">
                    <div className="flex items-center gap-3">
                      <KeyRound className="h-5 w-5 text-amber-500" />
                      <span className="font-semibold text-gray-700 dark:text-gray-300">Password</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-400 dark:text-gray-500">••••••••••</span>
                      <Button
                        onClick={() => setActiveView(activeView === 'details' ? 'password' : 'details')}
                        size="sm" className="w-[80px] text-sm font-semibold bg-blue-200 text-blue-600 hover:bg-blue-300">
                        {activeView === 'details' ? 'Change' : 'Close'}
                      </Button>
                    </div>
                  </div>
                  {activeView === 'password' && (
                    <ChangePasswordForm
                      onCancel={() => setActiveView('details')}
                      onSuccess={handlePasswordUpdateSuccess}
                    />
                  )}
                </>
              )}

              {user.google_id && (
                <div className="flex items-center justify-between p-4 rounded-xl bg-slate-100 dark:bg-slate-800/60 border">
                  <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <img src={Google} alt="Google Icon" width="30px" />
                    <span className="font-semibold">Google</span>
                  </div>
                  <Badge className="flex items-center gap-2 font-medium bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300">
                    <CheckCircle className="h-5 w-5" /><span>Connected</span>
                  </Badge>
                </div>
              )}
            </div>

            <div className="pt-4">
              <Button variant="destructive" className="w-full h-14 rounded-xl text-md font-bold bg-red-500/90 hover:bg-red-500 text-white">
                <LogOut className="mr-2 h-5 w-5" /> Logout
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CustomerProfilePage;
