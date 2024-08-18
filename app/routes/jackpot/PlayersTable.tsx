import React, { useState, useEffect } from 'react'
import PlayerModal from './PlayerModal'

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

interface PlayersTableProps {
  players: Player[]
  hoveredPlayer: string | null
  setHoveredPlayer: (playerName: string | null) => void
  winner: string | null
  showWinner: boolean
}

const PlayersTable: React.FC<PlayersTableProps> = ({
  players,
  hoveredPlayer,
  setHoveredPlayer,
  winner,
  showWinner,
}) => {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null)

  useEffect(() => {
    // Sort the players so the winner appears at the top
    if (showWinner && winner && players.length > 1) {
      players.sort((a, b) => {
        if (a.name === winner) return -1
        if (b.name === winner) return 1
        return 0
      })
    }
  }, [players, winner, showWinner])

  const handleRowClick = (player: Player) => {
    setSelectedPlayer(player)
  }

  const handleModalClose = () => {
    setSelectedPlayer(null)
  }

  return (
    <div className="lg:max-h-[85vh] overflow-y-auto w-full px-4">
      <div className="table border-separate border-spacing-x-0 border-spacing-y-1 rounded-3xl table-auto w-full text-[#8b8a8d] text-[11px]">
        <div className="table-header-group sticky top-0">
          <div className="text-left px-4 sm:px-8 py-4 text-[20px] text-white font-bold yolo-card">
            <div className="table-row">{players.length} Players</div>
          </div>
        </div>
        <div className="gap-2 table-row-group">
          {(!players || players.length === 0) && (
            <div className="table-row">
              <td
                className="table-cell px-8 py-4 text-center rounded-[5px]"
                colSpan={1}
              >
                No Data
              </td>
            </div>
          )}
          {players.map((player, index) => (
            <div
              key={index}
              className={`mb-2 cursor-pointer rounded-[12px] ${
                hoveredPlayer === player.name
                  ? 'bg-[#2a2a2a]'
                  : hoveredPlayer
                  ? 'halfbrightness'
                  : ''
              }`}
              onMouseEnter={() => setHoveredPlayer(player.name)}
              onMouseLeave={() => setHoveredPlayer(null)}
              onClick={() => handleRowClick(player)}
            >
              <div
                className="px-4 sm:px-8 py-4 rounded-[12px] text-left text-white font-[500] flex flex-row items-center gap-2 yolo-stats border-r-[12px] border-solid justify-between"
                style={{
                  borderColor: player.color,
                  background:
                    showWinner && winner === player.name && players.length > 1
                      ? 'linear-gradient(to right, #FFD700AA, #FFB90033, #FFB90011, #3A3B3C00)'
                      : '',
                }}
              >
                <div className="flex flex-row">
                  <img
                    src={player.avatar}
                    alt="Avatar Preview"
                    className="w-[29px] h-[29px] mr-4"
                  />
                  <div className="flex flex-col">
                    <span
                      className="text-[12px] mr-4"
                      style={{ overflowWrap: 'anywhere' }}
                    >
                      {player.name.length > 10
                        ? player.name.slice(0, 3) +
                          '...' +
                          player.name.slice(-3)
                        : player.name}
                    </span>
                    <div>
                      <span
                        className="text-[12px] mr-4"
                        style={{ overflowWrap: 'anywhere' }}
                      >
                        {player.pts} Pts
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-[12px] font-semibold text-right">
                    {player.chance.toFixed(2)}%
                  </span>
                  <span className="text-[12px] font-semibold ml-4 text-right">
                    {player.tokens}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedPlayer && (
        <PlayerModal player={selectedPlayer} onClose={handleModalClose} />
      )}
    </div>
  )
}

export default PlayersTable
