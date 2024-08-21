import ethxSrc from '~/assets/ethx.svg'
import sfrxSrc from '~/assets/sfrx.svg'
import stEthSrc from '~/assets/stETH.svg'
import mEthSrc from '~/assets/mETH.svg'
import oethSrc from '~/assets/oeth.svg'
import rethSrc from '~/assets/rETH.svg'
import swethSrc from '~/assets/swETH.svg'
import eth from '~/assets/ETH.svg'

import wojak from '~/assets/wojak.svg'
import pepe from '~/assets/pepe.svg'
import chad from '~/assets/chad.svg'
import sanic from '~/assets/sanic.svg'
import doge from '~/assets/doge.svg'
import boden from '~/assets/boden.svg'
import { size } from 'viem'
import JackpotModal from '~/components/JackpotModal'

export interface Tag {
  title: string
  color: string
  tooltip?: string
}

export interface Asset {
  symbol: string
  src: string
  decimals: number
  name: string
  tags?: Tag[]
}

export interface Pool {
  id: string
  name: string
  stakeAmount: number
  size: string
  theme: string
}

export const pools = [
  {
    id: 'TME001',
    name: 'WTFs Run',
    stakeAmount: 1,
    size: 'Turbo',
    theme: sanic
  },
  {
    id: 'TME002',
    name: 'WTFs Chase',
    stakeAmount: 10,
    size: 'Normal',
    theme: doge
  },
  {
    id: 'TME003',
    name: 'WTFs Crawl',
    stakeAmount: 50,
    size: 'Slow AF',
    theme: boden
  },
  {
    id: 'TME004',
    name: 'WTFs News',
    stakeAmount: 50,
    size: 'Slow AF',
    theme: chad
  },
  {
    id: 'TME005',
    name: 'WTFs Hope',
    stakeAmount: 50,
    size: 'Slow AF',
    theme: pepe
  },
  {
    id: 'TME006',
    name: 'WTFs Dream',
    stakeAmount: 50,
    size: 'Slow AF',
    theme: wojak
  },
]

export const assets = [
  {
    symbol: 'ETH',
    src: eth,
    decimals: 18,
    name: 'Origin Ether',
    tags: [{ title: '2x primeETH XP Boost', color: 'red' }],
  },
  // { symbol: 'stETH', src: stEthSrc, name: 'Lido Staked ETH' },
  // { symbol: 'mETH', src: mEthSrc, name: 'Mantle Staked Ether' },
  // {
  //   symbol: 'ETHx',
  //   src: ethxSrc,
  //   name: 'Stader ETHx',
  //   tags: [
  //     {
  //       title: 'Eigen Turbocharge',
  //       color: 'green',
  //       tooltip: `1M Extra EigenLayer pts - 50 extra EL pts per ETHx minted and restaked`,
  //     },
  //   ],
  // },
  // { symbol: 'sfrxETH', src: sfrxSrc, name: 'Staked Frax Ether' },
  // { symbol: 'swETH', src: swethSrc, name: 'Swell ETH' },
  // {
  //   symbol: 'rETH',
  //   src: rethSrc,
  //   name: 'Rocket Pool ETH',
  //   tags: [
  //     {
  //       title: '1.1x primeETH XP Boost',
  //       color: 'red-outline',
  //     },
  //   ],
  // },
] as Asset[]

// Ensure there is a contract address for each asset above
export const contracts = {
  raffle: '0xA57BDCd9a1306d790e6699fC8e66670F72D71C09',
  raffle1: '0x2a426b0e1c6Ec9D0D7B14220aeBdf02BD71D1496',
  raffle2: '0xfacD015340549770B001961b1896313893fb176e',
  coinflip: '0xB4c9207CC90AA0dAC7625c1d9203365FcB46e3E5',
  ethPriceFeed: '0x143db3CEEfbdfe5631aDD3E50f7614B6ba708BA7',
  spinWheel: '0x2f82b23ab54e65127d6bf8bb34db9fab5698d1c1',
  // spinWheel4: '0x3e3c87c8e9e77e1021099b7c166f6435a37a29f7',
  // spinWheel3: '0x4c7c17e809c155f64CB83Ab10ee37339c875a517',
  // spinWheel2: '0x119bf8d9770eB4bFBCfbcC9D249718fEA925b1a3',
  // spinWheel1: '0xd6ADD118ad8c83fC60cB7F44cB63993407bA3821',
  jackpot: '0x23892eb255701399e2d1164800E63Adda122AAe6',
  coinflip1: '0x5e959580a9cc50114d277ABb20fa73B7cDa0674e',
  stakingToken: '0x733ca949Cc6994C9545ccB3619A7cfA9c2a519b0',
  ETHx: '0xa35b1b31ce002fbf2058d22f30f95d405200a15b',
  stETH: '0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84',
  sfrxETH: '0xac3E018457B222d93114458476f3E3416Abbe38F',
  ETH: '0x856c4Efb76C1D1AE02e20CEB03A2A6a08b0b8dC3',
  mETH: '0xd5f7838f5c461feff7fe49ea5ebaf7728bb0adfa',
  rETH: '0xae78736cd615f374d3085123a210448e74fc6393',
  swETH: '0xf951e335afb289353dc249e82926178eac7ded78',

  primeETH: '0x6ef3D766Dfe02Dc4bF04aAe9122EB9A0Ded25615',
  lrtOracle: '0xA755c18CD2376ee238daA5Ce88AcF17Ea74C1c32',
  lrtDepositPool: '0xA479582c8b64533102F6F528774C536e354B8d32',
  lrtConfig: '0xF879c7859b6DE6FAdaFB74224Ff05b16871646bF',
} as const

export const lrtOraclePriceMethod = 'primeETHPrice'

export const depositsEndDate = new Date()
depositsEndDate.setUTCFullYear(2024, 1, 9)
depositsEndDate.setUTCHours(19, 55, 0, 0)

export const eigenWeekStart = new Date()
eigenWeekStart.setUTCFullYear(2024, 2, 18)
eigenWeekStart.setUTCHours(19, 0, 0, 0)

export const eigenWeekEnd = new Date()
eigenWeekEnd.setUTCFullYear(2024, 2, 25)
eigenWeekEnd.setUTCHours(19, 0, 0, 0)
