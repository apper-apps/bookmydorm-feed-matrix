const Badge = ({ 
  children, 
  variant = 'default',
  size = 'sm',
  className = '',
  ...props 
}) => {
  const baseClasses = "inline-flex items-center font-medium rounded-full transition-all duration-200"
  
  const variants = {
    default: "bg-gray-100 text-gray-800",
    primary: "bg-gradient-to-r from-primary-100 to-secondary-100 text-primary-800",
    secondary: "bg-secondary-100 text-secondary-800",
    accent: "bg-gradient-to-r from-accent-100 to-warning-100 text-accent-800",
    success: "bg-success-100 text-success-800",
    warning: "bg-warning-100 text-warning-800",
    error: "bg-error-100 text-error-800",
    info: "bg-blue-100 text-blue-800",
  }
  
  const sizes = {
    xs: "px-2 py-0.5 text-xs",
    sm: "px-2.5 py-1 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-1.5 text-sm",
  }
  
  const badgeClasses = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`
  
  return (
    <span className={badgeClasses} {...props}>
      {children}
    </span>
  )
}

export default Badge