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
            <div className="text-sm font-extrabold uppercase text-white text-center">
              What The Flip Coin Toss Terms Of Service
            </div>
            <div className="max-w-[1440px] px-2 mx-auto py-4 bg-[#161432] text-white">
              <div className="w-full px-4 sm:px-16">
                <div className="text-xl font-bold text-center mb-2 mt-4">
                  Introduction:
                </div>
                <p className="my-2 leading-9 leading-9">
                  Welcome to What The Flip Coin Toss! By using our services, you agree to be bound by these Terms and Conditions.
                </p>
                <div className="text-xl font-bold text-center mb-2 mt-8">
                  Scope of Services:
                </div>
                <p className="my-2 leading-9">
                  Currently, our coin toss feature only supports Base ETH. Additional options will be available soon.
                </p>
                <div className="text-xl font-bold text-center mb-2 mt-4">
                  Max Limit:
                </div>
                <p className="my-2 leading-9">
                  Each flip has a maximum limit of 1/3 of our What The Flip Coin Toss treasury size. You may bet any amount up to this max limit.
                </p>
                <div className="text-xl font-bold text-center mb-2 mt-4">
                  Wallet Balance:
                </div>
                <p className="my-2 leading-9">
                  Please note that your wallet balance may show a lower amount due to the 10% fees being deducted.
                </p>
                <div className="text-xl font-bold text-center mb-2 mt-4">
                  Transparency:
                </div>
                <p className="my-2 leading-9">
                  All flips can be verified on-chain through our program address or by tracking our What The Flip Coin Toss Treasury wallet.
                </p>
                <div className="text-xl font-bold text-center mb-2 mt-4">
                  Contact Us:
                </div>
                <p className="my-2 leading-9">
                  For any questions or concerns, please reach out to us on our social media platforms.
                </p>
                <div className="text-md font-bold text-center mb-2 mt-8 leading-10 ">
                  By using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
