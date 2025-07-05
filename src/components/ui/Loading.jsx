import { motion } from 'framer-motion'

const Loading = ({ variant = 'skeleton', className = '', ...props }) => {
  if (variant === 'spinner') {
    return (
      <div className={`flex items-center justify-center p-8 ${className}`} {...props}>
        <motion.div
          className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    )
  }
  
  return (
    <div className={`space-y-6 ${className}`} {...props}>
      {/* Header Skeleton */}
      <div className="shimmer h-8 bg-gray-200 rounded-lg w-64"></div>
      
      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Image Skeleton */}
            <div className="shimmer h-48 bg-gray-200"></div>
            
            {/* Content Skeleton */}
            <div className="p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="shimmer h-6 bg-gray-200 rounded w-32"></div>
                  <div className="shimmer h-4 bg-gray-200 rounded w-24"></div>
                </div>
                <div className="shimmer h-8 bg-gray-200 rounded w-16"></div>
              </div>
              
              <div className="flex gap-2">
                <div className="shimmer h-6 bg-gray-200 rounded w-16"></div>
                <div className="shimmer h-6 bg-gray-200 rounded w-20"></div>
                <div className="shimmer h-6 bg-gray-200 rounded w-14"></div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="shimmer h-4 bg-gray-200 rounded w-12"></div>
                <div className="shimmer h-4 bg-gray-200 rounded w-8"></div>
                <div className="shimmer h-4 bg-gray-200 rounded w-16"></div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="shimmer h-4 bg-gray-200 rounded w-20"></div>
                <div className="shimmer h-4 bg-gray-200 rounded w-24"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Loading