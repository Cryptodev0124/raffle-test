import { TopNav } from '~/components/nav/TopNav'
import { Pool } from '~/components/Pool'

import type { MetaFunction } from '@remix-run/cloudflare'
import { useReadContracts, useAccount } from 'wagmi'

import { raffleAbi } from '~/utils/abis'
import { contracts, pools } from '~/utils/constants'
import { Footer } from '~/components/nav/Footer'
import { useEffect, useState } from 'react'

import mypools from '~/assets/mypools.jpg'

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

export default function Index() {
  const { address } = useAccount()

  const connectedAddress =
    address || '0x1111111111111111111111111111111111111111'
  const [tmeRounds, setTmeRounds] = useState<number[]>([])
  let [filteredPools, setFilteredPools] = useState<
    {
      id: string
      name: string
      stakeAmount: number
      size: string
      theme: string
    }[]
  >([])

  const { data } = useReadContracts({
    contracts: [
      {
        abi: raffleAbi,
        address: contracts.raffle,
        functionName: 'timePool',
        args: [BigInt(1)],
      },
      {
        abi: raffleAbi,
        address: contracts.raffle,
        functionName: 'timePool',
        args: [BigInt(2)],
      },
      {
        abi: raffleAbi,
        address: contracts.raffle,
        functionName: 'timePool',
        args: [BigInt(3)],
      },
      {
        abi: raffleAbi,
        address: contracts.raffle,
        functionName: 'timePool',
        args: [BigInt(4)],
      },
      {
        abi: raffleAbi,
        address: contracts.raffle,
        functionName: 'timePool',
        args: [BigInt(5)],
      },
      {
        abi: raffleAbi,
        address: contracts.raffle,
        functionName: 'timePool',
        args: [BigInt(6)],
      },
      {
        abi: raffleAbi,
        address: contracts.raffle,
        functionName: 'timePool',
        args: [BigInt(7)],
      },
      {
        abi: raffleAbi,
        address: contracts.raffle,
        functionName: 'timePool',
        args: [BigInt(8)],
      },
      {
        abi: raffleAbi,
        address: contracts.raffle,
        functionName: 'timePool',
        args: [BigInt(9)],
      },
    ],
  })

  useEffect(() => {
    if (data) {
      const rounds = data.map((item: any) => Number(item.result[5]))
      setTmeRounds(rounds)
    }
  }, [data])

  const { data: data1 } = useReadContracts({
    contracts: tmeRounds.map((r, index) => ({
      abi: raffleAbi,
      address: contracts.raffle,
      functionName: 'stakedAmount',
      args: [BigInt(1), BigInt(index + 1), BigInt(r), connectedAddress],
    })),
  })

  useEffect(() => {
    if (data1) {
      const livePools = pools.filter(
        (pool, i) => data1[i] && Number(data1[i].result) > 0,
      )
      setFilteredPools(livePools)
    }
  }, [data1])

  return (
    <div
      className="bg-[#000000] text-white"
      style={{ display: 'flex', flexDirection: 'column' }}
    >
      <div>
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
        <div
          className="max-w-[1440px] px-8 mx-auto py-12 bg-[#000000]"
          style={{ minHeight: `calc(100vh - 300px)` }}
        >
          <div className="py-16">
            <div className="text-2xl font-extrabold uppercase text-center glow">
              My Running Pools
            </div>
          </div>
          {/* <div className="w-full text-center">
            <img
              src={mypools}
              alt="My Pools"
              className="rounded-lg drop-shadow-xl w-[320px]"
            />
          </div> */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-7 gap-y-14 w-full sm:px-16">
            {filteredPools &&
              filteredPools.map((pool) => (
                <div className="hover-animation blue-glow">
                  <Pool
                    key={pool.id}
                    id={pool.id}
                    name={pool.name}
                    stakeAmount={pool.stakeAmount}
                    size={pool.size}
                    theme={pool.theme}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
      <div style={{ marginTop: 'auto' }}>
        <Footer />
      </div>
    </div>
  )
}
