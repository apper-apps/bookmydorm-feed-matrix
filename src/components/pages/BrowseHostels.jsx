import { useState } from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import FilterSidebar from '@/components/molecules/FilterSidebar'
import HostelGrid from '@/components/organisms/HostelGrid'
import Button from '@/components/atoms/Button'
import Card from '@/components/atoms/Card'
import Badge from '@/components/atoms/Badge'

const BrowseHostels = () => {
  const [filters, setFilters] = useState({})
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState('grid')
  
  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters)
  }
  
  const quickFilters = [
    { label: 'Near Campus', key: 'location', value: 'near-campus', icon: 'MapPin' },
    { label: 'AC Rooms', key: 'amenities', value: ['AC'], icon: 'Snowflake' },
    { label: 'Under ₹10k', key: 'priceRange', value: [0, 10000], icon: 'IndianRupee' },
    { label: 'Good WiFi', key: 'amenities', value: ['WiFi'], icon: 'Wifi' },
    { label: 'Mess Available', key: 'amenities', value: ['Mess'], icon: 'Utensils' },
    { label: 'High Rated', key: 'rating', value: 4, icon: 'Star' },
  ]
  
  const applyQuickFilter = (filter) => {
    setFilters(prev => ({
      ...prev,
      [filter.key]: filter.value
    }))
  }
  
  const stats = [
    { label: 'Total Hostels', value: '120+', icon: 'Building2', color: 'from-blue-500 to-blue-600' },
    { label: 'Student Reviews', value: '2.5k+', icon: 'MessageSquare', color: 'from-green-500 to-green-600' },
    { label: 'Room Swaps', value: '450+', icon: 'ArrowRightLeft', color: 'from-purple-500 to-purple-600' },
    { label: 'Happy Students', value: '3k+', icon: 'Users', color: 'from-orange-500 to-orange-600' },
  ]
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-secondary-600"></div>
        <div className="absolute inset-0 bg-black/10"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
              Find Your Perfect
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                Hostel Home
              </span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Discover, review, and swap hostel rooms with fellow students. 
              Make your university life comfortable and connected.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Button
                variant="accent"
                size="lg"
                icon="Search"
                className="shadow-xl hover:shadow-2xl"
              >
                Start Exploring
              </Button>
              <Button
                variant="outline"
                size="lg"
                icon="ArrowRightLeft"
                className="border-white text-white hover:bg-white hover:text-primary-600"
              >
                Post Room Swap
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-16 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
              >
                <Card className="text-center p-6 hover:shadow-lg transition-shadow duration-300">
                  <div className={`w-12 h-12 mx-auto mb-4 bg-gradient-to-br ${stat.color} rounded-full flex items-center justify-center`}>
                    <ApperIcon name={stat.icon} className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-display font-bold text-gray-900 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Quick Filters */}
      <section className="py-8 bg-white/50 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-4">
            <ApperIcon name="Filter" className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-display font-semibold text-gray-900">Quick Filters</h3>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {quickFilters.map((filter) => (
              <Button
                key={filter.label}
                variant="outline"
                size="sm"
                icon={filter.icon}
                onClick={() => applyQuickFilter(filter)}
                className="hover:bg-primary-50 hover:border-primary-300 hover:text-primary-700"
              >
                {filter.label}
              </Button>
            ))}
          </div>
        </div>
      </section>
      
      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <FilterSidebar
                filters={filters}
                onFiltersChange={handleFiltersChange}
                className="sticky top-4"
              />
            </div>
            
            {/* Results */}
            <div className="lg:col-span-3">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-display font-bold text-gray-900">
                    Available Hostels
                  </h2>
                  <p className="text-gray-600">
                    Find the perfect place to call home during your studies
                  </p>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant={viewMode === 'grid' ? 'primary' : 'outline'}
                    size="sm"
                    icon="Grid3X3"
                    onClick={() => setViewMode('grid')}
                  />
                  <Button
                    variant={viewMode === 'list' ? 'primary' : 'outline'}
                    size="sm"
                    icon="List"
                    onClick={() => setViewMode('list')}
                  />
                </div>
              </div>
              
              <HostelGrid
                filters={filters}
                searchQuery={searchQuery}
                className="flex-1"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default BrowseHostels