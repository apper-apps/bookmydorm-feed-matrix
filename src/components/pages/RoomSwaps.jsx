import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import Card from '@/components/atoms/Card'
import SwapCard from '@/components/molecules/SwapCard'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import { swapService } from '@/services/api/swapService'

const RoomSwaps = () => {
  const [swapRequests, setSwapRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filters, setFilters] = useState({
    status: 'all',
    roomType: 'all',
    location: 'all',
    urgency: 'all'
  })
  
  const currentUser = {
    Id: 1,
    name: 'John Doe'
  }
  
  useEffect(() => {
    loadSwapRequests()
  }, [filters])
  
  const loadSwapRequests = async () => {
    try {
      setLoading(true)
      setError('')
      
      let data = await swapService.getAll()
      
      // Apply filters
      if (filters.status !== 'all') {
        data = data.filter(swap => swap.status === filters.status)
      }
      
      if (filters.roomType !== 'all') {
        data = data.filter(swap => 
          swap.currentRoom.type === filters.roomType || 
          swap.desiredRoom.type === filters.roomType
        )
      }
      
      if (filters.location !== 'all') {
        data = data.filter(swap => 
          swap.currentRoom.location === filters.location || 
          swap.desiredRoom.preferredLocation === filters.location
        )
      }
      
      if (filters.urgency !== 'all') {
        data = data.filter(swap => swap.urgency === filters.urgency)
      }
      
      setSwapRequests(data)
    } catch (err) {
      setError('Failed to load swap requests. Please try again.')
      console.error('Error loading swap requests:', err)
    } finally {
      setLoading(false)
    }
  }
  
  const handleContact = (swapRequest) => {
    // Handle contact logic
    console.log('Contacting user for swap:', swapRequest)
  }
  
  const stats = [
    { label: 'Active Swaps', value: '120+', icon: 'ArrowRightLeft', color: 'from-green-500 to-green-600' },
    { label: 'Successful Matches', value: '450+', icon: 'CheckCircle', color: 'from-blue-500 to-blue-600' },
    { label: 'Average Match Time', value: '5 days', icon: 'Clock', color: 'from-purple-500 to-purple-600' },
    { label: 'Students Helped', value: '2.5k+', icon: 'Users', color: 'from-orange-500 to-orange-600' },
  ]
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-secondary-600 to-primary-600"></div>
        <div className="absolute inset-0 bg-black/10"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
              Room Swap
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                Marketplace
              </span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Find the perfect room swap match. Connect with fellow students 
              looking to exchange rooms and improve their living situation.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/create-swap-request">
                <Button
                  variant="accent"
                  size="lg"
                  icon="Plus"
                  className="shadow-xl hover:shadow-2xl"
                >
                  Post Swap Request
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                icon="Search"
                className="border-white text-white hover:bg-white hover:text-primary-600"
              >
                Browse Requests
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-12 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
              >
                <Card className="text-center p-6 hover:shadow-lg transition-shadow duration-300">
                  <div className={`w-12 h-12 mx-auto mb-4 bg-gradient-to-br ${stat.color} rounded-full flex items-center justify-center`}>
                    <ApperIcon name={stat.icon} className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-display font-bold text-gray-900 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Filters Section */}
      <section className="py-8 bg-white/50 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex items-center gap-2">
              <ApperIcon name="Filter" className="w-5 h-5 text-gray-600" />
              <h3 className="text-lg font-display font-semibold text-gray-900">Filter Swaps</h3>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <select
                value={filters.status}
                onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="matched">Matched</option>
              </select>
              
              <select
                value={filters.roomType}
                onChange={(e) => setFilters(prev => ({ ...prev, roomType: e.target.value }))}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
              >
                <option value="all">All Room Types</option>
                <option value="Single">Single</option>
                <option value="Double">Double</option>
                <option value="Triple">Triple</option>
              </select>
              
              <select
                value={filters.location}
                onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
              >
                <option value="all">All Locations</option>
                <option value="near-campus">Near Campus</option>
                <option value="city-center">City Center</option>
                <option value="transport-hub">Transport Hub</option>
              </select>
              
              <select
                value={filters.urgency}
                onChange={(e) => setFilters(prev => ({ ...prev, urgency: e.target.value }))}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
              >
                <option value="all">All Urgency</option>
                <option value="high">High Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="low">Low Priority</option>
              </select>
            </div>
          </div>
        </div>
      </section>
      
      {/* Swap Requests */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-display font-bold text-gray-900">
                Available Room Swaps
              </h2>
              <p className="text-gray-600 mt-1">
                Find your perfect room swap match
              </p>
            </div>
            
            <Link to="/create-swap-request">
              <Button
                variant="primary"
                icon="Plus"
              >
                Post Your Swap
              </Button>
            </Link>
          </div>
          
          {loading ? (
            <Loading />
          ) : error ? (
            <Error message={error} onRetry={loadSwapRequests} />
          ) : swapRequests.length === 0 ? (
            <Empty 
              message="No swap requests found"
              description="Be the first to post a room swap request!"
              action={() => window.location.href = '/create-swap-request'}
              actionLabel="Post Swap Request"
              icon="ArrowRightLeft"
            />
          ) : (
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
            >
              {swapRequests.map((swapRequest) => (
                <motion.div
                  key={swapRequest.Id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                >
                  <SwapCard 
                    swapRequest={swapRequest}
                    currentUser={currentUser}
                    onContact={handleContact}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}

export default RoomSwaps