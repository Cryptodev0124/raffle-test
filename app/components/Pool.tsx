import { Link } from '@remix-run/react'
import usdt from '~/assets/usdt.svg'
import bag from '~/assets/bag.svg'
import trx from '~/assets/trx-mark.svg'
import tme from '~/assets/tme-mark.png'
import { Tooltip } from './Tooltip'
import { useReadContracts } from 'wagmi'
import { contracts } from '~/utils/constants'
import { raffleAbi } from '~/utils/abis'
import { useEffect, useState } from 'react'
import { formatEth } from '~/utils/bigint'

export const Pool = ({
  id,
  name,
  stakeAmount,
  size,
  theme,
}: {
  id: string
  name: string
  stakeAmount: number
  size: string
  theme: string
}) => {
  const poolType = id.substring(0, 3)
  const poolId = parseInt(id.substring(3), 10)

  const { data, refetch } = useReadContracts({
    contracts: [
      {
        abi: raffleAbi,
        address: contracts.raffle,
        functionName: 'timePool',
        args: [BigInt(poolId)],
      },
    ],
  })

  const [totalStakedAmount, setTotalStakedAmount] = useState('0')
  useEffect(() => {
    if (data) {
      const totalStakedAmount = formatEth(Number(data[0].result[0]))
      setTotalStakedAmount(totalStakedAmount)
    }
  }, [data, poolId])

  return (
    <div className="flex flex-col card-gradient-background rounded-[10px] text-white border-[#00CCFF33] border-2">
      <style>
        {`
          .card-gradient-background {
            background: linear-gradient(to top, #192E37, #709CAE);
          }
          .play-button {
            background-image: linear-gradient(to right, #FFFF34, #FFDD5E, #EBA054);
          }
      `}
      </style>
      <div className="flex flex-col text-white py-5 relative">
        <div className="text-xl font-semibold text-center">{name}</div>
        <div className="text-base text-center">{id}</div>
        <div className="absolute right-3">
          <Tooltip src={poolType === 'TRX' ? trx : tme} imgClass="w-[50px]">
            {poolType === 'TRX'
              ? 'Transaction based Pool with Halvings'
              : 'Timebased Pool'}
          </Tooltip>
        </div>
      </div>
      <img src={theme} alt="banner" />
      <div className="flex flex-col">
        <div className="flex flex-row justify-between p-3 items-center">
          <div className="flex flex-row gap-4 items-center">
            <img src={usdt} className="w-[46px]" />
            <div className="">{totalStakedAmount} IRA</div>
          </div>
          {poolType === 'TRX' && (
            <div className="flex flex-row gap-4 items-center">
              <img src={bag} className="w-[48px]" />
              <div className="">{size} IRA</div>
            </div>
          )}
          {poolType === 'TME' && (
            <div className="uppercase font-bold">{size}</div>
          )}
        </div>
        <div className="flex justify-center p-3 mb-4 -mt-2">
          <Link
            to={`/${poolType === 'TRX' ? 'trxpool' : 'tmepool'}/${poolId}`}
            className="text-xl play-button disabled:!bg-gray-500 px-7 py-2 uppercase hover:scale-103 rounded-full relative outline outline-2 outline-offset-[6px] outline-yellow-300 text-black hover:scale-105"
          >
            Join
          </Link>
        </div>
      </div>
    </div>
  )
}
