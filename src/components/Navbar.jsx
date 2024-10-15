import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import logo from '../assets/logo.png'
import { navItems } from '../constants'
import { useAuth0 } from '@auth0/auth0-react'

const Navbar = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false)
  const { loginWithRedirect } = useAuth0()
  const { logout } = useAuth0()
  const { user, isAuthenticated } = useAuth0()

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen)
  }

  return (
    <nav className='sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80'>
      <div className='container px-4 mx-auto relative lg:text-sm'>
        <div className='flex justify-between items-center'>
          <div className='flex items-center flex-shrink-0'>
            <img className='h-12 w-12 mr-2' src={logo} alt='Logo' />
            <span className='text-xl tracking-tight'>ECONOMIST TIMES</span>
          </div>
          <ul className='hidden lg:flex ml-14 space-x-12'>
            {navItems.map((item, index) => (
              <li key={index}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
          <div className='hidden lg:flex justify-center space-x-12 items-center'>
            <div className='py-2 px-3 rounded-md'>
              {isAuthenticated && (
              <div>
                <h2>Welcome {user.email}</h2>
              </div>
              )}
            </div>
            {isAuthenticated ? (
              <button
                className='py-2 px-3 border rounded-md'
                onClick={() =>
                  logout({ logoutParams: { returnTo: window.location.origin } })
                }
              >
                Log Out
              </button>
            ) : (
              <button
                className='py-2 px-3 border rounded-md'
                onClick={() => loginWithRedirect()}
              >
                Log In
              </button>
            )}
          </div>
          <div className='lg:hidden md:flex flex-col justify-end'>
            <button onClick={toggleNavbar}>
              {mobileDrawerOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {mobileDrawerOpen && (
          <div className='fixed right-0 z-20 bg-neutral-900 w-full p-12 flex flex-col justify-center items-center lg:hidden'>
            <ul>
              {navItems.map((item, index) => (
                <li key={index} className='py-4'>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
            <div className='flex space-x-6'>
            <div className='py-2 px-3 rounded-md'>
              {isAuthenticated && (
              <div>
                <h2>Welcome {user.email}</h2>
              </div>
              )}
            </div>
            {isAuthenticated ? (
              <button
                className='py-2 px-3 border rounded-md'
                onClick={() =>
                  logout({ logoutParams: { returnTo: window.location.origin } })
                }
              >
                Log Out
              </button>
            ) : (
              <button
                className='py-2 px-3 border rounded-md'
                onClick={() => loginWithRedirect()}
              >
                Log In
              </button>
            )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
