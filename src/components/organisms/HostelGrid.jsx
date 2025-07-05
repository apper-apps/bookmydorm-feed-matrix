import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import HostelCard from '@/components/molecules/HostelCard'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import { hostelService } from '@/services/api/hostelService'

const HostelGrid = ({ 
  filters = {},
  searchQuery = '',
  className = '',
  ...props 
}) => {
  const [hostels, setHostels] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  
  useEffect(() => {
    loadHostels()
  }, [filters, searchQuery])
  
  const loadHostels = async () => {
    try {
      setLoading(true)
      setError('')
      
      let data = await hostelService.getAll()
      
      // Apply filters
      if (filters.priceRange) {
        data = data.filter(hostel => 
          hostel.priceRange.min <= filters.priceRange[1]
        )
      }
      
      if (filters.roomType && filters.roomType.length > 0) {
        data = data.filter(hostel => 
          hostel.roomTypes.some(type => filters.roomType.includes(type))
        )
      }
      
      if (filters.amenities && filters.amenities.length > 0) {
        data = data.filter(hostel => 
          filters.amenities.every(amenity => 
            hostel.amenities[amenity.toLowerCase()]
          )
        )
      }
      
      if (filters.rating) {
        data = data.filter(hostel => 
          hostel.overallRating >= filters.rating
        )
      }
      
      if (filters.location) {
        data = data.filter(hostel => 
          hostel.location.toLowerCase().includes(filters.location.toLowerCase())
        )
      }
      
      // Apply search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        data = data.filter(hostel => 
          hostel.name.toLowerCase().includes(query) ||
          hostel.location.toLowerCase().includes(query) ||
          hostel.roomTypes.some(type => type.toLowerCase().includes(query))
        )
      }
      
      setHostels(data)
    } catch (err) {
      setError('Failed to load hostels. Please try again.')
      console.error('Error loading hostels:', err)
    } finally {
      setLoading(false)
    }
  }
  
  if (loading) {
    return <Loading />
  }
  
  if (error) {
    return <Error message={error} onRetry={loadHostels} />
  }
  
  if (hostels.length === 0) {
    return <Empty message="No hostels found matching your criteria" />
  }
  
  return (
    <div className={`${className}`} {...props}>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
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
        {hostels.map((hostel) => (
          <motion.div
            key={hostel.Id}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
          >
            <HostelCard hostel={hostel} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export default HostelGrid