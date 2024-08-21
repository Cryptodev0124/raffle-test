import React, { useState, useEffect, useRef } from 'react'
interface DataItem {
  option: string
}
import { useConnectModal } from '@rainbow-me/rainbowkit'
import RouletteComponent from './RouletteComponent'
import { useAccount, useReadContracts } from 'wagmi'
import { spinWheelAbi } from '~/utils/abis'
import { contracts } from '~/utils/constants'

interface ImageProps {
  uri: string
  offsetX?: number
  offsetY?: number
  sizeMultiplier?: number
  landscape?: boolean
}

interface DataItem {
  option: string
  image?: ImageProps
}

// Initialize the data array for the spinning wheel
const sectorsUsdt: DataItem[] = [
  {
    option: '$1',
    image: {
      uri: '/wheel/1.png',
      offsetX: 0,
      offsetY: 0,
      sizeMultiplier: 1,
      landscape: true,
    },
  },
  {
    option: '$500',
    image: {
      uri: '/wheel/500.png',
      offsetX: 0,
      offsetY: 0,
      sizeMultiplier: 1,
      landscape: true,
    },
  },
  {
    option: '$2',
    image: {
      uri: '/wheel/2.png',
      offsetX: 0,
      offsetY: 0,
      sizeMultiplier: 1,
      landscape: true,
    },
  },
  {
    option: '$100',
    image: {
      uri: '/wheel/100.png',
      offsetX: 0,
      offsetY: 0,
      sizeMultiplier: 1,
      landscape: true,
    },
  },
  {
    option: '$3',
    image: {
      uri: '/wheel/3.png',
      offsetX: 0,
      offsetY: 0,
      sizeMultiplier: 1,
      landscape: true,
    },
  },
  {
    option: '$50',
    image: {
      uri: '/wheel/50.png',
      offsetX: 0,
      offsetY: 0,
      sizeMultiplier: 1,
      landscape: true,
    },
  },
  {
    option: '$4',
    image: {
      uri: '/wheel/4.png',
      offsetX: 0,
      offsetY: 0,
      sizeMultiplier: 1,
      landscape: true,
    },
  },
  {
    option: '$40',
    image: {
      uri: '/wheel/40.png',
      offsetX: 0,
      offsetY: 0,
      sizeMultiplier: 1,
      landscape: true,
    },
  },
  {
    option: '$5',
    image: {
      uri: '/wheel/5.png',
      offsetX: 0,
      offsetY: 0,
      sizeMultiplier: 1,
      landscape: true,
    },
  },
  {
    option: '$30',
    image: {
      uri: '/wheel/30.png',
      offsetX: 0,
      offsetY: 0,
      sizeMultiplier: 1,
      landscape: true,
    },
  },
  {
    option: '$6',
    image: {
      uri: '/wheel/6.png',
      offsetX: 0,
      offsetY: 0,
      sizeMultiplier: 1,
      landscape: true,
    },
  },
  {
    option: '$20',
    image: {
      uri: '/wheel/20.png',
      offsetX: 0,
      offsetY: 0,
      sizeMultiplier: 1,
      landscape: true,
    },
  },
  {
    option: '$7',
    image: {
      uri: '/wheel/7.png',
      offsetX: 0,
      offsetY: 0,
      sizeMultiplier: 1,
      landscape: true,
    },
  },
  {
    option: '$10',
    image: {
      uri: '/wheel/10.png',
      offsetX: 0,
      offsetY: 0,
      sizeMultiplier: 1,
      landscape: true,
    },
  },
  {
    option: '$8',
    image: {
      uri: '/wheel/8.png',
      offsetX: 0,
      offsetY: 0,
      sizeMultiplier: 1,
      landscape: true,
    },
  },
  {
    option: '$9',
    image: {
      uri: '/wheel/9.png',
      offsetX: 0,
      offsetY: 0,
      sizeMultiplier: 1,
      landscape: true,
    },
  },
]

// Initialize the data array for the spinning wheel
const sectorsWtf: DataItem[] = [
  {
    option: 'Sector 1',
    image: {
      uri: '/wheel/100wtf.png',
      offsetX: 0,
      offsetY: 0,
      sizeMultiplier: 1,
      landscape: true,
    },
  },
  {
    option: 'Sector 2',
    image: {
      uri: '/wheel/15wtf.png',
      offsetX: 0,
      offsetY: 0,
      sizeMultiplier: 1,
      landscape: true,
    },
  },
  {
    option: 'Sector 3',
    image: {
      uri: '/wheel/25wtf.png',
      offsetX: 0,
      offsetY: 0,
      sizeMultiplier: 1,
      landscape: true,
    },
  },
  {
    option: 'Sector 4',
    image: {
      uri: '/wheel/35wtf.png',
      offsetX: 0,
      offsetY: 0,
      sizeMultiplier: 1,
      landscape: true,
    },
  },
  {
    option: 'Sector 5',
    image: {
      uri: '/wheel/45wtf.png',
      offsetX: 0,
      offsetY: 0,
      sizeMultiplier: 1,
      landscape: true,
    },
  },
  {
    option: 'Sector 6',
    image: {
      uri: '/wheel/5wtf.png',
      offsetX: 0,
      offsetY: 0,
      sizeMultiplier: 1,
      landscape: true,
    },
  },
  {
    option: 'Sector 7',
    image: {
      uri: '/wheel/70wtf.png',
      offsetX: 0,
      offsetY: 0,
      sizeMultiplier: 1,
      landscape: true,
    },
  },
  {
    option: 'Sector 8',
    image: {
      uri: '/wheel/90wtf.png',
      offsetX: 0,
      offsetY: 0,
      sizeMultiplier: 1,
      landscape: true,
    },
  },
  {
    option: 'Sector 9',
    image: {
      uri: '/wheel/10wtf.png',
      offsetX: 0,
      offsetY: 0,
      sizeMultiplier: 1,
      landscape: true,
    },
  },
  {
    option: 'Sector 10',
    image: {
      uri: '/wheel/20wtf.png',
      offsetX: 0,
      offsetY: 0,
      sizeMultiplier: 1,
      landscape: true,
    },
  },
  {
    option: 'Sector 11',
    image: {
      uri: '/wheel/30wtf.png',
      offsetX: 0,
      offsetY: 0,
      sizeMultiplier: 1,
      landscape: true,
    },
  },
  {
    option: 'Sector 12',
    image: {
      uri: '/wheel/40wtf.png',
      offsetX: 0,
      offsetY: 0,
      sizeMultiplier: 1,
      landscape: true,
    },
  },
  {
    option: 'Sector 13',
    image: {
      uri: '/wheel/50wtf.png',
      offsetX: 0,
      offsetY: 0,
      sizeMultiplier: 1,
      landscape: true,
    },
  },
  {
    option: 'Sector 14',
    image: {
      uri: '/wheel/60wtf.png',
      offsetX: 0,
      offsetY: 0,
      sizeMultiplier: 1,
      landscape: true,
    },
  },
  {
    option: 'Sector 15',
    image: {
      uri: '/wheel/80wtf.png',
      offsetX: 0,
      offsetY: 0,
      sizeMultiplier: 1,
      landscape: true,
    },
  },
  {
    // '5wtf.png' is used twice to make up for the 16th sector
    option: 'Sector 16',
    image: {
      uri: '/wheel/5wtf.png',
      offsetX: 0,
      offsetY: 0,
      sizeMultiplier: 1,
      landscape: true,
    },
  },
]

const Roulette: React.FC = () => {
  const [inputEthValue, setInputEthValue] = useState('0.01')
  // const [userWtfPoints, setUserWtfPoints] = useState('0')
  const [userRemainBetting, setRemainBetting] = useState('0')
  let [userTotalWin, setTotalWin] = useState(0)

  const { address } = useAccount()

  const connectedAddress =
    address || '0x1111111111111111111111111111111111111111'

  const { data, refetch } = useReadContracts({
    contracts: [
      {
        abi: spinWheelAbi,
        address: contracts.spinWheel,
        functionName: 'lastFreeSpinTime',
        args: [connectedAddress],
      },
      {
        abi: spinWheelAbi,
        address: contracts.spinWheel,
        functionName: 'getUserWtfPoints',
        args: [connectedAddress],
      },
      {
        abi: spinWheelAbi,
        address: contracts.spinWheel,
        functionName: 'spinPrice',
      },
      {
        abi: spinWheelAbi,
        address: contracts.spinWheel,
        functionName: 'userEthRewards',
        args: [connectedAddress],
      },
    ],
  })

  let userLastDepositTime = 0,
    userWtfPoints = 0,
    spinPrice = 0

  if (data) {
    userLastDepositTime = Number(data[0].result)
    userWtfPoints = Number(data[1].result)
    spinPrice = Number(data[2].result)
    userTotalWin = Number(data[3].result)
  }
  const nextFreeSpinTime = userLastDepositTime + 24 * 60 * 60 // 24 hours later
  console.log("nextFreeSpinTime", nextFreeSpinTime)
  // Function to handle the spin button click

  return (
    <>
      <RouletteComponent
        // handleTransaction={handleTransaction}
        userWtfPoints={userWtfPoints}
        spinPrice={spinPrice}
        userRemainBetting={userRemainBetting}
        userTotalWin={userTotalWin}
        setTotalWin={setTotalWin}
        maxTradableAmount={1} /* User cannot bet more than this */
        inputEthValue={inputEthValue}
        sectors={sectorsUsdt} /* sectorsUsdt or sectorsWtf can be used here */
        nextFreeSpinTime={nextFreeSpinTime}
      />
    </>
  )
}

export default Roulette
