import { motion } from 'framer-motion'
import { format } from 'date-fns'
import ApperIcon from '@/components/ApperIcon'
import Card from '@/components/atoms/Card'
import Badge from '@/components/atoms/Badge'
import StarRating from '@/components/atoms/StarRating'
import Avatar from '@/components/atoms/Avatar'

const ReviewCard = ({ 
  review,
  className = '',
  ...props 
}) => {
  const {
    Id,
    userName,
    userAvatar,
    ratings,
    text,
    images,
    upvotes,
    downvotes,
    createdAt,
    sentiment
  } = review
  
  const overallRating = Object.values(ratings).reduce((acc, rating) => acc + rating, 0) / Object.keys(ratings).length
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={className}
      {...props}
    >
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <div className="flex items-start gap-4 mb-4">
          <Avatar 
            src={userAvatar}
            name={userName}
            size="md"
          />
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h4 className="font-medium text-gray-900">{userName}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <StarRating rating={overallRating} size="sm" readonly />
                  <span className="text-sm text-gray-500">
                    {format(new Date(createdAt), 'MMM d, yyyy')}
                  </span>
                </div>
              </div>
              {sentiment && (
                <Badge 
                  variant={
                    sentiment === 'positive' ? 'success' : 
                    sentiment === 'negative' ? 'error' : 'default'
                  }
                  size="sm"
                >
                  {sentiment}
                </Badge>
              )}
            </div>
            
            {/* Individual Ratings */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              {Object.entries(ratings).map(([category, rating]) => (
                <div key={category} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 capitalize">
                    {category.replace(/([A-Z])/g, ' $1')}
                  </span>
                  <StarRating rating={rating} size="xs" readonly />
                </div>
              ))}
            </div>
            
            {/* Review Text */}
            <p className="text-gray-700 mb-4 leading-relaxed">{text}</p>
            
            {/* Images */}
            {images && images.length > 0 && (
              <div className="grid grid-cols-3 gap-2 mb-4">
                {images.slice(0, 3).map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Review image ${index + 1}`}
                    className="w-full h-20 object-cover rounded-lg"
                  />
                ))}
              </div>
            )}
            
            {/* Actions */}
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-1 text-gray-500 hover:text-green-600 transition-colors duration-200">
                <ApperIcon name="ThumbsUp" className="w-4 h-4" />
                <span className="text-sm">{upvotes}</span>
              </button>
              <button className="flex items-center gap-1 text-gray-500 hover:text-red-600 transition-colors duration-200">
                <ApperIcon name="ThumbsDown" className="w-4 h-4" />
                <span className="text-sm">{downvotes}</span>
              </button>
              <button className="flex items-center gap-1 text-gray-500 hover:text-blue-600 transition-colors duration-200">
                <ApperIcon name="MessageCircle" className="w-4 h-4" />
                <span className="text-sm">Reply</span>
              </button>
              <button className="flex items-center gap-1 text-gray-500 hover:text-gray-700 transition-colors duration-200">
                <ApperIcon name="Flag" className="w-4 h-4" />
                <span className="text-sm">Report</span>
              </button>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

export default ReviewCard