import { useState } from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const StarRating = ({ 
  rating = 0, 
  maxRating = 5, 
  size = 'sm', 
  readonly = false,
  onChange,
  className = '',
  showValue = false,
  ...props 
}) => {
  const [hoverRating, setHoverRating] = useState(0)
  
  const sizes = {
    xs: "w-3 h-3",
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
    xl: "w-8 h-8",
  }
  
  const handleStarClick = (starValue) => {
    if (!readonly && onChange) {
      onChange(starValue)
    }
  }
  
  const handleStarHover = (starValue) => {
    if (!readonly) {
      setHoverRating(starValue)
    }
  }
  
  const handleStarLeave = () => {
    if (!readonly) {
      setHoverRating(0)
    }
  }
  
  return (
    <div className={`flex items-center gap-1 ${className}`} {...props}>
      <div className="flex items-center">
        {Array.from({ length: maxRating }, (_, index) => {
          const starValue = index + 1
          const isActive = starValue <= (hoverRating || rating)
          
          return (
            <motion.button
              key={starValue}
              type="button"
              className={`${readonly ? 'cursor-default' : 'cursor-pointer'} transition-all duration-200`}
              onClick={() => handleStarClick(starValue)}
              onMouseEnter={() => handleStarHover(starValue)}
              onMouseLeave={handleStarLeave}
              whileHover={readonly ? {} : { scale: 1.1 }}
              whileTap={readonly ? {} : { scale: 0.9 }}
              disabled={readonly}
            >
              <ApperIcon
                name={isActive ? "Star" : "Star"}
                className={`${sizes[size]} transition-all duration-200 ${
                  isActive 
                    ? 'text-accent-500 fill-accent-500' 
                    : 'text-gray-300 fill-gray-300'
                }`}
              />
            </motion.button>
          )
        })}
      </div>
      {showValue && (
        <span className="ml-2 text-sm font-medium text-gray-700">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  )
}

export default StarRating