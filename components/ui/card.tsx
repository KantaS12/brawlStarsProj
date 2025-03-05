import React from "react"

export interface CardProps {
  children: React.ReactNode
  className?: string
}

const Card: React.FC<CardProps> = ({ children, className }) => {
  return <div className={`rounded-lg shadow-md ${className}`}>{children}</div>
}

export default Card