import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import Card from '@/components/atoms/Card'
import Badge from '@/components/atoms/Badge'
import StarRating from '@/components/atoms/StarRating'
import ReviewList from '@/components/organisms/ReviewList'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import { hostelService } from '@/services/api/hostelService'

const HostelDetail = () => {
  const { id } = useParams()
  const [hostel, setHostel] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [activeTab, setActiveTab] = useState('overview')
  
  useEffect(() => {
    loadHostel()
  }, [id])
  
  const loadHostel = async () => {
    try {
      setLoading(true)
      setError('')
      const data = await hostelService.getById(parseInt(id))
      setHostel(data)
    } catch (err) {
      setError('Failed to load hostel details. Please try again.')
      console.error('Error loading hostel:', err)
    } finally {
      setLoading(false)
    }
  }
  
  const handleBookmark = () => {
    toast.success('Hostel bookmarked successfully!')
  }
  
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    toast.success('Link copied to clipboard!')
  }
  
  if (loading) {
    return <Loading />
  }
  
  if (error) {
    return <Error message={error} onRetry={loadHostel} />
  }
  
  if (!hostel) {
    return <Error message="Hostel not found" showRetry={false} />
  }
  
  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Home' },
    { id: 'amenities', label: 'Amenities', icon: 'Star' },
    { id: 'reviews', label: 'Reviews', icon: 'MessageSquare' },
    { id: 'location', label: 'Location', icon: 'MapPin' },
  ]
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Link to="/" className="inline-flex items-center text-gray-600 hover:text-primary-600 transition-colors duration-200">
          <ApperIcon name="ArrowLeft" className="w-4 h-4 mr-2" />
          Back to Browse
        </Link>
      </div>
      
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative h-96 rounded-xl overflow-hidden">
              <img
                src={hostel.images[selectedImageIndex]}
                alt={hostel.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  icon="Heart"
                  onClick={handleBookmark}
                  className="bg-white/80 backdrop-blur-sm hover:bg-white"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  icon="Share2"
                  onClick={handleShare}
                  className="bg-white/80 backdrop-blur-sm hover:bg-white"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-4 gap-2">
              {hostel.images.slice(0, 4).map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`relative h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                    selectedImageIndex === index 
                      ? 'border-primary-500 ring-2 ring-primary-200' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${hostel.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {index === 3 && hostel.images.length > 4 && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="text-white font-medium">+{hostel.images.length - 4}</span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
          
          {/* Hostel Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="success" size="sm">
                  {hostel.availability > 0 ? 'Available' : 'Full'}
                </Badge>
                <Badge variant="primary" size="sm">
                  Verified
                </Badge>
              </div>
              
              <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
                {hostel.name}
              </h1>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <StarRating rating={hostel.overallRating} size="sm" readonly />
                  <span className="text-sm font-medium text-gray-700">
                    {hostel.overallRating} ({hostel.totalReviews} reviews)
                  </span>
                </div>
                <div className="flex items-center text-gray-600">
                  <ApperIcon name="MapPin" className="w-4 h-4 mr-1" />
                  <span className="text-sm">{hostel.location}</span>
                </div>
              </div>
              
              <div className="text-3xl font-display font-bold gradient-text mb-4">
                ₹{hostel.priceRange.min.toLocaleString()} - ₹{hostel.priceRange.max.toLocaleString()}
                <span className="text-sm text-gray-500 font-normal ml-2">per month</span>
              </div>
            </div>
            
            {/* Room Types */}
            <div>
              <h3 className="text-lg font-display font-semibold text-gray-900 mb-3">
                Room Types Available
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {hostel.roomTypes.map((type) => (
                  <div key={type} className="p-4 bg-white rounded-lg border border-gray-200 hover:border-primary-300 transition-colors duration-200">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900">{type}</span>
                      <ApperIcon name="Bed" className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Quick Actions */}
            <div className="flex flex-col gap-3">
              <Link to={`/create-review/${hostel.Id}`}>
                <Button
                  variant="primary"
                  size="lg"
                  icon="Edit"
                  className="w-full"
                >
                  Write a Review
                </Button>
              </Link>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  size="lg"
                  icon="MessageCircle"
                >
                  Contact
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  icon="ArrowRightLeft"
                >
                  Request Swap
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Tabs Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
        >
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-display font-semibold text-gray-900 mb-4">
                  About {hostel.name}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {hostel.description || 'This hostel offers comfortable accommodation for students with modern amenities and a friendly environment. Located in a convenient area with easy access to campus and city facilities.'}
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-display font-semibold text-gray-900 mb-4">
                  Highlights
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                    <ApperIcon name="CheckCircle" className="w-6 h-6 text-green-600" />
                    <span className="text-green-800">24/7 Security</span>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                    <ApperIcon name="Wifi" className="w-6 h-6 text-blue-600" />
                    <span className="text-blue-800">High-Speed Internet</span>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg">
                    <ApperIcon name="Utensils" className="w-6 h-6 text-purple-600" />
                    <span className="text-purple-800">Mess Facility</span>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-lg">
                    <ApperIcon name="Car" className="w-6 h-6 text-orange-600" />
                    <span className="text-orange-800">Parking Available</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'amenities' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(hostel.amenities).map(([amenity, available]) => (
                <Card key={amenity} className={`p-4 ${available ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'}`}>
                  <div className="flex items-center gap-3">
                    <ApperIcon 
                      name={available ? "CheckCircle" : "XCircle"} 
                      className={`w-6 h-6 ${available ? 'text-green-600' : 'text-gray-400'}`} 
                    />
                    <span className={`font-medium capitalize ${available ? 'text-green-800' : 'text-gray-600'}`}>
                      {amenity}
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          )}
          
          {activeTab === 'reviews' && (
            <ReviewList hostelId={hostel.Id} />
          )}
          
          {activeTab === 'location' && (
            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="text-xl font-display font-semibold text-gray-900 mb-4">
                  Location & Nearby
                </h3>
                <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg mb-4">
                  <div className="flex items-center justify-center text-gray-500">
                    <ApperIcon name="MapPin" className="w-8 h-8 mr-2" />
                    Map placeholder
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <ApperIcon name="GraduationCap" className="w-5 h-5 text-primary-600" />
                    <span className="text-sm text-gray-700">Campus: 2 km</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ApperIcon name="Bus" className="w-5 h-5 text-primary-600" />
                    <span className="text-sm text-gray-700">Bus Stop: 500m</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ApperIcon name="ShoppingBag" className="w-5 h-5 text-primary-600" />
                    <span className="text-sm text-gray-700">Market: 1 km</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ApperIcon name="Building" className="w-5 h-5 text-primary-600" />
                    <span className="text-sm text-gray-700">ATM: 200m</span>
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

export default HostelDetail