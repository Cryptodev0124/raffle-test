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
            Comprehensive Disclaimer
          </div>
          <div className="text-md font-extrabold uppercase text-center text-white">
            Understanding Probability and Raffle Participation
          </div>
        </div>
        <div className="w-full px-4 sm:px-16">
          <div className="text-xl font-bold text-center mb-2 mt-4">Probability Essentials</div>
          <p className="my-2">
            - A 99.9% chance of winning does not guarantee a win; it's still possible to lose.
          </p>
          <p className="my-2">
            - Conversely, a 0.01% chance is not impossible; it's still a potential outcome.
          </p>
          <p className="my-2">
            - The law of probability governs our raffle, ensuring each outcome is independent and unpredictable.
          </p>
          <div className="text-xl font-bold text-center mb-2 mt-4">Raffle Participation Guidelines</div>
          <p className="my-2">
            - Buying more raffle tickets does not guarantee a win; each ticket has an equal chance.
          </p>
          <p className="my-2">
            - The only way to guarantee a win is to purchase the entire ticket supply without any other participants.
          </p>
          <p className="my-2">
            - Set a budget and stick to it; only spend what you're comfortable losing.
          </p>
          <p className="my-2">
            - Keep track of your expenses and take a break if you feel overwhelmed.
          </p>
          <p className="my-2">
            - Never assume you'll make the last purchase; others may also be waiting to buy.
          </p>
          <p className="my-2">
            - Understand the maximum possible supply and our tips before making a purchase.
          </p>
          <div className="text-xl font-bold text-center mb-2 mt-4">
            Smart Raffle Strategies
          </div>
          <p className="my-2">
            - Buying tickets on undersold listings may be a strategy, but it's not a guarantee of winning.
          </p>
          <p className="my-2">
            - Consider the price and total supply when making a purchase.
          </p>
          <p className="my-2">
            - Choose a raffle you're interested in winning, but remember that satisfaction is not guaranteed.
          </p>
          <div className="text-xl font-bold text-center mb-2 mt-4">
            Decentralized Lottery-Based Raffle System
          </div>
          <p className="my-2">
            - Our system is designed to provide a fun and potentially profitable experience, but it's essential to acknowledge the risks involved.
          </p>
          <p className="my-2">
            - Nothing is guaranteed, and probability outcomes are uncertain.
          </p>
          <p className="my-2">
            - We strive to ensure user comfort and satisfaction, but our decentralized system means we cannot guarantee outcomes.
          </p>
          <div className="text-xl font-bold text-center mb-2 mt-4">
            Tamper-Proof Randomness
          </div>
          <p className="my-2">
            - Our smart contracts utilize a provably fair and verifiable random number generator to ensure unpredictable outcomes.
          </p>
          <p className="my-2">
            - This technology is crucial for tasks like lotteries, raffles, and NFTs, where randomness and security are paramount.
          </p>
          <div className="text-xl font-bold text-center mb-2 mt-4">Terms and Conditions</div>
          <p className="my-2">
            - Please read, understand, and accept our Terms and Conditions before participating in our raffle.
          </p>
          <p className="my-2">
            - We value your feedback and strive to create a comfortable and secure experience for all users.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  )
}
