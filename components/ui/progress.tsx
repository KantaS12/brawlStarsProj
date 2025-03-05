import React from "react"

export interface ProgressProps {
  value: number // Percentage value (0-100)
  className?: string
}

const Progress: React.FC<ProgressProps> = ({ value, className }) => {
  return (
    <div className={`w-full h-2 bg-gray-200 rounded ${className}`}>
      <div
        className="h-full rounded bg-blue-500"
        style={{ width: `${value}%` }}
      ></div>
    </div>
  )
}

export default Progress