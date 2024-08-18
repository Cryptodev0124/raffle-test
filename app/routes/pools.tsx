import { TopNav } from '~/components/nav/TopNav'
import { Pool } from '~/components/Pool'
import { Link } from '@remix-run/react'

import type { MetaFunction } from '@remix-run/cloudflare'
import { useReadContracts } from 'wagmi'

import { raffleAbi } from '~/utils/abis'
import { contracts, pools } from '~/utils/constants'
import { Footer } from '~/components/nav/Footer'
import { useEffect, useState } from 'react'
import { formatEth } from '~/utils/bigint'
import { TermsModal } from '~/components/TermsModal'
import { getReferrerId } from '~/utils/useReferrerTracker'

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

  useEffect(() => {
    if (readContractsError) {
      setError('Error loading data')
      setIsLoading(false)
    } else if (data && data[0]) {
      const poolsResult = data[0].result as Pool[]
      setWinningPools(poolsResult)
      setTotalPages(Math.ceil(poolsResult.length / itemsPerPage))
      setPageNumbers(calculatePageNumbers(totalPages, 1))
      setIsLoading(false)
    }
  }, [data, readContractsError, setPageNumbers, setTotalPages, setWinningPools])

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
        `}
      </style>
      <TopNav />
      <TermsModal
        isOpen={isTermsModalOpen}
        setIsOpen={() => setIsTermsModalOpen(false)}
      />
      <div className="max-w-[1440px] px-8 mx-auto py-4 bg-[#161432]">
        <div className="py-12">
          <div className="text-2xl font-extrabold uppercase text-center text-white glow	">
            Live Raffles
          </div>
          <div className="text-md font-extrabold text-center pt-5 text-rose-700">
            ALL RAFFLE ENTRIES ARE FINAL
          </div>
        </div>

        <div className="flex flex-col lg:flex-row">
          <div className="flex justify-center lg:justify-start">
            <button
              className="px-2 py-1 bg-[#FFFFFF08] lg:bg-[#FFFFFF00] text-white rounded mb-8 lg:mb-0 mr-0 lg:-mr-8"
              onClick={() =>
                handleLivePageChange(Math.max(currentLivePage - 1, 1))
              }
            >
              <img src={LeftArrow} width="64px" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-7 gap-y-14 w-full sm:px-16">
            {/* Slice the pools data based on the current live page */}
            {pools
              .slice(
                (currentLivePage - 1) * itemsLivePerPage,
                currentLivePage * itemsLivePerPage,
              )
              .map((pool, index) => (
                <div className="hover-animation blue-glow">
                  <Pool
                    key={index}
                    id={pool.id}
                    name={pool.name}
                    stakeAmount={pool.stakeAmount}
                    size={pool.size}
                    theme={pool.theme}
                  />
                </div>
              ))}
          </div>

          <div className="flex justify-center lg:justify-end">
            <button
              className="px-2 py-1 bg-[#FFFFFF08] lg:bg-[#FFFFFF00] text-white rounded mt-8 lg:mt-0 ml-0 lg:-ml-8"
              onClick={() =>
                handleLivePageChange(
                  Math.min(currentLivePage + 1, totalLivePages),
                )
              }
            >
              <img src={RightArrow} width="64px" />
            </button>
          </div>
        </div>
        {/* <div className="py-16">
          <div className="text-2xl font-extrabold uppercase text-center text-white">
            Finished Raffles
          </div>
        </div> */}
      </div>
      <div className="flex justify-center my-4">
        {livePageNumbers.map((livePageNumber, index) => {
          if (typeof livePageNumber === 'number') {
            return (
              <button
                key={livePageNumber}
                className={`px-2 py-1 mx-1 ${
                  currentLivePage === livePageNumber
                    ? 'bg-purple-500 glow text-white'
                    : 'bg-[#FFFFFF33] text-white'
                } rounded`}
                onClick={() => handleLivePageChange(livePageNumber)}
              >
                {livePageNumber}
              </button>
            )
          } else {
            return (
              <span
                key={livePageNumber}
                className="px-2 py-1 mx-1 bg-transparent text-white rounded"
              >
                ...
              </span>
            )
          }
        })}
      </div>

      <div className="max-w-[1440px] px-8 md:px-24 mx-auto py-12">
        <div className="px-4 md:px-12 py-8 flex flex-col rounded-[10px] bg-[#161432]">
          <div className="font-extrabold text-2xl uppercase mb-8">
            Last Winning Pools
          </div>
          <div className="table border-separate border-spacing-x-0 border-spacing-y-0.5 rounded-3xl table-auto w-full text-sm">
            <div className="hidden lg:table-header-group">
              <div className="table-row bg-[#25224f]">
                <div className="table-cell uppercase text-left px-8 py-6 rounded-l-[10px]">
                  No
                </div>
                <div className="table-cell uppercase text-left px-8 py-6">
                  PoolName/Round
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
                      {formatEth(pool.stakeAmount)} ETH
                    </div>
                    <div className="hidden lg:table-cell px-8 py-4">
                      {formatEth(pool.poolSize)} ETH
                    </div>
                    <div className="lg:hidden flex flex-row">
                      <div className="px-8 py-4">
                        {formatEth(pool.stakeAmount)} ETH
                      </div>
                      <div className="px-8 py-4">
                        {formatEth(pool.poolSize)} ETH
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
