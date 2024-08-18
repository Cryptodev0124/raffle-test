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
            Terms & Conditions
          </div>
        </div>
        <div className="w-full px-4 sm:px-16">
          <p className="my-2">Last modified: June 1, 2024</p>
          <p className="my-2">
            These Terms of Service (the “Agreement”) explains the terms and
            conditions by which you may access and use whatsthisfor.wtf ,
            dapp.whatsthisfor.wtf and any subdomains associated with the
            Website. You must read this Agreement carefully as it governs your
            use of the Website and DApp (Decentralized Application). By
            accessing or using the Website and/or DApp, you signify that you
            have read, understand, and agree to be bound by this Agreement in
            its entirety. If you do not agree, you are not authorized to access
            or use the Website and/or DApp and should not use the Website and/or
            DApp.
          </p>
          <p className="my-2">
            NOTICE: This Agreement contains important information, including a
            binding arbitration provision and a class action waiver, both of
            which impact your rights as to how disputes are resolved. The
            Website and DApp is only available to you — and you should only
            access the Website and DApp — if you agree completely with these
            terms.
          </p>
          <div className="text-xl font-bold text-center mb-2 mt-4">Introduction</div>
          <p className="my-2">
            The WTF Website and DApp provides access to a decentralized protocol
            on various public blockchains, including but not limited to ETHEREUM
            / Base Chain that allow users to trade, buy, swap and or interact
            with certain compatible digital assets (“the What's This For?
            protocol” or the “WTF Protocol”), among other services. The Website
            and DApp can act as one, but not the exclusive, means of accessing
            the WTF Protocol.
          </p>
          <p className="my-2">
            To access the Website and or DApp, you must use non-custodial wallet
            software, which allows you to interact with public blockchains. Your
            relationship with that non-custodial wallet provider is governed by
            the applicable terms of service of that third party, not this
            Agreement. Wallets are not operated by, maintained by, or affiliated
            with us, and we do not have custody or control over the contents of
            your wallet and have no ability to retrieve or transfer its
            contents. By connecting your wallet to our Website and or DApp, you
            agree to be bound by this Agreement and all of the terms
            incorporated herein by reference.
          </p>
          <div className="text-xl font-bold text-center mb-2 mt-4">
            Modification of this Agreement
          </div>
          <p className="my-2">
            We reserve the right, in our sole discretion, to modify this
            Agreement from time to time. If we make any material modifications,
            we will notify you by updating the date at the top of the Agreement
            and by maintaining a current version of the Agreement within our
            Website Menu and DApp. All modifications will be effective when they
            are posted, and your continued accessing or use of the Website will
            serve as confirmation of your acceptance of those modifications. If
            you do not agree with any modifications to this Agreement, you must
            immediately stop accessing and using the Website and or DApp.
          </p>
          <div className="text-xl font-bold text-center mb-2 mt-4">
            Description of Services provided through the Website and DApp
          </div>
          <p className="my-2">
            The Website and DApp provides a web or mobile-based means of
            accessing the WTF Protocol.
          </p>
          <div className="text-xl font-bold text-center mb-2 mt-4">
            Website and DApp for accessing Protocol
          </div>
          <p className="my-2">
            The Website and DApp are distinct from the WTF Protocol and is one,
            but not the exclusive, means of accessing the WTF Protocol. The WTF
            Protocol itself has three versions in the works, designated as v1,
            v2, and v3, each of which comprises open-source or source-available
            self-executing smart contracts that are deployed on various public
            blockchains, such as BNB Chain, Base, Ethereum and others. By using
            the Website and or DApp, you understand that you are not buying or
            selling digital assets from us and that we do not operate any
            Securities Exchange on the WTF Protocol or control any trade
            execution on the WTF Protocol. When users pay transaction fees for
            using our Decentralized WTF Protocol, those fees accrue to the
            blockchain service providers. As a general matter, the WTF team is
            not a liquidity provider into Protocol liquidity pools and liquidity
            providers are independent third parties. The WTF Protocol was
            initially deployed on the Base Chain blockchain, and will be
            deployed on several other blockchain networks as it progresses.
          </p>
          <div className="text-xl font-bold text-center mb-2 mt-4">Eligibility</div>
          <p className="my-2">
            To access or use the WTF Website and or DApp, you must be able to
            form a legally binding contract with us. Accordingly, you represent
            that you are at least the age of majority in your jurisdiction
            (e.g., 18 years old in the United States) and have the full right,
            power, and authority to enter into and comply with the terms and
            conditions of this Agreement on behalf of yourself and any company
            or legal entity for which you may access or use the Website and
            DApp.
          </p>
          <p className="my-2">
            You further represent that you are not (a) the subject of economic
            or trade sanctions administered or enforced by any governmental
            authority or otherwise designated on any list of prohibited or
            restricted parties (including but not limited to the list maintained
            by the Office of Foreign Assets Control of the U.S. Department of
            the Treasury) or (b) a citizen, resident, or organized in a
            jurisdiction or territory that is the subject of comprehensive
            country-wide, territory-wide, or regional economic sanctions by the
            United States. Finally, you represent that your access and use of
            the Website and DApp will fully comply with all applicable laws and
            regulations, and that you will not access or use the Website or DApp
            to conduct, promote, or otherwise facilitate any illegal activity.
          </p>
          <div className="text-xl font-bold text-center mb-2 mt-4">
            Intellectual Property Rights
          </div>
          <p className="my-2">
            WPT Investing Corp owns all intellectual property and other rights
            in the WTF Website, DApp and its contents, including (but not
            limited to) software, text, images, trademarks, service marks,
            copyrights, patents, designs, and its “look and feel.” Unlike the
            Website, DApp versions 1-3 of the WTF Protocol are comprised
            entirely of open-source or source-available software running on
            public blockchains.
          </p>
          <p className="my-2">
            By using the Website and DApp to list, post, promote, or display
            NFTs, Raffles, Games and more, you grant us a worldwide,
            non-exclusive, sub-licensable, royalty-free license to use, copy,
            modify, and display any content, including but not limited to text,
            materials, images, files, communications, comments, feedback,
            suggestions, ideas, concepts, questions, data, or otherwise, that
            you post on or through the Website or DApp for our current and
            future business purposes, including to provide, promote, and improve
            the services. This includes any digital file, art, or other material
            linked to or associated with any NFTs or Raffles that are displayed.
          </p>
          <p className="my-2">
            You represent and warrant that you have, or have obtained, all
            rights, licenses, consents, permissions, power and/or authority
            necessary to grant the rights granted herein for any NFTs, Raffles
            or Auctions that you list, post, promote, or display on or through
            the WTF Website and DApp. You represent and warrant that such
            content does not contain material subject to copyright, trademark,
            publicity rights, or other intellectual property rights, unless you
            have necessary permission or are otherwise legally entitled to post
            the material and to grant us the license described above, and that
            the content does not violate any laws.
          </p>
          <div className="text-xl font-bold text-center mb-2 mt-4">Additional Rights</div>
          <p className="my-2">
            We reserve the following rights, which do not constitute obligations
            of ours: (a) with or without notice to you, to modify, substitute,
            eliminate or add to the WTF Website and DApp; (b) to review, modify,
            filter, disable, delete and remove any and all content and
            information from the WTF Website and DApp; and (c) to cooperate with
            any law enforcement, court or government investigation or order or
            third party requesting or directing that we disclose information or
            content or information that you provide.
          </p>
          <div className="text-xl font-bold text-center mb-2 mt-4">
            Prohibited Activity
          </div>
          <p className="my-2">
            You agree not to engage in, or attempt to engage in, any of the
            following categories of prohibited activity in relation to your
            access and use of the WTF Website and DApp:
          </p>
          <ul className='list-disc ml-6'>
            <li>
              Intellectual Property Infringement. Activity that infringes on or
              violates any copyright, trademark, service mark, patent, right of
              publicity, right of privacy, or other proprietary or intellectual
              property rights under the law.
            </li>
            <li>
              Cyberattack. Activity that seeks to interfere with or compromise
              the integrity, security, or proper functioning of any computer,
              server, network, personal device, or other information technology
              system, including (but not limited to) the deployment of viruses
              and denial of service attacks.
            </li>
            <li>
              Fraud and Misrepresentation. Activity that seeks to defraud us or
              any other person or entity, including (but not limited to)
              providing any false, inaccurate, or misleading information in
              order to unlawfully obtain the property of another.
            </li>
            <li>
              Market Manipulation. Activity that violates any applicable law,
              rule, or regulation concerning the integrity of trading markets,
              including (but not limited to) the manipulative tactics commonly
              known as “rug pulls”, pumping and dumping, and wash trading.
            </li>
            <li>
              Securities and Derivatives Violations. Activity that violates any
              applicable law, rule, or regulation concerning the trading of
              securities or derivatives, including (but not limited to) the
              unregistered offering of securities and the offering of leveraged
              and margined commodity products to retail customers in the United
              States.
            </li>
            <li>
              Sale of Stolen Property. Buying, selling, or transferring of
              stolen items, fraudulently obtained items, items taken without
              authorization, and/or any other illegally obtained items.
            </li>
            <li>
              Data Mining or Scraping. Activity that involves data mining,
              robots, scraping, or similar data gathering or extraction methods
              of content or information from the Website.
            </li>
            <li>
              Objectionable Content. Activity that involves soliciting
              information from anyone under the age of 18 or that is otherwise
              harmful, threatening, abusive, harassing, tortious, excessively
              violent, defamatory, vulgar, obscene, pornographic, libelous,
              invasive of another’s privacy, hateful, discriminatory, or
              otherwise objectionable.
            </li>
            <li>
              Any Other Unlawful Conduct. Activity that violates any applicable
              law, rule, or regulation of the United States or another relevant
              jurisdiction, including (but not limited to) the restrictions and
              regulatory requirements imposed by U.S. law.
            </li>
          </ul>
          <div className="text-xl font-bold text-center mb-2 mt-4">WTF Farm Protocol</div>
          <p className="my-2">
            You represent that you are not a user from the following countries
            or regions when participating in our WTF Farm Protocol: Belarus,
            Cuba, Crimea Region, Democratic Republic of Congo, Iran, Iraq, New
            Zealand, North Korea, South Sudan, Sudan, Syria and Zimbabwe.
          </p>
          <div className="text-xl font-bold text-center mb-2 mt-4">
            Non-Registered with the SEC or Any Other Agency
          </div>
          <p className="my-2">
            We are not registered with the U.S. Securities and Exchange
            Commission as a national securities exchange or in any other
            capacity. You understand and acknowledge that we do not broker
            trading orders on your behalf. We also do not facilitate the
            execution or settlement of your trades, which occur entirely on the
            public distributed blockchains like Ethereum. As a result, we do not
            (and cannot) guarantee market best pricing or best execution through
            the WTF Website and DApp. Any references in the WTF Website and DApp
            to “best price” do not constitute a representation or warranty about
            pricing available through the WTF Website and DApp, on the WTF
            Protocol, or elsewhere.
          </p>
          <div className="text-xl font-bold text-center mb-2 mt-4">
            Non-Solicitation; No Investment Advice
          </div>
          <p className="my-2">
            You agree and understand that: (a) all trades and interactions you
            submit through the WTF Website and DApp are considered unsolicited,
            which means that they are solely initiated by you; (b) you have not
            received any investment advice from us in connection with any
            trades, purchases or interactions, including those you place via our
            Raffle Events; and (c) we do not conduct a suitability review of any
            trades you submit.
          </p>
          <p className="my-2">
            We may provide information about tokens in the WTF Website sourced
            from third-party data partners through features such as rarity
            scores, token explorer or token lists (which includes the WTF
            default token list and WPT Investing Corp expanded list hosted at
            tokenlists.org). We may also provide warning labels for certain
            tokens. The provision of informational materials does not make
            trades in those tokens solicited; we are not attempting to induce
            you to make any purchase as a result of information provided. All
            such information provided by the WTF Website and DApp is for
            informational purposes only and should not be construed as
            investment advice or a recommendation that a particular token is a
            safe or sound investment. You should not take, or refrain from
            taking, any action based on any information contained in the WTF
            Website and DApp. By providing token information for your
            convenience, we do not make any investment recommendations to you or
            opine on the merits of any transaction or opportunity. You alone are
            responsible for determining whether any investment, investment
            strategy or related transaction is appropriate for you based on your
            personal investment objectives, financial circumstances, and risk
            tolerance.
          </p>
          <div className="text-xl font-bold text-center mb-2 mt-4">
            Non-Custodial and No Fiduciary Duties
          </div>
          <p className="my-2">
            The WTF Website and DApp is a purely non-custodial application,
            meaning we do not ever have custody, possession, or control of your
            digital assets at any time. It further means you are solely
            responsible for the custody of the cryptographic private keys to the
            digital asset wallets you hold and you should never share your
            wallet credentials or seed phrase with anyone. We accept no
            responsibility for, or liability to you, in connection with your use
            of a wallet and make no representations or warranties regarding how
            the WTF Website and DApp will operate with any specific wallet.
            Likewise, you are solely responsible for any associated wallet and
            we are not liable for any acts or omissions by you in connection
            with or as a result of your wallet being compromised.
          </p>
          <p className="my-2">
            This Agreement is not intended to, and does not, create or impose
            any fiduciary duties on us. To the fullest extent permitted by law,
            you acknowledge and agree that we owe no fiduciary duties or
            liabilities to you or any other party, and that to the extent any
            such duties or liabilities may exist at law or in equity, those
            duties and liabilities are hereby irrevocably disclaimed, waived,
            and eliminated. You further agree that the only duties and
            obligations that we owe you are those set out expressly in this
            Agreement.
          </p>
          <div className="text-xl font-bold text-center mb-2 mt-4">
            Compliance and Tax Obligations
          </div>
          <p className="my-2">
            The WTF Website and DApp may not be available or appropriate for use
            in your jurisdiction. By accessing or using the Website, you agree
            that you are solely and entirely responsible for compliance with all
            laws and regulations that may apply to you.
          </p>
          <p className="my-2">
            Specifically, your use of the WTF Website and DApp or the WTF
            Protocol may result in various tax consequences, such as income or
            capital gains tax, value-added tax, goods and services tax, or sales
            tax in certain jurisdictions.It is your responsibility to determine
            whether taxes apply to any transactions you initiate or receive and,
            if so, to report and/or remit the correct tax to the appropriate tax
            authority.
          </p>
          <div className="text-xl font-bold text-center mb-2 mt-4">
            Assumption of Risk
          </div>
          <p className="my-2">
            By accessing and using the WTF Website and DApp, you represent that
            you are financially and technically sophisticated enough to
            understand the inherent risks associated with using cryptographic
            and blockchain-based systems, and that you have a working knowledge
            of the usage and intricacies of digital assets such as ether (ETH),
            so-called stablecoins, and other digital tokens such as those
            following the Ethereum Token Standard (ERC-20), or standards of any
            other digital tokens which are transacted on blockchain.
          </p>
          <p className="my-2">
            In particular, you understand that the markets for these digital
            assets are nascent and highly volatile due to risk factors including
            (but not limited to) adoption, speculation, technology, security,
            and regulation. You understand that anyone can create a token,
            including fake versions of existing tokens and tokens that falsely
            claim to represent projects, and acknowledge and accept the risk
            that you may mistakenly trade those or other tokens. So-called
            stablecoins may not be as stable as they purport to be, may not be
            fully or adequately collateralized, and may be subject to panics and
            runs.
          </p>
          <p className="my-2">
            Furthermore, you understand that smart contract transactions
            automatically execute and settle, and that blockchain-based
            transactions are irreversible when confirmed. You acknowledge and
            accept the risk of selecting to trade in Expert Modes, which can
            expose you to potentially significant price slippage and higher
            costs.
          </p>
          <p className="my-2">
            If you act as a liquidity provider to the WTF Protocol through the
            WTf Website and or DApp, you understand that your digital assets may
            lose some or all of their value while they are supplied to the
            Protocol through the WTF Website and DApp due to the fluctuation of
            prices of tokens in a trading pair or liquidity pool.
          </p>
          <p className="my-2">
            Finally, you understand that we may create, own, or operate
            cross-chain bridges and we do not make any representation or
            warranty about the safety or soundness of any cross-chain bridge,
            including its use for governance.
          </p>
          <p className="my-2">
            In summary, you acknowledge that we are not responsible for any of
            these variables or risks and cannot be held liable for any resulting
            losses that you experience while accessing or using the WTF Website
            and DApp. Accordingly, you understand and agree to assume full
            responsibility for all of the risks of accessing and using the WTF
            Website and DApp to interact with the WTF Protocol.
          </p>
          <div className="text-xl font-bold text-center mb-2 mt-4">
            Third-Party Resources and Promotions
          </div>
          <p className="my-2">
            The WTF Website and DApp may contain references or links to
            third-party resources, including (but not limited to) information,
            materials, products, or services, that we do not own or control. In
            addition, third parties may offer promotions related to your access
            and use of the WTF Website and DApp. We do not approve, monitor,
            endorse, warrant or assume any responsibility for any such resources
            or promotions. If you access any such resources or participate in
            any such promotions, you do so at your own risk, and you understand
            that this Agreement does not apply to your dealings or relationships
            with any third parties. You expressly relieve us of any and all
            liability arising from your use of any such resources or
            participation in any such promotions.
          </p>
          <div className="text-xl font-bold text-center mb-2 mt-4">Release of Claims</div>
          <p className="my-2">
            You expressly agree that you assume all risks in connection with
            your access and use of the WTF Website and DApp. You further
            expressly waive and release us from any and all liability, claims,
            causes of action, or damages arising from or in any way relating to
            your use of the WTF Website and DApp. If you are a California
            resident, you waive the benefits and protections of California Civil
            Code § 1542, which provides: “[a] general release does not extend to
            claims that the creditor or releasing party does not know or suspect
            to exist in his or her favor at the time of executing the release
            and that, if known by him or her, would have materially affected his
            or her settlement with the debtor or released party.”
          </p>
          <div className="text-xl font-bold text-center mb-2 mt-4">Indemnity</div>
          <p className="my-2">
            You agree to hold harmless, release, defend, and indemnify us and
            our officers, directors, employees, contractors, agents, affiliates,
            and subsidiaries from and against all claims, damages, obligations,
            losses, liabilities, costs, and expenses arising from: (a) your
            access and use of the WTF Website and DApp; (b) your violation of
            any term or condition of this Agreement, the right of any third
            party, or any other applicable law, rule, or regulation; and (c) any
            other party’s access and use of the WTF Website and DApp with your
            assistance or using any device or account that you own or control.
          </p>
          <div className="text-xl font-bold text-center mb-2 mt-4">No Warranties</div>
          <p className="my-2">
            The WTF Website and DApp is provided on an “AS IS” and “AS
            AVAILABLE” basis. TO THE FULLEST EXTENT PERMITTED BY LAW, WE
            DISCLAIM ANY REPRESENTATIONS AND WARRANTIES OF ANY KIND, WHETHER
            EXPRESS, IMPLIED, OR STATUTORY, INCLUDING (BUT NOT LIMITED TO) THE
            WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE.
            You acknowledge and agree that your use of the WTF Website and DApp
            is at your own risk. We do not represent or warrant that access to
            the WTF Website and DApp will be continuous, uninterrupted, timely,
            or secure; that the information contained in the WTF Website and
            DApp will be accurate, reliable, complete, or current; or that the
            WTF Website and DApp will be free from errors, defects, viruses, or
            other harmful elements. No advice, information, or statement that we
            make should be treated as creating any warranty concerning the WTF
            Website and DApp. We do not endorse, guarantee, or assume
            responsibility for any advertisements, offers, or statements made by
            third parties concerning the WTF Website and DApp.
          </p>
          <div className="text-xl font-bold text-center mb-2 mt-4">
            Limitation of Liability
          </div>
          <p className="my-2">
            UNDER NO CIRCUMSTANCES SHALL WE OR ANY OF OUR OFFICERS, DIRECTORS,
            EMPLOYEES, CONTRACTORS, AGENTS, AFFILIATES, OR SUBSIDIARIES BE
            LIABLE TO YOU FOR ANY INDIRECT, PUNITIVE, INCIDENTAL, SPECIAL,
            CONSEQUENTIAL, OR EXEMPLARY DAMAGES, INCLUDING (BUT NOT LIMITED TO)
            DAMAGES FOR LOSS OF PROFITS, GOODWILL, USE, DATA, OR OTHER
            INTANGIBLE PROPERTY, ARISING OUT OF OR RELATING TO ANY ACCESS OR USE
            OF THE INTERFACE, NOR WILL WE BE RESPONSIBLE FOR ANY DAMAGE, LOSS,
            OR INJURY RESULTING FROM HACKING, TAMPERING, OR OTHER UNAUTHORIZED
            ACCESS OR USE OF THE INTERFACE OR THE INFORMATION CONTAINED WITHIN
            IT. WE ASSUME NO LIABILITY OR RESPONSIBILITY FOR ANY: (A) ERRORS,
            MISTAKES, OR INACCURACIES OF CONTENT; (B) PERSONAL INJURY OR
            PROPERTY DAMAGE, OF ANY NATURE WHATSOEVER, RESULTING FROM ANY ACCESS
            OR USE OF THE INTERFACE; (C) UNAUTHORIZED ACCESS OR USE OF ANY
            SECURE SERVER OR DATABASE IN OUR CONTROL, OR THE USE OF ANY
            INFORMATION OR DATA STORED THEREIN; (D) INTERRUPTION OR CESSATION OF
            FUNCTION RELATED TO THE INTERFACE; (E) BUGS, VIRUSES, TROJAN HORSES,
            OR THE LIKE THAT MAY BE TRANSMITTED TO OR THROUGH THE INTERFACE; (F)
            ERRORS OR OMISSIONS IN, OR LOSS OR DAMAGE INCURRED AS A RESULT OF
            THE USE OF, ANY CONTENT MADE AVAILABLE THROUGH THE INTERFACE; AND
            (G) THE DEFAMATORY, OBJECTIONABLE, OFFENSIVE, OR ILLEGAL CONDUCT OF
            ANY THIRD PARTY.
          </p>
          <div className="text-xl font-bold text-center mb-2 mt-4">
            Dispute Resolution
          </div>
          <p className="my-2">
            We will use our best efforts to resolve any potential disputes
            through informal, good faith negotiations. If a potential dispute
            arises, you must contact us by sending an email to
            support@whatsthisfor.wtf so that we can attempt to resolve it
            without resorting to formal dispute resolution. If we aren’t able to
            reach an informal resolution within sixty days of your email, then
            you and we both agree to resolve the potential dispute according to
            the process set forth below.
          </p>
          <p className="my-2">
            Any claim or controversy arising out of or relating to the WTF
            Website and DApp, this Agreement, or any other acts or omissions for
            which you may contend that we are liable, including (but not limited
            to) any claim or controversy as to arbitrability (“Dispute”), shall
            be finally and exclusively settled by arbitration under the
            Arbitration Rules of the New York State. You understand that you are
            required to resolve all Disputes by binding arbitration. The
            arbitration shall be held on a confidential basis before a single
            arbitrator, who shall be selected pursuant to Arbitration Rules of
            the New York State. The arbitration will be held in New York, unless
            you and we both agree to hold it elsewhere. Unless we agree
            otherwise, the arbitrator may not consolidate your claims with those
            of any other party. Any judgment on the award rendered by the
            arbitrator may be entered in any court of competent jurisdiction.
          </p>
          <div className="text-xl font-bold text-center mb-2 mt-4">
            Class Action and Jury Trial Waiver
          </div>
          <p className="my-2">
            You must bring any and all Disputes against us in your individual
            capacity and not as a plaintiff in or member of any purported class
            action, collective action, private attorney general action, or other
            representative proceeding. This provision applies to class
            arbitration. You and we both agree to waive the right to demand a
            trial by jury.
          </p>
          <div className="text-xl font-bold text-center mb-2 mt-4">Governing Law</div>
          <p className="my-2">
            You agree that the laws of New York State, without regard to
            principles of conflict of laws, govern this Agreement and any
            Dispute between you and us. You further agree that the courts of New
            York State are the proper forum for any appeals of an arbitration
            award or for court proceedings in the event that this Agreement’s
            binding arbitration clause is found to be unenforceable. Any
            arbitration conducted pursuant to this Agreement shall be governed
            by the Arbitration Rules of the State of New York. You agree that
            the courts of New York State are the proper forum for any appeals of
            an arbitration award or for court proceedings in the event that this
            Agreement’s binding arbitration clause is found to be unenforceable.
          </p>
          <div className="text-xl font-bold text-center mb-2 mt-4">Entire Agreement</div>
          <p className="my-2">
            These terms constitute the entire agreement between you and us with
            respect to the subject matter hereof. This Agreement supersedes any
            and all prior or contemporaneous written and oral agreements,
            communications and other understandings (if any) relating to the
            subject matter of the terms.
          </p>
          <div className="text-xl font-bold text-center mb-2 mt-4">Gas Fees</div>
          <p className="my-2">
            Blockchain transactions require the payment of transaction fees to
            the appropriate network (“Gas Fees”). Except as otherwise expressly
            set forth in the terms of another offer by WTF Protocol, you will be
            solely responsible to pay the Gas Fees for any transaction that you
            initiate.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  )
}
