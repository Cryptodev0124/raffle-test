'use client'
import React, { useState, useEffect, useMemo } from 'react'
import { Wheel } from 'react-custom-roulette'
import eth from '~/assets/ETH.svg'
import { formatEthAmount } from '~/utils/formatBalance'
import { useEstimateGas } from 'wagmi'
import {
  useAccount,
  useBalance,
  useReadContracts,
  useSwitchChain,
  useWriteContract,
  useWaitForTransactionReceipt,
} from 'wagmi'
import TimeDisplay from './TimeDisplay'

interface DataItem {
  option: string
  image?: any
}
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { ethPriceFeedAbi, spinWheelAbi } from '~/utils/abis'
import { contracts } from '~/utils/constants'
import { parseGwei } from 'viem'

interface RouletteComponentProps {
  // handleTransaction: () => boolean
  userWtfPoints: number
  userRemainBetting: string
  spinPrice: number
  userTotalWin: number
  inputEthValue: string
  sectors: DataItem[]
  maxTradableAmount: number
  nextFreeSpinTime: number
  setTotalWin: (win: number) => void
}

const RouletteComponent: React.FC<RouletteComponentProps> = ({
  // handleTransaction,
  userWtfPoints,
  userRemainBetting,
  spinPrice,
  userTotalWin,
  inputEthValue,
  sectors,
  maxTradableAmount,
  nextFreeSpinTime,
  setTotalWin
}) => {
  const { isConnected, address, chainId } = useAccount()
  const { switchChain } = useSwitchChain()
  const contractWrite = useWriteContract()
  const { openConnectModal } = useConnectModal()
  const [mustSpin, setMustSpin] = useState<boolean>(false)
  const [spinResult, setSpinResult] = useState<number>(0)
  const [isTransactionInProgress, setIsTransactionInProgress] = useState(false)
  const [allowSpinning, setAllowSpinning] = useState<boolean>(false)
  const [isFreeSpin, setIsFreeSpin] = useState<boolean>(false)

  const getSectorIndex = (reward: number): number => {
    if (reward === 0) {
      return 0
    }
    const rewardValues = sectors.map((sector) =>
      parseInt(sector.option.replace('$', '')),
    )
    return rewardValues.indexOf(reward)
  }

  const connectedAddress =
    address || '0x1111111111111111111111111111111111111111'

  const userEthBalance = useBalance({
    address: connectedAddress,
    unit: 'ether',
  })
  const userEthdata = Number(userEthBalance.data?.value)
  const formatEthBalance =
    Number(userEthdata) > 0 ? formatEthAmount(Number(userEthdata)) : 0

  const { data, refetch } = useReadContracts({
    contracts: [
      {
        abi: spinWheelAbi,
        address: contracts.spinWheel,
        functionName: 'getUserPaidSpinHistory',
        args: [connectedAddress],
      },
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
      {
        abi: spinWheelAbi,
        address: contracts.spinWheel,
        functionName: 'isFreeSpin',
        args: [connectedAddress],
      },
    ],
  })
  console.log(data)
  const handleSpinClick = () => {
    setSpinResult(0)
    if (!isConnected) {
      openConnectModal?.()
    } else if (chainId !== 97) {
      switchChain({ chainId: 97 })
    } else if (
      spinPrice > userEthdata &&
      userWtfPoints < 100 &&
      nextFreeSpinTime > 0
    ) {
      if (nextFreeSpinTime > 0) {
        alert('You should wait until next free spin time')
      } else {
        alert('Invalid user balance')
      }
    } else {
      console.log('spin', userEthdata, "spinPrice", spinPrice, userWtfPoints)
      try {
        if (isFreeSpin == true) {
          console.log("spinFree")
          contractWrite.writeContract({
            abi: spinWheelAbi,
            address: contracts.spinWheel,
            functionName: 'spinFree',
            gas: parseGwei('0.002')
          })
        } else if (userWtfPoints > 100 || userEthdata > spinPrice) {
          console.log("spinPaid", spinPrice)
          contractWrite.writeContract({
            abi: spinWheelAbi,
            address: contracts.spinWheel,
            functionName: 'spinPaid',
            value: BigInt(spinPrice),
            gas: parseGwei('0.002')
            // gasPrice: parseGwei('20'),
            // maxFeePerGas: parseGwei('33')
          })
        }
        // modalStatus = 'success'
        setIsTransactionInProgress(true)
      } catch (e) {
        console.log(e)
      }
    }
  }

  const handleClaimReward = () => {
    if (!isConnected) {
      openConnectModal?.()
    } else if (chainId !== 97) {
      switchChain({ chainId: 97 })
    } else {
      console.log('claimReward')
      try {
        if (userTotalWin > 0) {
          contractWrite.writeContract({
            abi: spinWheelAbi,
            address: contracts.spinWheel,
            functionName: 'withdrawRewards',
            gas: parseGwei('0.005')
          })
        } else {
          alert('TotalWinAmount should bigger than zero')
        }
        // modalStatus = 'success'
      } catch (e) {
        console.log(e)
      }
    }
  }

  const txReceipt = useWaitForTransactionReceipt({ hash: contractWrite.data })

  useEffect(() => {
    if (isTransactionInProgress && txReceipt.data && txReceipt.data.status === 'success') {
      setIsTransactionInProgress(false)
      setAllowSpinning(true)
    }
  }, [txReceipt.data, txReceipt.data?.status])

  useEffect(() => {
    if (contractWrite.status === 'success' && txReceipt.data) {
      refetch()
      /* It can happen that a wallet provider (say Metamask) will already
       * see a transaction processed and approval updated on a contract
       * while another provider (e.g. Infura) will still not have seen the
       * latest data. As a workaround to 2 more re-fetches 3 & 10 seconds later.
       */

      setTimeout(refetch, 3000)
      // setTimeout(refetch, 10000)
    }
    if (data) {
      const lastDataItem = data[0].result[data[0].result.length - 1]
      const result = Number(lastDataItem?.reward)
      if (result) {
        setSpinResult(result)
        setTotalWin(Number(data[4].result))
        setIsFreeSpin(data[5].result)
      } else {
        setSpinResult(0)
      }
    }

  }, [contractWrite.status, txReceipt.data, refetch, data])

  useEffect(() => {
    if (allowSpinning && spinResult !== 0) {
      setAllowSpinning(false)
      setMustSpin(true)
    }
  }, [allowSpinning, spinResult])

  const useMediaQuery = (query: any) => {
    const [matches, setMatches] = useState(false)

    useEffect(() => {
      const mediaQuery = window.matchMedia(query)

      setMatches(mediaQuery.matches)

      const listener = (event: any) => {
        setMatches(event.matches)
      }

      mediaQuery.addEventListener('change', listener)

      return () => {
        mediaQuery.removeEventListener('change', listener)
      }
    }, [query])

    return matches
  }

  const smallViewport = useMediaQuery('(max-width: 1024px)')
  const verySmallViewport = useMediaQuery('(max-width: 640px)')

  const handlePrize = () => {
    setIsModalOpen(true)
    setMustSpin(false)
  }

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const closeModal = () => {
    setSpinResult(0)
    setIsModalOpen(false)
  }

  return (
    <>
      <style>
        {`
         .play-button {
           background-image: linear-gradient(
             to right,
             #FFFF34,
             #FFDD5E,
             #EBA054
           );
         }

         @keyframes rotateWheel {
           0%,
           100% {
             transform: rotate(0deg);
           }
           50% {
             transform: rotate(22.5deg);
           }
         }
       `}
      </style>
      {/* Render the Wheel */}
      <div className="flex justify-center items-center flex-column overflow-x-hidden -mx-6">
        <div className="flex justify-center items-center flex-column">
          <div
            style={{
              backgroundImage: 'url(/wheel/background.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              border: '5px solid purple',
              paddingTop: '40px',
              paddingBottom: '0px',
              paddingLeft: verySmallViewport ? '5px' : '40px',
              paddingRight: verySmallViewport ? '5px' : '40px',
              marginBottom: '80px',
              borderRadius: '15px',
              display: 'flex',
              justifyContent: 'space-between',
              width: verySmallViewport ? '90vw' : 'auto',
            }}
          >
            <div
              className={`
                relative w-fit h-fit mr-[40px]
                ${smallViewport ? 'hidden' : 'mb-[40px]'}
                `}
            >
              <img
                style={{
                  minHeight: '655px',
                  maxHeight: '655px',
                  minWidth: '328px',
                  flexShrink: 0,
                }}
                src="/wheel/dashboard.png"
                alt="Dashboard"
              />
              <div className="absolute top-[18%] left-[11%] text-2xl">
                <TimeDisplay nextFreeSpinTime={nextFreeSpinTime} />
              </div>
              <div className="absolute top-[35.25%] left-[16%] text-2xl w-[69%] text-center">
                {userWtfPoints}
              </div>
              <div className="absolute top-[48.25%] left-[16%] text-2xl w-[69%] text-center">
                {spinPrice / 10 ** 18}
              </div>
              <div className="absolute top-[61%] left-[16%] text-2xl w-[69%] text-center">
                {isConnected ? formatEthBalance.toFixed(6) : 0}
              </div>
              <div className="absolute top-[74.5%] left-[16%] text-2xl w-[69%] text-center">
                {(userTotalWin / 10 ** 18).toFixed(6)} ETH
              </div>
              <div className="absolute top-[85.5%] left-[14%] text-3xl w-[69%] text-center">
                <button
                  onClick={handleClaimReward}
                  disabled={
                    isConnected && chainId == 97 && userTotalWin > 0
                      ? false
                      : true
                  }
                  className={`flex flex-row gap-3 items-center text-black play-button disabled:!bg-gray-500 h-14 hover:scale-103 rounded-full relative outline outline-2 outline-offset-[6px] outline-yellow-300 hover:scale-105 disabled:opacity-60 px-8 py-4 text-lg ${verySmallViewport ? 'w-[190px]' : 'w-[240px]'
                    }`}
                >
                  <div className="mx-auto">
                    {isConnected && chainId == 97 && userTotalWin > 0
                      ? 'Claim Reward'
                      : 'Claim Reward'}
                  </div>
                </button>
              </div>
            </div>
            <div className="mx-auto">
              <div className="relative w-fit">
                <Wheel
                  mustStartSpinning={mustSpin}
                  prizeNumber={getSectorIndex(spinResult)}
                  data={sectors}
                  outerBorderColor={'#f97ed3'}
                  outerBorderWidth={3}
                  innerBorderColor={'#111111'}
                  radiusLineColor={'#111111'}
                  radiusLineWidth={1}
                  fontSize={24}
                  textColors={['#ffffff']}
                  backgroundColors={[
                    '#F22B3533',
                    '#F9953333',
                    '#24CA6933',
                    '#514E5033',
                    '#46AEFF33',
                    '#9145B733',
                  ]}
                  onStopSpinning={handlePrize}
                />
                <img
                  className="absolute bottom-[37.5%] left-[37.5%] z-10 w-[25%]"
                  src="/wheel-logo.png"
                  alt=""
                />
                <img
                  className="absolute top-[0%] right-[0%] z-10 w-[100%] r-["
                  src="/wheel/wheel-border.png"
                  alt=""
                />
                <img
                  className="absolute top-[0%] right-[0%] z-10 w-[100%]"
                  src="/wheel/wheel-border-lights.png"
                  alt=""
                  style={{
                    animation: 'rotateWheel 2s steps(1, end) infinite',
                  }}
                />
                <img
                  className="absolute bottom-[-15%] right-[0%] z-10 w-[100%]"
                  src="/wheel/bottom.png"
                  alt=""
                />
                <img
                  className="absolute top-[-8%] right-[-10.25%] z-20 w-[33%]"
                  src="/wheel-pointer.png"
                  alt=""
                />
              </div>
              <div className="w-fit mx-auto">
                <button
                  onClick={handleSpinClick}
                  className="flex flex-row gap-3 items-center text-black play-button disabled:!bg-gray-500 h-14 hover:scale-103 rounded-full relative outline outline-2 outline-offset-[6px] outline-yellow-300 hover:scale-105 disabled:opacity-60 px-8 py-4 text-lg mb-8 mt-20 w-[200px]"
                >
                  <div className="mx-auto">
                    {isConnected && chainId == 97 ? 'SPIN' : 'Connect Wallet'}
                  </div>
                </button>
              </div>
              <div className="-mt-2 mb-8">
                <div
                  className={`
                    max-w-[${verySmallViewport ? '240px' : '300px'}]
                    mx-auto grid grid-cols-1 md:grid-cols-2
                  `}
                >
                  <div className="mx-auto">
                    <div
                      className={`
                      w-[${verySmallViewport ? '240px' : '300px'}]
                      relative
                    `}
                    >
                      <div className={`relative w-fit h-fit mr-[40px] ${verySmallViewport ? '' : 'hidden'}`}>
                        <img
                          style={{
                            minHeight: '480px',
                            maxHeight: '480px',
                            minWidth: '240px',
                            flexShrink: 0,
                          }}
                          src="/wheel/dashboard.png"
                          alt="Dashboard"
                        />
                        <div className="absolute top-[18%] left-[11%] text-lg scale-75">
                          <TimeDisplay nextFreeSpinTime={nextFreeSpinTime} />
                        </div>
                        <div className="absolute top-[34.75%] left-[16%] text-lg w-[69%] text-center">
                          {userWtfPoints}
                        </div>
                        <div className="absolute top-[47.75%] left-[16%] text-lg w-[69%] text-center">
                          {spinPrice / 10 ** 18}
                        </div>
                        <div className="absolute top-[60.75%] left-[16%] text-lg w-[69%] text-center">
                          {isConnected ? formatEthBalance.toFixed(6) : 0}
                        </div>
                        <div className="absolute top-[74%] left-[16%] text-xl w-[69%] text-center">
                          {(userTotalWin / 10 ** 18).toFixed(6)} ETH
                        </div>
                        <div className="absolute top-[84%] left-[5%] text-xl w-[69%] text-center scale-75">
                          <button
                            onClick={handleClaimReward}
                            className={`flex flex-row gap-3 items-center text-black play-button disabled:!bg-gray-500 h-14 hover:scale-103 rounded-full relative outline outline-2 outline-offset-[6px] outline-yellow-300 hover:scale-105 disabled:opacity-60 px-8 py-4 text-lg ${verySmallViewport ? 'w-[240px]' : 'w-[240px]'
                              }`}
                          >
                            <div className="mx-auto">
                              {isConnected && chainId == 97 && userTotalWin > 0
                                ? 'Claim Reward'
                                : 'Connect Wallet'}
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Modal overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20 p-10">
          <div className="bg-[#770077aa] p-6 rounded-lg w-full max-w-xl">
            <img
              src="/wheel-logo.png"
              width="128px"
              height="128px"
              alt=""
              className="text-center mx-auto block"
            />
            <p className="text-xl text-center font-semibold">You won!</p>
            <p className="text-3xl font-bold text-center">
              {sectors[getSectorIndex(spinResult)].option}
            </p>
            <div className="flex justify-center items-center mt-4">
              <button
                onClick={closeModal}
                className="px-6 py-2 bg-purple-500 text-white rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default RouletteComponent
