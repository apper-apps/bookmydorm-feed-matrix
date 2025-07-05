import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import Card from '@/components/atoms/Card'
import Input from '@/components/atoms/Input'
import StarRating from '@/components/atoms/StarRating'
import { reviewService } from '@/services/api/reviewService'

const CreateReview = () => {
  const { hostelId } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    roomComfort: 0,
    roomSize: 0,
    cleanliness: 0,
    noiseLevel: 0,
    wifiSpeed: 0,
    messFood: 0,
    security: 0,
    location: 0,
    reviewText: '',
    images: []
  })
  
  const ratingCategories = [
    { key: 'roomComfort', label: 'Room Comfort', icon: 'Bed' },
    { key: 'roomSize', label: 'Room Size', icon: 'Square' },
    { key: 'cleanliness', label: 'Cleanliness', icon: 'Sparkles' },
    { key: 'noiseLevel', label: 'Noise Level', icon: 'Volume2' },
    { key: 'wifiSpeed', label: 'WiFi Speed', icon: 'Wifi' },
    { key: 'messFood', label: 'Mess Food', icon: 'Utensils' },
    { key: 'security', label: 'Security', icon: 'Shield' },
    { key: 'location', label: 'Location', icon: 'MapPin' }
  ]
  
  const handleRatingChange = (category, rating) => {
    setFormData(prev => ({
      ...prev,
      [category]: rating
    }))
  }
  
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    // In a real app, you would upload these to a server
    // For now, we'll just store the file names
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...files.map(f => f.name)]
    }))
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validate form
    const ratings = ratingCategories.map(cat => formData[cat.key])
    const hasAllRatings = ratings.every(rating => rating > 0)
    
    if (!hasAllRatings) {
      toast.error('Please provide ratings for all categories')
      return
    }
    
    if (!formData.reviewText.trim()) {
      toast.error('Please write a review')
      return
    }
    
    try {
      setLoading(true)
      
      const reviewData = {
        hostelId: parseInt(hostelId),
        userId: 1, // Mock user ID
        userName: 'John Doe',
        userAvatar: null,
        ratings: {
          roomComfort: formData.roomComfort,
          roomSize: formData.roomSize,
          cleanliness: formData.cleanliness,
          noiseLevel: formData.noiseLevel,
          wifiSpeed: formData.wifiSpeed,
          messFood: formData.messFood,
          security: formData.security,
          location: formData.location
        },
        text: formData.reviewText,
        images: formData.images,
        upvotes: 0,
        downvotes: 0,
        sentiment: 'neutral',
        createdAt: new Date().toISOString()
      }
      
      await reviewService.create(reviewData)
      toast.success('Review submitted successfully!')
      navigate(`/hostels/${hostelId}`)
    } catch (error) {
      toast.error('Failed to submit review. Please try again.')
      console.error('Error submitting review:', error)
    } finally {
      setLoading(false)
    }
  }
  
  const overallRating = ratingCategories.reduce((sum, cat) => sum + formData[cat.key], 0) / ratingCategories.length
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-primary-600 transition-colors duration-200 mb-4"
          >
            <ApperIcon name="ArrowLeft" className="w-4 h-4 mr-2" />
            Back to Hostel
          </button>
          
          <div className="text-center">
            <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
              Write a Review
            </h1>
            <p className="text-gray-600">
              Share your experience to help fellow students
            </p>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Rating Section */}
          <Card className="p-6">
            <h2 className="text-xl font-display font-semibold text-gray-900 mb-6">
              Rate Your Experience
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ratingCategories.map((category) => (
                <motion.div
                  key={category.key}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <ApperIcon name={category.icon} className="w-5 h-5 text-gray-600" />
                    <span className="font-medium text-gray-900">{category.label}</span>
                  </div>
                  <StarRating
                    rating={formData[category.key]}
                    onChange={(rating) => handleRatingChange(category.key, rating)}
                    size="md"
                  />
                </motion.div>
              ))}
            </div>
            
            {/* Overall Rating Display */}
            {overallRating > 0 && (
              <div className="mt-6 p-4 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg">
                <div className="flex items-center justify-center gap-4">
                  <span className="text-lg font-medium text-gray-900">Overall Rating:</span>
                  <div className="flex items-center gap-2">
                    <StarRating rating={overallRating} size="lg" readonly />
                    <span className="text-2xl font-bold gradient-text">
                      {overallRating.toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </Card>
          
          {/* Review Text */}
          <Card className="p-6">
            <h2 className="text-xl font-display font-semibold text-gray-900 mb-6">
              Write Your Review
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Share your experience
                </label>
                <textarea
                  name="reviewText"
                  rows={6}
                  value={formData.reviewText}
                  onChange={handleInputChange}
                  placeholder="Tell us about your stay at this hostel. What did you like? What could be improved? Your honest feedback helps other students make informed decisions."
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 placeholder-gray-400"
                  required
                />
              </div>
              
              <div className="text-sm text-gray-500">
                <p className="mb-2">Tips for writing a helpful review:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Be specific about what you liked or disliked</li>
                  <li>Mention room conditions, cleanliness, and facilities</li>
                  <li>Share information about location and accessibility</li>
                  <li>Be honest and constructive in your feedback</li>
                </ul>
              </div>
            </div>
          </Card>
          
          {/* Image Upload */}
          <Card className="p-6">
            <h2 className="text-xl font-display font-semibold text-gray-900 mb-6">
              Add Photos (Optional)
            </h2>
            
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center hover:border-primary-300 transition-colors duration-200">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer"
                >
                  <ApperIcon name="Upload" className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg font-medium text-gray-900 mb-2">
                    Upload room photos
                  </p>
                  <p className="text-sm text-gray-500">
                    PNG, JPG up to 5MB each. Max 5 photos.
                  </p>
                </label>
              </div>
              
              {formData.images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {formData.images.map((image, index) => (
                    <div key={index} className="relative">
                      <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                        <ApperIcon name="Image" className="w-8 h-8 text-gray-400" />
                      </div>
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({
                          ...prev,
                          images: prev.images.filter((_, i) => i !== index)
                        }))}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors duration-200"
                      >
                        <ApperIcon name="X" className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Card>
          
          {/* Submit Button */}
          <div className="flex items-center justify-center gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(-1)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              loading={loading}
              icon="Send"
              className="px-8"
            >
              Submit Review
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateReview