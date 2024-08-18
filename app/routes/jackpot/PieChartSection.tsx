import React, { useState, useEffect } from 'react'
import PieChart from '../../components/Piechart'
import useCountdown from './useCountdown'
import ModalTable, { RoundData } from './ModalTable'
import { useJackpot } from '~/utils/hooks/useJackpot'

const roundEntryDurationBase = 30
const rotationDuration = 5
const nextRemainingSecondsOffset = rotationDuration + 10 // 10 seconds before the next round starts
const addSecondsPerNewPlayer = 2

interface PieChartSectionProps {
  setWonValue: (value: number) => void
  hoveredPlayer: string | null
  setHoveredPlayer: (playerName: string | null) => void
  isRoundContentHovered: boolean
  setIsRoundContentHovered: (isHovered: boolean) => void
  players: {
    name: string
    avatar: string
    tokens: string
    color: string
    chance: number
    totalPlayed: number
    totalWon: number
    biggestWin: number
    luckiestWin: number
    entriesValue: number
    winChance: number
    pts: number
  }[]
  info: {
    potValue: number
    chance: number
    deposit: number
  }
  isLocked: boolean
  setWinner: (playerName: string) => void
  winner: string
  setShowWinner: (isSpinning: boolean) => void
  showWinner: boolean
  setIsCurrentTimerEnded: (isEnded: boolean) => void // Callback to update isCurrentTimerEnded in parent
  isCurrentTimerEnded: boolean
}

const PieChartSection: React.FC<PieChartSectionProps> = ({
  setWonValue,
  hoveredPlayer,
  setHoveredPlayer,
  isRoundContentHovered,
  setIsRoundContentHovered,
  players,
  info,
  isLocked,
  setWinner,
  winner,
  setShowWinner,
  showWinner,
  setIsCurrentTimerEnded,
  isCurrentTimerEnded,
}) => {
  const [currentMinutes, setCurrentMinutes] = useState(0)
  const [currentRemainingSeconds, setCurrentRemainingSeconds] = useState(0)
  const [nextMinutes, setNextMinutes] = useState(0)
  const [nextRemainingSeconds, setNextRemainingSeconds] = useState(0)
  const [isNextTimerEnded, setIsNextTimerEnded] = useState(false)
  const [showNextRoundCountdown, setShowNextRoundCountdown] = useState(false)
  const [isSpinning, setIsSpinning] = useState(false)
  const [showWinnerPending, setShowWinnerPending] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [timerIncrement, setTimerIncrement] = useState(0)
  const [roundEntryDuration, setRoundEntryDuration] = useState(roundEntryDurationBase)
  const { currentRound } = useJackpot()

  useEffect(() => {
    const newIncrement = timerIncrement + addSecondsPerNewPlayer
    setTimerIncrement(newIncrement)
  }, [players.length])

  useCountdown(
    roundEntryDurationBase,
    nextRemainingSecondsOffset,
    setCurrentMinutes,
    setCurrentRemainingSeconds,
    setNextMinutes,
    setNextRemainingSeconds,
    setIsCurrentTimerEnded,
    setIsNextTimerEnded,
    isNextTimerEnded,
    setShowNextRoundCountdown,
    setShowWinner,
    setWinner,
    setTimerIncrement,
    timerIncrement,
    setRoundEntryDuration,
    roundEntryDuration,
  )

  useEffect(() => {
    if (
      isCurrentTimerEnded &&
      !showWinner &&
      !isSpinning &&
      !showNextRoundCountdown &&
      !winner
    ) {
      setIsSpinning(true)
      const randomIndex = Math.floor(Math.random() * players.length)
      const who_won = players[randomIndex].name
      setWinner(who_won)
      setWonValue(info.potValue)
      setShowWinnerPending(true)
      console.log('Set winner', who_won)
    }
  }, [
    isCurrentTimerEnded,
    isSpinning,
    showNextRoundCountdown,
    players,
    info,
    showWinner,
    winner,
    currentRemainingSeconds,
    nextRemainingSeconds,
    setIsSpinning,
    setWinner,
    setWonValue,
  ])


  useEffect(() => {
    setRoundEntryDuration(roundEntryDurationBase)
  }, [
    isCurrentTimerEnded
  ])

  useEffect(() => {
    if (!isSpinning && showWinnerPending) {
      setShowWinner(true)
      setShowNextRoundCountdown(true)
      setShowWinnerPending(false)
    }
  }, [isSpinning, showWinnerPending])

  useEffect(() => {
    if (
      isCurrentTimerEnded &&
      nextRemainingSeconds <= nextRemainingSecondsOffset - rotationDuration
    ) {
      setShowNextRoundCountdown(true)
    }
  }, [isCurrentTimerEnded, nextRemainingSeconds])

  const sampleData: RoundData[] = [
    {
      roundNumber: 99296,
      winnerAvatar: '/app/assets/mobile-logo.png',
      winnerName: 'User 1',
      prizePool: '600 ETH',
      winnersEntries: '100 ETH',
      winMultiplier: '6x',
      yourEntries: '-',
      totalPlayers: 3,
      finishTime: '04:07, Jul. 28, 2024',
      verifyLink: 'https://example.com',
    },
  ]

  const handleHistoryClick = () => {
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  return (
    <div className="flex flex-col relative yolo-card p-8">
      <div className="flex flex-row justify-between mb-4 -mt-2 items-center">
        <div className="text-white text-[20px] font-bold px-[8px] py-[4px]">
          Round {currentRound ? currentRound : '0'}
        </div>
        <button
          className="border rounded-full border-white py-2 px-4 flex flex-row ml-20 min-w-[120px]"
          onClick={handleHistoryClick}
        >
          <img
            src="/history.svg"
            width="24px"
            height="24px"
            alt=""
            className="mr-2"
          />
          History
        </button>
      </div>
      <div className="flex flex-col shrink grow items-center gap-2">
        <PieChart
          setWonValue={setWonValue}
          hoveredPlayer={hoveredPlayer}
          setHoveredPlayer={setHoveredPlayer}
          isSpinning={isSpinning}
          winner={winner}
          setIsSpinning={setIsSpinning}
          players={players}
          info={info}
          resetRotation={nextMinutes === 0 && nextRemainingSeconds === 1}
          isLocked={isLocked}
          roundEntryDuration={roundEntryDuration}
          currentMinutes={currentMinutes}
          currentRemainingSeconds={currentRemainingSeconds}
        />
        {showWinner && players.length > 1 ? (
          <div className="text-center mt-[16px] text-[#F7B831] text-[24px] font-bold">
            Winner: {winner}
          </div>
        ) : (
          <div className="mt-[52px]" />
        )}
      </div>
      {!showNextRoundCountdown ? (
        <>
          {isLocked ? (
            <div className="text-white text-[30px] font-bold text-center border-[2px] border-gray-500 rounded-full px-[8px] py-[4px] mb-4 w-[120px] h-[54px]">
              <img
                src="/spinner.png"
                alt="Loading"
                className="animate-spin h-[32px] w-[32px] mx-0 p-0 opacity-50 items-center justify-center -mt-2"
              />
            </div>
          ) : (
            <>
              <div className="text-green-500 text-[30px] font-bold text-center border-[2px] border-green-500 rounded-full px-[8px] py-[4px] mb-4 w-[120px] h-[54px]">
                {String(currentMinutes).padStart(2, '0')}:
                {String(currentRemainingSeconds).padStart(2, '0')}
              </div>
            </>
          )}
        </>
      ) : (
        <div className="text-green-500 text-[16px] font-bold text-center border-[2px] border-transparent rounded-full px-[8px] py-[4px] mb-4 w-[120px] h-[54px] text-nowrap">
          Next round: {nextRemainingSeconds}
        </div>
      )}
      {isModalOpen && (
        <ModalTable data={sampleData} onClose={handleModalClose} />
      )}
    </div>
  )
}

export default PieChartSection
