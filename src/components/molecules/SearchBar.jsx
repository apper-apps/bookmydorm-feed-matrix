import { useState } from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Input from '@/components/atoms/Input'
import Button from '@/components/atoms/Button'

const SearchBar = ({ 
  placeholder = "Search hostels, locations, or amenities...",
  onSearch,
  className = '',
  showFilters = true,
  ...props 
}) => {
  const [query, setQuery] = useState('')
  const [isExpanded, setIsExpanded] = useState(false)
  
  const handleSubmit = (e) => {
    e.preventDefault()
    if (onSearch) {
      onSearch(query)
    }
  }
  
  const handleClear = () => {
    setQuery('')
    if (onSearch) {
      onSearch('')
    }
  }
  
  return (
    <div className={`relative ${className}`} {...props}>
      <motion.form
        onSubmit={handleSubmit}
        className="relative"
        initial={{ scale: 0.98 }}
        animate={{ scale: isExpanded ? 1.02 : 1 }}
        transition={{ duration: 0.2 }}
      >
        <div className="relative">
          <Input
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsExpanded(true)}
            onBlur={() => setIsExpanded(false)}
            icon="Search"
            iconPosition="left"
            className="pr-20 text-base py-4 bg-white/80 backdrop-blur-sm border-gray-200 focus:bg-white"
          />
          
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            {query && (
              <button
                type="button"
                onClick={handleClear}
                className="p-1 text-gray-400 hover:text-gray-600 transition-colors duration-200 mr-2"
              >
                <ApperIcon name="X" className="w-4 h-4" />
              </button>
            )}
            
            <Button
              type="submit"
              variant="primary"
              size="sm"
              className="px-3 py-2"
            >
              <ApperIcon name="Search" className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </motion.form>
      
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: isExpanded ? 1 : 0, y: isExpanded ? 0 : -10 }}
          transition={{ duration: 0.2 }}
          className="absolute top-full left-0 right-0 mt-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200 p-4 z-10"
        >
          <div className="flex flex-wrap gap-2">
            <button className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-full transition-colors duration-200">
              Near Campus
            </button>
            <button className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-full transition-colors duration-200">
              AC Rooms
            </button>
            <button className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-full transition-colors duration-200">
              Good WiFi
            </button>
            <button className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-full transition-colors duration-200">
              Under ₹10k
            </button>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default SearchBar