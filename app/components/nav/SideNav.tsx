import { useState, useEffect } from 'react'
import alarmSrc from '~/assets/alarm.svg'
import whaleSrc from '~/assets/whale.svg'
import oethSrc from '~/assets/oeth.svg'
import ethSrc from '~/assets/ETH.svg'
import friendsSrc from '~/assets/friends.svg'
import { Tooltip } from '~/components/Tooltip'
import invite_background from '~/assets/invite-background.jpg'
import referral_program from '~/assets/referral_program.png'
import referral_program_mobile from '~/assets/referral_program_mobile.png'
import { CopyReferrerLink } from '~/components/CopyReferrerLink'

const boxClass = `border border-gray-border rounded-3xl px-4 pt-6 pb-4 flex flex-col items-center justify-center w-full overflow-hidden`
const descriptionClass = `text-white font-bold text-sm mt-2 leading-relaxed drop-shadow-md bg-[#00000077] rounded-xl p-2 px-4 mx-0 sm:mx-16`

export const SideNav = () => {
  const useMediaQuery = (query: any) => {
    const [matches, setMatches] = useState(false)

    useEffect(() => {
      const mediaQuery = window.matchMedia(query)

      setMatches(mediaQuery.matches)

      const listener = (event: any) => {
        setMatches(event.matches)
      }

      mediaQuery.addEventListener('change', listener)

      return () => {
        mediaQuery.removeEventListener('change', listener)
      }
    }, [query])

    return matches
  }

  const smallViewport = useMediaQuery('(max-width: 640px)')

  return (
    <div>
      <style>
        {`
          .glow-referral {
            font-size: 28px;
            color: #fff;
            text-align: center;
            animation: glow-referral 1.25s ease-in-out infinite alternate;
          }

          @-webkit-keyframes glow-referral {
            from {
              text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #00e673, 0 0 40px #00e673, 0 0 50px #e67300, 0 0 60px #00e673, 0 0 70px #00e673;
            }
            
            to {
              text-shadow: 0 0 20px #fff, 0 0 30px #ff4da6, 0 0 40px #4dffa6, 0 0 50px #4dffa6, 0 0 60px #4dffa6, 0 0 70px #4dffa6, 0 0 80px #4dffa6;
            }
          }
      `}
      </style>
      {/* <div
        style={{
          position: 'relative',
          boxShadow: '0 2px 8px 0 rgba(63,69,81,0.16)',
          marginTop: '1.6em',
          marginBottom: '0.9em',
          overflow: 'hidden',
          borderRadius: '8px',
          willChange: 'transform',
          textWrap: "nowrap",
        }}
      >
        {smallViewport ? (
          <img src={referral_program_mobile} />
        ) : (
          <img src={referral_program} />
        )}
        <div
          className="mt-4 pb-2"
          style={{
            position: 'absolute',
            bottom: smallViewport ? '-1%' : '2%',
            right: smallViewport ? '8%' : '15%',
            transform: smallViewport ? 'scale(0.75)' : 'scale(1.0)',
          }}
        >
          <CopyReferrerLink />
        </div>
      </div> */}
      <div
        className={boxClass}
        style={{
          backgroundImage: `url(${invite_background})`,
          backgroundSize: 'cover',
        }}
      >
        <div className="text-md font-extrabold uppercase mb-8 text-white drop-shadow-[0_3px_#0007] glow-referral">
          SHARE & EARN WTF POINTS
        </div>
        <div className={descriptionClass}>
          <div className="w-full px-0 sm:px-16">
            <div className="text-xl font-bold text-center mb-2 mt-0 flex flex-col">
              <img src={friendsSrc} alt="friends" width="32px" className='mx-auto' />
              Generate Unique Link
            </div>
            <ul className="list-disc ml-6">
              <li>
                Connect your crypto wallet to generate a unique referral link.
              </li>
              <li>
                Copy and share your unique referral link and you will
                automatically earn a 20% referral fee in WTF Points for any
                purchase of our Live Raffles going through your unique link.
              </li>
              <div className="text-md font-bold text-center mb-2 mt-4 pr-4">
                The more you refer the more you earn!
              </div>
            </ul>
          </div>
        </div>
        <div className="mt-10 mb-4 pb-2">
          <CopyReferrerLink />
        </div>
      </div>
      {/* <div className={boxClass}>
        <img src={alarmSrc} alt="alarm" />
        <div className="font-medium leading-relaxed">Be early!</div>
        <div className={descriptionClass}>
          Early depositers will earn an XP multiplier on their deposit
        </div>
        <div className="text-gray-500 mt-2">
          <Tooltip size={16} placement="right">
            <MultiplierTooltip />
          </Tooltip>
        </div>
      </div>
      <div className={boxClass}>
        <img src={whaleSrc} alt="whale" />
        <div className="font-medium leading-relaxed">Go BIG!</div>
        <div className={descriptionClass}>
          Earn an XP multiplier for larger deposits for the duration of the
          campaign
        </div>
        <div className="text-gray-500 mt-2">
          <Tooltip size={16} placement="right">
            <WhaleTooltip />
          </Tooltip>
        </div>
      </div>
      <div className={boxClass}>
        <img src={oethSrc} alt="oeth" className="w-[40px] h-[40px]" />
        <div className="text-sm text-gray-500 text-center mt-4 leading-relaxed">
          Deposit with OETH and earn
        </div>
        <div className="font-medium leading-relaxed">2X REWARDS*</div>
        <div className="text-gray-500 mt-2">
          <Tooltip
            size={16}
            className="p-2 text-xs text-balance text-center text-gray-500"
          >
            2x bonus applies only to primeETH minted with OETH and held in the
            same wallet
          </Tooltip>
        </div>
      </div> */}
    </div>
  )
}

const MultiplierTooltip = () => {
  const boxSize = 'h-6'
  const boxClass = `${boxSize} bg-blue-500`
  return (
    <div>
      <div className="text-xs text-gray-500 text-center mb-3">
        Bonus multiplier
      </div>
      <div className="inline-block">
        <div className="grid grid-cols-5 gap-x-2 gap-y-1">
          <div className="font-medium text-gray-500 text-center">5x</div>
          <div className="font-medium text-gray-500 text-center">4x</div>
          <div className="font-medium text-gray-500 text-center">3x</div>
          <div className="font-medium text-gray-500 text-center">2x</div>
          <div className="font-medium text-gray-500 text-center">1x</div>
          <div className={boxClass} />
          <div className={boxSize} />
          <div className={boxSize} />
          <div className={boxSize} />
          <div className={boxSize} />
          <div className={boxClass} />
          <div className={boxClass} />
          <div className={boxSize} />
          <div className={boxSize} />
          <div className={boxSize} />
          <div className={boxClass} />
          <div className={boxClass} />
          <div className={boxClass} />
          <div className={boxSize} />
          <div className={boxSize} />
          <div className={boxClass} />
          <div className={boxClass} />
          <div className={boxClass} />
          <div className={boxClass} />
          <div className={boxSize} />
          <div className={boxClass} />
          <div className={boxClass} />
          <div className={boxClass} />
          <div className={boxClass} />
          <div className={boxClass} />
          <div className="text-xs text-gray-500 text-center">Day 1</div>
          <div className="text-xs text-gray-500 text-center">Day 2</div>
          <div className="text-xs text-gray-500 text-center">Day 3</div>
          <div className="text-xs text-gray-500 text-center">Day 4</div>
          <div className="text-xs text-gray-500 text-center">Day 5</div>
        </div>
        <div className="text-xs text-gray-500 text-center mt-3">
          Deposit day
        </div>
      </div>
    </div>
  )
}

const WhaleTooltip = () => {
  const boxSize = 'h-6'
  // const boxClass = `${boxSize} bg-blue-500`
  return (
    <div>
      <div className="text-xs text-gray-500 text-center mb-3">
        Bonus multiplier
      </div>
      <div className="inline-block">
        <div className="grid grid-cols-4 gap-x-2 gap-y-1">
          <div className="font-medium text-gray-500 text-center pb-1">
            1.05x
          </div>
          <div className="font-medium text-gray-500 text-center pb-1">1.1x</div>
          <div className="font-medium text-gray-500 text-center pb-1">
            1.15x
          </div>
          <div className="font-medium text-gray-500 text-center pb-1">1.2x</div>
          <div className={boxSize} />
          <div className={boxSize} />
          <div className={boxSize} />
          <EthBox />

          <div className={boxSize} />
          <div className={boxSize} />
          <EthBox />
          <EthBox />

          <div className={boxSize} />
          <EthBox />
          <EthBox />
          <EthBox />

          <EthBox />
          <EthBox />
          <EthBox />
          <EthBox />
          <div className="text-xs text-gray-500 text-center">10-100</div>
          <div className="text-xs text-gray-500 text-center">100-1K</div>
          <div className="text-xs text-gray-500 text-center">1K-2K</div>
          <div className="text-xs text-gray-500 text-center">2K+</div>
        </div>
        <div className="text-xs text-gray-500 text-center mt-3">ETH amount</div>
      </div>
    </div>
  )
}

const EthBox = () => (
  <div className="flex justify-center">
    <img src={ethSrc} alt="ETH" className="w-8 h-8" />
  </div>
)
