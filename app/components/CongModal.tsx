import { Fragment, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'

import { Close } from './Icons'
import usdt from '~/assets/usdt.svg'

export function CongModal({
  isOpen,
  setIsOpen,
  poolSize,
  poolName
}: {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  poolSize: number | undefined
  poolName: string | undefined
}) {
  const shareText = `I just won ${poolSize?.toLocaleString('en-US')} ETH in the ${poolName} pool! @whatsthisfor_wtf`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
  const instagramShareUrl = `https://www.instagram.com/?url=${encodeURIComponent(window.location.href)}`;

  return (
    // Use the `Transition` component at the root level
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setIsOpen(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
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
              <Dialog.Panel className="w-full max-w-sm transform overflow-hidden rounded-2xl bg-modal-gradient pt-24 pb-12 px-8 text-left align-middle shadow-xl transition-all">
                <button
                  className="absolute top-4 right-6 text-grey-500 hover:text-black"
                  onClick={() => setIsOpen(false)}
                >
                  <Close />
                </button>
                <div className="flex flex-col gap-8 items-center">
                  <svg width="107" height="104" viewBox="0 0 107 104" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M83.875 89.375H76.25V103.125H83.875V89.375Z" fill="#F7FEFF"/>
                    <path d="M68.625 96.25H38.125V89.375H30.5V103.125H76.25V89.375H68.625V96.25Z" fill="#231E2B"/>
                    <path d="M68.625 89.375H61V96.25H68.625V89.375Z" fill="#F5F38E"/>
                    <path d="M61.375 89H45.375V96H61.375V89Z" fill="#E2B436"/>
                    <path d="M45.75 89.375H38.125V96.25H45.75V89.375Z" fill="#F5F38E"/>
                    <path d="M30.5 89.375H22.875V103.125H30.5V89.375Z" fill="#F7FEFF"/>
                    <path d="M38.125 68.75H30.5V89.375H38.125V68.75Z" fill="#F7FEFF"/>
                    <path d="M53.375 82H45.375V89H61.375V75H53.375V82Z" fill="#F5F38E"/>
                    <path d="M53.375 75.625H45.75V82.5H53.375V75.625Z" fill="#E2B436"/>
                    <path d="M76.25 68.75H68.625V89.375H76.25V68.75Z" fill="#F7FEFF"/>
                    <path d="M38.125 89.375H45.75V61.875H30.5V68.75H38.125V89.375Z" fill="#231E2B"/>
                    <path d="M91.5 61.875H76.25V68.75H91.5V61.875Z" fill="#F7FEFF"/>
                    <path d="M61 61.875V89.375H68.625V68.75H76.25V61.875H61Z" fill="#231E2B"/>
                    <path d="M60.625 62H45.375V75.75H60.625V62Z" fill="#CF8934"/>
                    <path d="M30.5 61.875H15.25V68.75H30.5V61.875Z" fill="#F7FEFF"/>
                    <path d="M99.125 55H91.5V61.875H99.125V55Z" fill="#F7FEFF"/>
                    <path d="M91.5 55H76.25V61.875H91.5V55Z" fill="#231E2B"/>
                    <path d="M76.25 55H68.625V61.875H76.25V55Z" fill="#CF8934"/>
                    <path d="M60.875 55.1667V48.3333H68.375V21H23.375V48.3333H30.875V55.1667H38.375V62H68.375V55.1667H60.875Z" fill="#E2B436"/>
                    <path d="M38.125 55H30.5V61.875H38.125V55Z" fill="#CF8934"/>
                    <path d="M30.5 55H15.25V61.875H30.5V55Z" fill="#231E2B"/>
                    <path d="M15.25 55H7.625V61.875H15.25V55Z" fill="#F7FEFF"/>
                    <path d="M106.75 48.125H99.125V55H106.75V48.125Z" fill="#F7FEFF"/>
                    <path d="M99.125 48.125H91.5V55H99.125V48.125Z" fill="#231E2B"/>
                    <path d="M91.5 48.125H76.25V55H91.5V48.125Z" fill="#CF8934"/>
                    <path d="M76.25 48.125H68.625V55H76.25V48.125Z" fill="#E2B436"/>
                    <path d="M68.625 48.125H61V55H68.625V48.125Z" fill="#F5F38E"/>
                    <path d="M30.5 48.125H15.25V55H30.5V48.125Z" fill="#CF8934"/>
                    <path d="M15.25 48.125H7.625V55H15.25V48.125Z" fill="#231E2B"/>
                    <path d="M7.625 48.125H0V55H7.625V48.125Z" fill="#F7FEFF"/>
                    <path d="M99.125 41.25H91.5V48.125H99.125V41.25Z" fill="#CF8934"/>
                    <path d="M22.875 27.5H15.25V48.125H22.875V27.5Z" fill="#231E2B"/>
                    <path d="M15.25 41.25H7.625V48.125H15.25V41.25Z" fill="#CF8934"/>
                    <path d="M7.625 20.625H0V48.125H7.625V20.625Z" fill="#231E2B"/>
                    <path d="M106.75 20.625H99.125V48.125H106.75V20.625Z" fill="#231E2B"/>
                    <path d="M91.5 27.5H83.875V48.125H91.5V27.5Z" fill="#231E2B"/>
                    <path d="M15.375 27H7.375V41H15.375V27Z" fill="#E2B436"/>
                    <path d="M99.375 27H91.375V41H99.375V27Z" fill="#E2B436"/>
                    <path d="M99.125 20.625H91.5V27.5H99.125V20.625Z" fill="#F5F38E"/>
                    <path d="M91.5 20.625H83.875V27.5H91.5V20.625Z" fill="#CF8934"/>
                    <path d="M83.875 20.625H76.25V48.125H83.875V20.625Z" fill="#E2B436"/>
                    <path d="M22.875 20.625H15.25V27.5H22.875V20.625Z" fill="#CF8934"/>
                    <path d="M15.25 20.625H7.625V27.5H15.25V20.625Z" fill="#F5F38E"/>
                    <path d="M106.75 13.75H99.125V20.625H106.75V13.75Z" fill="#F7FEFF"/>
                    <path d="M99.125 13.75H83.875V20.625H99.125V13.75Z" fill="#231E2B"/>
                    <path d="M68.375 20.8V48H75.875V20.8H83.375V14H23.375V20.8H68.375Z" fill="#F5F38E"/>
                    <path d="M22.875 13.75H7.625V20.625H22.875V13.75Z" fill="#231E2B"/>
                    <path d="M7.625 13.75H0V20.625H7.625V13.75Z" fill="#F7FEFF"/>
                    <path d="M99.125 6.875H83.875V13.75H99.125V6.875Z" fill="#F7FEFF"/>
                    <path d="M83.875 6.875H22.875V13.75H83.875V6.875Z" fill="#231E2B"/>
                    <path d="M22.875 6.875H7.625V13.75H22.875V6.875Z" fill="#F7FEFF"/>
                    <path d="M83.875 0H22.875V6.875H83.875V0Z" fill="#F7FEFF"/>
                  </svg>
                  <div className='text-center text-3xl font-extrabold text-white uppercase'>You have won {poolName}!</div>     
                  <div className='bg-[#A39C9C] rounded-full px-5 py-2 flex flex-row gap-4'>
                    <img src={usdt} className='w-[40px]' />
                    <span className='text-4xl text-white font-extrabold'>{poolSize && poolSize.toLocaleString('en-US')}</span>
                  </div>
                  <div className="ml-4 flex gap-4 justify-center">
                    <a
                      href={twitterShareUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white px-4 py-2 hover:opacity-90"
                    >
                      <svg width="80" height="80" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M32.1864 11.3967C35.0049 20.0614 30.2655 29.3677 21.6015 32.1864C12.9376 35.005 3.63202 30.2653 0.813578 21.6006C-2.00486 12.936 2.73452 3.62963 11.3985 0.810963C13.0478 0.275573 14.7719 0 16.5039 0C23.6484 0.00393669 29.9781 4.60199 32.1864 11.3967ZM16.5079 1.48807C8.21788 1.49988 1.50637 8.22768 1.51818 16.5223C1.52999 24.8169 8.25724 31.525 16.5512 31.5132C24.8412 31.5014 31.5527 24.7736 31.5409 16.479C31.5369 14.9082 31.2889 13.3493 30.8048 11.8573C28.7893 5.6649 23.0147 1.47626 16.5079 1.48807Z" fill="black"/>
                        <path d="M7.45427 7.992L14.4728 17.3771L7.41096 25.0103H9.00126L15.1853 18.3298L20.1805 25.0103H25.5891L18.173 15.0977L24.7467 7.99594H23.1564L17.4684 14.145L12.8668 7.992H7.45427ZM9.79247 9.1612H12.2763L23.2509 23.8372H20.7671L9.79247 9.1612Z" fill="black"/>
                      </svg>  
                    </a>
                    <a
                      href={instagramShareUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white px-4 py-2 hover:opacity-90"
                    >       
                      <svg width="80" height="80" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.5 0C7.38759 0 0 7.38759 0 16.5C0 25.6124 7.38759 33 16.5 33C25.6124 33 33 25.6124 33 16.5C33 7.38759 25.6124 0 16.5 0ZM16.5 31.7359C8.09248 31.732 1.27983 24.9075 1.28377 16.5C1.28771 8.09248 8.11217 1.27983 16.5197 1.28377C24.9272 1.28771 31.7399 8.11217 31.7359 16.5197C31.7359 18.6698 31.2791 20.7963 30.3931 22.7574C27.9319 28.2233 22.4936 31.7359 16.5 31.7359Z" fill="url(#paint0_linear_347_10)"/>
                        <path d="M21.5721 7.56875H11.4279C9.35263 7.54906 7.65144 9.21087 7.61993 11.2862V21.7257C7.64356 23.8049 9.34869 25.4667 11.424 25.4431H21.5563C23.6356 25.4667 25.3368 23.8049 25.3643 21.7257V11.2862C25.3407 9.21087 23.6434 7.54906 21.5721 7.56875ZM23.8482 21.7257C23.8482 22.9425 22.8637 23.927 21.6508 23.927C21.6233 23.927 21.5996 23.927 21.5721 23.927H11.4279C10.215 23.9703 9.19511 23.0213 9.1518 21.8044C9.1518 21.7769 9.1518 21.7532 9.1518 21.7257V11.2862C9.1518 10.0693 10.1363 9.08486 11.3492 9.08486C11.3767 9.08486 11.4004 9.08486 11.4279 9.08486H21.5603C22.7732 9.04154 23.7931 9.99059 23.8364 11.2074C23.8364 11.235 23.8364 11.2586 23.8364 11.2862L23.8482 21.7257Z" fill="url(#paint1_linear_347_10)"/>
                        <path d="M16.5 11.8572C13.9364 11.8572 11.8571 13.9364 11.8571 16.5C11.8571 19.0636 13.9364 21.1429 16.5 21.1429C19.0636 21.1429 21.1428 19.0636 21.1428 16.5C21.1428 13.9364 19.0636 11.8572 16.5 11.8572ZM16.5 19.5598C14.787 19.5598 13.3969 18.1697 13.3969 16.4567C13.3969 14.7437 14.787 13.3536 16.5 13.3536C18.213 13.3536 19.6031 14.7437 19.6031 16.4567C19.6031 16.4725 19.6031 16.4843 19.6031 16.5C19.5952 18.2091 18.213 19.5952 16.5 19.6031V19.5598Z" fill="url(#paint2_linear_347_10)"/>
                        <path d="M21.4815 12.7156C22.0839 12.7156 22.5723 12.2272 22.5723 11.6248C22.5723 11.0224 22.0839 10.534 21.4815 10.534C20.8791 10.534 20.3907 11.0224 20.3907 11.6248C20.3907 12.2272 20.8791 12.7156 21.4815 12.7156Z" fill="url(#paint3_linear_347_10)"/>
                        <defs>
                        <linearGradient id="paint0_linear_347_10" x1="3.86624" y1="30.8204" x2="29.3118" y2="1.97551" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#ECAE53"/>
                        <stop offset="0.33" stop-color="#E0213F"/>
                        <stop offset="0.65" stop-color="#9B358B"/>
                        <stop offset="1" stop-color="#4A4A9A"/>
                        </linearGradient>
                        <linearGradient id="paint1_linear_347_10" x1="1.7772" y1="33.1867" x2="32.3163" y2="-1.42281" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#ECAE53"/>
                        <stop offset="0.33" stop-color="#E0213F"/>
                        <stop offset="0.65" stop-color="#9B358B"/>
                        <stop offset="1" stop-color="#4A4A9A"/>
                        </linearGradient>
                        <linearGradient id="paint2_linear_347_10" x1="1.77585" y1="33.1855" x2="32.315" y2="-1.42394" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#ECAE53"/>
                        <stop offset="0.33" stop-color="#E0213F"/>
                        <stop offset="0.65" stop-color="#9B358B"/>
                        <stop offset="1" stop-color="#4A4A9A"/>
                        </linearGradient>
                        <linearGradient id="paint3_linear_347_10" x1="2.1687" y1="33.5225" x2="32.6969" y2="-1.08701" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#ECAE53"/>
                        <stop offset="0.33" stop-color="#E0213F"/>
                        <stop offset="0.65" stop-color="#9B358B"/>
                        <stop offset="1" stop-color="#4A4A9A"/>
                        </linearGradient>
                        </defs>
                      </svg>
         
                    </a>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
