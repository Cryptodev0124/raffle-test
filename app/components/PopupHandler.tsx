// import { useEffect, useState } from 'react';
// import { useAccount, useReadContracts } from 'wagmi';
// import { raffleAbi } from '~/utils/abis';
// import { contracts } from '~/utils/constants';
// import { CongModal } from '~/components/CongModal';
// import { formatEth } from '~/utils/bigint';
// import { pools } from '~/utils/constants';

// interface Pool {
//   poolType: boolean;
//   id: number;
//   round: number;
//   stakeAmount: number;
//   poolSize: number;
//   winner: string;
// }

// const findName = (id: number, type: boolean) => {
//   const pool = pools.find(pool => pool.id === `${type ? 'TME' : 'TRX'}${id.toString().padStart(3, '0')}`)
//   return pool?.name
// }

// export default function PopupHandler() {
//   const [winningPoolsQueue, setWinningPoolsQueue] = useState<Pool[]>([]);
//   const [currentPool, setCurrentPool] = useState<Pool | null>(null);
//   const [isModalOpened, setIsModalOpened] = useState(false);

//   const { address } = useAccount();

//   const { data, refetch } = useReadContracts({
//     contracts: [
//       {
//         abi: raffleAbi,
//         address: contracts.raffle,
//         functionName: 'getWinningPools',
//       },
//     ],
//   });
  
//   useEffect(() => {
//     if (data && data[0]) {
//       const pools: Pool[] = data[0].result;
      
//       const newWinningPools = pools.filter(pool => {
//         if (pool.winner.toLowerCase() === address?.toLowerCase()) {
//           const alreadyShown = localStorage.getItem(`popup_shown_${pool.poolType}_${pool.id}_${pool.round}`);
//           if (!alreadyShown) {
//             localStorage.setItem(`popup_shown_${pool.poolType}_${pool.id}_${pool.round}`, 'true');
//             return true;
//           }
//         }
//         return false;
//       });

//       if (newWinningPools.length > 0) {
//         setWinningPoolsQueue(prevQueue => [...prevQueue, ...newWinningPools]);
//       }
//     }
//   }, [data, address]);

//   useEffect(() => {
//     if (winningPoolsQueue.length > 0 && !isModalOpened) {
//       setCurrentPool(winningPoolsQueue[0]);
//       setIsModalOpened(true);
//     }
//   }, [winningPoolsQueue, isModalOpened]);

//   const handleCloseModal = () => {
//     setIsModalOpened(false);
//     setWinningPoolsQueue(prevQueue => prevQueue.slice(1));
//   };

//   // Use a separate useEffect to handle page load and navigation without reloading
//   useEffect(() => {
//     refetch(); // Fetch data on component mount
//   }, [refetch]);

//   return (
//     currentPool && (
//       <CongModal
//         poolSize={Number(formatEth(currentPool.poolSize))}
//         poolName={findName(currentPool.id, currentPool.poolType)}
//         isOpen={isModalOpened}
//         setIsOpen={handleCloseModal}
//       />
//     )
//   );
// }
