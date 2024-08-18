import { useEffect, useState } from 'react'
import { useParams } from '@remix-run/react'
import { motion } from 'framer-motion'
import { TopNav } from '~/components/nav/TopNav'
import LeftArrow from '~/assets/left-arrow.svg'
import RightArrow from '~/assets/right-arrow.svg'
import type { MetaFunction } from '@remix-run/cloudflare'
import {
  useReadContracts,
  useReadContract,
  useSwitchChain,
  useWaitForTransactionReceipt,
  useWriteContract,
  useAccount,
  useBalance,
  useProof,
} from 'wagmi'
import { useConnectModal } from '@rainbow-me/rainbowkit'

import { raffleAbi } from '~/utils/abis'
import { contracts, pools } from '~/utils/constants'
import { formatEth, formatUSDT } from '~/utils/bigint'
import { Tooltip } from '~/components/Tooltip'
import { Footer } from '~/components/nav/Footer'
import usdt from '~/assets/usdt.svg'
import clock from '~/assets/clock.svg'
import point from '~/assets/point.svg'
import eth from '~/assets/ETH.svg'
import tmemark from '~/assets/tme-mark.png'
import CarouselComponent from '~/components/Carousel'
import { erc20Abi, parseEther } from 'viem'
import { Modal } from '~/components/Modal'
import { getReferrerId } from '~/utils/useReferrerTracker'

export const meta: MetaFunction = () => {
  return [
    { title: 'IRA-Raffle' },
    { name: 'description', content: 'Welcome to IRA-Raffle!' },
  ]
}

export default function Index() {
  const { openConnectModal } = useConnectModal()
  const { switchChain } = useSwitchChain()
  const { isConnected, address, chainId } = useAccount()
  const [isTxModalOpened, setIsTxModalOpened] = useState(false)
  const { poolId } = useParams()
  const id = Number(poolId)
  const referralAddr = getReferrerId()
  const zeroAddr = '0x0000000000000000000000000000000000000000'
  const referralAddress = referralAddr == 'Origin' ? zeroAddr : referralAddr

  const contractWrite = useWriteContract()

  const connectedAddress =
    address || '0x1111111111111111111111111111111111111111'

  const poolInfo = id
    ? pools.find((pool) => pool.id === `TME${id.toString().padStart(3, '0')}`)
    : undefined
  const path = poolInfo?.theme

  const { data, refetch } = useReadContracts({
    contracts: [
      {
        abi: raffleAbi,
        address: contracts.raffle,
        functionName: 'timePool',
        args: [BigInt(id)],
      },
      {
        abi: raffleAbi,
        address: contracts.raffle,
        functionName: 'userInfo',
        args: [connectedAddress],
      },
    ],
  })

  let totalStakedAmount = 0,
    round = 0,
    ethPerTicket = 0,
    stakeAmount = 0,
    actualPoolSize = 0,
    startTime = 0,
    duration = 0,
    isFinished = false,
    requestId = 0,
    feeBPS = 0,
    userPoint = 0
  if (data) {
    try {
      totalStakedAmount = Number(data[0].result[0])
      actualPoolSize = Number(data[0].result[1])
      ethPerTicket = Number(data[0].result[2])
      startTime = Number(data[0].result[3])
      duration = Number(data[0].result[4])
      round = Number(data[0].result[5])
      isFinished = data[0].result[6]
      requestId = Number(data[0].result[7])
      feeBPS = Number(data[0].result[8])
      userPoint = Number(data[1].result[0])
    } catch (e) {
      console.log(e)
    }
  }

  const userEthBalance = useBalance({
    address: connectedAddress,
    unit: 'ether',
  })
  const userEthdata = Number(userEthBalance.data?.value)

  const { data: result, refetch: refetch1 } = useReadContract({
    abi: raffleAbi,
    address: contracts.raffle,
    functionName: 'stakedAmount',
    args: [BigInt(1), BigInt(id), BigInt(round), connectedAddress],
  })

  const txReceipt = useWaitForTransactionReceipt({ hash: contractWrite.data })

  useEffect(() => {
    if (contractWrite.status === 'success' && txReceipt.data) {
      refetch()
      refetch1()
      /* It can happen that a wallet provider (say Metamask) will already
       * see a transaction processed and approval updated on a contract
       * while another provider (e.g. Infura) will still not have seen the
       * latest data. As a workaround to 2 more re-fetches 3 & 10 seconds later.
       */

      setTimeout(refetch, 3000)
      setTimeout(refetch, 10000)

      setTimeout(refetch1, 3000)
      setTimeout(refetch1, 10000)
    }
  }, [contractWrite.status, txReceipt.data, refetch, refetch1])

  useEffect(() => {
    if (contractWrite.status === 'pending') {
      setIsTxModalOpened(true)
    }
  }, [contractWrite.status, txReceipt.data, refetch, refetch1])

  let canStake = true
  let isApproved = true
  let stakeButtonText = 'Play'

  if (
    startTime + duration < Math.floor(Date.now() / 1000) &&
    actualPoolSize >= stakeAmount
  ) {
    canStake = false
    stakeButtonText = 'Pool is closed'
  } else if (!isConnected) {
    stakeButtonText = 'Connect Wallet'
  } else if (userEthdata < stakeAmount) {
    stakeButtonText = 'Not enough ETH balance'
    canStake = false
  } else if (chainId !== 97) {
    stakeButtonText = 'Switch Network'
  }

  const handleStake = () => {
    if (!canStake) return

    if (!isConnected) {
      openConnectModal?.()
    } else if (chainId !== 97) {
      switchChain({ chainId: 97 })
    } else {
      try {
        contractWrite.writeContract({
          abi: raffleAbi,
          address: contracts.raffle,
          functionName: 'depositTimePool',
          args: [BigInt(id), referralAddress],
          value: BigInt(ethPerTicket),
        })
      } catch (e) {
        console.log(e)
      }
    }
  }

  let modalTitle = 'Transaction in process'
  let modalStatus = 'loading'
  let modalDescription = ''
  let modalButtonText = ''
  let modalButtonHref
  let modalButtonAction
  // button not disabled except if action is stake and stake is disabled
  const modalButtonDisabled = modalButtonAction ? !canStake : false
  if (contractWrite.status === 'pending') {
    modalTitle = 'Please check your wallet'
  } else if (contractWrite.status === 'success' && txReceipt.data) {
    modalTitle = 'Transaction successful'
    if (contractWrite.variables?.functionName == 'approve') {
      modalButtonText = 'Play'
      modalButtonHref = undefined
      modalButtonAction = handleStake
    }
    // else depositAssets was called
    else {
      modalButtonText = 'Go to My Pools'
      modalButtonHref = '/mypools'
      modalButtonAction = undefined
    }
    modalStatus = 'success'
  } else if (contractWrite.error) {
    modalTitle = 'Transaction failed'
    modalStatus = 'error'
    modalDescription = contractWrite.error.message
  }

  const slideInFromRight = {
    hidden: {
      x: '10vw',
    },
    show: {
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  }

  return (
    <div className="bg-[#09071b] text-white">
      <TopNav />
      <style>
        {`
          .glow {
            // font-size: 40px;
            color: #fff;
            text-align: center;
            animation: glow 1s ease-in-out infinite alternate;
          }

          @-webkit-keyframes glow {
            from {
              text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #e60073, 0 0 40px #e60073, 0 0 50px #e60073, 0 0 60px #e60073, 0 0 70px #e60073;
            }
            
            to {
              text-shadow: 0 0 20px #fff, 0 0 30px #ff4da6, 0 0 40px #ff4da6, 0 0 50px #ff4da6, 0 0 60px #ff4da6, 0 0 70px #ff4da6, 0 0 80px #ff4da6;
            }
          }
          
          .blue-glow {
            animation: blue-glow 1.25s ease-in-out infinite alternate;
          }

          @-webkit-keyframes blue-glow {
            from {
              text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #0073e677, 0 0 40px #0073e677, 0 0 50px #0073e677, 0 0 60px #0073e677, 0 0 70px #0073e677;
            }
            
            to {
              text-shadow: 0 0 20px #fff, 0 0 30px #4da6ff77, 0 0 40px #4da6ff77, 0 0 50px #4da6ff77, 0 0 60px #4da6ff77, 0 0 70px #4da6ff77, 0 0 80px #4da6ff77;
            }
          }
          
          .coin-shadow {
            filter: drop-shadow(5px 5px 38px #000);
          }

          .gameboard {
            background-color: #35317833;
            border: 1px solid #7862fe33;
            border-radius: 12px;
          }

          .gameboard-title {
            align-items: center;
            background-image: linear-gradient(to right, #842856, #353178);
            border-radius: 12px;
            display: flex;
            flex-direction: column;
          }
          .gameboard-stats {
            background-color: #1a1c42;
            border-radius: 7px;
            color: #5f63ac;
          }
          .play-button {
            background-image: linear-gradient(to right, #FFFF34, #FFDD5E, #EBA054);
          }
          .card-gradient-background {
            background: linear-gradient(to top, #192E37, #709CAE);
          }
        `}
      </style>
      <Modal
        status={modalStatus}
        description={modalDescription}
        txLink={
          contractWrite.data
            ? `https://testnet.bscscan.com/tx/${contractWrite.data}`
            : ''
        }
        title={modalTitle}
        buttonText={modalButtonText}
        buttonHref={modalButtonHref}
        isOpen={isTxModalOpened}
        setIsOpen={() => {
          setIsTxModalOpened(false)
          refetch()
        }}
        modalButtonAction={modalButtonAction}
        modalButtonDisabled={modalButtonDisabled}
      />
      <div className="relative max-w-[1440px] mx-auto">
        <img src={path} alt="banner" className="w-full" />
        <div className="max-w-[1024px] lg:max-w-[250px] min-w-[240px] flex flex-col gap-3 px-4 mx-8 mt-4 py-18 card-gradient-background rounded-[10px] text-white border-[#00CCFF33] border-2 lg:absolute bottom-8 right-16 opacity-90">
          <div className="font-extrabold text-2xl border-b text-center">
            {poolInfo?.name}
          </div>
          <div className="flex flex-row justify-between">
            <div className="font-bold text-sm uppercase">round</div>
            <div className="text-sm">{round}</div>
          </div>
          <div className="flex flex-row justify-between">
            <div className="font-bold text-sm uppercase">stake</div>
            <div className="text-sm">
              {formatEth(totalStakedAmount)} ETH&nbsp;
              <Tooltip>We charge 10% Fee per join</Tooltip>
            </div>
          </div>
          <div className="flex flex-row justify-between">
            <div className="font-bold text-sm uppercase">Ticket Price</div>
            <div className="text-sm">
              {ethPerTicket ? ethPerTicket / 10 ** 18 : 0} ETH&nbsp;
              <Tooltip>
                We charge {ethPerTicket ? ethPerTicket / 10 ** 18 : 0} per
                ticket
              </Tooltip>
            </div>
          </div>
          <div className="flex flex-row justify-between">
            <div className="font-bold text-sm uppercase">Time</div>
            <div className="text-sm">{poolInfo?.size}</div>
          </div>
          <div className="flex flex-row justify-between items-center">
            <div className="font-bold text-sm uppercase">pooltype</div>
            <Tooltip src={tmemark} imgClass={'w-6'}>
              Timebased Pool
            </Tooltip>
          </div>
        </div>

        <div
          className={`text-center mt-4 px-4 absolute w-full lg:w-fit bottom-56 lg:bottom-9 ${
            isConnected && chainId === 97
              ? startTime + duration < Math.floor(Date.now() / 1000)
                ? 'lg:right-[39%]'
                : userEthdata < stakeAmount
                ? 'lg:right-[35%]'
                : 'lg:right-[44%]'
              : 'lg:right-[37%]'
          }`}
        >
          {!isApproved && (
            <button
              className={`w-full text-xl play-button px-4 disabled:!bg-gray-500 h-14 hover:scale-103 rounded-full relative outline outline-2 outline-offset-[6px] outline-yellow-300 text-black hover:scale-105 mb-6 ${
                !isApproved ? 'hover:opacity-90' : 'opacity-60'
              }`}
              onClick={() => {
                if (chainId !== 97) {
                  switchChain({ chainId: 97 })
                } else if (isApproved) {
                  return
                } else {
                  contractWrite.writeContract({
                    abi: erc20Abi,
                    address: contracts.stakingToken,
                    functionName: 'approve',
                    args: [contracts.raffle, BigInt(stakeAmount)],
                  })
                }
              }}
            >
              Play
            </button>
          )}
          {/* {isApproved &&  */}
          <button
            className={`text-white text-lg md:text-2xl rounded-[20px] font-semibold md:font-extrabold py-3 px-6 md:px-12 uppercase glow ${
              canStake ? 'hover:opacity-90' : 'opacity-60'
            }`}
            onClick={() => handleStake()}
            disabled={!canStake}
          >
            {stakeButtonText}
          </button>
          {/* } */}
        </div>
      </div>
      <div className="max-w-[1440px] px-8 mx-auto py-20">
        <div className="lg:w-7/12 mx-auto px-8 sm:px-24 grid grid-cols-1 md:grid-cols-2 gap-8 gameboard py-8 blue-glow">
          <div className="gameboard-stats px-4 py-6 rounded-[10px] items-center flex flex-row gap-2">
            <img src={usdt} className="w-[56px]" />
            <div
              className="flex flex-col gap-2 mx-auto"
            >
              <div className="w-fit px-1 text-white rounded-full text-2xl font-bold">
                {formatEth(actualPoolSize)} ETH
              </div>
              <div className="uppercase text-white text-xs">
                current poolsize
              </div>
            </div>
          </div>
          <div className="gameboard-stats px-4 py-6 rounded-[10px] items-center flex flex-row gap-2">
            <img src={clock} className="w-[56px]" />
            <div className="flex flex-col gap-2 mx-auto">
              <div className="w-fit px-4 text-white rounded-full text-2xl font-bold">
                &lt;{' '}
                {Math.floor(
                  (startTime + duration - Math.floor(Date.now() / 1000)) / 3600,
                ) + 1}
                h
              </div>
              <div className="uppercase  text-white text-xs">
                time till payout
              </div>
            </div>
          </div>
          <div className="gameboard-stats px-4 py-6 rounded-[10px] items-center flex flex-row gap-2">
            <img src={eth} className="w-[56px]" />
            <div className="flex flex-col gap-2 mx-auto">
              <div className="w-fit px-4 text-white rounded-full text-2xl font-bold">
                {formatEth(userEthdata)} ETH
              </div>
              <div className="uppercase  text-white text-xs">
                User ETH Value
              </div>
            </div>
          </div>
          <div className="gameboard-stats px-4 py-6 rounded-[10px] items-center flex flex-row gap-2">
            <img src={point} className="w-[56px]" />
            <div className="flex flex-col gap-2 mx-auto">
              <div className="w-fit px-4 text-white rounded-full text-xl font-bold">
                {userPoint}
              </div>
              <div className="w-fit px-4 text-white rounded-full text-xl font-bold">
                WTF Points
              </div>
              <div className="uppercase  text-white text-xs">
                User Referral Points
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col max-w-[1440px] px-8 md:px-24 mx-auto bg-[#161432] py-12">
        <div className="text-4xl font-bold text-center mb-10">
          Running Pools
        </div>
        <CarouselComponent id={poolInfo?.id} />
      </div>
      <Footer />
    </div>
  )
}
