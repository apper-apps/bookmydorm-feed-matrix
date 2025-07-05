import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import Card from '@/components/atoms/Card'

const Empty = ({ 
  message = 'No data found',
  description = 'Try adjusting your search or filters to find what you\'re looking for.',
  action,
  actionLabel = 'Get Started',
  icon = 'Search',
  className = '',
  ...props 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex items-center justify-center p-8 ${className}`}
      {...props}
    >
      <Card className="max-w-md text-center">
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center"
        >
          <ApperIcon name={icon} className="w-10 h-10 text-gray-400" />
        </motion.div>
        
        <h3 className="text-xl font-display font-semibold text-gray-900 mb-2">
          {message}
        </h3>
        
        <p className="text-gray-600 mb-6 leading-relaxed">
          {description}
        </p>
        
        {action && (
          <div className="flex items-center justify-center gap-3">
            <Button
              variant="primary"
              onClick={action}
              icon="Plus"
            >
              {actionLabel}
            </Button>
            <Button
              variant="outline"
              onClick={() => window.location.reload()}
              icon="RefreshCw"
            >
              Refresh
            </Button>
          </div>
        )}
        
        <div className="mt-6 grid grid-cols-3 gap-4 text-center">
          <div className="p-3 bg-gray-50 rounded-lg">
            <ApperIcon name="Search" className="w-6 h-6 text-gray-400 mx-auto mb-2" />
            <p className="text-xs text-gray-600">Search</p>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <ApperIcon name="Filter" className="w-6 h-6 text-gray-400 mx-auto mb-2" />
            <p className="text-xs text-gray-600">Filter</p>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <ApperIcon name="RefreshCw" className="w-6 h-6 text-gray-400 mx-auto mb-2" />
            <p className="text-xs text-gray-600">Refresh</p>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

export default Empty