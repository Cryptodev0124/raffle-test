import React, { useEffect, useCallback, useState } from 'react'
import Timer from './Timer'
interface CountdownTimerProps {
  nextFreeSpinTime: number
}

const TimeDisplay: React.FC<CountdownTimerProps> = ({
  nextFreeSpinTime,
}) => {
  const [remainingTime, setRemainingTime] = useState(
    nextFreeSpinTime - Math.floor(Date.now() / 1000),
  )

  const formatTime = useCallback((timeInSeconds: number): string => {
    const hours = Math.floor(timeInSeconds / 3600)
    const minutes = Math.floor((timeInSeconds % 3600) / 60)
    const seconds = timeInSeconds % 60
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = Math.floor(Date.now() / 1000)
      setRemainingTime(nextFreeSpinTime - currentTime)
    }, 1000)

    return () => clearInterval(interval)
  }, [nextFreeSpinTime])
  
  return (
    <div className="absolute top-[64%] left-[16%] text-2xl">
      <Timer endDate={nextFreeSpinTime} />
    </div>
  )
}

export default TimeDisplay
