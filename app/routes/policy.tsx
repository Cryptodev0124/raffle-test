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
            Privacy Policy
          </div>
        </div>
        <div className="w-full px-4 sm:px-16">
          <p className="my-2">Introduction</p>
          <p className="my-2">
            Your privacy is important to us, and we are committed to protecting your personal information. This Privacy Notice explains how What's This For? (WTF) uses your personal information when you use our website and services. We will be clear and open about why we collect your personal information and how we use it. Where you have choices or rights, we will explain these to you.
          </p>
          <div className="text-xl font-bold text-center mb-2 mt-4">Who controls your information?
          </div>
          <p className="my-2">
            WTF controls your information, which is held on servers based on our third-party provider Hostinger and elsewhere from time to time. If you have any concerns or would like further information about how WTF handles your personal information, you can contact us via our Telegram Group.
          </p>
          <div className="text-xl font-bold text-center mb-2 mt-4">
            Information we collect about you
          </div>
          <p className="my-2">
            We collect two types of information: Personally identifiable information (PII) and Non-personally identifiable information (Non-PII).
          </p>
          <p className="my-2">
            - Personally identifiable information (PII): You provide this information to us in the process of setting up an account, participating in games, and using the services of the website. This information is required to give you access to certain parts of our website and related services.
          </p>
          <p className="my-2">
            - Non-personally identifiable information (Non-PII): We collect data on how you use the site, which does not identify you personally. This information is essential for the provision and quality of our services.
          </p>
          <p className="my-2">
            How and why we use your personal information
          </p>
          <div className="text-xl font-bold text-center mb-2 mt-4">
            We use your personal information for the following purposes:
          </div>
          <p className="my-2">
            - To provide you with the products or services you have requested
            - To meet our legal or regulatory obligations
            - To monitor our website performance
            - To provide you with marketing information
          </p>
          <p className="my-2">
            Your rights over your personal information differ according to the category and lawful basis. You have the right to:
          </p>
          <p className="my-2">
            - Rectification
            - Request a copy of your personal information
            - Complain to the regulator
            - Object to activities carried out for our legitimate interest
          </p>
          <div className="text-xl font-bold text-center mb-2 mt-4">
            Sharing your personal information
          </div>
          <p className="my-2">
            We may disclose your personal information to third parties:
          </p>
          <div className="text-xl font-bold text-center mb-2 mt-4">Eligibility</div>
          <p className="my-2">
            - To comply with legal or regulatory obligations
            - To enforce or apply our terms
            - To assist us in providing you with our services
            - To protect our rights, property, or safety
            - With your permission
          </p>
          <div className="text-xl font-bold text-center mb-2 mt-4">
            Security
          </div>
          <p className="my-2">
            We store personal information in an encrypted and password-protected database residing within our secure network behind active state-of-the-art firewall software. We also take measures to ensure our subsidiaries, agents, affiliates, and suppliers employ adequate security measures.
          </p>
          <div className="text-xl font-bold text-center mb-2 mt-4">Third-Party Practices</div>
          <p className="my-2">
            We cannot ensure the protection of any information that you provide to a third-party online site that links to or from the services or any information collected by any third party administering our affiliate program (if applicable) or any other program, since these third-party online sites are owned and operated independently from us. Any information collected by these third parties is governed by the privacy policy, if any, of such third party.
          </p>
          <div className="text-xl font-bold text-center mb-2 mt-4">
            Disclaimer
          </div>
          <p className="my-2">
            The Services operate ‘AS-IS’ and ‘AS-AVAILABLE’ without liability of any kind. We are not responsible for events beyond our direct control. Due to the complex and ever-changing nature of our technology and business, we cannot guarantee, nor do we claim that there will be error-free performance regarding the privacy of your Personal Information, and we will not be liable for any indirect, incidental, consequential or punitive damages relating to the use or release of said Personal Information.
          </p>
          <div className="text-xl font-bold text-center mb-2 mt-4">Changes to this Privacy Policy</div>
          <p className="my-2">
            We may periodically make changes to this Privacy Policy and will notify you of these changes by posting the modified terms on our platforms. We recommend that you revisit this Privacy Policy regularly.
          </p>
          <p className="my-2">
            By using our services, you acknowledge that you have read, understood, and agree to be bound by this Privacy Policy. If you do not agree with any statements contained within this Privacy Notice, please do not proceed any further on our website.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  )
}
