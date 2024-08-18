import { useSocket } from '../../context/SocketContext'
import { getDecimals, getSymbol } from '../../utils/constants_jackpot'
import React, { useEffect, useState, useMemo } from 'react'
import { TopNav } from '~/components/nav/TopNav'
import { TermsModal } from '~/components/TermsModal'
import { Footer } from '~/components/nav/Footer'
import JackpotModal from '../../components/JackpotModal'
import TopSection from './TopSection'
import LeftSidebar from './LeftSidebar'
import PieChartSection from './PieChartSection'
import RoundContentSection from './RoundContentSection'
import RoundDetailsSection from './RoundDetailsSection'
import BottomActions from './BottomActions'

const wallet_address = 'Player1'

export default function Rooms() {
  const { gameData, users } = useSocket()
  const [isLocked, setIsLocked] = useState(false)
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false)
  const [isWonWindow, setIsWonWindow] = useState(false)
  const [wonValue, setWonValue] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const [force, setForce] = useState(false)
  const [referralCode, setReferralCode] = useState<string | null>(null)
  const [hoveredPlayer, setHoveredPlayer] = useState<string | null>(null)
  const [isRoundContentHovered, setIsRoundContentHovered] = useState(false)
  const [isSpinning, setIsSpinning] = useState(false)
  const [winner, setWinner] = useState<string>('')
  const [isCurrentTimerEnded, setIsCurrentTimerEnded] = useState(false)
  const [showWinner, setShowWinner] = useState(false)

  const handleOpenModal = () => {
    setIsOpen(true)
  }

  const handleCloseModal = () => {
    setIsOpen(false)
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const refCode = localStorage.getItem('referralCode')
      if (refCode) {
        setReferralCode(refCode)
      }
    }
  }, [])

  useEffect(() => {
    const intervalId = setInterval(async () => {
      setForce(!force)
    }, 1000)

    return () => clearInterval(intervalId)
  }, [force])

  useEffect(() => {
    console.log("isLocked from index.tsx:", isLocked)
    if (isCurrentTimerEnded) {
      setIsLocked(true) // Lock updates when timer is ended
    } else {
      setIsLocked(false) // Unlock updates when timer is not ended
    }
  }, [isCurrentTimerEnded, setIsLocked])

  const handleEndGame = () => {
    setIsWonWindow(false)
  }

  const players = useMemo(() => {
    let piesList: {
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
    }[] = []

    if (gameData && gameData?.players) {
      const sumBets = gameData?.players.reduce(
        (sum: number, item: any) => sum + item.amount,
        0,
      )
      gameData?.players?.forEach((item: any) => {
        const user = users?.find((user: any) => user.address === item.address)
        piesList.push({
          name: user ? user.name : item.name,
          avatar: user ? user.avatar : '/app/assets/mobile-logo.png',
          color: item.color, // Ensure the color property is included and correctly mapped
          chance: (item.amount / sumBets) * 100,
          tokens: `${item.amount / 10 ** getDecimals(item.mint)} ${getSymbol(
            item.mint,
          )}`,
          totalPlayed: item.totalPlayed,
          totalWon: item.totalWon,
          biggestWin: item.biggestWin,
          luckiestWin: item.luckiestWin,
          entriesValue: item.entriesValue,
          winChance: item.winChance,
          pts: item.pts,
        })
      })
    }
    return piesList.reverse()
  }, [gameData, users])

  const info = useMemo(() => {
    let gameInfo = {
      potValue: 0,
      chance: 0,
      deposit: 0,
    }
    if (gameData && gameData?.players) {
      gameInfo.potValue = gameData?.players.reduce(
        (sum: number, item: any) => sum + item.amount,
        0,
      )
      gameData?.players?.forEach((item: any) => {
        if (item.address === wallet_address) {
          gameInfo.chance = (item.amount / gameInfo.potValue) * 100
          gameInfo.deposit = item.amount
        }
      })
    }
    return gameInfo
  }, [gameData])

  useEffect(() => {
    //console.log('jackpot.tsx Game Data:', gameData)
    //console.log('jackpot.tsx Players:', players)
  }, [gameData, players])

  return (
    <div className="bg-[#161432] text-white overflow-x-hidden">
      <TopNav />
      <TermsModal
        isOpen={isTermsModalOpen}
        setIsOpen={() => setIsTermsModalOpen(false)}
      />
      <div className="max-w-[1440px] px-0 py-4 mx-auto">
        <TopSection />
        <>
          <div className="mt-[0px] flex justify-center gap-4 px-3 xl:px-12 py-12 w-full flex-col xl:flex-row">
            <div className="hidden xl:block">
              <LeftSidebar
                players={players}
                hoveredPlayer={hoveredPlayer}
                setHoveredPlayer={setHoveredPlayer}
                setWinner={setWinner}
                winner={winner}
                setShowWinner={setShowWinner}
                showWinner={showWinner}
              />
            </div>
            <div className="flex flex-col">
              <PieChartSection
                setWonValue={setWonValue}
                hoveredPlayer={hoveredPlayer}
                setHoveredPlayer={setHoveredPlayer}
                isRoundContentHovered={isRoundContentHovered}
                setIsRoundContentHovered={setIsRoundContentHovered}
                players={players}
                info={info}
                setIsCurrentTimerEnded={setIsCurrentTimerEnded}
                isCurrentTimerEnded={isCurrentTimerEnded}
                isLocked={isLocked}
                setWinner={setWinner}
                winner={winner}
                setShowWinner={setShowWinner}
                showWinner={showWinner}
              />
              <div className="block mt-4 xl:hidden xl:mt-0">
                <LeftSidebar
                  players={players}
                  hoveredPlayer={hoveredPlayer}
                  setHoveredPlayer={setHoveredPlayer}
                  setWinner={setWinner}
                  winner={winner}
                  setShowWinner={setShowWinner}
                  showWinner={showWinner}
                />
              </div>
              <RoundContentSection
                isRoundContentHovered={isRoundContentHovered}
                setIsRoundContentHovered={setIsRoundContentHovered}
                players={players}
                info={info}
                hoveredPlayer={hoveredPlayer}
                setHoveredPlayer={setHoveredPlayer}
                showWinner={showWinner}
                winner={winner}
              />
            </div>
            <div className="flex flex-col">
              <RoundDetailsSection
                players={players}
                info={info}
                setIsSpinning={setIsSpinning}
                setWonValue={setWonValue}
              />
              <BottomActions
                handleOpenModal={handleOpenModal}
                handleEndGame={handleEndGame}
                isCurrentTimerEnded={isCurrentTimerEnded}
              />
            </div>
            {isWonWindow && (
              <div className="fixed top-0 left-0 w-full h-full bg-[#1f1f13a8] backdrop-blur-lg flex items-center justify-center z-50">
                <div className="text-center">
                  <h1 className="text-[#fff] text-[32px] font-bold">
                    You Won!
                  </h1>
                  <p className="text-[#fff] text-[24px]">
                    ${wonValue.toLocaleString()}
                  </p>
                  <button
                    className="border rounded-md px-5 py-1 text-[#fff] mt-2 text-sm"
                    onClick={() => handleEndGame()}
                  >
                    Back
                  </button>
                </div>
              </div>
            )}
            {isOpen && (
              <JackpotModal
                handleCloseModal={handleCloseModal}
                referralCode={referralCode}
              />
            )}
          </div>
        </>
      </div>
      <Footer />
    </div>
  )
}
