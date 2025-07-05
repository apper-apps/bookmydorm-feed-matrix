import { motion } from 'framer-motion'
import { format } from 'date-fns'
import ApperIcon from '@/components/ApperIcon'
import Card from '@/components/atoms/Card'
import Badge from '@/components/atoms/Badge'
import Button from '@/components/atoms/Button'
import Avatar from '@/components/atoms/Avatar'

const SwapCard = ({ 
  swapRequest,
  currentUser,
  onContact,
  className = '',
  ...props 
}) => {
const {
    Id,
    user,
    currentRoom,
    desiredRoom,
    status,
    createdAt,
    description,
    urgency,
    requesterId,
    requesterName,
    requesterEmail
  } = swapRequest
  
  // Create user object from available data with null safety
  const safeUser = user || {
    Id: requesterId,
    name: requesterName,
    email: requesterEmail,
    avatar: null
  }
  
  const isOwnRequest = currentUser?.Id === safeUser?.Id
  const statusConfig = {
    active: { variant: 'success', label: 'Active' },
    pending: { variant: 'warning', label: 'Pending' },
    matched: { variant: 'primary', label: 'Matched' },
    expired: { variant: 'default', label: 'Expired' }
  }
  
  const urgencyConfig = {
    low: { variant: 'default', label: 'Low Priority' },
    medium: { variant: 'warning', label: 'Medium Priority' },
    high: { variant: 'error', label: 'High Priority' }
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={className}
      {...props}
    >
      <Card hover className="group">
        <div className="flex items-start gap-4 mb-4">
<Avatar 
            src={safeUser?.avatar}
            name={safeUser?.name || 'Unknown User'}
            size="md"
          />
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h4 className="font-medium text-gray-900">{safeUser?.name || 'Unknown User'}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <Badge {...statusConfig[status]} size="sm" />
                  <Badge {...urgencyConfig[urgency]} size="sm" />
                  <span className="text-sm text-gray-500">
                    {format(new Date(createdAt), 'MMM d, yyyy')}
                  </span>
                </div>
              </div>
              {isOwnRequest && (
                <Button variant="outline" size="sm" icon="Edit2">
                  Edit
                </Button>
              )}
            </div>
            
            <p className="text-gray-700 mb-4 leading-relaxed">{description}</p>
          </div>
        </div>
        
        {/* Room Swap Details */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Current Room */}
          <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <ApperIcon name="Home" className="w-5 h-5 text-red-600" />
              <h5 className="font-medium text-red-900">Current Room</h5>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-red-700">Hostel</span>
                <span className="text-sm font-medium text-red-900">{currentRoom.hostelName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-red-700">Room</span>
                <span className="text-sm font-medium text-red-900">{currentRoom.roomNumber}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-red-700">Type</span>
                <span className="text-sm font-medium text-red-900">{currentRoom.type}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-red-700">Rent</span>
                <span className="text-sm font-medium text-red-900">₹{currentRoom.rent}/month</span>
              </div>
            </div>
          </div>
          
          {/* Desired Room */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <ApperIcon name="Target" className="w-5 h-5 text-green-600" />
              <h5 className="font-medium text-green-900">Desired Room</h5>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-green-700">Hostel</span>
                <span className="text-sm font-medium text-green-900">{desiredRoom.hostelName || 'Any'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-green-700">Room Type</span>
                <span className="text-sm font-medium text-green-900">{desiredRoom.type}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-green-700">Budget</span>
                <span className="text-sm font-medium text-green-900">₹{desiredRoom.maxRent}/month</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-green-700">Location</span>
                <span className="text-sm font-medium text-green-900">{desiredRoom.preferredLocation}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Required Amenities */}
        {desiredRoom.requiredAmenities && desiredRoom.requiredAmenities.length > 0 && (
          <div className="mb-6">
            <h6 className="text-sm font-medium text-gray-700 mb-2">Required Amenities</h6>
            <div className="flex flex-wrap gap-2">
              {desiredRoom.requiredAmenities.map((amenity) => (
                <Badge key={amenity} variant="primary" size="sm">
                  {amenity}
                </Badge>
              ))}
            </div>
          </div>
        )}
        
        {/* Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              icon="Heart"
              className="text-gray-500 hover:text-red-500"
            >
              Save
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              icon="Share2"
              className="text-gray-500 hover:text-blue-500"
            >
              Share
            </Button>
          </div>
          
          {!isOwnRequest && (
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                icon="MessageCircle"
                onClick={() => onContact && onContact(swapRequest)}
              >
                Contact
              </Button>
              <Button 
                variant="primary" 
                size="sm" 
                icon="ArrowRightLeft"
                onClick={() => onContact && onContact(swapRequest)}
              >
                Propose Swap
              </Button>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  )
}

export default SwapCard