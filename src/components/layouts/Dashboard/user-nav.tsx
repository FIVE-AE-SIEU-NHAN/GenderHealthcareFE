import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { LogOut, User } from 'lucide-react'

export function NavAvatar() {
  // const { user } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='ml-auto focus:outline-none'>
        <Avatar className='h-10 w-10 border'>
          <AvatarImage src='/path-to-user-image.jpg' alt='User' />
          <AvatarFallback>TK</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='mt-2 w-52'>
        <DropdownMenuLabel className='font-semibold'>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className='flex cursor-pointer items-center gap-2'>
          <User className='h-4 w-4' />
          <a href='/user/profile'>Profile</a>
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem
          // onSelect={handleLogout}
          className='flex cursor-pointer items-center gap-2 font-semibold text-red-600 transition duration-200 focus:bg-red-500 focus:text-white'
        >
          <LogOut className='h-4 w-4' />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
