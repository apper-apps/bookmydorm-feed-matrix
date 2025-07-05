import ApperIcon from '@/components/ApperIcon'

const Avatar = ({ 
  src,
  alt = 'User avatar',
  name = '',
  size = 'md',
  variant = 'circle',
  className = '',
  ...props 
}) => {
  const sizes = {
    xs: "w-6 h-6 text-xs",
    sm: "w-8 h-8 text-sm",
    md: "w-10 h-10 text-base",
    lg: "w-12 h-12 text-lg",
    xl: "w-16 h-16 text-xl",
    '2xl': "w-20 h-20 text-2xl",
  }
  
  const variants = {
    circle: "rounded-full",
    rounded: "rounded-lg",
    square: "rounded-none",
  }
  
  const baseClasses = `inline-flex items-center justify-center font-medium text-white bg-gradient-to-br from-primary-500 to-secondary-500 ${sizes[size]} ${variants[variant]} ${className}`
  
  // Generate initials from name
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }
  
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className={`${baseClasses} object-cover`}
        {...props}
      />
    )
  }
  
  if (name) {
    return (
      <div className={baseClasses} {...props}>
        {getInitials(name)}
      </div>
    )
  }
  
  return (
    <div className={baseClasses} {...props}>
      <ApperIcon name="User" className="w-1/2 h-1/2" />
    </div>
  )
}

export default Avatar