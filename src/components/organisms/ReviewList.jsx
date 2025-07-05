import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ReviewCard from '@/components/molecules/ReviewCard'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import Button from '@/components/atoms/Button'
import { reviewService } from '@/services/api/reviewService'

const ReviewList = ({ 
  hostelId,
  className = '',
  ...props 
}) => {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [sortBy, setSortBy] = useState('newest')
  const [filterBy, setFilterBy] = useState('all')
  
  useEffect(() => {
    loadReviews()
  }, [hostelId, sortBy, filterBy])
  
  const loadReviews = async () => {
    try {
      setLoading(true)
      setError('')
      
      let data = await reviewService.getByHostelId(hostelId)
      
      // Apply sorting
      if (sortBy === 'newest') {
        data = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      } else if (sortBy === 'oldest') {
        data = data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
      } else if (sortBy === 'highest') {
        data = data.sort((a, b) => {
          const avgA = Object.values(a.ratings).reduce((sum, val) => sum + val, 0) / Object.keys(a.ratings).length
          const avgB = Object.values(b.ratings).reduce((sum, val) => sum + val, 0) / Object.keys(b.ratings).length
          return avgB - avgA
        })
      } else if (sortBy === 'lowest') {
        data = data.sort((a, b) => {
          const avgA = Object.values(a.ratings).reduce((sum, val) => sum + val, 0) / Object.keys(a.ratings).length
          const avgB = Object.values(b.ratings).reduce((sum, val) => sum + val, 0) / Object.keys(b.ratings).length
          return avgA - avgB
        })
      }
      
      // Apply filtering
      if (filterBy !== 'all') {
        data = data.filter(review => review.sentiment === filterBy)
      }
      
      setReviews(data)
    } catch (err) {
      setError('Failed to load reviews. Please try again.')
      console.error('Error loading reviews:', err)
    } finally {
      setLoading(false)
    }
  }
  
  if (loading) {
    return <Loading />
  }
  
  if (error) {
    return <Error message={error} onRetry={loadReviews} />
  }
  
  if (reviews.length === 0) {
    return <Empty message="No reviews yet. Be the first to review!" />
  }
  
  return (
    <div className={`${className}`} {...props}>
      {/* Sort and Filter Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="highest">Highest Rating</option>
            <option value="lowest">Lowest Rating</option>
          </select>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">Filter:</span>
          <div className="flex gap-2">
            <Button
              variant={filterBy === 'all' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setFilterBy('all')}
            >
              All
            </Button>
            <Button
              variant={filterBy === 'positive' ? 'success' : 'outline'}
              size="sm"
              onClick={() => setFilterBy('positive')}
            >
              Positive
            </Button>
            <Button
              variant={filterBy === 'negative' ? 'danger' : 'outline'}
              size="sm"
              onClick={() => setFilterBy('negative')}
            >
              Negative
            </Button>
          </div>
        </div>
      </div>
      
      {/* Reviews */}
      <motion.div
        className="space-y-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
      >
        {reviews.map((review) => (
          <motion.div
            key={review.Id}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
          >
            <ReviewCard review={review} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export default ReviewList