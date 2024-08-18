import React, { useState, useEffect } from 'react'

interface TimerProps {
  endDate: Date | string | number
}

function Timer({ endDate }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  const calculateTimeLeft = () => {
    const utcNow = Date.now()
    let futureDate: Date

    if (typeof endDate === 'number') {
      futureDate = new Date(endDate * 1000)
    } else if (typeof endDate === 'string') {
      const parsedEndDate = parseInt(endDate, 10)
      if (isNaN(parsedEndDate)) {
        throw new Error(`Invalid date string: ${endDate}`)
      }
      futureDate = new Date(parsedEndDate * 1000)
    } else {
      futureDate = endDate // assume endDate is already a Date object
    }

    const difference = utcNow - futureDate.getTime()

    var days = 0
    var hours = 0
    var minutes = 0
    var seconds = 0
    if (difference < 0) {
      days = Math.abs(Math.floor(difference / (1000 * 60 * 60 * 24) + 1))
      hours = Math.abs(
        Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60) + 1),
      )
      minutes = Math.abs(
        Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60) + 1),
      )
      seconds = Math.abs(Math.floor((difference % (1000 * 60)) / 1000 + 1))
    }

    setTimeLeft({ days, hours, minutes, seconds })
  }

  useEffect(() => {
    calculateTimeLeft()
    const interval = setInterval(() => calculateTimeLeft(), 1000)
    return () => clearInterval(interval)
  }, [])

  const formattedDays = timeLeft.days.toString().padStart(2, '0')
  const formattedHours = timeLeft.hours.toString().padStart(2, '0')
  const formattedMinutes = timeLeft.minutes.toString().padStart(2, '0')
  const formattedSeconds = timeLeft.seconds.toString().padStart(2, '0')

  return (
    <div className="-mb-4 text-center">
      <style>
        {`
            .countdown {
                display: flex;
                flex-direction: column;
                padding: 4px;
                border-radius: 10px;
                background: linear-gradient(
                        180deg,
                        #ca19e122 31.07%,
                        #704991 86.75%
                    ) !important;
                border-width: 2px;
                border-color: #FF00FF44;
                color: white;
                text-align: center;
                font-size: 32px;
                width: 58px;
            }

            .countdown-sub {
                margin-top: -8px;
                font-size: 12px;
                color: #aaa;
                text-align: center;
            }
        `}
      </style>
      <div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'left',
            marginTop: '8px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginRight: '8px',
            }}
          >
            <div className="countdown">
              <span>{formattedDays}</span>
            </div>
            <div className="countdown-sub">Days</div>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginRight: '8px',
            }}
          >
            <div className="countdown">
              <span>{formattedHours}</span>
            </div>
            <div className="countdown-sub">Hours</div>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginRight: '8px',
            }}
          >
            <div className="countdown">
              <span>{formattedMinutes}</span>
            </div>
            <div className="countdown-sub">Minutes</div>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginRight: '8px',
            }}
          >
            <div className="countdown">
              <span>{formattedSeconds}</span>
            </div>
            <div className="countdown-sub">Seconds</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Timer
