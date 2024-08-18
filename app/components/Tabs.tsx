import { Link, useLocation } from 'react-router-dom'

interface TabsProps {
  tabs: {
    label: string
    href: string
    blank?: boolean
  }[]
  className?: string
}

export const Tabs = (props: TabsProps) => {
  const location = useLocation()
  const activeTab = props.tabs.findIndex((tab) =>
    location.pathname === tab.href,
  )

  const base = 'px-4 py-3 border-l-[3px]'
  const active = `${base} border-yellow-500 bg-white-100 font-bold`
  const inactive = `${base} border-transparent hover:bg-white-100/30 hover:border-yellow-500/30`
  return (
    <div className="md:w-[175px] lg:w-[300px] flex flex-col gap-2 pr-8 text-white">
      {props.tabs.map((tab, idx) => (
        <Link
          key={idx}
          to={tab.href}
          className={activeTab === idx ? active : inactive}
          target={tab.blank ? '_blank' : '_parent'}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  )
}
