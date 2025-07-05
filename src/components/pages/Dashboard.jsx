import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";
import Avatar from "@/components/atoms/Avatar";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import StarRating from "@/components/atoms/StarRating";
import Empty from "@/components/ui/Empty";
import Error from "@/components/ui/Error";
import Loading from "@/components/ui/Loading";
import { dashboardService } from "@/services/api/dashboardService";

const Dashboard = () => {
const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState('overview')
  
  useEffect(() => {
    loadDashboardData()
  }, [])
  
  const loadDashboardData = async () => {
    try {
      setLoading(true)
      setError('')
      const data = await dashboardService.getDashboardData()
      
      // Validate data structure to prevent undefined access
      if (!data || typeof data !== 'object') {
        throw new Error('Invalid dashboard data received')
      }
      
      setDashboardData(data)
    } catch (err) {
      setError(err.message || 'Failed to load dashboard data. Please try again.')
      console.error('Error loading dashboard data:', err)
    } finally {
      setLoading(false)
    }
  }
  
  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Home' },
    { id: 'reviews', label: 'Reviews', icon: 'Star' },
    { id: 'swaps', label: 'Swaps', icon: 'ArrowRightLeft' },
    { id: 'bookmarks', label: 'Bookmarks', icon: 'Heart' },
    { id: 'profile', label: 'Profile', icon: 'User' }
  ]

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <Error message={error} onRetry={loadDashboardData} />
  }

  // Safe destructuring with null check
  if (!dashboardData) {
    return <Loading />
  }
  
  const { user, stats, recentReviews, activeSwaps, bookmarkedHostels, notifications } = dashboardData

  const currentDate = new Date()
  const greeting = currentDate.getHours() < 12 ? 'Good morning' : 
                   currentDate.getHours() < 17 ? 'Good afternoon' : 'Good evening'

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        variants={itemVariants}
        className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100"
      >
        <div className="flex items-center justify-between">
          <div>
<h2 className="text-2xl font-bold text-gray-900 mb-2">
              {greeting}, {user?.name || 'User'}! 👋
            </h2>
            <p className="text-gray-600">Welcome back to your dashboard</p>
          </div>
          <div className="flex items-center space-x-4">
            <Avatar 
              src={user?.avatar}
              alt={user?.name || 'User'}
              size="lg"
              className="ring-2 ring-blue-200"
            />
            <div className="text-sm text-gray-500">
              <p>Member since {user?.joinDate || 'N/A'}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div variants={itemVariants}>
          <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Reviews Written</p>
                <p className="text-2xl font-display font-bold text-gray-900">{stats?.totalReviews || 0}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                <ApperIcon name="MessageSquare" className="w-6 h-6 text-white" />
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Swaps</p>
                <p className="text-2xl font-display font-bold text-gray-900">{stats?.activeSwaps || 0}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                <ApperIcon name="ArrowRightLeft" className="w-6 h-6 text-white" />
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Bookmarked</p>
                <p className="text-2xl font-display font-bold text-gray-900">{stats?.bookmarkedHostels || 0}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                <ApperIcon name="Heart" className="w-6 h-6 text-white" />
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Notifications</p>
                <p className="text-2xl font-display font-bold text-gray-900">{stats?.notifications || 0}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                <ApperIcon name="Bell" className="w-6 h-6 text-white" />
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Recent Reviews */}
      <motion.div variants={itemVariants} className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Recent Reviews</h3>
          <Link to="/reviews" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            View all
          </Link>
        </div>
        <div className="space-y-3">
          {recentReviews?.slice(0, 3).map(review => (
            <div key={review.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
              <Avatar src={review?.hostel?.image} alt={review?.hostel?.name || 'Hostel'} size="sm" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-900">{review?.hostel?.name || 'Unknown Hostel'}</h4>
                  <StarRating rating={review?.rating || 0} size="sm" />
                </div>
                <p className="text-sm text-gray-600 mt-1">{review?.comment || 'No comment'}</p>
                <p className="text-xs text-gray-500 mt-1">{review?.date || 'N/A'}</p>
              </div>
            </div>
)) || <p className="text-gray-500 text-center py-4">No recent reviews</p>}
        </div>
      </motion.div>
      {/* Active Swaps */}
      <motion.div variants={itemVariants} className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Active Room Swaps</h3>
          <Link to="/swaps" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            View all
          </Link>
</div>
        <div className="space-y-3">
          {activeSwaps?.map(swap => (
            <div key={swap.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <ApperIcon name="ArrowRightLeft" size={18} className="text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{swap?.title || 'Swap Request'}</h4>
                  <p className="text-sm text-gray-600">{swap?.fromHostel || 'Unknown'} → {swap?.toHostel || 'Unknown'}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant={swap?.status === 'pending' ? 'warning' : 'success'}>
                  {swap?.status || 'pending'}
                </Badge>
                <Button variant="outline" size="sm">View</Button>
              </div>
            </div>
          )) || <p className="text-gray-500 text-center py-4">No active swaps</p>}
        </div>
      </motion.div>

      {/* Bookmarked Hostels */}
      <motion.div variants={itemVariants} className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Bookmarked Hostels</h3>
          <Link to="/hostels" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            View all
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {bookmarkedHostels?.map(hostel => (
            <div key={hostel.id} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3 mb-3">
                <img 
                  src={hostel?.image || '/placeholder.jpg'} 
                  alt={hostel?.name || 'Hostel'}
className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{hostel?.name || 'Unknown Hostel'}</h4>
                  <p className="text-sm text-gray-600">{hostel?.location || 'Unknown location'}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <StarRating rating={hostel?.rating || 0} size="sm" />
                  <span className="text-sm text-gray-600">({hostel?.reviews || 0})</span>
                </div>
                <p className="text-sm font-medium text-gray-900">${hostel?.price || 0}/month</p>
              </div>
            </div>
          )) || <p className="text-gray-500 text-center py-4">No bookmarked hostels</p>}
        </div>
      </motion.div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Button variant="ghost" size="sm" icon="Bell" className="relative">
                  {notifications?.length > 0 && (
                    <Badge variant="primary" className="absolute -top-1 -right-1 w-5 h-5 text-xs">
                      {notifications.length}
                    </Badge>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <ApperIcon name={tab.icon} size={18} />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      >
        {activeTab === 'overview' && renderOverview()}
        
        {activeTab === 'reviews' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-display font-semibold text-gray-900">My Reviews</h3>
              <Button variant="primary" icon="Plus">
                Write New Review
              </Button>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              {recentReviews?.map((review) => (
                <Card key={review.id} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-medium text-gray-900">{review?.hostelName || 'Unknown Hostel'}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <StarRating rating={review?.overallRating || 0} size="sm" readonly />
                        <span className="text-sm text-gray-500">{review?.date || 'N/A'}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" icon="Edit2">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" icon="Trash2">
                        Delete
                      </Button>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4">{review?.text || 'No review text'}</p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-green-600">
                      <ApperIcon name="ThumbsUp" className="w-4 h-4" />
                      <span className="text-sm">{review?.upvotes || 0}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-500">
                      <ApperIcon name="MessageCircle" className="w-4 h-4" />
                      <span className="text-sm">{review?.replies || 0}</span>
                    </div>
                  </div>
                </Card>
              )) || <Empty message="No reviews yet" />}
            </div>
          </div>
        )}

{activeTab === 'swaps' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-display font-semibold text-gray-900">Room Swaps</h3>
              <Button variant="primary" icon="Plus">
                Post New Swap
              </Button>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              {activeSwaps?.map((swap) => (
                <Card key={swap.id} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-medium text-gray-900">{swap?.title || 'Swap Request'}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant={swap?.status === 'active' ? 'success' : 'warning'} size="sm">
                          {swap?.status || 'pending'}
                        </Badge>
                        <span className="text-sm text-gray-500">{swap?.date || 'N/A'}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" icon="Edit2">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" icon="Trash2">
                        Delete
                      </Button>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4">{swap?.description || 'No description'}</p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-blue-600">
                      <ApperIcon name="Users" className="w-4 h-4" />
                      <span className="text-sm">{swap?.interested || 0} interested</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-500">
                      <ApperIcon name="MessageCircle" className="w-4 h-4" />
                      <span className="text-sm">{swap?.messages || 0} messages</span>
                    </div>
                  </div>
                </Card>
              )) || <Empty message="No active swaps" />}
            </div>
          </div>
        )}
        
        {activeTab === 'bookmarks' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-display font-semibold text-gray-900">Bookmarked Hostels</h3>
              <span className="text-sm text-gray-500">{bookmarkedHostels?.length || 0} saved</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bookmarkedHostels?.map((hostel) => (
                <Card key={hostel.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="relative h-48">
                    <img
                      src={hostel?.image || '/placeholder.jpg'}
                      alt={hostel?.name || 'Hostel'}
                      className="w-full h-full object-cover"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      icon="Heart"
                      className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm text-red-500"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="font-medium text-gray-900 mb-2">{hostel?.name || 'Unknown Hostel'}</h4>
                    <div className="flex items-center gap-2 mb-2">
                      <StarRating rating={hostel?.rating || 0} size="xs" readonly />
                      <span className="text-sm text-gray-500">({hostel?.reviews || 0} reviews)</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{hostel?.location || 'Unknown location'}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-primary-600">₹{hostel?.price || 0}/month</span>
                      <Link to={`/hostels/${hostel.id}`}>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              )) || <Empty message="No bookmarked hostels" />}
            </div>
          </div>
        )}
        
        {activeTab === 'profile' && (
          <div className="max-w-2xl">
            <Card className="p-6">
              <h3 className="text-xl font-display font-semibold text-gray-900 mb-6">Profile Settings</h3>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <Avatar src={user?.avatar} name={user?.name} size="xl" />
                  <div>
                    <Button variant="outline" size="sm" icon="Upload">
                      Change Photo
                    </Button>
                    <p className="text-sm text-gray-500 mt-1">JPG, PNG max 5MB</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      defaultValue={user?.name || ''}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      defaultValue={user?.email || ''}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      University
                    </label>
                    <input
                      type="text"
                      defaultValue={user?.university || ''}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Course
                    </label>
                    <input
                      type="text"
                      defaultValue={user?.course || ''}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bio
                  </label>
                  <textarea
                    rows={4}
                    defaultValue={user?.bio || ''}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Tell us about yourself..."
                  />
                </div>
                
                <div className="flex items-center gap-3">
                  <Button variant="primary" icon="Save">
                    Save Changes
                  </Button>
                  <Button variant="outline">
                    Cancel
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default Dashboard