import React from 'react'
import PlayersTable from './PlayersTable'
import SpecialMessageCard from './SpecialMessageCard'
import { useSocket } from '../../context/SocketContext'

interface Player {
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
}

interface LeftSidebarProps {
  players: Player[]
  hoveredPlayer: string | null
  setHoveredPlayer: (playerName: string | null) => void
  setWinner: (playerName: string) => void
  winner: string
  setShowWinner: (isSpinning: boolean) => void
  showWinner: boolean
}

const LeftSidebar: React.FC<LeftSidebarProps> = ({
  players,
  hoveredPlayer,
  setHoveredPlayer,
  setWinner,
  winner,
  setShowWinner,
  showWinner
}) => {
  const { onlined } = useSocket()

  return (
    <div className="yolo-card px-0 min-w-[280px] max-h-[836px] h-[414px] lg:h-[836px]">
      <div className="flex justify-between items-center mb-4">
        <div className="text-white text-[20px] font-bold mt-2">
          {onlined} Watching
        </div>
      </div>
      {players.length === 0 ? (
        <SpecialMessageCard />
      ) : (
        <PlayersTable
          players={players}
          hoveredPlayer={hoveredPlayer}
          setHoveredPlayer={setHoveredPlayer}
          showWinner={showWinner}
          winner={winner}
        />
      )}
    </div>
  )
}

export default LeftSidebar
