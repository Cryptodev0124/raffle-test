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
                  Welcome to our WTF Spin Wheel Bonus & Prize Feature. By using our services, you agree to be bound by these Terms and Conditions..
                </p>
                <div className="text-xl font-bold text-center mb-2 mt-8">
                  Scope of Services:
                </div>
                <p className="my-2 leading-9">
                  Currently, our WTF Spin Wheel feature only supports Base ETH. Additional options will be available soon.
                </p>
                <div className="text-xl font-bold text-center mb-2 mt-4">
                  Max Limit and Cost:
                </div>
                <p className="my-2 leading-9">
                  Users are allowed 1 free spin every 24hrs to win WTF Bonus Points. Thereafter, the wheel converts to a prize per spin and has a cost of 0.001 Base ETH per spin. There is no limit on the amount of spins you can do.
                </p>
                <div className="text-xl font-bold text-center mb-2 mt-4">
                  Wallet Balance:
                </div>
                <p className="my-2 leading-9">
                  Please note that your wallet balance may show a lower amount due to the 10% Per Transaction fee being deducted.
                </p>
                <div className="text-xl font-bold text-center mb-2 mt-4">
                  Transparency:
                </div>
                <p className="my-2 leading-9">
                  All spins can be verified on-chain through our program address or by tracking our WTF Spin Wheel Treasury wallet. WTF Spin Wheel Disclaimer
                </p>
                <div className="text-xl font-bold text-center mb-2 mt-4">
                  Fairness and Result Calculation:
                </div>
                <p className="my-2 leading-9">
                  Our commitment to transparency and fairness is unwavering. To ensure provably fair results, we use a robust calculation process:
                </p>
                <div className="text-md font-bold mb-2 mt-8 leading-10 ">
                  <ul className="list-disc ml-6">
                    <li>1. Combine your client seed and nonce.</li>
                    <li>
                      2. Calculate the HMAC_SHA256 hash value of the combination, yielding a 64-character hexadecimal string: hash = HMAC_SHA256 (clientSeed:nonce, serverSeed).
                    </li>
                    <li>
                      3. Extract the first 8 characters of the hash and convert them to an int32 value using Big-endian byte order.
                    </li>
                    <li>
                      4. Divide the converted value by 0x100000000 and multiply it by the number of segments to determine the position in the odds table.
                    </li>
                    <li>
                      5. Consult the table to retrieve the corresponding odds.
                    </li>
                    <div className="text-md font-bold mb-2 mt-4 pr-4">
                      For added transparency and verification, a new seed must be set to confirm previous data (note that the server seed is encrypted).
                      While this level of detail may not be necessary for everyone, we believe in providing a clear and provably fair experience for those who value transparency and precision. Good luck!
                    </div>
                  </ul>
                </div>
                <div className="text-xl font-bold text-center mb-2 mt-4">
                  Contact Us:
                </div>
                <p className="my-2 leading-9">
                  For any questions or concerns, please reach out to us on our social media platforms.
                </p>
                <p className="my-2 leading-9">
                  By using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
