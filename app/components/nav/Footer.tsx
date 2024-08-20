import { Link } from '@remix-run/react'
import usdt from '~/assets/usdt.svg'
import twitter from '~/assets/social/twitter.svg'
import telegram from '~/assets/social/telegram.svg'
import email from '~/assets/social/email.svg'
import website from '~/assets/social/website.svg'
import discord from '~/assets/social/discord.svg'
import instagram from '~/assets/social/instagram.svg'
import raddit from '~/assets/social/raddit.svg'
import facebook from '~/assets/social/facebook.svg'
import youtube from '~/assets/social/youtube.svg'
import dapp from '~/assets/social/dapp.svg'
import docs from '~/assets/social/docs.svg'
import footer_mobile from '~/assets/footer-mobile.png'
import footer_desktop from '~/assets/footer-desktop.png'

export const Footer = () => {
  return (
    <>

      <div className="bg-transparent">
        {/* <div className="pt-8 pb-5 bg-[#00000077]">
          <div className="flex justify-center text-sm text-white">
            <Link to="/terms" className="pr-5 underline">
              Terms & Conditions
            </Link>
          </div>
        </div> */}
        <div className="p-2 bg-transparent">
          <div className="flex justify-center text-sm text-white">
            {/* <Link to="https://www.whatsthisfor.io/" className="pr-5">
              <img src={website} className="w-[56px]" />
            </Link> */}
            <Link to="https://t.me/WhatsThisForToken" className="pr-5">
              <img src={telegram} className="w-[56px]" />
            </Link>
            <Link to="https://x.com/wtf_rwaproject?s=21" className="pr-5">
              <img src={twitter} className="w-[56px]" />
            </Link>
            <Link to="https://www.facebook.com/share/KG72hhcoLxM7Cbd3/?mibextid=LQQJ4d" className="pr-5">
              <img src={facebook} className="w-[56px]" />
            </Link>
            <Link to="https://www.instagram.com/wtf.token?igsh=MTZvdXkwdXB1MzU3bg%3D%3D&utm_source=qr" className="pr-5">
              <img src={instagram} className="w-[56px]" />
            </Link>
          </div>
          {/* <div className="flex justify-center text-sm text-white">
            <Link to="https://www.whatsthisfor.wtf" className="pr-5">
              <img src={dapp} className="w-[56px]" />
            </Link>
            <Link to="https://youtube" className="pr-5">
              <img src={youtube} className="w-[56px]" />
            </Link>
            <Link to="https://www.reddit.com/u/WTF_Token/s/Gsb9T2SydB" className="pr-5">
              <img src={raddit} className="w-[56px]" />
            </Link>
            <Link to="https://email" className="pr-5">
              <img src={email} className="w-[56px]" />
            </Link>
            <Link to="https://discord.gg/qtAAT27Q" className="pr-5">
              <img src={discord} className="w-[56px]" />
            </Link>
            <Link to="https://coinflips.docs" className="pr-5">
              <img src={docs} className="w-[56px]" />
            </Link>
          </div> */}
        </div>
        <div className="pb-8 pt-5 bg-[#00000077]">
          <div className="flex justify-center text-sm text-white">
            Defi-IRA | Copyright © 2024
          </div>
          {/* <div className="flex justify-center text-sm text-white">
            WPT Investing Corp
          </div> */}
        </div>
      </div>
    </>
  )
}
