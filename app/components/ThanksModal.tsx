import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { format } from 'date-fns'
import { Close } from './Icons'
import ThanksLogo from '~/assets/thanks.png'
import burst from '~/assets/burst.png'

export function ThanksModal({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}) {
  const [thanksAccepted, setThanksAccepted] = useState('false')

  useEffect(() => {
    const dateToNumber = (dateString: string): number => {
      const date = new Date(dateString)
      const time = date.getTime()
      return Math.round(time / 86400000)
    }

    const currentDate = format(new Date(), 'yyyy-MM-dd')
    const currentDateNumber = dateToNumber(currentDate)
    const cookieDate = localStorage.getItem('cookieThanksSetDate')
    const cookieDateNumber = cookieDate ? dateToNumber(cookieDate) : null

    const thanksAcceptedStorage = localStorage.getItem('thanksAccepted')
    if (thanksAcceptedStorage === 'true') {
      setThanksAccepted('true')
    }

    if (
      cookieDate === null ||
      (cookieDateNumber && currentDateNumber - cookieDateNumber >= 1)
    ) {
      setThanksAccepted('false')
    }
  }, [])

  const handleAgree = () => {
    setThanksAccepted('true')
  }

  const handleSubmit = () => {
    localStorage.setItem('thanksAccepted', thanksAccepted.toString())
    localStorage.setItem(
      'cookieThanksSetDate',
      format(new Date(), 'yyyy-MM-dd'),
    )
    setIsOpen(false)
  }

  return (
    // Use the `Transition` component at the root level
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => {}} static>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25 backdrop-grayscale" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto text-white">
          <style>
            {`
              .play-button {
                background-image: linear-gradient(to right, #FFFF34, #FFDD5E, #EBA054);
              }
              .animate-spin-slow {
                width: 640px !important;
                height: 640px !important;
                z-index: -1;
                animation-timeline: auto !important;
                animation-range-start: normal !important;
                animation-range-end: normal !important;
                animation: 15s linear 0s infinite normal none running spin !important;
              }
           `}
          </style>
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-xl transform overflow-hidden bg-[#25224f] rounded-2xl py-24 px-4 text-left align-middle shadow-xl transition-all relative">
                <div className="flex flex-col gap-8 items-center">
                  <Dialog.Title
                    as="h1"
                    className="text-2xl font-extrabold -mt-12 text-white text-center"
                  >
                    Thanks for playing
                  </Dialog.Title>
                  <img
                    className="animate-spin-slow absolute top-[-100px] left-0"
                    src={burst}
                    alt=""
                  />
                  <img
                    className="w-[192px] h-auto z-1 -ml-0"
                    src={ThanksLogo}
                    alt=""
                  />
                  <div className="w-full flex flex-col p-2 items-center max-w-7xl md:rounded-3xl bg-[#161432] py-3 z-1">
                    <div className="text-md font-extrabold mb-4 text-white">
                      If you live in an area where online lottery, raffles, or
                      gambling are prohibited, please refrain from participating
                      in our DApp's raffle events without ensuring you meet the
                      legal gambling age requirements and familiarize yourself
                      with your local laws and regulations.
                    </div>
                    <div className="text-md font-extrabold mb-4 text-white">
                      Additionally, be aware that blockchain, staking, and smart
                      contract transactions carry significant risks, and losses
                      are possible and common.
                    </div>
                    <div className="text-md font-extrabold mb-4 text-white">
                      Please acknowledge and understand these risks before
                      participating.
                    </div>
                    <div className="text-sm font-extrabold mb-4 text-white pr-16">
                      ALL RAFFLE ENTRIES ARE FINAL!
                    </div>
                    <div className="text-md font-extrabold mb-4 text-white">
                      For further details, please review our Terms and
                      Conditions
                    </div>
                  </div>
                  <div className="checkbox flex flex-row w-full md:w-9/12">
                    <label className="checkbox-container pr-2">
                      <input type="checkbox" onChange={handleAgree} />
                    </label>
                    <div className="border-l py-2 px-4">
                      Don't show until tomorrow.
                    </div>
                  </div>
                  <button
                    className="flex flex-row gap-3 items-center text-black play-button disabled:!bg-gray-500 h-14 hover:scale-103 rounded-full relative outline outline-2 outline-offset-[6px] outline-yellow-300 hover:scale-105 disabled:opacity-60 px-8 py-4 text-lg -mb-8"
                    onClick={handleSubmit}
                  >
                    Continue
                    <svg
                      width="19"
                      height="16"
                      viewBox="0 0 19 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18.4177 8.70711C18.8083 8.31658 18.8083 7.68342 18.4177 7.29289L12.0538 0.928932C11.6633 0.538408 11.0301 0.538408 10.6396 0.928932C10.249 1.31946 10.249 1.95262 10.6396 2.34315L16.2964 8L10.6396 13.6569C10.249 14.0474 10.249 14.6805 10.6396 15.0711C11.0301 15.4616 11.6633 15.4616 12.0538 15.0711L18.4177 8.70711ZM0.552948 9H17.7106V7L0.552948 7V9Z"
                        fill="black"
                      />
                    </svg>
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
