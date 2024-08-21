import { TopNav } from '~/components/nav/TopNav'
import { Pool } from '~/components/Pool'
import { Link } from '@remix-run/react'

import type { MetaFunction } from '@remix-run/cloudflare'
import { useReadContracts, useAccount, useSwitchChain, useWriteContract } from 'wagmi'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { raffleAbi } from '~/utils/abis'
import { contracts, pools } from '~/utils/constants'
import { Footer } from '~/components/nav/Footer'
import { erc20Abi, parseEther } from 'viem'
import { useEffect, useState } from 'react'
import { formatEth } from '~/utils/bigint'
import { TermsModal } from '~/components/TermsModal'
import { getReferrerId } from '~/utils/useReferrerTracker'
import ticketImg from '~/assets/ticket1.png'
import backgroundVideo from '~/assets/background2.mp4'
import LeftArrow from '~/assets/left-arrow.svg'
import RightArrow from '~/assets/right-arrow.svg'
interface Pool {
  poolType: boolean
  id: number
  round: number
  stakeAmount: number
  poolSize: number
  winner: string
}

export const meta: MetaFunction = () => {
  return [
    { title: 'IRA-Raffle' },
    { name: 'description', content: 'Welcome to IRA-Raffle!' },
  ]
}

const findName = (id: number, type: boolean) => {
  const pool = pools.find(
    (pool) =>
      pool.id === `${type ? 'TME' : 'TRX'}${id.toString().padStart(3, '0')}`,
  )
  return pool?.name
}

export default function Index() {
  const [winningPools, setWinningPools] = useState<Pool[] | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false)
  const { openConnectModal } = useConnectModal()
  const { switchChain } = useSwitchChain()
  const { isConnected, address, chainId } = useAccount()
  const contractWrite = useWriteContract()

  useEffect(() => {
    const termsAccepted = localStorage.getItem('isAgreedToTerms')
    if (termsAccepted === 'true') {
      setIsTermsModalOpen(false)
    } else {
      setIsTermsModalOpen(true)
    }
  }, [])

  const { data, error: readContractsError } = useReadContracts({
    contracts: [
      {
        abi: raffleAbi,
        address: contracts.raffle,
        functionName: 'getWinningPools',
      },
    ],
  })

  useEffect(() => {
    if (readContractsError) {
      setError('Error loading data')
      setIsLoading(false)
      return
    }

    if (data && data[0]) {
      setWinningPools(data[0].result)
      setIsLoading(false)
    }
  }, [data, readContractsError])
  const referAddres = getReferrerId()

  const [totalLivePages, setTotalLivePages] = useState(0)
  const [currentLivePage, setCurrentLivePage] = useState(1)
  const itemsLivePerPage = 6
  type LivePageNumber = number | '...'
  type LivePageNumbersArray = LivePageNumber[]
  const [livePageNumbers, setLivePageNumbers] = useState<LivePageNumbersArray>(
    [],
  )

  let canStake = true
  const [isApproved, setApproved] = useState(false)
  let stakeAmount = 500 * 1e18
  let iraPerTicket = '0x23455'
  let buyBtnText = 'Buy Ticket'
  
  if (!isConnected) {
    buyBtnText = 'Connect Wallet'
  } 
  // else if (userEthdata < stakeAmount) {
  //   buyBtnText = 'Not enough ETH balance'
  //   canStake = false
  // } 
  else if (chainId !== 11155111) {
    buyBtnText = 'Switch Network'
  }

  const calculateLivePageNumbers = (
    totalLivePages: number,
    currentLivePage: number,
  ): LivePageNumbersArray => {
    let pages: PageNumbersArray = []

    if (totalLivePages <= 4) {
      pages = Array.from({ length: totalLivePages }, (_, i) => i + 1)
    } else {
      if (totalLivePages === 1) {
        pages = [1, 2, '...', totalLivePages - 1, totalLivePages]
      } else {
        if (totalLivePages + 1 < totalLivePages) {
          if (totalLivePages + 1 === totalLivePages - 1) {
            pages = [
              totalLivePages - 1,
              totalLivePages,
              totalLivePages + 1,
              totalLivePages,
            ]
          } else {
            pages = [
              totalLivePages - 1,
              totalLivePages,
              totalLivePages + 1,
              '...',
              totalLivePages,
            ]
          }
        } else if (totalLivePages < totalLivePages) {
          pages = [totalLivePages - 1, totalLivePages, totalLivePages + 1]
        } else {
          pages = [1, 2, '...', totalLivePages - 1, totalLivePages]
        }
      }
    }

    return pages
  }

  const handleLivePageChange = (newLivePageNumber: number) => {
    setCurrentLivePage(newLivePageNumber)
    setLivePageNumbers(
      calculateLivePageNumbers(totalLivePages, newLivePageNumber),
    )
  }

  useEffect(() => {
    if (readContractsError) {
      setError('Error loading data')
      setIsLoading(false)
    } else if (pools && pools.length > 0) {
      setTotalLivePages(Math.ceil(pools.length / itemsLivePerPage))
      setLivePageNumbers(calculateLivePageNumbers(totalLivePages, 1))
      setIsLoading(false)
    }
  }, [readContractsError, setIsLoading, setLivePageNumbers, setTotalLivePages])

  useEffect(() => {
    setLivePageNumbers(
      calculateLivePageNumbers(totalLivePages, currentLivePage),
    )
  }, [totalLivePages, currentLivePage])

  const [totalPages, setTotalPages] = useState(0)
  type PageNumber = number | '...'
  type PageNumbersArray = PageNumber[]
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5
  const [pageNumbers, setPageNumbers] = useState<PageNumbersArray>([1])

  const calculatePageNumbers = (
    totalPages: number,
    currentPage: number,
  ): PageNumbersArray => {
    let pages: PageNumbersArray = []

    if (totalPages <= 4) {
      pages = Array.from({ length: totalPages }, (_, i) => i + 1)
    } else {
      if (currentPage === 1) {
        pages = [1, 2, '...', totalPages - 1, totalPages]
      } else {
        if (currentPage + 1 < totalPages) {
          if (currentPage + 1 === totalPages - 1) {
            pages = [currentPage - 1, currentPage, currentPage + 1, totalPages]
          } else {
            pages = [
              currentPage - 1,
              currentPage,
              currentPage + 1,
              '...',
              totalPages,
            ]
          }
        } else if (currentPage < totalPages) {
          pages = [currentPage - 1, currentPage, currentPage + 1]
        } else {
          pages = [1, 2, '...', currentPage - 1, currentPage]
        }
      }
    }

    return pages
  }

  // useEffect(() => {
  //   if (readContractsError) {
  //     setError('Error loading data')
  //     setIsLoading(false)
  //   } else if (data && data[0]) {
  //     const poolsResult = data[0].result as Pool[]
  //     setWinningPools(poolsResult)
  //     setTotalPages(Math.ceil(poolsResult.length / itemsPerPage))
  //     setPageNumbers(calculatePageNumbers(totalPages, 1))
  //     setIsLoading(false)
  //   }
  // }, [data, readContractsError, setPageNumbers, setTotalPages, setWinningPools])

  useEffect(() => {
    setPageNumbers(calculatePageNumbers(totalPages, currentPage))
  }, [totalPages, currentPage])

  const handlePageChange = (newPageNumber: number) => {
    setCurrentPage(newPageNumber)
    setPageNumbers(calculatePageNumbers(totalPages, newPageNumber))
  }

  const buyTicket = () => {
    if (!canStake) return
    
    if (!isConnected) {
      openConnectModal?.()
    } else if (chainId !== 11155111) {
      switchChain({ chainId: 11155111 })
    } else {
      try {
        alert("here")
        contractWrite.writeContract({
          abi: raffleAbi,
          address: contracts.raffle,
          functionName: 'buyTicket',
          // args: [BigInt(id), referralAddress],
          // value: BigInt(iraPerTicket),
        })
      } catch (e) {
        console.log(e)
      }
    }
  }

  return (
    <div className="bg-transparent text-white">
      <style>
        {`
        .glow {
            // font-size: 40px;
            color: #fff;
            text-align: center;
            animation: glow 1s ease-in-out infinite alternate;
          }

        .buttonSection {
          max-width: 200px;
          display: flex;
          justify-content: center;
          margin: auto;
          margin-top: 15px;
        }

        .buySection {
          padding-top: 120px;
        }

        .buyInfoSection {
          display: flex;
          flex-direction: row;
          justify-content: space-evenly;
        }

        .infos {
          display: flex;
          flex-direction: column;
          font-size: 32px;
          padding: 15px;
        }

        .buyBtn {
          height: 40px;
        }

        .ticketPrice {
          display: flex;
          flex-direction: row;
          justify-content: center;
        }

        .ticketInfo {
          font-size: 24px;
          padding: 10px;
        }

          @-webkit-keyframes glow {
            from {
              text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #3976fe, 0 0 40px #3976fe, 0 0 50px #3976fe, 0 0 60px #3976fe, 0 0 70px #3976fe;
            }
            
            to {
              text-shadow: 0 0 20px #fff, 0 0 30px #103ea4, 0 0 40px #103ea4, 0 0 50px #103ea4, 0 0 60px #103ea4, 0 0 70px #103ea4, 0 0 80px #103ea4;
            }
          }

          .hover-animation:hover {
            transform: scale(1.02);
            box-shadow: 0 0 10px #0073e633, 0 0 20px #0073e633, 0 0 30px #0073e633, 0 0 40px #0073e633, 0 0 50px #0073e633, 0 0 60px #0073e633;
            transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
          }

          .blue-glow {
            animation: blue-glow 1.25s ease-in-out infinite alternate;
            font-size: 32px;
          }

          @-webkit-keyframes blue-glow {
            from {
              text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #e60073, 0 0 40px #e60073, 0 0 50px #e60073, 0 0 60px #e60073, 0 0 70px #e60073;
            }
            
            to {
              text-shadow: 0 0 20px #fff, 0 0 30px #ff4da6, 0 0 40px #ff4da6, 0 0 50px #ff4da6, 0 0 60px #ff4da6, 0 0 70px #ff4da6, 0 0 80px #ff4da6;
            }
          }
        `}
      </style>
      <video
          autoPlay
          loop
          muted
          id="background-video"
          style={{
            backgroundSize: 'cover',
            backgroundPosition: '50% 50%',
            position: 'absolute',
            margin: 'auto',
            width: '100%',
            height: 'inherit',
            // right: '-100%',
            // bottom: '-100%',
            // top: '-100%',
            // left: '-100%',
            objectFit: 'cover',
            zIndex: '-100',
          }}
        >
          <source src={backgroundVideo} type="video/mp4" />
        </video>
      <TopNav />
      <TermsModal
        isOpen={isTermsModalOpen}
        setIsOpen={() => setIsTermsModalOpen(false)}
      />
      <div className='buySection'>
        <div className='buyMarketing'>
          <p className='font-extrabold animation uppercase text-center text-white blue-glow'>1 and 30 change of winning!</p>
        </div>
        <div className='buyInfoSection'>
          <div className='infos'>
            <p className="text-md font-extrabold text-center text-blue-700">Current Round:</p>
            <p className='font-extrabold uppercase text-center text-white glow'>1</p>
          </div>
          <div className='infos'>
            <p className="text-md font-extrabold text-center text-blue-700">Tickets Left</p>
            <p className='font-extrabold uppercase text-center text-white glow'>25</p>
          </div>
        </div>
        <div className='marketingSection text-md font-extrabold text-center pt-5'>
          <div className='ticketPrice'>
            <p className='ticketInfo'>Ticket Price:</p>
            <p className='ticketInfo'>$10 IRA</p>
          </div>
          <div className='marketing'>
            <p className='ticketInfo'>$10 to win $250</p>
          </div>
        </div>
        <div className='imgSection text-md font-extrabold text-center pt-5'>
          <img src={ticketImg} className='ticketImg' alt='' width="250px" />
        </div>
        <div className={`buttonSection mx-1 ${'bg-blue-500 glow text-white'} rounded`}>
        {!isApproved ?
            <button
              className={`w-full text-xl play-button px-4 disabled:!bg-gray-500 h-14 hover:scale-103 rounded-full relative text-black hover:scale-105 ${
                !isApproved ? 'hover:opacity-90' : 'opacity-60'
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
                  setApproved(true)
                }
              }}
            >
              Approve IRA
            </button> : <button className={`buyBtn ${
              canStake ? 'hover:opacity-90' : 'opacity-60'
            }`} onClick={() => buyTicket()} disabled={!canStake}>{buyBtnText}</button>
          }
        </div>
      </div>

      <div className="max-w-[1440px] px-8 md:px-24 mx-auto py-12">
        <div className="px-4 md:px-12 py-8 flex flex-col rounded-[10px] bg-transparent">
          <div className="font-extrabold text-2xl uppercase mb-8">
            Last Winners
          </div>
          <div className="table border-separate border-spacing-x-0 border-spacing-y-0.5 rounded-3xl table-auto w-full text-sm">
            <div className="hidden lg:table-header-group">
              <div className="table-row bg-[#25224f]">
                <div className="table-cell uppercase text-left px-8 py-6 rounded-l-[10px]">
                  No
                </div>
                <div className="table-cell uppercase text-left px-8 py-6">
                  Round
                </div>
                <div className="table-cell uppercase text-left px-8 py-6">
                  Stake
                </div>
                <div className="table-cell uppercase text-left px-8 py-6">
                  Payout
                </div>
                <div className="table-cell uppercase text-left px-8 py-6 rounded-r-[10px]">
                  Winner Wallets
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 lg:table-row-group">
              {isLoading && (
                <div className="table-row bg-[#dadada11] border-[#00CCFF77]">
                  <td
                    className="table-cell px-8 py-4 text-center rounded-[10px]"
                    colSpan={5}
                  >
                    Loading...
                  </td>
                </div>
              )}
              {error && (
                <div className="table-row bg-[#dadada11]">
                  <td
                    className="table-cell px-8 py-4 text-center rounded-[10px]"
                    colSpan={5}
                  >
                    {error}
                  </td>
                </div>
              )}
              {!isLoading && !error && winningPools?.length === 0 && (
                <div className="table-row bg-[#dadada11]">
                  <td
                    className="table-cell px-8 py-4 text-center rounded-[10px]"
                    colSpan={5}
                  >
                    No Data
                  </td>
                </div>
              )}
              {winningPools &&
                winningPools.slice(-10).map((pool: Pool, index: number) => (
                  <div
                    key={index}
                    className="flex flex-col lg:table-row bg-[#eaeaea11] rounded-[10px]"
                  >
                    <div className="hidden lg:table-cell px-8 py-4 lg:rounded-l-[10px] text-left">
                      {index + 1}
                    </div>
                    <div className="table-cell px-8 py-4 font-semibold lg:font-normal">
                      {findName(pool.id, pool.poolType)}/{Number(pool.round)}
                    </div>
                    <div className="hidden lg:table-cell px-8 py-4">
                      {formatEth(pool.stakeAmount)} IRA
                    </div>
                    <div className="hidden lg:table-cell px-8 py-4">
                      {formatEth(pool.poolSize)} IRA
                    </div>
                    <div className="lg:hidden flex flex-row">
                      <div className="px-8 py-4">
                        {formatEth(pool.stakeAmount)} IRA
                      </div>
                      <div className="px-8 py-4">
                        {formatEth(pool.poolSize)} IRA
                      </div>
                    </div>
                    <Link
                      className="table-cell px-8 py-4 md:rounded-r-[10px] break-all underline"
                      to={`https://testnet.bscscan.com/address/${pool.winner}`}
                      target="_blank"
                    >
                      {pool.winner}
                    </Link>
                  </div>
                ))}
            </div>
          </div>
          <div className="flex justify-center my-4">
            {/* Render the "First Page" button */}
            <button
              className="px-2 py-1 mx-1 bg-[#FFFFFF33] text-white rounded"
              onClick={() => handlePageChange(1)}
            >
              &lt;&lt;
            </button>
            {/* Render the "Previous Page" button */}
            <button
              className="px-2 py-1 mx-1 bg-[#FFFFFF33] text-white rounded"
              onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
            >
              &lt;
            </button>
            {pageNumbers.map((pageNumber, index) => {
              if (typeof pageNumber === 'number') {
                return (
                  <button
                    key={pageNumber}
                    className={`px-2 py-1 mx-1 ${currentPage === pageNumber
                      ? 'bg-purple-500 glow text-white'
                      : 'bg-[#FFFFFF33] text-white'
                      } rounded`}
                    onClick={() => handlePageChange(pageNumber)}
                  >
                    {pageNumber}
                  </button>
                )
              } else {
                return (
                  <span
                    key={pageNumber}
                    className="px-2 py-1 mx-1 bg-transparent text-white rounded"
                  >
                    ...
                  </span>
                )
              }
            })}
            {/* Render the "Next Page" button */}
            <button
              className="px-2 py-1 mx-1 bg-[#FFFFFF33] text-white rounded"
              onClick={() =>
                handlePageChange(Math.min(currentPage + 1, totalPages))
              }
            >
              &gt;
            </button>
            {/* Render the "Last Page" button */}
            <button
              className="px-2 py-1 mx-1 bg-[#FFFFFF33] text-white rounded"
              onClick={() => handlePageChange(totalPages)}
            >
              &gt;&gt;
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
