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
      <div className="max-w-[1440px] px-8 mx-auto py-12 bg-[#161432]">
        <div className="py-16">
          <div className="text-2xl font-extrabold uppercase text-center text-white">
            How to Play
          </div>
        </div>
        <div className="w-full px-4 sm:px-16">
          <div className="text-xl font-bold text-center mb-2 mt-4">A Step-by-Step Guide to Buying Raffle Entries with WTF Raffle Events
          </div>
          <p className="my-2">
            Participating in WTF Raffle Events is easy and straightforward. Follow these simple steps to enter our exciting raffles and potentially win amazing prizes:
          </p>
          <div className="text-xl font-bold text-center mb-2 mt-4">
            Step 1: Select and Connect Your Wallet
          </div>
          <p className="my-2">
            - Click on the "Select Wallet" button (🔌) to connect your digital wallet to our platform.
            - Choose your preferred wallet from the list of available options.
            - Authenticate the connection to securely link your wallet to our system.
          </p>
          <div className="text-xl font-bold text-center mb-2 mt-4">
            Step 2: Browse Live Raffles
          </div>
          <p className="my-2">
            - Click on the "Browse Live Raffles" button (👀) to view a list of currently active raffle events.
          </p>
          <p className="my-2">
            - Browse through the available raffles and select the one you'd like to enter.
          </p>
          <div className="text-xl font-bold text-center mb-2 mt-4">
            Step 3: Buy Raffle Tickets
          </div>
          <p className="my-2">
            - Once you've selected a raffle, choose how many entries you'd like to purchase based on the price per ticket.
          </p>
          <p className="my-2">
            - Click on the "Buy Raffle Tickets" button (🎟) to proceed with your purchase.

          </p>
          <div className="text-xl font-bold text-center mb-2 mt-4">Step 4: Confirm Transaction
          </div>
          <p className="my-2">
            - After selecting your entries, you'll need to confirm the transaction approval on the blockchain through your connected wallet.
          </p>
          <p className="my-2">
            - Our DApp will mint the confirmation, and your tickets/entries will be recorded on the blockchain and visible in our DApp for validation.
          </p>
          <div className="text-xl font-bold text-center mb-2 mt-4">
            Winner Selection
          </div>
          <p className="my-2">
            - Our Raffle System utilizes a Verifiable Random Function (VRF) smart contract integration to ensure a fair and transparent winner selection process.
          </p>
          <p className="my-2">
            - The VRF generates random values using a Distributed Randomness Beacon, a verifiable, unpredictable, and unbiased random number generator run by reputable web3 organizations, including the Ethereum Foundation, Protocol Labs, and Gelato VRF.
          </p>
          <p className="my-2">
            - Each winner is chosen through this smart contract function at the end of each Raffle Event.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  )
}
