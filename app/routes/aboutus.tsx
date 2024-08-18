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

export default function Index() {
  return (
    <div className="bg-[#09071b] text-white">
      <TopNav />
      <div id="aboutus">
        <div className="mx-auto w-full max-w-[1440px] pt-16 pb-28 px-4 md:px-8 lg:px-12 flex flex-col items-center">
          <div className="w-full flex flex-col gap-4 items-center max-w-7xl md:rounded-3xl bg-[#161432] py-6">
            <div className="text-3xl font-extrabold uppercase text-white">
              About Us
            </div>
            <div className="max-w-[1440px] px-8 mx-auto py-4 bg-[#161432] text-white">
              <div className="w-full px-4 sm:px-16">
                <div className="text-xl font-bold text-center mb-2 mt-4">
                  $WTF introduces
                </div>
                <p className="my-2">
                  Our decentralized application (DApp) leveraging the utility of the WTF token ecosystem through Raffles & Rewards. This platform allows users to purchase multiple entries for ongoing raffle events featuring real-world assets and much more!
                </p>
                <div className="text-xl font-bold text-center mb-2 mt-4">
                  All decentralized!
                  For The People, By The People!
                </div>
                <p className="my-2">
                  Each entry will be purchasable in BASE ETH (Phase 1 Buildout), with a set limitation on the number of entries per holder & per event to ensure fairness.
                </p>
                <p className="my-2">
                  Price per entry varies per Event. Winners are automatically chosen at the end of each Raffle Event via the DApp’s Smart Contract Provably Randomizer function (VRF) for 100% fairness, solid proof and Blockchain verifiable.
                </p>
                <p className="my-2">
                  Our decentralized system records each confirmed transaction on the blockchain, ensuring 100% fairness and accuracy.
                </p>
                <p className="my-2">
                  All raffle tickets and related data are stored as smart contracts / transaction hashes on the blockchain, verifiable through our DApp or blockchain scanners like https://basescan.org.
                </p>
                <div className="text-xl font-bold text-center mb-2 mt-4">
                  Our $WTF DApp offers a diverse range of Real World Assets (RWAs) Raffles including:
                </div>
                <ul className='list-disc ml-6'>
                  <li>
                    Jewelry and commodities (e.g., diamonds, gold, silver)
                  </li>
                  <li>
                    Luxury watches (e.g., Rolex, Patek Philippe)
                  </li>
                  <li>
                    Vacation packages (e.g., flights, hotels, resorts, cruises)
                  </li>
                  <li>
                    Sporting events (e.g., tickets to NFL, NBA, MLB, and soccer games)
                  </li>
                  <li>
                    Concert tickets (e.g., music festivals, artist tours)
                  </li>
                  <li>
                    And more!
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
