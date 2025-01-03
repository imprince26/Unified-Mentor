import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { 
  MenuIcon,
  X,
  Users2Icon, 
  CalendarIcon, 
  ActivityIcon, 
  MapPinIcon, 
  SearchIcon,
  LogOutIcon 
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import api, { handleApiError } from '@/utils/api'
import { toast } from 'react-hot-toast'

const featuredSports = [
  {
    name: 'Football',
    icon: '⚽',
    description: 'Connect with local football enthusiasts'
  },
  {
    name: 'Basketball',
    icon: '🏀',
    description: 'Find pickup games and communities'
  },
  {
    name: 'Running',
    icon: '🏃',
    description: 'Join running groups'
  },
  {
    name: 'Tennis',
    icon: '🎾',
    description: 'Find tennis partners'
  }
]

const Home = () => {
  const navigate = useNavigate()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    // Check if user is logged in (you might want to implement a more robust authentication check)
    const token = document.cookie.includes('SportsBuddyToken')
    setIsLoggedIn(token)
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleLogout = async () => {
    try {
      await api.post('/auth/logout')
      
      toast.success('Logged out successfully!', {
        style: {
          background: '#0F2C2C',
          color: '#E0F2F1',
          border: '1px solid #1D4E4E',
        },
        iconTheme: {
          primary: '#2E7D32',
          secondary: '#E0F2F1',
        },
      })

      // Reset login state and navigate to home
      setIsLoggedIn(false)
      navigate('/login')
    } catch (error) {
      const errorMessage = handleApiError(error)
      
      toast.error(errorMessage.message, {
        style: {
          background: '#2C3E50',
          color: '#ECF0F1',
        },
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A1A1A] via-[#0F2C2C] to-[#0A1A1A] text-[#E0F2F1] overflow-x-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] 
        from-[#0F2C2C]/30 via-transparent to-[#0A1A1A]/50 opacity-75 pointer-events-none"></div>


 
    </div>
  )
}

export default Home
 