import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Card from '@/components/atoms/Card'
import Badge from '@/components/atoms/Badge'
import Button from '@/components/atoms/Button'
import Avatar from '@/components/atoms/Avatar'

const RoommateCard = ({ 
  roommate,
  compatibility,
  onContact,
  className = '',
  ...props 
}) => {
  // Early return if roommate is null/undefined
  if (!roommate) {
    return (
      <Card className={`p-6 ${className}`} {...props}>
        <div className="flex items-center justify-center h-32">
          <div className="text-center">
            <ApperIcon name="User" className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500 text-sm">Unknown User</p>
          </div>
        </div>
      </Card>
    )
  }

  const {
    Id,
    name = 'Unknown User',
    avatar,
    university = 'Unknown University',
    course = 'Unknown Course',
    year = 'Unknown Year',
    personalityProfile = {},
    preferences = {},
    bio = 'No bio available'
  } = roommate
  
  const getCompatibilityColor = (score) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }
  
  const getCompatibilityVariant = (score) => {
    if (score >= 80) return 'success'
    if (score >= 60) return 'warning'
    return 'error'
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
            src={avatar}
            name={name}
            size="lg"
          />
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h4 className="font-display font-semibold text-gray-900 text-lg">{name}</h4>
                <p className="text-sm text-gray-600">{course}, {year} year</p>
                <p className="text-sm text-gray-500">{university}</p>
              </div>
              <div className="text-center">
                <div className={`text-2xl font-bold ${getCompatibilityColor(compatibility)}`}>
                  {compatibility}%
                </div>
                <Badge variant={getCompatibilityVariant(compatibility)} size="sm">
                  Match
                </Badge>
              </div>
            </div>
            
            <p className="text-gray-700 mb-4 leading-relaxed">{bio}</p>
          </div>
        </div>
        
        {/* Personality Traits */}
        <div className="mb-6">
          <h6 className="text-sm font-medium text-gray-700 mb-3">Personality Traits</h6>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(personalityProfile).map(([trait, value]) => (
              <div key={trait} className="flex items-center justify-between">
                <span className="text-sm text-gray-600 capitalize">
                  {trait.replace(/([A-Z])/g, ' $1')}
                </span>
                <div className="flex items-center gap-2">
                  <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full transition-all duration-300"
                      style={{ width: `${(value / 10) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-700">{value}/10</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Preferences */}
        <div className="mb-6">
          <h6 className="text-sm font-medium text-gray-700 mb-3">Preferences</h6>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Sleep Schedule</span>
              <Badge variant="primary" size="sm">
                {preferences.sleepSchedule}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Study Time</span>
              <Badge variant="primary" size="sm">
                {preferences.studyTime}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Cleanliness</span>
              <Badge variant="primary" size="sm">
                {preferences.cleanliness}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Social Level</span>
              <Badge variant="primary" size="sm">
                {preferences.socialLevel}
              </Badge>
            </div>
          </div>
        </div>
        
        {/* Common Interests */}
        {preferences.interests && preferences.interests.length > 0 && (
          <div className="mb-6">
            <h6 className="text-sm font-medium text-gray-700 mb-3">Interests</h6>
            <div className="flex flex-wrap gap-2">
              {preferences.interests.map((interest) => (
                <Badge key={interest} variant="accent" size="sm">
                  {interest}
                </Badge>
              ))}
            </div>
          </div>
        )}
        
        {/* Compatibility Details */}
        <div className="mb-6 p-4 bg-gradient-to-br from-primary-50 to-secondary-50 rounded-lg">
          <h6 className="text-sm font-medium text-primary-900 mb-2">Why you're compatible</h6>
          <ul className="text-sm text-primary-800 space-y-1">
            <li className="flex items-center gap-2">
              <ApperIcon name="Check" className="w-4 h-4 text-primary-600" />
              Similar sleep schedules and study preferences
            </li>
            <li className="flex items-center gap-2">
              <ApperIcon name="Check" className="w-4 h-4 text-primary-600" />
              Both prefer organized and clean living spaces
            </li>
            <li className="flex items-center gap-2">
              <ApperIcon name="Check" className="w-4 h-4 text-primary-600" />
              Shared interests in technology and reading
            </li>
          </ul>
        </div>
        
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
          
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              icon="MessageCircle"
              onClick={() => onContact && onContact(roommate)}
            >
              Message
            </Button>
            <Button 
              variant="primary" 
              size="sm" 
              icon="UserPlus"
              onClick={() => onContact && onContact(roommate)}
            >
              Connect
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

export default RoommateCard