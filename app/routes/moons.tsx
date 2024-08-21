import { TopNav } from '~/components/nav/TopNav'
import { Pool } from '~/components/Pool'
import { Link } from '@remix-run/react'
import { CoinModal } from '~/components/CoinModal'
import type { MetaFunction } from '@remix-run/cloudflare'
import { format } from 'date-fns'
import {
  useAccount,
  useBalance,
  useReadContracts,
  useSwitchChain,
  useWriteContract,
  useWaitForTransactionReceipt,
} from 'wagmi'
import { coinflipAbi, raffleAbi } from '~/utils/abis'
import { contracts, pools } from '~/utils/constants'
import { Footer } from '~/components/nav/Footer'
import { SetStateAction, useEffect, useState } from 'react'
import { formatEth } from '~/utils/bigint'

import { TermsModal } from '~/components/TermsModal'
import heads from '~/assets/heads.png'
import heads_webm from '~/assets/heads.webm'
import heads_gif from '~/assets/heads.gif'
import tails from '~/assets/tails.png'
import tails_webm from '~/assets/tails.webm'
import tails_gif from '~/assets/tails.gif'
import spins_webm from '~/assets/spins.webm'
import spins_gif from '~/assets/spins.gif'
import roundIcon from '~/assets/round.png'
import eth from '~/assets/ETH.svg'
import cursor from '~/assets/cursor.svg'
import { formatEthAmount } from '~/utils/formatBalance'
import { erc20Abi, parseGwei } from 'viem'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { ModalFlip } from '~/components/ModalFlip'
import { WaitForTransactionReceiptData } from 'wagmi/query'

interface Pool {
  poolType: boolean
  id: number
  round: number
  poolSize: number
  winner: string
  betAmount?: number
  betChoice?: boolean
  betResult?: boolean
  player?: string
  winningAmount?: number
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

export default function coinflip() {
  const { isConnected, address, chainId } = useAccount()
  const { switchChain } = useSwitchChain()
  const contractWrite = useWriteContract()
  const { openConnectModal } = useConnectModal()
  const [winningPools, setWinningPools] = useState<Pool[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isCoinStatus, selectCoin] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false)
  const [inputEthValue, setInputEthValue] = useState(0)
  const [isTxModalOpened, setIsTxModalOpened] = useState(false)
  let roundId = 0,
    totalVolume = 0,
    maxPoolBetRatio = 0,
    maxTradableAmount = 1,
    modalStatus = 'loading',
    modalTitle = 'Transaction in process',
    modalDescription = '',
    modalButtonText = '',
    modalButtonHref,
    modalButtonAction,
    userBetResult = false,
    userBetAmount = 0,
    userWinAmount = 0,
    userBetChoice = false
  // button not disabled except if action is stake and stake is disabled
  const modalButtonDisabled = modalButtonAction ? true : false

  const connectedAddress =
    address || '0x1111111111111111111111111111111111111111'

  const userEthBalance = useBalance({
    address: connectedAddress,
    unit: 'ether',
  })
  const userEthdata = Number(userEthBalance.data?.value)
  const formatEthBalance =
    Number(userEthdata) > 0 ? formatEthAmount(Number(userEthdata)) : 0

  const flipContractEthBalance = useBalance({
    address: contracts.coinflip,
    unit: 'ether',
  })
  const formatflipEthBlanace = flipContractEthBalance.data?.value.toString()

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

  if (data) {
    try {
      roundId = Number(data[0].result)
      maxPoolBetRatio = Number(data[1].result)
      totalVolume = Number(data[2].result)
      maxTradableAmount =
        (Number(formatflipEthBlanace) / 10 ** 18 / (1000 + Number(maxPoolBetRatio))) * Number(maxPoolBetRatio)
      const userBetLength = data[4].result.length
      
      if (data[4].result[userBetLength - 1].betResult.betResult == true) {
        userWinAmount = Number(data[4].result[userBetLength - 1].winningAmount)
        userBetResult = true
      } else {
        userBetAmount = 0
      }
    } catch (e) {
      console.log(e)
    }
  }

  const handleChange = (event: { target: { value: SetStateAction<any> } }) => {
    setPrice(event.target.value)
    setInputEthValue(event.target.value)
  }

  const handleFlip = () => {
    if (!isConnected) {
      openConnectModal?.()
    } else if (chainId !== 97) {
      switchChain({ chainId: 97 })
    } else if (inputEthValue == 0 || inputEthValue > maxTradableAmount) {
      alert(
        inputEthValue == 0
          ? 'The users amount should be greater than zero'
          : 'User play amount can not big than Max Tradable Amount',
      )
    } else {
      try {
        contractWrite.writeContract({
          abi: coinflipAbi,
          address: contracts.coinflip,
          functionName: 'flip',
          args: [isCoinStatus],
          value: BigInt(inputEthValue * 10 ** 18),
          // maxFeePerGas: parseGwei('13'),
        })

        modalStatus = 'success'
      } catch (e) {
        modalTitle = 'Transaction failed'
        modalStatus = 'error'
        console.log(e)
      }
    }
  }

  const txReceipt = useWaitForTransactionReceipt({ hash: contractWrite.data })
  useEffect(() => {
    if (contractWrite.status === 'success' && txReceipt.data) {
      refetch()
      /* It can happen that a wallet provider (say Metamask) will already
       * see a transaction processed and approval updated on a contract
       * while another provider (e.g. Infura) will still not have seen the
       * latest data. As a workaround to 2 more re-fetches 3 & 10 seconds later.
       */

      setTimeout(refetch, 3000)
      setTimeout(refetch, 10000)
    }
  }, [contractWrite.status, txReceipt.data, refetch])

  useEffect(() => {
    if (contractWrite.status === 'pending') {
      setIsTxModalOpened(true)
    }
  }, [contractWrite.status, txReceipt.data, refetch])

  if (contractWrite.status === 'pending') {
    modalTitle = 'Please check your wallet'
  } else if (contractWrite.status === 'success' && txReceipt.data) {
    if (userBetResult == true) {
      modalTitle = `Transaction successful. You've won ${userWinAmount}`
    } else {
      modalTitle = `Transaction successful. Better luck next time.`
    }
    modalStatus = 'success'
  } else if (contractWrite.error) {
    modalTitle = 'Transaction failed'
    modalStatus = 'error'
    modalDescription = contractWrite.error.message
  }

  // Use a separate useEffect to handle page load and navigation without reloading

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

  useEffect(() => {
    refetch() // Fetch data on component mount
    refetch1() // Fetch data on component mount
  }, [refetch, refetch1])

  const [isCoinModalOpen, setIsCoinModalOpen] = useState(false)
  const [coinAccepted, setCoinAccepted] = useState('false')
  useEffect(() => {
    const dateToNumber = (dateString: string): number => {
      const date = new Date(dateString)
      const time = date.getTime()
      return Math.round(time / 86400000)
    }

    const currentDate = format(new Date(), 'yyyy-MM-dd')
    const currentDateNumber = dateToNumber(currentDate)
    const cookieDate = localStorage.getItem('cookieCoinSetDate')
    const cookieDateNumber = cookieDate ? dateToNumber(cookieDate) : null

    const coinAcceptedStorage = localStorage.getItem('coinAccepted')
    if (coinAcceptedStorage === 'true') {
      setCoinAccepted('true')
      setIsCoinModalOpen(false)
    } else {
      setIsCoinModalOpen(true)
    }

    if (
      cookieDate === null ||
      (cookieDateNumber && currentDateNumber - cookieDateNumber >= 1)
    ) {
      setCoinAccepted('false')
      setIsCoinModalOpen(true)
    }
  }, [])

  const [isSafari, setIsSafari] = useState(false)

  const [price, setPrice] = useState('0.01')
  const [coinState, setCoinState] = useState('heads')

  useEffect(() => {
    const isSafariBrowser = navigator.vendor?.indexOf('Apple') > -1
    setIsSafari(isSafariBrowser)
  }, [])

  const handleHeadsClick = () => {
    setCoinState('spins')
    setTimeout(() => {
      setCoinState('heads')
    }, 500)
  }

  const handleTailsClick = () => {
    setCoinState('spins')
    setTimeout(() => {
      setCoinState('tails')
    }, 500)
  }

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

  const assetsToPreload = [
    heads_webm,
    heads_gif,
    tails_webm,
    tails_gif,
    spins_webm,
    spins_gif,
  ]

  const preloadAssets = async (sources: string[]) => {
    const preloadVideo = (src: string) => {
      return new Promise((resolve, reject) => {
        const video = document.createElement('video')
        video.onloadedmetadata = () => resolve(src)
        video.onerror = () => reject(new Error(`Failed to load ${src}`))
        video.src = src
      })
    }

    const promises = sources.map(async (src) => {
      if (src.match(/\.(webm|mp4|ogv)$/i)) {
        // Handle video preloading
        return preloadVideo(src)
      } else {
        // Handle image preloading
        return new Promise((resolve, reject) => {
          const image = new Image()
          image.onload = () => resolve(src)
          image.onerror = () => reject(new Error(`Failed to load ${src}`))
          image.src = src
        })
      }
    })

    try {
      await Promise.all(promises)
      console.log('All assets are preloaded')
    } catch (error) {
      console.error('Failed to preload some assets:', error)
    }
  }

  useEffect(() => {
    preloadAssets(assetsToPreload).then(() => {})
    handleChange({ target: { value: price } } as any);
  }, [])

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
          .coinflip-title {
            align-items: center;
            background-image: linear-gradient(to right, #842856, #353178);
            border-radius: 12px;
            display: flex;
            flex-direction: column;
          }
          .coinflip-stats {
            background-color: #1a1c42;
            border-radius: 7px;
            color: #5f63ac;
            display: flex;
            flex-direction: column;
            font-size: 12px;
            gap: 9px;
            padding: 14px 13px;
          }
        `}
      </style>
      <TopNav />
      <CoinModal
        isOpen={isCoinModalOpen}
        setIsOpen={() => setIsCoinModalOpen(false)}
      />
      <style>
        {`
          .play-button {
            background-image: linear-gradient(to right, #FFFF34, #FFDD5E, #EBA054);
          }
        `}
      </style>
      <ModalFlip
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
      <TermsModal
        isOpen={isTermsModalOpen}
        setIsOpen={() => setIsTermsModalOpen(false)}
      />
      <div className="max-w-[1440px] px-8 mx-auto py-12 bg-[#161432]">
        <div className="py-8">
          <div className="text-xl font-extrabold uppercase text-center text-white glow">
            What The FLIP Coin Toss
          </div>
        </div>
        {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-7 gap-y-14 w-full sm:px-16"> */}
        <div className="text-md font-bold text-center pb-4 text-white">
          Instant & Decentralized 50/50 Coin Toss
        </div>
        <div className="gameboard py-8 mt-8 w-full lg:w-[960px] mx-auto">
          <div className="text-xl font-bold text-center p-4 text-white coinflip-title w-fit mx-auto -mt-16 mb-8">
            Moon or Doom
          </div>
          {/* <div
            style={{
              width: smallViewport ? '256px' : '384px',
              height: smallViewport ? '256px' : '384px',
            }}
          >
            {coinState === 'heads' ? (
              isSafari ? (
                <img
                  key="heads"
                  src={heads_gif}
                  width="384px"
                  className="coin-shadow"
                />
              ) : (
                <video
                  key="heads"
                  autoPlay
                  loop
                  muted
                  playsInline
                  width={384}
                  height={384}
                  className="coin-shadow"
                >
                  <source src={heads_webm} type="video/webm" />
                  <img src={heads} width="384px" />
                </video>
              )
            ) : coinState === 'tails' ? (
              isSafari ? (
                <img
                  key="tails"
                  src={tails_gif}
                  width="384px"
                  className="coin-shadow"
                />
              ) : (
                <video
                  key="tails"
                  autoPlay
                  loop
                  muted
                  playsInline
                  width={384}
                  height={384}
                  className="coin-shadow"
                >
                  <source src={tails_webm} type="video/webm" />
                  <img src={tails} width="384px" />
                </video>
              )
            ) : coinState === 'spins' ? (
              isSafari ? (
                <img
                  key="spins"
                  src={spins_gif}
                  width="384px"
                  className="coin-shadow"
                />
              ) : (
                <video
                  key="spins"
                  autoPlay
                  loop
                  muted
                  playsInline
                  width={384}
                  height={384}
                  className="coin-shadow"
                >
                  <source src={spins_webm} type="video/webm" />
                  <img src={heads} width="384px" />
                </video>
              )
            ) : (
              <img
                key="neutral"
                src={heads}
                width="384px"
                className="coin-shadow"
              />
            )}
          </div> */}
          
        </div>
      </div>
      <div className="max-w-[1440px] px-8 md:px-24 mx-auto py-12">
        <div className="px-4 md:px-12 py-8 flex flex-col bg-[#161432] rounded-[10px]">
          <div className="font-extrabold text-2xl uppercase mb-8">
            Last Winning Rounds
          </div>
        </div>
      </div>
      <div id="howto">
        <div className="mx-auto w-full max-w-[1440px] pt-2 pb-8 px-0 md:px-8 lg:px-12 text-white ">
          <div className="text-xs font-extrabold mb-2 text-center uppercase mt-4">
            <Link to="" className="pr-5 underline glow">
              <img src={cursor} className="w-[56px]" />
              Moon or Doom Terms Of Service
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
