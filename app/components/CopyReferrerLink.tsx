import { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { TooltipToast } from './Tooltip'
import { hexToBase62 } from '~/utils/base62'

export const CopyReferrerLink = ({
  className = 'text-white bg-[#00b212] rounded-full py-1 font-bold w-[240px] h-[45px]',
}: {
  className?: string
}) => {
  const { isConnected, address } = useAccount()
  const { openConnectModal } = useConnectModal()
  const [urlOrigin, setUrlOrigin] = useState('')
  useEffect(() => {
    if (typeof window === 'undefined') return
    setUrlOrigin(window.location.origin)
  }, [])

  const referralLink = address
    ? `${urlOrigin}/pools?r=${hexToBase62(address)}`
    : ''

  if (!isConnected) {
    return (
      <button
        className={className}
        onClick={() => openConnectModal?.()}
        style={{
          textShadow: '0px 0px 3px rgba(255, 255, 255, 1)',
          fontSize: '18px',
        }}
      >
        CONNECT WALLET
      </button>
    )
  }

  return (
    <TooltipToast
      text="Link copied!"
      placement="bottom"
      className="p-2 text-xs"
    >
      <button
        className={className}
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(referralLink)
          } catch (err) {
            console.error('Failed to copy text: ', err)
          }
        }}
        style={{
          textShadow: '0px 0px 3px rgba(255, 255, 255, 1)',
          fontSize: '18px',
        }}
      >
        COPY REFERRAL LINK
      </button>
    </TooltipToast>
  )
}
