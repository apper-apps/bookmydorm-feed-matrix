import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import Card from '@/components/atoms/Card'
import Input from '@/components/atoms/Input'
import Badge from '@/components/atoms/Badge'
import { swapService } from '@/services/api/swapService'

const CreateSwapRequest = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    // Current Room Details
    currentHostelName: '',
    currentRoomNumber: '',
    currentRoomType: '',
    currentRent: '',
    currentLocation: '',
    currentAmenities: [],
    
    // Desired Room Details
    desiredHostelName: '',
    desiredRoomType: '',
    desiredMaxRent: '',
    desiredLocation: '',
    desiredAmenities: [],
    
    // Additional Details
    swapReason: '',
    urgency: 'medium',
    description: '',
    contactPreference: 'message',
    availableFrom: ''
  })
  
  const roomTypes = ['Single', 'Double', 'Triple', 'Shared']
  const amenityOptions = ['WiFi', 'AC', 'Laundry', 'Mess', 'Security', 'Parking', 'Study Room', 'Recreation']
  const urgencyOptions = [
    { value: 'low', label: 'Low Priority', color: 'text-green-600 bg-green-50' },
    { value: 'medium', label: 'Medium Priority', color: 'text-yellow-600 bg-yellow-50' },
    { value: 'high', label: 'High Priority', color: 'text-red-600 bg-red-50' }
  ]
  
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  const handleAmenityToggle = (amenity, field) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(amenity)
        ? prev[field].filter(a => a !== amenity)
        : [...prev[field], amenity]
    }))
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validate required fields
    if (!formData.currentHostelName || !formData.currentRoomNumber || !formData.currentRoomType) {
      toast.error('Please fill in all current room details')
      return
    }
    
    if (!formData.desiredRoomType || !formData.desiredMaxRent) {
      toast.error('Please fill in desired room details')
      return
    }
    
    try {
      setLoading(true)
      
      const swapData = {
        userId: 1, // Mock user ID
        user: {
          Id: 1,
          name: 'John Doe',
          avatar: null
        },
        currentRoom: {
          hostelName: formData.currentHostelName,
          roomNumber: formData.currentRoomNumber,
          type: formData.currentRoomType,
          rent: parseInt(formData.currentRent),
          location: formData.currentLocation,
          amenities: formData.currentAmenities
        },
        desiredRoom: {
          hostelName: formData.desiredHostelName || 'Any',
          type: formData.desiredRoomType,
          maxRent: parseInt(formData.desiredMaxRent),
          preferredLocation: formData.desiredLocation || 'Any',
          requiredAmenities: formData.desiredAmenities
        },
        description: formData.description,
        swapReason: formData.swapReason,
        urgency: formData.urgency,
        status: 'active',
        createdAt: new Date().toISOString()
      }
      
      await swapService.create(swapData)
      toast.success('Swap request posted successfully!')
      navigate('/room-swaps')
    } catch (error) {
      toast.error('Failed to post swap request. Please try again.')
      console.error('Error posting swap request:', error)
    } finally {
      setLoading(false)
    }
  }
  
  const nextStep = () => {
    if (step < 3) setStep(step + 1)
  }
  
  const prevStep = () => {
    if (step > 1) setStep(step - 1)
  }
  
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
            Back to Room Swaps
          </button>
          
          <div className="text-center">
            <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
              Post Room Swap Request
            </h1>
            <p className="text-gray-600">
              Find your perfect room match by posting your swap request
            </p>
          </div>
          
          {/* Progress Steps */}
          <div className="mt-8 flex items-center justify-center">
            <div className="flex items-center gap-4">
              {[1, 2, 3].map((stepNumber) => (
                <div key={stepNumber} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${
                    stepNumber <= step 
                      ? 'bg-primary-500 text-white' 
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    {stepNumber}
                  </div>
                  {stepNumber < 3 && (
                    <div className={`w-16 h-1 mx-2 ${
                      stepNumber < step ? 'bg-primary-500' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Step {step} of 3: {
                step === 1 ? 'Current Room Details' :
                step === 2 ? 'Desired Room Details' :
                'Additional Information'
              }
            </p>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Step 1: Current Room Details */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-6">
                <h2 className="text-xl font-display font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <ApperIcon name="Home" className="w-6 h-6 text-red-600" />
                  Current Room Details
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Hostel Name"
                    name="currentHostelName"
                    value={formData.currentHostelName}
                    onChange={handleInputChange}
                    placeholder="e.g., Sunrise Hostel"
                    required
                  />
                  
                  <Input
                    label="Room Number"
                    name="currentRoomNumber"
                    value={formData.currentRoomNumber}
                    onChange={handleInputChange}
                    placeholder="e.g., A-101"
                    required
                  />
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Room Type
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {roomTypes.map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, currentRoomType: type }))}
                          className={`p-3 text-sm rounded-lg border-2 transition-all duration-200 ${
                            formData.currentRoomType === type
                              ? 'border-primary-500 bg-primary-50 text-primary-700'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <Input
                    label="Current Rent (₹/month)"
                    name="currentRent"
                    type="number"
                    value={formData.currentRent}
                    onChange={handleInputChange}
                    placeholder="e.g., 8000"
                  />
                  
                  <Input
                    label="Location"
                    name="currentLocation"
                    value={formData.currentLocation}
                    onChange={handleInputChange}
                    placeholder="e.g., Near Main Gate"
                  />
                </div>
                
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Current Amenities
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {amenityOptions.map((amenity) => (
                      <button
                        key={amenity}
                        type="button"
                        onClick={() => handleAmenityToggle(amenity, 'currentAmenities')}
                        className={`p-3 text-sm rounded-lg border-2 transition-all duration-200 ${
                          formData.currentAmenities.includes(amenity)
                            ? 'border-green-500 bg-green-50 text-green-700'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {amenity}
                      </button>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
          
          {/* Step 2: Desired Room Details */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-6">
                <h2 className="text-xl font-display font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <ApperIcon name="Target" className="w-6 h-6 text-green-600" />
                  Desired Room Details
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Preferred Hostel (Optional)"
                    name="desiredHostelName"
                    value={formData.desiredHostelName}
                    onChange={handleInputChange}
                    placeholder="Any hostel or specify preference"
                  />
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Desired Room Type
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {roomTypes.map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, desiredRoomType: type }))}
                          className={`p-3 text-sm rounded-lg border-2 transition-all duration-200 ${
                            formData.desiredRoomType === type
                              ? 'border-primary-500 bg-primary-50 text-primary-700'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <Input
                    label="Maximum Rent (₹/month)"
                    name="desiredMaxRent"
                    type="number"
                    value={formData.desiredMaxRent}
                    onChange={handleInputChange}
                    placeholder="e.g., 10000"
                    required
                  />
                  
                  <Input
                    label="Preferred Location"
                    name="desiredLocation"
                    value={formData.desiredLocation}
                    onChange={handleInputChange}
                    placeholder="e.g., Near Library"
                  />
                </div>
                
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Required Amenities
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {amenityOptions.map((amenity) => (
                      <button
                        key={amenity}
                        type="button"
                        onClick={() => handleAmenityToggle(amenity, 'desiredAmenities')}
                        className={`p-3 text-sm rounded-lg border-2 transition-all duration-200 ${
                          formData.desiredAmenities.includes(amenity)
                            ? 'border-green-500 bg-green-50 text-green-700'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {amenity}
                      </button>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
          
          {/* Step 3: Additional Information */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-6">
                <h2 className="text-xl font-display font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <ApperIcon name="FileText" className="w-6 h-6 text-blue-600" />
                  Additional Information
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Reason for Swap
                    </label>
                    <textarea
                      name="swapReason"
                      rows={3}
                      value={formData.swapReason}
                      onChange={handleInputChange}
                      placeholder="e.g., Closer to campus, better amenities, etc."
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Urgency Level
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {urgencyOptions.map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, urgency: option.value }))}
                          className={`p-4 text-sm rounded-lg border-2 transition-all duration-200 ${
                            formData.urgency === option.value
                              ? `border-current ${option.color}`
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Additional Description
                    </label>
                    <textarea
                      name="description"
                      rows={4}
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Any additional details about your swap request..."
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      label="Available From"
                      name="availableFrom"
                      type="date"
                      value={formData.availableFrom}
                      onChange={handleInputChange}
                    />
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Contact Preference
                      </label>
                      <select
                        name="contactPreference"
                        value={formData.contactPreference}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      >
                        <option value="message">Message</option>
                        <option value="email">Email</option>
                        <option value="phone">Phone</option>
                      </select>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
          
          {/* Navigation Buttons */}
          <div className="flex items-center justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={step === 1}
              icon="ArrowLeft"
            >
              Previous
            </Button>
            
            <div className="flex items-center gap-3">
              {step < 3 ? (
                <Button
                  type="button"
                  variant="primary"
                  onClick={nextStep}
                  icon="ArrowRight"
                  iconPosition="right"
                >
                  Next
                </Button>
              ) : (
                <Button
                  type="submit"
                  variant="primary"
                  loading={loading}
                  icon="Send"
                  className="px-8"
                >
                  Post Swap Request
                </Button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateSwapRequest