import { useEffect, useState } from 'react'
import { useParams } from '@remix-run/react'
import { TopNav } from '~/components/nav/TopNav'
import type { MetaFunction } from '@remix-run/cloudflare'
import {
  useReadContracts,
  useReadContract,
  useSwitchChain,
  useWaitForTransactionReceipt,
  useWriteContract,
  useAccount,
} from 'wagmi'
import { useConnectModal } from '@rainbow-me/rainbowkit'

import { raffleAbi } from '~/utils/abis'
import { contracts, pools } from '~/utils/constants'
import { formatEth, formatUSDT } from '~/utils/bigint'
import { Tooltip } from '~/components/Tooltip'
import { Footer } from '~/components/nav/Footer'
import usdt from '~/assets/usdt.svg'
import percent from '~/assets/percent.svg'
import halving from '~/assets/halving.svg'
import dice from '~/assets/dice.svg'
import trxmark from '~/assets/trx-mark.svg'
import CarouselComponent from '~/components/Carousel'
import { erc20Abi, parseEther } from 'viem'
import { Modal } from '~/components/Modal'

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

  const contractWrite = useWriteContract()

  const connectedAddress =
    address || '0x1111111111111111111111111111111111111111'
  const poolInfo = id
    ? pools.find((pool) => pool.id === `TRX${id.toString().padStart(3, '0')}`)
    : undefined
  const path = poolInfo?.theme

  const { data, refetch } = useReadContracts({
    contracts: [
      {
        abi: raffleAbi,
        address: contracts.raffle,
        functionName: 'trxPool',
        args: [BigInt(id)],
      },
      {
        abi: erc20Abi,
        address: contracts.stakingToken,
        functionName: 'allowance',
        args: [connectedAddress, contracts.raffle],
      },
      {
        abi: erc20Abi,
        address: contracts.stakingToken,
        functionName: 'balanceOf',
        args: [connectedAddress],
      },
    ],
  })

  let round = 0,
    tokenAllowance = 0,
    tokenBalance = 0,
    isFinished = false,
    stakeAmount = 0,
    actualPoolSize = 0,
    halvingSize = 0,
    lastHalving = 0,
    halvingDuration = 0
  if (data) {
    try {
      round = Number(data[0].result[6])
      stakeAmount = Number(data[0].result[3])
      actualPoolSize = Number(data[0].result[1])
      halvingSize = Number(data[0].result[2])
      lastHalving = Number(data[0].result[4])
      halvingDuration = Number(data[0].result[5])
      tokenAllowance = Number(data[1].result)
      tokenBalance = Number(data[2].result)
      isFinished = data[0].result[7]
    } catch (e) {
      console.log(e)
    }
  }

  const { data: result, refetch: refetch1 } = useReadContract({
    abi: raffleAbi,
    address: contracts.raffle,
    functionName: 'stakedAmount',
    args: [BigInt(0), BigInt(id), BigInt(round), connectedAddress],
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
  let stakeButtonText = 'Join'

  if (isFinished) {
    canStake = false
    stakeButtonText = 'Pool is closed'
  } else if (!isConnected) {
    stakeButtonText = 'Connect Wallet'
  } else if (tokenBalance < stakeAmount) {
    stakeButtonText = 'Not enough balance'
    canStake = false
  } else if (chainId !== 11155111) {
    stakeButtonText = 'Switch Network'
  } else if (tokenAllowance < stakeAmount) {
    stakeButtonText = 'Join'
    canStake = false
    isApproved = false
  }

  const handleStake = () => {
    if (!canStake) return

    if (!isConnected) {
      openConnectModal?.()
    } else if (chainId !== 11155111) {
      switchChain({ chainId: 11155111 })
    } else {
      try {
        contractWrite.writeContract({
          abi: raffleAbi,
          address: contracts.raffle,
          functionName: 'depositTrxPool',
          args: [BigInt(id)],
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
      modalButtonText = 'Join'
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
          
          .coin-shadow {
            filter: drop-shadow(5px 5px 38px #000);
          }

          .gameboard {
            align-items: center;
            background-color: #35317877;
            border: 1px solid #7862fe77;
            border-radius: 12px;
            display: flex;
            flex-direction: column;
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
            ? `https://sepolia.etherscan.io/tx/${contractWrite.data}`
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
        <div className="max-w-[250px] flex flex-col gap-3 px-4 mx-8 mt-4 py-3 card-gradient-background rounded-[10px] text-white border-[#00CCFF33] border-2 min-w-[329px] lg:absolute bottom-8 right-16 opacity-90">
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
              {poolInfo?.stakeAmount}
              ETH &nbsp;
              <Tooltip>We charge 10% Fee per join</Tooltip>
            </div>
          </div>
          <div className="flex flex-row justify-between">
            <div className="font-bold text-sm uppercase">poolsize</div>
            <div className="text-sm">
              {formatEth(halvingSize, true, 2)} ETH&nbsp;
              <Tooltip>Poolsize may vary due to Halvings</Tooltip>
            </div>
          </div>
          <div className="flex flex-row justify-between items-center">
            <div className="font-bold text-sm uppercase">pooltype</div>
            <Tooltip src={trxmark} imgClass="w-6">
              Transaction based Pool with Halvings
            </Tooltip>
          </div>
        </div>
        <div
          className={`text-center mt-4 px-4 absolute w-full lg:w-fit bottom-56 lg:bottom-9 ${
            isConnected && chainId === 11155111
              ? isFinished
                ? 'lg:right-[39%]'
                : tokenBalance < stakeAmount
                ? 'lg:right-[35%]'
                : 'lg:right-[44%]'
              : 'lg:right-[37%]'
          }`}
        >
          {!isApproved && (
            <button
              className={`w-full text-xl play-button px-4 disabled:!bg-gray-500 h-14 hover:scale-103 rounded-full relative outline outline-2 outline-offset-[6px] outline-yellow-300 text-black hover:scale-105 mb-6 ${
                !isApproved ? 'hover:opacity-90' : 'opacity-80'
              }`}
              onClick={() => {
                if (chainId !== 11155111) {
                  switchChain({ chainId: 11155111 })
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
              Join
            </button>
          )}
          {isApproved && (
            <button
              className={`bg-[#862929] text-white text-lg md:text-2xl rounded-[20px] font-semibold md:font-extrabold py-3 px-6 md:px-12 uppercase ${
                canStake ? 'hover:opacity-90' : 'opacity-60'
              }`}
              onClick={() => handleStake()}
              disabled={!canStake}
            >
              {stakeButtonText}
            </button>
          )}
        </div>
      </div>
      <div className="max-w-[1440px] px-8 mx-auto py-20">
        <div className="px-8 sm:px-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="gameboard-stats px-4 py-6 rounded-[10px] items-center flex flex-row gap-2">
            <img src={usdt} className="w-[56px]" />
            <div className="flex flex-col gap-2 mx-auto">
              <div className="w-fit px-4 text-white rounded-full text-3xl font-bold">
                {formatEth(actualPoolSize)} ETH
              </div>
              {/* {Number(result) > 0 ? (
                <div className="w-fit px-4 text-white rounded-full text-3xl font-bold">
                  {formatEth(actualPoolSize)}
                </div>
              ) : (
                <button
                  className="bg-[#862929] w-fit px-4 mx-auto text-white rounded-full font-bold hover:opacity-80"
                  onClick={() => {
                    if (chainId !== 11155111) {
                      switchChain({ chainId: 11155111 })
                    } else if (isApproved) {
                      handleStake()
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
                  JOIN
                </button>
              )} */}
              <div className="uppercase text-white text-xs">
                current poolsize
              </div>
            </div>
          </div>
          <div className="px-4 py-6 bg-[#298653] rounded-[10px] items-center flex flex-row gap-2">
            <img src={percent} className="w-[56px]" />
            <div className="flex flex-col gap-2 mx-auto">
              {Number(result) > 0 ? (
                <div className="w-fit px-4 text-white rounded-full text-3xl font-bold">
                  {((actualPoolSize / halvingSize) * 100).toFixed(3)} %
                </div>
              ) : (
                <button
                  className="bg-[#862929] w-fit px-4 mx-auto text-white rounded-full font-bold hover:opacity-80"
                  onClick={() => {
                    if (chainId !== 11155111) {
                      switchChain({ chainId: 11155111 })
                    } else if (isApproved) {
                      handleStake()
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
                  JOIN
                </button>
              )}
              <div className="uppercase  text-white text-xs">pool filled</div>
            </div>
          </div>
          <div className="px-4 py-6 bg-[#5440CE] rounded-[10px] items-center flex flex-row gap-2">
            <img src={halving} className="w-[56px]" />
            <div className="flex flex-col gap-2 mx-auto">
              {Number(result) > 0 ? (
                <div className="w-fit px-4 text-white rounded-full text-3xl font-bold">
                  &lt;{' '}
                  {Math.floor(
                    (lastHalving +
                      halvingDuration -
                      Math.floor(Date.now() / 1000)) /
                      3600,
                  ) + 1}
                  h
                </div>
              ) : (
                <button
                  className="bg-[#862929] w-fit px-4 mx-auto text-white rounded-full font-bold hover:opacity-80"
                  onClick={() => {
                    if (chainId !== 11155111) {
                      switchChain({ chainId: 11155111 })
                    } else if (isApproved) {
                      handleStake()
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
                  JOIN
                </button>
              )}
              <div className="uppercase  text-white text-xs">
                time till next halving
              </div>
            </div>
          </div>
          <div className="px-4 py-6 bg-[#CE40B7] rounded-[10px] items-center flex flex-row gap-2">
            <img src={dice} className="w-[56px]" />
            <div className="flex flex-col gap-2 mx-auto">
              {Number(result) > 0 ? (
                <div className="w-fit px-4 text-white rounded-full text-3xl font-bold">
                  {Math.floor((Number(result) / actualPoolSize) * 10000) / 100}{' '}
                  %
                </div>
              ) : (
                <button
                  className="bg-[#862929] w-fit px-4 mx-auto text-white rounded-full font-bold hover:opacity-80"
                  onClick={() => {
                    if (chainId !== 11155111) {
                      switchChain({ chainId: 11155111 })
                    } else if (isApproved) {
                      handleStake()
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
                  JOIN
                </button>
              )}
              <div className="uppercase  text-white text-xs">
                winning PROBABILITY
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
