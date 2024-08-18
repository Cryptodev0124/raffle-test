import { useState, useEffect } from 'react'

const useCountdown = (
  roundEntryDurationBase: number,
  nextRemainingSecondsOffset: number,
  setCurrentMinutes: React.Dispatch<React.SetStateAction<number>>,
  setCurrentRemainingSeconds: React.Dispatch<React.SetStateAction<number>>,
  setNextMinutes: React.Dispatch<React.SetStateAction<number>>,
  setNextRemainingSeconds: React.Dispatch<React.SetStateAction<number>>,
  setIsCurrentTimerEnded: (isEnded: boolean) => void,
  setIsNextTimerEnded: React.Dispatch<React.SetStateAction<boolean>>,
  isNextTimerEnded: boolean,
  setShowNextRoundCountdown: React.Dispatch<React.SetStateAction<boolean>>,
  setShowWinner: (isSpinning: boolean) => void,
  setWinner: (playerName: string) => void,
  setTimerIncrement: React.Dispatch<React.SetStateAction<number>>,
  timerIncrement: number,
  setRoundEntryDuration: React.Dispatch<React.SetStateAction<number>>,
  roundEntryDuration: number,
) => {
  const [seconds, setSeconds] = useState(
    roundEntryDurationBase + nextRemainingSecondsOffset + timerIncrement,
  )

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds((prevSeconds) => {
        const newSeconds = prevSeconds - 1
        if (newSeconds < 0) {
          clearInterval(intervalId)
          setIsNextTimerEnded(true)
          return 0
        }
        return newSeconds
      })
    }, 1000)

    return () => clearInterval(intervalId)
  }, [setIsNextTimerEnded])


  useEffect(() => {
      setSeconds(seconds + timerIncrement)
      setRoundEntryDuration(roundEntryDuration + timerIncrement)
      setTimerIncrement(0)
  }, [timerIncrement])

  useEffect(() => {
    const currentSeconds = Math.max(seconds - nextRemainingSecondsOffset, 0)
    const currentMinutes = Math.floor(currentSeconds / 60)
    const currentRemainingSeconds = currentSeconds % 60
    const nextSeconds = Math.max(seconds, 0)
    const nextMinutes = Math.floor(nextSeconds / 60)
    const nextRemainingSeconds = nextSeconds % 60

    if (currentSeconds === 0) {
      setIsCurrentTimerEnded(true)
    }

    setCurrentMinutes(currentMinutes)
    setCurrentRemainingSeconds(currentRemainingSeconds)
    setNextMinutes(nextMinutes)
    setNextRemainingSeconds(nextRemainingSeconds)

    if (seconds === 0) {
      setSeconds(
        roundEntryDuration + nextRemainingSecondsOffset,
      )
      setIsCurrentTimerEnded(false)
      setIsNextTimerEnded(false)
      setCurrentMinutes(Math.floor(roundEntryDurationBase / 60))
      setCurrentRemainingSeconds(roundEntryDurationBase % 60)
      setNextMinutes(
        Math.floor((roundEntryDurationBase + nextRemainingSecondsOffset) / 60),
      )
      setNextRemainingSeconds(
        (roundEntryDurationBase + nextRemainingSecondsOffset) % 60,
      )
      setWinner('')
      setShowWinner(false)
      setShowNextRoundCountdown(false)
      setTimerIncrement(0)
    }
  }, [
    seconds,
    nextRemainingSecondsOffset,
    timerIncrement,
    setCurrentMinutes,
    setCurrentRemainingSeconds,
    setNextMinutes,
    setNextRemainingSeconds,
    setIsCurrentTimerEnded,
    setIsNextTimerEnded,
    setWinner,
    setShowWinner,
    setShowNextRoundCountdown,
    setTimerIncrement,
  ])
}

export default useCountdown
