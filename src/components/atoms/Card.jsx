import { motion } from 'framer-motion'

const Card = ({ 
  children, 
  variant = 'default',
  padding = 'default',
  hover = false,
  className = '',
  ...props 
}) => {
  const baseClasses = "bg-white rounded-xl border transition-all duration-300"
  
  const variants = {
    default: "border-gray-200 shadow-sm",
    elevated: "border-gray-200 shadow-lg",
    premium: "border-gray-200 shadow-xl bg-gradient-to-br from-white to-gray-50",
    glass: "border-white/20 bg-white/10 backdrop-blur-md",
  }
  
  const paddings = {
    none: "",
    sm: "p-4",
    default: "p-6",
    lg: "p-8",
  }
  
  const hoverClasses = hover ? "hover:shadow-lg hover:-translate-y-1 cursor-pointer" : ""
  
  const cardClasses = `${baseClasses} ${variants[variant]} ${paddings[padding]} ${hoverClasses} ${className}`
  
  const CardComponent = hover ? motion.div : 'div'
  
  const motionProps = hover ? {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 }
  } : {}
  
  return (
    <CardComponent
      className={cardClasses}
      {...motionProps}
      {...props}
    >
      {children}
    </CardComponent>
  )
}

export default Card