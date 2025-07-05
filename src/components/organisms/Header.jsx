import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import Avatar from '@/components/atoms/Avatar'
import SearchBar from '@/components/molecules/SearchBar'

const Header = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()
  
  const navigation = [
    { name: 'Browse Hostels', href: '/', icon: 'Home' },
    { name: 'Room Swaps', href: '/room-swaps', icon: 'ArrowRightLeft' },
    { name: 'Find Roommate', href: '/roommate-finder', icon: 'Users' },
    { name: 'Dashboard', href: '/dashboard', icon: 'LayoutDashboard' },
  ]
  
  const isActive = (href) => location.pathname === href
  
  return (
    <>
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
                <ApperIcon name="Building2" className="w-6 h-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-display font-bold gradient-text">
                  BookMyDorm
                </h1>
                <p className="text-xs text-gray-500">Smart Hostel Platform</p>
              </div>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(item.href)
                      ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg'
                      : 'text-gray-600 hover:text-primary-600 hover:bg-primary-50'
                  }`}
                >
                  <ApperIcon name={item.icon} className="w-4 h-4" />
                  {item.name}
                </Link>
              ))}
            </nav>
            
            {/* Search Bar - Desktop */}
            <div className="hidden lg:block flex-1 max-w-md mx-8">
              <SearchBar 
                placeholder="Search hostels..."
                showFilters={false}
                className="w-full"
              />
            </div>
            
            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
              {/* Search Button - Mobile */}
              <Button
                variant="ghost"
                size="sm"
                icon="Search"
                className="lg:hidden"
              />
              
              {/* Notifications */}
              <Button
                variant="ghost"
                size="sm"
                icon="Bell"
                className="relative"
              >
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </Button>
              
              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 p-1 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  <Avatar name="John Doe" size="sm" />
                  <ApperIcon name="ChevronDown" className="w-4 h-4 text-gray-500" />
                </button>
                
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50"
                  >
                    <Link
                      to="/dashboard"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <ApperIcon name="User" className="w-4 h-4" />
                      Profile
                    </Link>
                    <Link
                      to="/dashboard"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <ApperIcon name="Settings" className="w-4 h-4" />
                      Settings
                    </Link>
                    <hr className="my-1" />
                    <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                      <ApperIcon name="LogOut" className="w-4 h-4" />
                      Sign Out
                    </button>
                  </motion.div>
                )}
              </div>
              
              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="sm"
                icon={isMobileMenuOpen ? "X" : "Menu"}
                className="lg:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              />
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-gray-200 bg-white/95 backdrop-blur-md"
          >
            <div className="px-4 py-4 space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(item.href)
                      ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white'
                      : 'text-gray-600 hover:text-primary-600 hover:bg-primary-50'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <ApperIcon name={item.icon} className="w-5 h-5" />
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </header>
      
      {/* Mobile Search Bar */}
      <div className="lg:hidden px-4 py-3 bg-white border-b border-gray-200">
        <SearchBar 
          placeholder="Search hostels..."
          showFilters={false}
        />
      </div>
    </>
  )
}

export default Header