import React from 'react'

export default function Spinner() {
  return (
    <span
      role="status"
      aria-label="Loading..."
      className="animate-spin inline-block w-6 h-6 border-4 border-current border-t-transparent  rounded-full"
    />
  )
}
