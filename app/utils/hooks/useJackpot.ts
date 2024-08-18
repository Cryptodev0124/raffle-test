import { useReadContracts } from 'wagmi'
import { formatEth, formatUSD } from '~/utils/bigint'
import { parseAbi } from 'viem'

import { primeETHABI, oracleAbi, jackpotAbi } from '~/utils/abis'
import { contracts, lrtOraclePriceMethod } from '~/utils/constants'
import { useEffect, useState } from 'react'

export const useJackpot = () => {
  const { data } = useReadContracts({
    contracts: [
      {
        abi: jackpotAbi,
        address: contracts.jackpot,
        functionName: 'roundsCount',
      },
    ]
  })
  const [currentRound, setCurrentRound] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (data && data[0]?.result !== undefined) {
      setCurrentRound(data[0]?.result);
    }
  }, [data]);

  return {
    currentRound: currentRound ? Number(currentRound) : '-'
  }
}