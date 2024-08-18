import { useState, useEffect, useRef, SetStateAction } from 'react'
import { Asset, assets } from '../utils/constants'
import { useSocket } from '../context/SocketContext'
import { errorAlert, warningAlert } from './ToastGroup'
// import { enterGame, playGame } from '../context/solana/transaction'
// import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { NEXT_COOLDOWN } from '../config'
import { rot13 } from '../utils/util'
import {
  useAccount,
  useBalance,
  useReadContracts,
  useWriteContract,
} from 'wagmi'
import { contracts } from '~/utils/constants'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { jackpotAbi, yoloAbi } from '~/utils/abis'
import { useJackpot } from '~/utils/hooks/useJackpot'
import { formatEthAmount } from '~/utils/formatBalance'
import { useEthPrice } from '~/utils/hooks/useETHPrice'
import { parseGwei } from 'viem'

export default function JackpotModal(props: {
  referralCode: string | null
  handleCloseModal: Function
}) {
  const [activeAsset, setActiveAsset] = useState(assets[0])
  const { isConnected, address, chainId } = useAccount()
  const [betAmount, setBetAmount] = useState<string>('0')

  const [numberOfRounds, setNumberOfRounds] = useState(1)
  const [isTokenSelectModalOpened, setIsTokenSelectModalOpened] =
    useState(false)
  const [isTooltipVisible, setIsTooltipVisible] = useState(false)
  const { gameData, started, users } = useSocket()
  const [isBetLoading, setIsBetLoading] = useState(false)

  const userEthBalance = useBalance({
    address: address,
    unit: 'ether',
  })

  const userEthdata = Number(userEthBalance.data?.value)

  const formatEthBalance =
    Number(userEthdata) > 0
      ? formatEthAmount(Number(userEthdata)).toFixed(6)
      : 0

  const { currentRound } = useJackpot()

  const { ethPrice } = useEthPrice()

  const totalEntryEth = Number(betAmount) * numberOfRounds
  const totalEntryUSD = (totalEntryEth * Number(ethPrice)) / 10 ** 8

  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        props.handleCloseModal()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [props.handleCloseModal])

  const handleBetAmount = (value: string) => {
    if (Number(value) < 0) return
    setBetAmount(value)
  }

  const generateRandomBet = () => {
    const min = 0.01
    const max = 0.1
    const randomValue = (Math.random() * (max - min) + min).toFixed(2)
    handleBetAmount(randomValue)
  }

  const contractWrite = useWriteContract()

  const handleBet = async () => {
    if (!parseFloat(betAmount ? betAmount : '0')) {
      errorAlert('Please enter the correct amount!')
      return
    }
    try {
      let amount = 0
      if (activeAsset.symbol === 'ETH') {
        amount = parseFloat(betAmount ? betAmount : '0') * 10 ** 18
        // console.log('place bet')
        contractWrite.writeContract({
          abi: jackpotAbi,
          address: contracts.jackpot,
          functionName: 'deposit',
          args: [Number(currentRound), []],
          value: BigInt(amount),
          // gas: parseGwei('0.002')
        })
      }
      if (gameData && (gameData?.players ?? []).length !== 0) {
        // console.log('join pool', activeAsset.address, amount)
        if (
          gameData.endTimestamp !== 0 &&
          gameData.endTimestamp - Date.now() < NEXT_COOLDOWN
        ) {
          warningAlert(
            'This transaction may fail. Please try on the next round.',
          )
          return
        }
      } else {
        // console.log('creating pool', activeAsset.name, amount)
        // await playGame(wallet, new PublicKey(activeAsset.address), amount, referrer, setIsBetLoading);
      }
      props.handleCloseModal()
    } catch (error) {
      console.log(error)
    }
  }

  const closeDropdown = (symbol: string) => {
    setActiveAsset(
      assets.find((asset) => asset.symbol === symbol) as SetStateAction<Asset>,
    )
    setIsTokenSelectModalOpened(false)
  }

  return (
    <div className="fixed left-0 top-0 w-full h-[100vh] backdrop-blur-xl z-[200] flex-col grid place-content-center overflow-x-hidden">
      <div
        className="flex flex-col m-6 yolo-card md:w-[600px] lg:w-[774px] rounded-[5px]"
        ref={modalRef}
      >
        <button
          onClick={(e) => props.handleCloseModal(e)}
          className="float-right mb-2 border-[2px] mt-4 rounded-full p-2 border-white px-4"
        >
          Close
        </button>
        <div className="flex flex-row border-b border-[#ffffff10]">
          <div className="hidden sm:block px-6 flex flex-col w-full sm:w-1/3 pt-6">
            <div className="flex flex-col">
              <span className="text-[16px] font-bold text-white mb-3">
                Select Token
              </span>
            </div>
            {assets.map((asset, id) => (
              <div
                key={id}
                className="cursor-pointer"
                onClick={() => setActiveAsset(asset)}
              >
                <div className="flex flex-row items-center p-3 rounded-[4px] justify-between w-full">
                  <div className="flex flex-row items-center gap-2">
                    <img src={asset.src} className="w-[29px] h-[29px]" />
                    <span className="font-[600] text-[16px] text-white">
                      {asset.symbol}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="px-6 pb-12 pt-6 flex flex-col gap-2 w-full sm:w-2/3">
            <div className="block sm:hidden relative">
              <div
                className="relative"
                onMouseDown={() =>
                  setIsTokenSelectModalOpened(!isTokenSelectModalOpened)
                }
              >
                <button className="flex flex-row items-center p-3 yolo-stats rounded-[4px] justify-between w-full">
                  <div className="flex flex-row items-center gap-2">
                    <img src={activeAsset.src} className="w-[29px] h-[29px]" />
                    <span className="font-[600] text-[16px] text-white">
                      {activeAsset.symbol}
                    </span>
                  </div>
                  <svg
                    width="12"
                    height="8"
                    viewBox="0 0 12 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      clipRule="evenodd"
                      d="M12 1.6L6 8L5.59506e-07 1.6L1.5 -4.41102e-07L6 4.8L10.5 3.45703e-07L12 1.6Z"
                      fill="#868587"
                    />
                  </svg>
                </button>
              </div>
              {isTokenSelectModalOpened && (
                <ul
                  className="w-[180px] focus:outline-none yolo-stats absolute z-50 mt-1 overflow-auto rounded-[5px] shadow"
                  aria-labelledby="headlessui-listbox-button-:r193:"
                  aria-orientation="vertical"
                  id="headlessui-listbox-options-:r1c0:"
                  role="listbox"
                  tabIndex={0}
                  data-headlessui-state="open"
                  aria-activedescendant="headlessui-listbox-option-:r1c1:"
                >
                  {assets.map((asset, id) => {
                    return (
                      <li
                        className="cursor-pointer px-5 py-2"
                        key={id}
                        role="option"
                        aria-selected="false"
                        data-headlessui-state=""
                        onMouseDown={() => closeDropdown(asset.symbol)}
                        onMouseOver={(e) => {
                          e.currentTarget.className += ' bg-[#3b3c3630]'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.className =
                            'cursor-pointer bg-opacity-100 px-5 py-2'
                        }}
                      >
                        <div className="flex items-center">
                          <img
                            src={asset.src}
                            alt={asset.symbol}
                            className="h-[29px]"
                          />
                          <div className="ml-2 flex flex-col">
                            <p className="font-bold text-[16px] text-white">
                              {asset.symbol}
                            </p>
                            <p className="text-xs text-[11px] text-white">
                              {asset.name}
                            </p>
                          </div>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>
            <span className="text-[16px] font-bold text-white">
              ETH entry per round
            </span>
            <input
              className="yolo-stats rounded-[4px] text-white h-[56px] p-6 focus:outline-none"
              placeholder="Type bet amount here..."
              value={betAmount}
              onChange={(e) => handleBetAmount(e.target.value)}
              style={{ fontSize: '20px' }}
              type="number"
            />
            <div className="grid sm:grid-cols-4 grid-cols-2 gap-2 mt-4">
              <button
                className="flex items-center border border-gray-500 rounded-lg w-full sm:w-[86px] h-10 justify-center sm:justify-start"
                onClick={() => handleBetAmount('0.01')}
              >
                <img
                  src={activeAsset.src}
                  className="w-[24px] h-[24px] mx-2"
                  alt=""
                />
                <span className="text-[16px]">0.01</span>
              </button>
              <button
                className="flex items-center border border-gray-500 rounded-lg w-full sm:w-[86px] h-10 justify-center sm:justify-start"
                onClick={() => handleBetAmount('0.05')}
              >
                <img
                  src={activeAsset.src}
                  className="w-[24px] h-[24px] mx-2"
                  alt=""
                />
                <span className="text-[16px]">0.05</span>
              </button>
              <button
                className="flex items-center border border-gray-500 rounded-lg w-full sm:w-[86px] h-10 justify-center sm:justify-start"
                onClick={() => handleBetAmount('0.1')}
              >
                <img
                  src={activeAsset.src}
                  className="w-[24px] h-[24px] mx-2"
                  alt=""
                />
                <span className="text-[16px]">0.1</span>
              </button>
              <button
                className="flex items-center border border-gray-500 rounded-lg w-full sm:w-[86px] h-10 justify-center"
                onClick={generateRandomBet}
              >
                🎲
              </button>
            </div>
            <div className="flex justify-between items-center mt-4">
              <span className="text-[16px] text-white">ETH in wallet</span>
              <div className="flex items-center">
                {/* <span className="text-[16px] text-gray-500">($0.00)</span> */}
                <span className="text-white font-bold ml-2">
                  {formatEthBalance} {activeAsset.symbol}
                </span>
              </div>
            </div>
            <div
              className="flex items-center mt-4 relative"
              onMouseEnter={() => setIsTooltipVisible(true)}
              onMouseLeave={() => setIsTooltipVisible(false)}
            >
              <span className="text-[16px] text-white">Number of rounds</span>
              <img
                src="/question.svg"
                className="w-[24px] h-[24px] ml-2"
                alt=""
              />
              {isTooltipVisible && (
                <div className="absolute left-0 top-[24px] bg-gray-700 text-white text-xs px-2 py-1 rounded">
                  You can enter ETH into multiple consecutive rounds in a single
                  transaction, to save on gas fees.
                </div>
              )}
            </div>
            <div className="flex items-center mt-2">
              <div className="flex items-center w-32 h-10 border border-gray-500 rounded-lg">
                <button
                  className="px-2"
                  onClick={() =>
                    setNumberOfRounds((prev) => Math.max(prev - 1, 1))
                  }
                >
                  -
                </button>
                <input
                  type="number"
                  className="w-20 h-full text-center border-none bg-transparent focus:outline-none"
                  value={numberOfRounds}
                  onChange={(e) => setNumberOfRounds(parseInt(e.target.value))}
                />
                <button
                  className="px-2"
                  onClick={() => setNumberOfRounds((prev) => prev + 1)}
                >
                  +
                </button>
              </div>
              <button className="h-10 ml-2 px-4 border border-gray-500 rounded-lg">
                Max
              </button>
            </div>
            <div className="flex justify-between items-center mt-4">
              <span className="text-[16px] text-white">Total Entry</span>
              <div className="flex items-center">
                <span className="text-[16px] text-gray-500">
                  ${totalEntryUSD.toFixed(2)}
                </span>
                <span className="text-white font-bold ml-2">
                  {totalEntryEth.toFixed(4)} {activeAsset.symbol}
                </span>
              </div>
            </div>
            {/* <div className="flex justify-between items-center mt-2">
              <span className="text-[16px] text-white">Est. gas savings</span>
              <div className="flex items-center">
                <span className="text-[16px] text-gray-500">($0.00)</span>
                <span className="text-white font-bold ml-2">
                  0 {activeAsset.symbol}
                </span>
              </div>
            </div> */}
            <div className="flex justify-end p-6">
              {(gameData?.players ?? []).length > 0 ? (
                <>
                  {address ? (
                    <button
                      className="w-full text-xl yolo-button px-4 disabled:!bg-gray-500 h-14 hover:scale-103 rounded-full relative outline outline-2 outline-offset-[6px] outline-yellow-300 text-black hover:scale-105"
                      onClick={handleBet}
                      disabled={isBetLoading || Number(betAmount) < 0}
                    >
                      {isBetLoading ? <>Waiting...</> : <>Place Bet</>}
                    </button>
                  ) : (
                    <button
                      className="w-full text-xl yolo-button px-4 disabled:!bg-gray-500 h-14 hover:scale-103 rounded-full relative outline outline-2 outline-offset-[6px] outline-yellow-300 text-black hover:scale-105"
                      onClick={handleBet}
                      disabled={isBetLoading}
                    >
                      {isBetLoading ? <>Waiting...</> : <>Place Bet</>}
                    </button>
                  )}
                </>
              ) : started !== true ? (
                <>
                  {address ? (
                    <button
                      className="bg-[#F7B831] text-[#17161B] text-[16px] font-[500] px-5 py-2 rounded-[4px]"
                      onClick={handleBet}
                      disabled={isBetLoading}
                    >
                      {isBetLoading ? <>Waiting...</> : <>Place Bet</>}
                    </button>
                  ) : (
                    <div className="w-full text-xl yolo-button px-4 disabled:!bg-gray-500 h-14 hover:scale-103 rounded-full relative outline outline-2 outline-offset-[6px] outline-yellow-300 text-black hover:scale-105 mx-auto text-center justify-center font-bold">
                      {/* <WalletMultiButton /> */}
                      <div className="hidden md:flex items-center justify-between gap-8 rounded-full overflow-hidden">
                        <ConnectButton showBalance={false} />
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <button
                  className="bg-[#F7B831] text-[#17161B] text-[16px] font-[500] px-5 py-2 rounded-[4px]"
                  disabled
                >
                  Waiting...
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
