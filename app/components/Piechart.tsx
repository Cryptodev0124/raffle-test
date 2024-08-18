import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import { Pie } from 'react-chartjs-2'
import { Chart, registerables } from 'chart.js'
import confetti from 'canvas-confetti'
import { useSocket } from '../context/SocketContext'
import ethImg from '~/assets/ETH.svg'

Chart.register(...registerables)

const wallet_address = 'Player1'

const PieChart = (props: {
  setWonValue: Function
  hoveredPlayer: string | null
  setHoveredPlayer: Function
  isSpinning: boolean
  setIsSpinning: (isSpinning: boolean) => void
  players: {
    name: string
    avatar: string
    tokens: string
    color: string
    chance: number
  }[]
  info: {
    potValue: number
    chance: number
    deposit: number
  }
  winner: string
  resetRotation: boolean
  isLocked: boolean
  roundEntryDuration: number
  currentMinutes: number
  currentRemainingSeconds: number
}) => {
  const { gameData, setClearGame, started, setStarted, gameEnded } = useSocket()
  const [confettiThrown, setConfettiThrown] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining())
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{ label: 'Players', data: [], backgroundColor: [] }],
  })
  const pieRef = useRef<HTMLDivElement | null>(null)
  const [arcSvg, setArcSvg] = useState<JSX.Element | null>(null)
  const [winnerAddress, setWinnerAddress] = useState<string>('')
  const [winnerAvatar, setWinnerAvatar] = useState<string>(
    '/app/assets/mobile-logo.png',
  )

  const pies = useMemo(() => {
    let piesList: {
      name: string
      color: string
      value: number
    }[] = []
    if (gameData && gameData?.players) {
      const sumBets = gameData?.players.reduce(
        (sum: number, item: any) => sum + item.amountUsd,
        0,
      )
      gameData?.players?.forEach((item: any) => {
        piesList.push({
          name: item.name,
          color: item.color, // Use the color property from gameData
          value: (item.amountUsd / sumBets) * 100,
        })
      })
    }
    return piesList.reverse() // Reverse the order of the pies
  }, [gameData])

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining())
    }, 1000)
    return () => clearInterval(intervalId)
  }, [gameData])

  useEffect(() => {
    let timeoutId: NodeJS.Timer
    if (gameData) {
      if (
        Math.floor((gameData?.endTimestamp - new Date().getTime()) / 1000) === 0
      ) {
        if (setStarted) {
          setStarted(true)
        }
      }
    }
    return () => {
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [timeRemaining])

  useEffect(() => {
    if (gameData && setStarted && gameData.players) {
      if (!gameData.players.length || gameData.players.length < 2) {
        setStarted(false)
      }
    }
  }, [gameData])

  function calculateTimeRemaining() {
    if (
      gameData?.endTimestamp &&
      gameData?.endTimestamp >= new Date().getTime()
    ) {
      return Math.floor((gameData?.endTimestamp - new Date().getTime()) / 1000)
    }
  }

  const throwConfetti = useCallback(() => {
    confetti({
      particleCount: 400,
      spread: 70,
      origin: { y: 0.6 },
    })
  }, [confetti])

  useEffect(() => {
    const updatedData = {
      labels: pies.map((item) => item.name),
      datasets: [
        {
          label: 'Players',
          data: pies.map((item) => item.value),
          backgroundColor: pies.map((item) =>
            item.name === props.hoveredPlayer
              ? item.color
              : props.hoveredPlayer
              ? reduceBrightness(item.color)
              : item.color,
          ),
        },
      ],
    }
    setChartData(updatedData)
  }, [pies, props.hoveredPlayer])

  useEffect(() => {
    if (props.resetRotation) {
      if (pieRef.current) {
        // Reset the rotation immediately
        pieRef.current.style.transition = 'none'
        pieRef.current.style.transform = 'rotate(0deg)'
      }
    } else if (props.isSpinning && pieRef.current) {
      const rotationDuration = 5000 // Duration for the spin
      const totalSpins = 3 // Number of full spins
      const winnerIndex = props.players.findIndex(
        (player) => player.name === props.winner,
      )

      const cumulativeAngles: number[] = []
      let cumulativeAngle = 0

      pies.forEach((item, index) => {
        const itemAngle = (item.value / 100) * 360
        cumulativeAngles.push(cumulativeAngle)
        cumulativeAngle += itemAngle
      })

      const winnerStartAngle = cumulativeAngles[winnerIndex]
      const winnerEndAngle =
        cumulativeAngles[winnerIndex] + (pies[winnerIndex].value / 100) * 360
      const winnerMiddleAngle =
        winnerStartAngle + (winnerEndAngle - winnerStartAngle) / 2
      const finalAngle = winnerMiddleAngle

      pieRef.current.style.transition = `transform ${rotationDuration}ms cubic-bezier(0.25, 0.1, 0.25, 1)` // Smooth deceleration
      pieRef.current.style.transform = `rotate(${
        totalSpins * 360 - finalAngle
      }deg)`

      const timeoutId = setTimeout(() => {
        props.setIsSpinning(false)
        // Only throw confetti if there is more than one player
        if (props.players.length > 1) {
          throwConfetti()
        }

        // Find winner's address and avatar
        const winnerPlayer = props.players.find(
          (player) => player.name === props.winner,
        )
        if (winnerPlayer) {
          setWinnerAddress(winnerPlayer.name)
          setWinnerAvatar(winnerPlayer.avatar)
        }
      }, rotationDuration)

      return () => clearTimeout(timeoutId)
    }
  }, [props.resetRotation, props.isSpinning, props.winner, props.players])

  const onHover = (event: any, element: any) => {
    if (element && element.length > 0) {
      const hoveredIndex = element[0].index
      const hoveredPlayer = pies[hoveredIndex].name
      props.setHoveredPlayer(hoveredPlayer)
    } else {
      props.setHoveredPlayer(null)
    }
  }

  const options = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    elements: {
      arc: {
        borderWidth: 0,
      },
    },
    cutout: '50%',
    onHover: onHover,
  }

  useEffect(() => {
    const circumference = 2 * Math.PI * 130
    const secondsRemaining =
      props.currentMinutes * 60 + props.currentRemainingSeconds
    const fraction = -secondsRemaining / props.roundEntryDuration

    const offset = circumference - fraction * circumference

    const svgElement = (
      <svg
        className="absolute top-[-29px] left-[-29px]"
        width="500"
        height="500"
        viewBox="0 0 400 400"
      >
        <circle
          cx="-150"
          cy="150"
          r="130"
          fill="transparent"
          stroke="white"
          strokeWidth="5"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={offset}
          transform="rotate(-90)"
          strokeLinecap="round"
        />
      </svg>
    )

    setArcSvg(svgElement)
  }, [props.currentRemainingSeconds, props.currentMinutes])

  return (
    <>
      <style>
        {`
          .triangle {
            width: 0;
            height: 0;
            border-left: 10px solid transparent;
            border-right: 10px solid transparent;
            border-top: 20px solid white;
            position: absolute;
            top: 0px;
            left: 50%;
            transform: translateX(-50%);
          }
          .winner-center {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }
          .winner-center img {
            border-radius: 50%;
            width: 64px;
            height: 64px;
            margin-bottom: 4px;
          }
          .winner-crown {
            position: absolute;
            top: calc(50% - 120px/2 - 20px);
            left: calc(50% - 120px/2);
            width: 120px;
            height: 120px;
            z-index: 10;
          }
          .winner-center span {
            color: white;
            font-size: 16px;
          }
        `}
      </style>

      <div className="relative flex flex-col items-center justify-center">
        <div
          className={`relative p-2 rounded-full h-[332px] ${
            props.isLocked
              ? 'border-8 border-white'
              : 'border-8 border-gray-700'
          }`}
        >
          <div className="relative">
            {props.winner && !props.isSpinning && props.players.length > 1 && (
              <img
                src="/winner.svg"
                alt="Crown Icon"
                className="winner-crown"
              />
            )}
            <div ref={pieRef} className="relative">
              <Pie data={chartData} options={options} />
            </div>
          </div>
          {props.winner && !props.isSpinning && props.players.length > 1 && (
            <div className="winner-center">
              <img src={winnerAvatar} alt="Winner Avatar" />
              <span>{winnerAddress}</span>
            </div>
          )}
          {props.isSpinning && (
            <div className="winner-center">
              <img src={ethImg} alt="Token Icon" />
              <span className="text-[#F7B831] text-[20px] font-[600]">
                {props.info.potValue} ETH
              </span>
              <span className="text-[#FFD700] text-[16px] font-[600] text-center">
                Drawing
                <br />
                Winner
              </span>
            </div>
          )}
          {!props.isSpinning &&
            !props.isLocked &&
            props.players.length !== 0 && (
              <div className="winner-center">
                <img src={ethImg} alt="Token Icon" />
                <span className="text-[#F7B831] text-[20px] font-[600]">
                  {props.info.potValue} ETH
                </span>
              </div>
            )}
          {!props.isSpinning &&
            props.players.length === 1 &&
            props.isLocked && (
              <div className="winner-center">
                <img
                  src="/error.png"
                  alt="Error Icon"
                  className="h-[64px] w-[64px]"
                />
                <span className="text-[#FFD700] text-[16px] font-[600] text-center">
                  Not enough
                  <br />
                  players!
                </span>
              </div>
            )}
          {!props.isLocked && arcSvg}
          {props.isLocked && <div className="triangle"></div>}
        </div>
        <div className="absolute bottom-4/6 text-center">
          <div className="text-[#F7B831] text-5xl font-bold">
            {timeRemaining}
          </div>
          {gameData?.players.length === 0 && (
            <div className="text-[#8B8A8D] text-[12px] sm:text-[16px]">
              Waiting for Players
            </div>
          )}
        </div>
      </div>
    </>
  )
}

function reduceBrightness(color: string): string {
  let r = 0,
    g = 0,
    b = 0

  // Parse the hex color string.
  if (color.length === 7) {
    r = parseInt(color[1] + color[2], 16)
    g = parseInt(color[3] + color[4], 16)
    b = parseInt(color[5] + color[6], 16)
  } else if (color.length === 4) {
    r = parseInt(color[1] + color[1], 16)
    g = parseInt(color[2] + color[2], 16)
    b = parseInt(color[3] + color[3], 16)
  }

  // Reduce brightness
  r = Math.max(0, Math.min(255, Math.floor(r / 2)))
  g = Math.max(0, Math.min(255, Math.floor(g / 2)))
  b = Math.max(0, Math.min(255, Math.floor(b / 2)))

  return `rgb(${r},${g},${b})`
}

export default PieChart
