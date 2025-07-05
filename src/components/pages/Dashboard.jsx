import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import Card from '@/components/atoms/Card'
import Badge from '@/components/atoms/Badge'
import Avatar from '@/components/atoms/Avatar'
import StarRating from '@/components/atoms/StarRating'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import { dashboardService } from '@/services/api/dashboardService'

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
      setDashboardData(data)
    } catch (err) {
      setError('Failed to load dashboard data. Please try again.')
      console.error('Error loading dashboard data:', err)
    } finally {
      setLoading(false)
    }
  }
  
  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Home' },
    { id: 'reviews', label: 'My Reviews', icon: 'MessageSquare' },
    { id: 'swaps', label: 'Room Swaps', icon: 'ArrowRightLeft' },
    { id: 'bookmarks', label: 'Bookmarks', icon: 'Heart' },
    { id: 'profile', label: 'Profile', icon: 'User' },
  ]
  
  if (loading) {
    return <Loading />
  }
  
  if (error) {
    return <Error message={error} onRetry={loadDashboardData} />
  }
  
  const { user, stats, recentReviews, activeSwaps, bookmarkedHostels, notifications } = dashboardData
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* Header */}
      <section className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar src={user.avatar} name={user.name} size="xl" />
              <div>
                <h1 className="text-2xl font-display font-bold text-gray-900">
                  Welcome back, {user.name}!
                </h1>
                <p className="text-gray-600">{user.university} • {user.course}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="primary" size="sm">
                    {user.year} Year
                  </Badge>
                  <Badge variant="success" size="sm">
                    Verified Student
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                icon="Bell"
                className="relative"
              >
                Notifications
                {notifications.length > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {notifications.length}
                  </span>
                )}
              </Button>
              <Button
                variant="primary"
                icon="Settings"
              >
                Settings
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Stats Cards */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Reviews Written</p>
                  <p className="text-2xl font-display font-bold text-gray-900">{stats.totalReviews}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                  <ApperIcon name="MessageSquare" className="w-6 h-6 text-white" />
                </div>
              </div>
            </Card>
            
            <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Swaps</p>
                  <p className="text-2xl font-display font-bold text-gray-900">{stats.activeSwaps}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                  <ApperIcon name="ArrowRightLeft" className="w-6 h-6 text-white" />
                </div>
              </div>
            </Card>
            
            <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Bookmarked</p>
                  <p className="text-2xl font-display font-bold text-gray-900">{stats.bookmarkedHostels}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center">
                  <ApperIcon name="Heart" className="w-6 h-6 text-white" />
                </div>
              </div>
            </Card>
            
            <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Helpfulness Score</p>
                  <p className="text-2xl font-display font-bold text-gray-900">{stats.helpfulnessScore}%</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                  <ApperIcon name="ThumbsUp" className="w-6 h-6 text-white" />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-gray-200 mb-8">
          <nav className="flex gap-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <ApperIcon name={tab.icon} className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
        
        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="pb-12"
        >
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Reviews */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-display font-semibold text-gray-900">Recent Reviews</h3>
                  <Button variant="outline" size="sm" icon="Plus">
                    Write Review
                  </Button>
                </div>
                <div className="space-y-4">
                  {recentReviews.map((review) => (
                    <div key={review.Id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-medium text-gray-900">{review.hostelName}</h4>
                          <StarRating rating={review.overallRating} size="xs" readonly />
                        </div>
                        <p className="text-sm text-gray-600 line-clamp-2">{review.text}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs text-gray-500">{review.date}</span>
                          <Badge variant="success" size="xs">
                            {review.upvotes} upvotes
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
              
              {/* Active Swaps */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-display font-semibold text-gray-900">Active Swaps</h3>
                  <Button variant="outline" size="sm" icon="Plus">
                    Post Swap
                  </Button>
                </div>
                <div className="space-y-4">
                  {activeSwaps.map((swap) => (
                    <div key={swap.Id} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{swap.title}</h4>
                        <Badge variant={swap.status === 'active' ? 'success' : 'warning'} size="sm">
                          {swap.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{swap.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs text-gray-500">{swap.date}</span>
                        <span className="text-xs text-gray-500">•</span>
                        <span className="text-xs text-gray-500">{swap.interested} interested</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}
          
          {activeTab === 'reviews' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-display font-semibold text-gray-900">My Reviews</h3>
                <Button variant="primary" icon="Plus">
                  Write New Review
                </Button>
              </div>
              
              <div className="grid grid-cols-1 gap-6">
                {recentReviews.map((review) => (
                  <Card key={review.Id} className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="text-lg font-medium text-gray-900">{review.hostelName}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <StarRating rating={review.overallRating} size="sm" readonly />
                          <span className="text-sm text-gray-500">{review.date}</span>
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
                    <p className="text-gray-700 mb-4">{review.text}</p>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1 text-green-600">
                        <ApperIcon name="ThumbsUp" className="w-4 h-4" />
                        <span className="text-sm">{review.upvotes}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-500">
                        <ApperIcon name="MessageCircle" className="w-4 h-4" />
                        <span className="text-sm">{review.replies || 0}</span>
                      </div>
                    </div>
                  </Card>
                ))}
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
                {activeSwaps.map((swap) => (
                  <Card key={swap.Id} className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="text-lg font-medium text-gray-900">{swap.title}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant={swap.status === 'active' ? 'success' : 'warning'} size="sm">
                            {swap.status}
                          </Badge>
                          <span className="text-sm text-gray-500">{swap.date}</span>
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
                    <p className="text-gray-700 mb-4">{swap.description}</p>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1 text-blue-600">
                        <ApperIcon name="Users" className="w-4 h-4" />
                        <span className="text-sm">{swap.interested} interested</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-500">
                        <ApperIcon name="MessageCircle" className="w-4 h-4" />
                        <span className="text-sm">{swap.messages || 0} messages</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
          
          {activeTab === 'bookmarks' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-display font-semibold text-gray-900">Bookmarked Hostels</h3>
                <span className="text-sm text-gray-500">{bookmarkedHostels.length} saved</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {bookmarkedHostels.map((hostel) => (
                  <Card key={hostel.Id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <div className="relative h-48">
                      <img
                        src={hostel.image}
                        alt={hostel.name}
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
                      <h4 className="font-medium text-gray-900 mb-2">{hostel.name}</h4>
                      <div className="flex items-center gap-2 mb-2">
                        <StarRating rating={hostel.rating} size="xs" readonly />
                        <span className="text-sm text-gray-500">({hostel.reviews} reviews)</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{hostel.location}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-primary-600">₹{hostel.price}/month</span>
                        <Link to={`/hostels/${hostel.Id}`}>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
          
          {activeTab === 'profile' && (
            <div className="max-w-2xl">
              <Card className="p-6">
                <h3 className="text-xl font-display font-semibold text-gray-900 mb-6">Profile Settings</h3>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <Avatar src={user.avatar} name={user.name} size="xl" />
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
                        defaultValue={user.name}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        defaultValue={user.email}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        University
                      </label>
                      <input
                        type="text"
                        defaultValue={user.university}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Course
                      </label>
                      <input
                        type="text"
                        defaultValue={user.course}
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
                      defaultValue={user.bio}
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
      </section>
    </div>
  )
}

export default Dashboard