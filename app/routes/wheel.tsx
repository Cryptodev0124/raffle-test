'use client'
import React, { Suspense, useState, useEffect } from 'react'
import { TopNav } from '~/components/nav/TopNav'
import { Pool } from '~/components/Pool'
import { Link } from '@remix-run/react'
import { coinflipAbi, raffleAbi } from '~/utils/abis'
import { contracts, pools } from '~/utils/constants'
import { Footer } from '~/components/nav/Footer'
import { formatEth } from '~/utils/bigint'
import { TermsModal } from '~/components/TermsModal'
import cursor from '~/assets/cursor.svg'
import { getReferrerId } from '~/utils/useReferrerTracker'
import {
  useAccount,
  useBalance,
  useReadContracts,
  useSwitchChain,
  useWriteContract,
  useWaitForTransactionReceipt,
} from 'wagmi'

// Define a placeholder component
const RouletteLazy = React.lazy(() => import('~/components/Roulette'))

export default function WheelPage() {
  const { isConnected, address, chainId } = useAccount()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false)
  const connectedAddress =
    address || '0x1111111111111111111111111111111111111111'

  useEffect(() => {
    const termsAccepted = localStorage.getItem('isAgreedToTerms')
    if (termsAccepted === 'true') {
      setIsTermsModalOpen(false)
    } else {
      setIsTermsModalOpen(true)
    }
  }, [])

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

  const smallViewport = useMediaQuery('(max-width: 480px)')

  const [totalPages, setTotalPages] = useState(0)
  type PageNumber = number | '...'
  type PageNumbersArray = PageNumber[]
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5
  const [pageNumbers, setPageNumbers] = useState<PageNumbersArray>([1])

  const [winningPools, setWinningPools] = useState<Pool[]>([])
  const {
    data: data1,
    refetch: refetch1,
    error: readContractsError,
  } = useReadContracts({
    contracts: [
      {
        abi: coinflipAbi,
        address: contracts.coinflip,
        functionName: 'getAllBets',
      },
    ],
  })

  useEffect(() => {
    if (readContractsError) {
      setError('Error loading data')
      setIsLoading(false)
      return
    }

    if (data1 && data1[0]) {
      setWinningPools(data1[0].result)
      setIsLoading(false)
    }
  }, [data1, readContractsError])

  const { data, refetch } = useReadContracts({
    contracts: [
      {
        abi: coinflipAbi,
        address: contracts.coinflip,
        functionName: 'roundId',
      },
      {
        abi: coinflipAbi,
        address: contracts.coinflip,
        functionName: 'maxPoolBetRatio',
      },
      {
        abi: coinflipAbi,
        address: contracts.coinflip,
        functionName: 'totalVolume',
      },
      {
        abi: coinflipAbi,
        address: contracts.coinflip,
        functionName: 'getAllBets',
      },
      {
        abi: coinflipAbi,
        address: contracts.coinflip,
        functionName: 'getPlayerBets',
        args: [connectedAddress],
      },
    ],
  })

  useEffect(() => {
    refetch() // Fetch data on component mount
    refetch1() // Fetch data on component mount
  }, [refetch, refetch1])

  const calculatePageNumbers = (
    totalPages: number,
    currentPage: number,
  ): PageNumbersArray => {
    let pages: PageNumbersArray = []

    if (totalPages <= 4) {
      pages = Array.from({ length: totalPages }, (_, i) => i + 1)
    } else {
      // Add logic for the first two pages
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

  useEffect(() => {
    if (data1 && data1[0]) {
      if (data1[0].status === 'success') {
        const poolsResult = data1[0].result as Pool[]
        if (Array.isArray(poolsResult)) {
          const totalPools = poolsResult.length
          setTotalPages(Math.ceil(totalPools / itemsPerPage))
          setWinningPools(poolsResult)
          setIsLoading(false)
          // Initial calculation for page 1
          setPageNumbers(calculatePageNumbers(totalPages, 1))
        } else {
          console.error('Expected an array of pools in the `result` field.')
          setIsLoading(false)
        }
      } else if (data1[0].status === 'failure') {
        console.error('Failed to fetch pools data:', data1[0].error)
        setIsLoading(false)
      }
    }
  }, [
    data1,
    setIsLoading,
    setPageNumbers,
    setTotalPages,
    setWinningPools,
    totalPages,
  ])

  useEffect(() => {
    setPageNumbers(calculatePageNumbers(totalPages, currentPage))
  }, [totalPages, currentPage])

  const handlePageChange = (newPageNumber: number) => {
    setCurrentPage(newPageNumber)
    setPageNumbers(calculatePageNumbers(totalPages, newPageNumber))
  }

  return (
    <div className="bg-[#09071b] text-white">
      <style>
        {`
          .glow {
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

          .hover-animation:hover {
            transform: scale(1.02);
            box-shadow: 0 0 10px #0073e633, 0 0 20px #0073e633, 0 0 30px #0073e633, 0 0 40px #0073e633, 0 0 50px #0073e633, 0 0 60px #0073e633;
            transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
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
        `}
      </style>
      <TopNav />
      <TermsModal
        isOpen={isTermsModalOpen}
        setIsOpen={() => setIsTermsModalOpen(false)}
      />
      <div className="max-w-[1440px] px-8 mx-auto py-4 bg-[#161432]">
        <div className="py-12">
          <div className="sm:text-lg md:text-2xl lg:font-3xl font-extrabold uppercase text-center text-white glow">
            What's This For Spin Wheel
          </div>
        </div>
        <div className="mx-auto">
          {/* Use Suspense to handle the loading state of the lazy-loaded component */}
          <Suspense fallback={<div>Loading...</div>}>
            <RouletteLazy />
          </Suspense>
        </div>
      </div>
      {/* <div className="max-w-[1440px] px-8 md:px-24 mx-auto py-12">
        <div className="px-4 md:px-12 py-8 flex flex-col bg-[#161432] rounded-[10px]">
          <div className="font-extrabold text-2xl uppercase mb-8">
            Last Winning Rounds
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
                  Winning Wallet
                </div>
              </div>
            </div>
            <tbody className="flex flex-col gap-2 lg:table-row-group">
              {isLoading && (
                <tr className="table-row bg-[#dadada11] border-[#00CCFF77]">
                  <td
                    className="table-cell px-8 py-4 text-center rounded-[10px]"
                    colSpan={5}
                  >
                    Loading...
                  </td>
                </tr>
              )}
              {error && (
                <tr className="table-row bg-[#dadada11] border-[#00CCFF77]">
                  <td
                    className="table-cell px-8 py-4 text-center rounded-[10px]"
                    colSpan={5}
                  >
                    {error}
                  </td>
                </tr>
              )}
              {!isLoading && !error && winningPools?.length === 0 && (
                <tr className="table-row bg-[#dadada]">
                  <td
                    className="table-cell px-8 py-4 text-center rounded-[10px]"
                    colSpan={5}
                  >
                    No Data
                  </td>
                </tr>
              )}
              {winningPools &&
                winningPools
                  .slice(
                    (currentPage - 1) * itemsPerPage,
                    currentPage * itemsPerPage,
                  )
                  .map((pool: Pool) => (
                    <div className="flex flex-col lg:table-row bg-[#ffffff11]">
                      <div className="hidden lg:table-cell px-8 py-4 lg:rounded-l-[10px] text-left">{index + 1}</div>
                      <div className="table-cell px-8 py-4 font-semibold lg:font-normal">{findName(pool.id, pool.poolType)}/{Number(pool.round)}</div>
                      <div className="table-cell px-8 py-4 font-semibold lg:font-normal rounded-l-[10px]">
                        {Number(pool.round)}
                      </div>
                      <div className="hidden lg:table-cell px-8 py-4">
                        {(Number(pool.betAmount) / 10 ** 18).toFixed(6)} ETH
                      </div>
                      <div className="hidden lg:table-cell px-8 py-4">
                        {(Number(pool.winningAmount) / 10 ** 18).toFixed(6)} ETH
                      </div>
                      <Link
                        className={`table-cell px-8 py-4 break-all underline`}
                        to={`https://testnet.bscscan.com/address/${pool.winner}`}
                        target="_blank"
                      >
                        {pool.player}
                      </Link>
                      <div
                        className={`${
                          pool.betResult ? 'text-green-500' : 'text-red-500'
                        } hidden lg:table-cell px-8 py-4 md:rounded-r-[10px]`}
                      >
                        {pool.betResult ? 'Success' : 'Failed'}
                      </div>
                    </div>
                  ))}
            </tbody>
            <div className="flex justify-center my-4">
              Render the "First Page" button
              <button
                className="px-2 py-1 mx-1 bg-[#FFFFFF33] text-white rounded"
                onClick={() => handlePageChange(1)}
              >
                &lt;&lt;
              </button>
              Render the "Previous Page" button
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
                      className={`px-2 py-1 mx-1 ${
                        currentPage === pageNumber
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
              Render the "Next Page" button
              <button
                className="px-2 py-1 mx-1 bg-[#FFFFFF33] text-white rounded"
                onClick={() =>
                  handlePageChange(Math.min(currentPage + 1, totalPages))
                }
              >
                &gt;
              </button>
              Render the "Last Page" button
              <button
                className="px-2 py-1 mx-1 bg-[#FFFFFF33] text-white rounded"
                onClick={() => handlePageChange(totalPages)}
              >
                &gt;&gt;
              </button>
            </div>
          </div>
        </div>
      </div> */}
      <div id="howto">
        <div className="mx-auto w-full max-w-[1440px] pt-2 pb-8 px-0 md:px-8 lg:px-12 text-white ">
          <div className="text-xs font-extrabold mb-2 text-center uppercase mt-4">
            <Link to="/termswheel" className="pr-5 underline glow">
              <img src={cursor} className="w-[56px]" />
              WTF Spin Wheel Terms Of Service
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
