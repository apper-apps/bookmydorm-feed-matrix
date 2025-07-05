import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import Card from '@/components/atoms/Card'

const Error = ({ 
  message = 'Something went wrong. Please try again.',
  onRetry,
  showRetry = true,
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
        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center">
          <ApperIcon name="AlertTriangle" className="w-8 h-8 text-red-600" />
        </div>
        
        <h3 className="text-lg font-display font-semibold text-gray-900 mb-2">
          Oops! Something went wrong
        </h3>
        
        <p className="text-gray-600 mb-6 leading-relaxed">
          {message}
        </p>
        
        {showRetry && onRetry && (
          <div className="flex items-center justify-center gap-3">
            <Button
              variant="primary"
              onClick={onRetry}
              icon="RefreshCw"
            >
              Try Again
            </Button>
            <Button
              variant="outline"
              onClick={() => window.location.reload()}
              icon="RotateCcw"
            >
              Reload Page
            </Button>
          </div>
        )}
        
        <div className="mt-6 text-sm text-gray-500">
          <p>
            If the problem persists, please{' '}
            <button className="text-primary-600 hover:text-primary-700 font-medium">
              contact support
            </button>
          </p>
        </div>
      </Card>
    </motion.div>
  )
}

export default Error