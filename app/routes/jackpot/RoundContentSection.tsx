import React from 'react'
import PlayersTable from './PlayersTable'
import ethImg from '~/assets/ETH.svg'

interface RoundContentSectionProps {
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
  hoveredPlayer: string | null
  setHoveredPlayer: (playerName: string | null) => void
  winner: string
  showWinner: boolean
}

const RoundContentSection: React.FC<RoundContentSectionProps> = ({
  isRoundContentHovered,
  setIsRoundContentHovered,
  players,
  info,
  hoveredPlayer,
  setHoveredPlayer,
  winner,
  showWinner,
}) => (
  <div className="flex flex-col yolo-card mt-4">
    <div className="flex flex-col items-center mt-5">
      <h1 className="text-[20px] font-bold">Round Content</h1>
      <div
        className="yolo-stats rounded-[12px] px-12 py-6 flex flex-col items-center cursor-pointer relative m-4"
        onMouseEnter={() => setIsRoundContentHovered(true)}
        onMouseLeave={() => setIsRoundContentHovered(false)}
      >
        <img
          src={ethImg}
          alt="Token Icon"
          className="h-[82px] w-[82px]"
        />
        <span className="text-[#F7B831] text-[20px] font-[600]">
          {info.potValue} ETH
        </span>
        <span className="text-[#8B8A8D] text-[11px] font-[500]">
          Total Amount
        </span>
        {isRoundContentHovered && (
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mt-2 bg-[#17161B] rounded-[12px] p-4 z-10  w-[300px]">
            <PlayersTable
              players={players}
              hoveredPlayer={hoveredPlayer}
              setHoveredPlayer={setHoveredPlayer}
              winner={winner}
              showWinner={showWinner}
            />
          </div>
        )}
      </div>
    </div>
  </div>
)

export default RoundContentSection
