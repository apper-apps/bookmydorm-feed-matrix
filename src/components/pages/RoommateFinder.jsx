import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import Card from '@/components/atoms/Card'
import Badge from '@/components/atoms/Badge'
import RoommateCard from '@/components/molecules/RoommateCard'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import { roommateService } from '@/services/api/roommateService'

const RoommateFinder = () => {
  const [roommates, setRoommates] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showQuiz, setShowQuiz] = useState(false)
  const [quizStep, setQuizStep] = useState(0)
  const [preferences, setPreferences] = useState({
    sleepSchedule: '',
    studyTime: '',
    cleanliness: '',
    socialLevel: '',
    musicPreference: '',
    smokingTolerance: '',
    interests: []
  })
  
  const quizQuestions = [
    {
      question: "What's your preferred sleep schedule?",
      options: [
        { value: 'early-bird', label: 'Early Bird (9-10 PM)', icon: 'Sunrise' },
        { value: 'night-owl', label: 'Night Owl (11 PM - 1 AM)', icon: 'Moon' },
        { value: 'flexible', label: 'Flexible', icon: 'Clock' }
      ]
    },
    {
      question: "When do you prefer to study?",
      options: [
        { value: 'morning', label: 'Morning (6-10 AM)', icon: 'Coffee' },
        { value: 'afternoon', label: 'Afternoon (2-6 PM)', icon: 'Sun' },
        { value: 'evening', label: 'Evening (7-11 PM)', icon: 'Sunset' }
      ]
    },
    {
      question: "How important is cleanliness to you?",
      options: [
        { value: 'very-clean', label: 'Very Clean & Organized', icon: 'Sparkles' },
        { value: 'moderately-clean', label: 'Moderately Clean', icon: 'Home' },
        { value: 'relaxed', label: 'Relaxed about mess', icon: 'Smile' }
      ]
    },
    {
      question: "What's your social preference?",
      options: [
        { value: 'social', label: 'Love hanging out', icon: 'Users' },
        { value: 'balanced', label: 'Balanced social time', icon: 'UserCheck' },
        { value: 'quiet', label: 'Prefer quiet time', icon: 'User' }
      ]
    },
    {
      question: "Music and noise preference?",
      options: [
        { value: 'music-lover', label: 'Love music & sounds', icon: 'Music' },
        { value: 'moderate', label: 'Moderate levels', icon: 'Volume2' },
        { value: 'quiet', label: 'Prefer quiet', icon: 'VolumeX' }
      ]
    }
  ]
  
  useEffect(() => {
    if (!showQuiz) {
      loadRoommates()
    }
  }, [showQuiz])
  
  const loadRoommates = async () => {
    try {
      setLoading(true)
      setError('')
      const data = await roommateService.getAll()
      setRoommates(data)
    } catch (err) {
      setError('Failed to load roommates. Please try again.')
      console.error('Error loading roommates:', err)
    } finally {
      setLoading(false)
    }
  }
  
  const handleQuizAnswer = (answer) => {
    const currentQuestion = quizQuestions[quizStep]
    const key = currentQuestion.question.includes('sleep') ? 'sleepSchedule' :
                currentQuestion.question.includes('study') ? 'studyTime' :
                currentQuestion.question.includes('clean') ? 'cleanliness' :
                currentQuestion.question.includes('social') ? 'socialLevel' :
                'musicPreference'
    
    setPreferences(prev => ({
      ...prev,
      [key]: answer
    }))
    
    if (quizStep < quizQuestions.length - 1) {
      setQuizStep(quizStep + 1)
    } else {
      setShowQuiz(false)
      setQuizStep(0)
    }
  }
  
  const handleContact = (roommate) => {
    console.log('Contacting roommate:', roommate)
  }
  
  const stats = [
    { label: 'Active Profiles', value: '500+', icon: 'Users', color: 'from-blue-500 to-blue-600' },
    { label: 'Successful Matches', value: '200+', icon: 'Heart', color: 'from-pink-500 to-pink-600' },
    { label: 'Compatibility Rate', value: '85%', icon: 'Target', color: 'from-green-500 to-green-600' },
    { label: 'Average Match Time', value: '3 days', icon: 'Clock', color: 'from-purple-500 to-purple-600' },
  ]
  
  if (showQuiz) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                <ApperIcon name="UserCheck" className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-display font-bold text-gray-900 mb-2">
                Find Your Perfect Roommate
              </h2>
              <p className="text-gray-600">
                Answer a few questions to find compatible roommates
              </p>
              <div className="mt-4">
                <div className="flex items-center justify-center gap-2">
                  {quizQuestions.map((_, index) => (
                    <div
                      key={index}
                      className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                        index <= quizStep ? 'bg-primary-500' : 'bg-gray-200'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Question {quizStep + 1} of {quizQuestions.length}
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-xl font-display font-semibold text-gray-900 text-center">
                {quizQuestions[quizStep].question}
              </h3>
              
              <div className="space-y-3">
                {quizQuestions[quizStep].options.map((option) => (
                  <motion.button
                    key={option.value}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleQuizAnswer(option.value)}
                    className="w-full p-4 text-left border-2 border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-all duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <ApperIcon name={option.icon} className="w-6 h-6 text-primary-600" />
                      <span className="font-medium text-gray-900">{option.label}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
              
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => setQuizStep(Math.max(0, quizStep - 1))}
                  disabled={quizStep === 0}
                  icon="ArrowLeft"
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowQuiz(false)}
                >
                  Skip Quiz
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600"></div>
        <div className="absolute inset-0 bg-black/10"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
              Find Your Perfect
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                Roommate Match
              </span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Connect with compatible roommates based on lifestyle, 
              study habits, and personality compatibility.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                variant="accent"
                size="lg"
                icon="UserPlus"
                onClick={() => setShowQuiz(true)}
                className="shadow-xl hover:shadow-2xl"
              >
                Take Compatibility Quiz
              </Button>
              <Button
                variant="outline"
                size="lg"
                icon="Users"
                className="border-white text-white hover:bg-white hover:text-primary-600"
              >
                Browse Profiles
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-12 bg-white/80 backdrop-blur-sm">
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
      
      {/* Roommate Matches */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-display font-bold text-gray-900">
                Compatible Roommates
              </h2>
              <p className="text-gray-600 mt-1">
                Based on your preferences and compatibility
              </p>
            </div>
            
            <Button
              variant="primary"
              icon="UserCheck"
              onClick={() => setShowQuiz(true)}
            >
              Retake Quiz
            </Button>
          </div>
          
          {loading ? (
            <Loading />
          ) : error ? (
            <Error message={error} onRetry={loadRoommates} />
          ) : roommates.length === 0 ? (
            <Empty 
              message="No roommates found"
              description="Take the compatibility quiz to find your perfect match!"
              action={() => setShowQuiz(true)}
              actionLabel="Take Quiz"
              icon="UserCheck"
            />
          ) : (
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
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
              {roommates.map((roommate) => (
                <motion.div
                  key={roommate.Id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                >
                  <RoommateCard 
                    roommate={roommate}
                    compatibility={Math.floor(Math.random() * 30) + 70} // Mock compatibility score
                    onContact={handleContact}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}

export default RoommateFinder