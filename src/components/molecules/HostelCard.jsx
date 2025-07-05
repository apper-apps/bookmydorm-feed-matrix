import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ApperIcon from '@/components/ApperIcon'
import Card from '@/components/atoms/Card'
import Badge from '@/components/atoms/Badge'
import StarRating from '@/components/atoms/StarRating'

const HostelCard = ({ 
  hostel,
  className = '',
  ...props 
}) => {
  const {
    Id,
    name,
    location,
    overallRating,
    totalReviews,
    roomTypes,
    amenities,
    images,
    priceRange,
    availability
  } = hostel
  
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className={className}
      {...props}
    >
      <Link to={`/hostels/${Id}`}>
        <Card hover className="overflow-hidden group">
          {/* Image */}
          <div className="relative h-48 overflow-hidden">
            <img
              src={images?.[0] || '/api/placeholder/400/240'}
              alt={name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute top-4 right-4">
              <Badge 
                variant={availability > 0 ? "success" : "error"}
                className="bg-white/90 backdrop-blur-sm"
              >
                {availability > 0 ? `${availability} Available` : 'Full'}
              </Badge>
            </div>
            <div className="absolute bottom-4 left-4">
              <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg">
                <StarRating rating={overallRating} size="sm" readonly />
                <span className="text-sm font-medium text-gray-700 ml-1">
                  {overallRating}
                </span>
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="p-6">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-xl font-display font-semibold text-gray-900 mb-1">
                  {name}
                </h3>
                <div className="flex items-center text-gray-600">
                  <ApperIcon name="MapPin" className="w-4 h-4 mr-1" />
                  <span className="text-sm">{location}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-display font-bold gradient-text">
                  ₹{priceRange?.min?.toLocaleString()}
                </div>
                <div className="text-sm text-gray-500">per month</div>
              </div>
            </div>
            
            {/* Room Types */}
            <div className="flex flex-wrap gap-2 mb-4">
              {roomTypes?.slice(0, 3).map((type) => (
                <Badge key={type} variant="primary" size="sm">
                  {type}
                </Badge>
              ))}
              {roomTypes?.length > 3 && (
                <Badge variant="default" size="sm">
                  +{roomTypes.length - 3} more
                </Badge>
              )}
            </div>
            
            {/* Amenities */}
            <div className="flex items-center gap-4 mb-4">
              {amenities?.wifi && (
                <div className="flex items-center text-gray-600">
                  <ApperIcon name="Wifi" className="w-4 h-4 mr-1" />
                  <span className="text-sm">WiFi</span>
                </div>
              )}
              {amenities?.ac && (
                <div className="flex items-center text-gray-600">
                  <ApperIcon name="Snowflake" className="w-4 h-4 mr-1" />
                  <span className="text-sm">AC</span>
                </div>
              )}
              {amenities?.laundry && (
                <div className="flex items-center text-gray-600">
                  <ApperIcon name="Shirt" className="w-4 h-4 mr-1" />
                  <span className="text-sm">Laundry</span>
                </div>
              )}
              {amenities?.mess && (
                <div className="flex items-center text-gray-600">
                  <ApperIcon name="Utensils" className="w-4 h-4 mr-1" />
                  <span className="text-sm">Mess</span>
                </div>
              )}
            </div>
            
            {/* Reviews */}
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>{totalReviews} reviews</span>
              <div className="flex items-center text-primary-600">
                <span className="mr-1">View Details</span>
                <ApperIcon name="ArrowRight" className="w-4 h-4" />
              </div>
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  )
}

export default HostelCard