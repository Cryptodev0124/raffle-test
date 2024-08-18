import { useReadContracts } from 'wagmi'
import { formatEth, formatUSD } from '~/utils/bigint'
import { parseAbi } from 'viem'

import { primeETHABI, oracleAbi, jackpotAbi, ethPriceFeedAbi } from '~/utils/abis'
import { contracts, lrtOraclePriceMethod } from '~/utils/constants'
import { useEffect, useState } from 'react'

export const useEthPrice = () => {
  const { data } = useReadContracts({
    contracts: [
      {
        abi: ethPriceFeedAbi,
        address: contracts.ethPriceFeed,
        functionName: 'latestAnswer',
      },
    ]
  })
  const [ethPrice, setEthPrice] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (data && data[0]?.result !== undefined) {
      setEthPrice(data[0]?.result);
    }
  }, [data]);

  return {
    ethPrice: ethPrice ? Number(ethPrice) : '-'
  }
}