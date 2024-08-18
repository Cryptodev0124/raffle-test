import React from 'react'
import { useJackpot } from '~/utils/hooks/useJackpot'

interface RoundDetailsSectionProps {
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
  setIsSpinning: (isSpinning: boolean) => void
  setWonValue: (value: number) => void
}

const RoundDetailsSection: React.FC<RoundDetailsSectionProps> = ({
  players,
  info,
  setIsSpinning,
  setWonValue,
}) => {
  const { currentRound } = useJackpot()

  return (
    <div className="flex flex-col">
      <div className="yolo-card rounded-[12px] px-8 py-6 flex flex-col items-center relative">
        <div className="text-center">
          <span className="text-white text-[24px] font-bold">Round { currentRound ? currentRound: '0' }</span>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full mt-4">
          <div className="yolo-stats rounded-[12px] px-6 py-4 flex flex-col items-center w-full sm:w-1/2">
            <span className="text-white text-[20px] font-[600]">
              {info.potValue} ETH
            </span>
            <span className="text-[#8B8A8D] text-[14px] font-[500]">
              Prize Pool
            </span>
          </div>
          <div className="yolo-stats rounded-[12px] px-6 py-4 flex flex-col items-center w-full sm:w-1/2">
            <span className="text-white text-[20px] font-[600]">
              {players.length}/500
            </span>
            <span className="text-[#8B8A8D] text-[14px] font-[500]">
              Players
            </span>
          </div>
        </div>
        <hr className="my-4 w-full border-[#8B8A8D]" />
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <div className="yolo-stats rounded-[12px] px-6 py-4 flex flex-col items-center w-full sm:w-1/2">
            <span className="text-white text-[20px] font-[600]">0</span>
            <span className="text-[#8B8A8D] text-[14px] font-[500]">
              Your Entries
            </span>
          </div>
          <div className="yolo-stats rounded-[12px] px-6 py-4 flex flex-col items-center w-full sm:w-1/2">
            <span className="text-white text-[20px] font-[600]">0%</span>
            <span className="text-[#8B8A8D] text-[14px] font-[500]">
              Your Win Chance
            </span>
          </div>
        </div>
        <hr className="my-4 w-full border-[#8B8A8D]" />
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <div className="yolo-stats rounded-[12px] px-6 py-4 flex flex-col items-center w-full sm:w-1/2">
            <span className="text-white text-[20px] font-[600]">—</span>
            <span className="text-[#8B8A8D] text-[14px] font-[500]">
              Your Future Entries
            </span>
          </div>
          <div className="yolo-stats rounded-[12px] px-6 py-4 flex flex-col items-center w-full sm:w-1/2">
            <span className="text-white text-[20px] font-[600]">—</span>
            <span className="text-[#8B8A8D] text-[14px] font-[500]">
              Total (0 Avg)
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RoundDetailsSection
