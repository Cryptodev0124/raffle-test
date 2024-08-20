import { useEffect, useState } from 'react'
import { Link, NavLink } from '@remix-run/react'

import Logo from '~/assets/logo.svg'
import MobileLogo from '~/assets/mobile-logo.png'
import MenuIcon from '~/assets/menu.svg'
import LogoMobile from '~/assets/prime-staked-nav.svg'

import primeTokenSrc from '~/assets/prime-eth-token-full.svg'
import eigenPointsSrc from '~/assets/eigen-points.svg'
import primePointsSrc from '~/assets/prime-points.svg'

// import { ConnectButton } from './ConnectButton'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { DocsLink } from './DocsLink'
import { Tabs } from '~/components/Tabs'
import { ArrowUpRight } from '~/components/Icons'

import { useLocation } from 'react-router-dom'
import { useUserStats } from '~/utils/useUserStats'
import { formatEth, formatPoints } from '~/utils/bigint'

export const TopNav = () => {
  return (
    <div className="bg-transparent" style={{ position: "fixed", width: "100%" }}>
      <div className="max-w-[1440px] mx-auto w-full flex justify-between items-center px-8">
        <div className="flex items-center text-style-sub p-[8px]">
          <Link to="/">
            <img src={MobileLogo} alt="logo" className="w-[65px]" />
          </Link>
        </div>
        <div className="flex items-center ml-auto">
          <DesktopMenu />
        </div>
        <MobileMenu />
      </div>
    </div>
  )
}

const DesktopMenu = () => {
  const baseClass = 'text-sm font-medium'
  const activeClass = `${baseClass} text-black`
  const inactiveClass = `${baseClass} text-gray-500 hover:text-black`
  // const { assetBalance, lrtPointRecipientStats, isLoading } = useUserStats()
  return (
    <>
      <div className="hidden md:flex justify-between items-center text-lg gap-8 text-[#ffffff]">
        {/* Menu */}
        <div className="hidden md:flex gap-8 mx-4">
          {/* <Link className="hover:text-white" to="/pools">
            Pools
          </Link> */}
          {/* <Link className="hover:text-white" to="/mypools">
            My Pools
          </Link> */}
          {/* <Link className="hover:text-white" to="/wheel">
            WTF Spin Wheel
          </Link>
          <Link className="hover:text-white" to="/coinflips">
            What The FLIP Coin Toss
          </Link>
          <Link className="hover:text-white" to="/jackpot">
            Innit2Winnit
          </Link>
          <Link className="hover:text-white" to="/moons">
            Moon or Doom
          </Link> */}
        </div>
      </div>
      <div className="hidden md:flex items-center justify-between gap-8 rounded-full overflow-hidden">
        <ConnectButton showBalance={false} />
      </div>
    </>
  )
}

const MobileMenu = () => {
  const [showMenu, setShowMenu] = useState(false)

  const { pathname } = useLocation()

  useEffect(() => {
    setShowMenu(false)
  }, [pathname])

  useEffect(() => {
    document
      .querySelector('body')
      ?.setAttribute('style', showMenu ? 'overflow: hidden' : '')
    document
      .querySelector('[data-rk]')
      ?.setAttribute('style', showMenu ? 'overflow: hidden' : '')
  }, [showMenu])

  return (
    <div className="md:hidden ml-auto flex flex-row gap-2">
      <ConnectButton />
      {/* <button
        type="button"
        className="btn-secondary px-1.5 py-1.5 text-sm flex justify-center items-center gap-2 font-medium self-stretch text-gray-500 w-[44px]"
        onClick={(e) => {
          e.preventDefault()
          setShowMenu(!showMenu)
        }}
      >
        <img src={MenuIcon} width={20} />
      </button>

      <div
        className={`${showMenu ? 'opacity-90 z-50' : 'z-[-1] opacity-0'
          } z-50 transition-opacity ease-in duration-300 delay-100 fixed top-0 bottom-0 left-0 right-0 cursor-pointer bg-indigo-500`}
        onClick={() => setShowMenu(false)}
      />
      <div
        className={`${showMenu ? 'left-0' : 'left-[-100%]'
          } ease-in z-50 duration-300 delay-100 absolute w-[300px] top-0 left-0 bottom-0 flex flex-col px-4 py-4 bg-indigo-950 text-sky-400/100`}
        style={{
          transitionProperty: 'left',
        }}
      >
        <Link to="/" className="mb-8 hover:text-sky-400/100">
          <img src={MobileLogo} alt="logo" className="w-[175px]" />
        </Link>
        <Tabs
          tabs={[
            { label: 'Home', href: '/' },
            { label: 'Pools', href: '/pools' },
            { label: 'My Pools', href: '/mypools' },
            { label: 'WTF Spin Wheel', href: '/wheel' },
            { label: 'What The FLIP Coin Toss', href: '/coinflips' },
            { label: 'Innit2Winnit', href: '/jackpot' },
            { label: 'Moon or Doom', href: '/moons' },
          ]}
        />
      </div> */}
    </div>
  )
}
