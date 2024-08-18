import { Outlet } from '@remix-run/react'
import { Toggle } from '~/components/Toggle'

export default function Index() {
  return (
    <>
      <div className="border border-gray-border rounded-3xl bg-gray-bg1 w-full max-w-[540px]">
        <div className="p-4 border-b border-gray-border flex justify-center">
          <Toggle
            tabs={[
              { label: 'Stake', href: '/pools' },
              { label: 'Unstake', href: '/pools/unstake' },
              { label: 'Withdraw', href: '/pools/withdraw' },
            ]}
          />
        </div>
        <Outlet />
      </div>
    </>
  )
}
