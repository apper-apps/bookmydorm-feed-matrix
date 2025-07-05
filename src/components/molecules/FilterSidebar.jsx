import { useState } from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import Card from '@/components/atoms/Card'

const FilterSidebar = ({ 
  filters = {},
  onFiltersChange,
  className = '',
  ...props 
}) => {
  const [localFilters, setLocalFilters] = useState({
    priceRange: [0, 20000],
    roomType: [],
    amenities: [],
    rating: 0,
    location: '',
    ...filters
  })
  
  const [isCollapsed, setIsCollapsed] = useState(false)
  
  const roomTypes = ['Single', 'Double', 'Triple', 'Shared']
  const amenities = ['WiFi', 'AC', 'Laundry', 'Mess', 'Security', 'Parking', 'Study Room', 'Recreation']
  
  const handleFilterChange = (key, value) => {
    const newFilters = { ...localFilters, [key]: value }
    setLocalFilters(newFilters)
    if (onFiltersChange) {
      onFiltersChange(newFilters)
    }
  }
  
  const handleArrayToggle = (key, value) => {
    const currentArray = localFilters[key] || []
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value]
    handleFilterChange(key, newArray)
  }
  
  const clearFilters = () => {
    const clearedFilters = {
      priceRange: [0, 20000],
      roomType: [],
      amenities: [],
      rating: 0,
      location: '',
    }
    setLocalFilters(clearedFilters)
    if (onFiltersChange) {
      onFiltersChange(clearedFilters)
    }
  }
  
  return (
    <motion.div
      className={`${className}`}
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      {...props}
    >
      <Card className="sticky top-4">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-display font-semibold text-gray-900">
            Filters
          </h3>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-gray-500 hover:text-gray-700"
            >
              Clear All
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsCollapsed(!isCollapsed)}
              icon={isCollapsed ? "ChevronDown" : "ChevronUp"}
              className="text-gray-500 hover:text-gray-700"
            />
          </div>
        </div>
        
        <motion.div
          initial={false}
          animate={{ height: isCollapsed ? 0 : 'auto' }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="space-y-6">
            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Price Range (₹/month)
              </label>
              <div className="px-2">
                <input
                  type="range"
                  min="0"
                  max="20000"
                  step="500"
                  value={localFilters.priceRange[1]}
                  onChange={(e) => handleFilterChange('priceRange', [0, parseInt(e.target.value)])}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                  <span>₹0</span>
                  <span>₹{localFilters.priceRange[1].toLocaleString()}</span>
                </div>
              </div>
            </div>
            
            {/* Room Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Room Type
              </label>
              <div className="grid grid-cols-2 gap-2">
                {roomTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => handleArrayToggle('roomType', type)}
                    className={`px-3 py-2 text-sm rounded-lg border transition-all duration-200 ${
                      localFilters.roomType.includes(type)
                        ? 'bg-primary-500 text-white border-primary-500'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-primary-300'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Amenities */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Amenities
              </label>
              <div className="grid grid-cols-2 gap-2">
                {amenities.map((amenity) => (
                  <button
                    key={amenity}
                    onClick={() => handleArrayToggle('amenities', amenity)}
                    className={`px-3 py-2 text-sm rounded-lg border transition-all duration-200 ${
                      localFilters.amenities.includes(amenity)
                        ? 'bg-accent-500 text-white border-accent-500'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-accent-300'
                    }`}
                  >
                    {amenity}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Minimum Rating */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Minimum Rating
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => handleFilterChange('rating', rating)}
                    className={`flex items-center gap-1 px-3 py-2 text-sm rounded-lg border transition-all duration-200 ${
                      localFilters.rating >= rating
                        ? 'bg-accent-500 text-white border-accent-500'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-accent-300'
                    }`}
                  >
                    <ApperIcon name="Star" className="w-4 h-4" />
                    {rating}+
                  </button>
                ))}
              </div>
            </div>
            
            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Location
              </label>
              <select
                value={localFilters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">All Locations</option>
                <option value="near-campus">Near Campus</option>
                <option value="city-center">City Center</option>
                <option value="transport-hub">Near Transport Hub</option>
                <option value="market-area">Market Area</option>
              </select>
            </div>
          </div>
        </motion.div>
      </Card>
    </motion.div>
  )
}

export default FilterSidebar