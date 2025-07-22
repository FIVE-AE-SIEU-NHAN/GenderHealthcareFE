import { Link } from 'react-router-dom'
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink
} from '@/components/ui/navigation-menu'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Calendar, Menu } from 'lucide-react'

// Helper function to scroll to the top of the page
const ToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

export const CustomerNavMenu = () => {
  return (
    <>
      {/* ========================== */}
      {/* DESKTOP NAVIGATION (CENTER) */}
      {/* ========================== */}
      <div className='hidden flex-1 justify-center lg:flex'>
        <NavigationMenu>
          <NavigationMenuList className='flex items-center gap-6 font-medium'>
            <NavigationMenuItem>
              <NavigationMenuLink className='nav-text text-xl' asChild>
                <Link to='/' onClick={ToTop}>
                  Home
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild className='nav-text text-xl'>
                <Link onClick={ToTop} to='/services'>
                  Services
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild className='nav-text text-xl'>
                <Link onClick={ToTop} to='/blogs'>
                  Blog
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild className='nav-text text-xl'>
                <Link onClick={ToTop} to='/about-us'>
                  About
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <a
        href='/booking-info'
        className='mr-5 flex items-center gap-2 rounded-full bg-gradient-to-r from-[#1c2359] via-[#1a3973] to-[#1977cc] px-5 py-2 font-semibold text-white shadow-md transition-all duration-200 hover:shadow-lg hover:brightness-110'
      >
        <Calendar className='h-5 w-5' />
        Book an Appointment
      </a>

      {/* ===================================== */}
      {/* MOBILE NAVIGATION (HAMBURGER)         */}
      {/* ===================================== */}
      <div className='lg:hidden'>
        <Sheet>
          <SheetTrigger className='p-2'>
            <Menu className='h-6 w-6' />
          </SheetTrigger>
          <SheetContent side='right' className='w-[260px] pt-16 sm:w-[300px]'>
            <div className='flex flex-col items-center gap-4 text-center'>
              <NavigationMenu orientation='vertical'>
                <NavigationMenuList className='flex flex-col items-center gap-3 font-medium'>
                  <NavigationMenuItem className='w-full'>
                    <Link
                      to='/'
                      onClick={ToTop}
                      className='nav-text block w-full rounded-md py-2 text-xl hover:bg-gray-100'
                    >
                      Home
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink className='nav-text hover:bg-muted-foreground/20 block w-75 text-xl'>
                      <Link onClick={ToTop} to='/services'>
                        Services
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem className='w-full'>
                    <Link
                      to='/blogs'
                      onClick={ToTop}
                      className='nav-text block w-full rounded-md py-2 text-xl hover:bg-gray-100'
                    >
                      Blog
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem className='w-full'>
                    <Link
                      to='/about-us'
                      onClick={ToTop}
                      className='nav-text block w-full rounded-md py-2 text-xl hover:bg-gray-100'
                    >
                      About
                    </Link>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}
