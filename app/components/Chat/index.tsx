/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import axios from 'axios'
import { useEffect, useState } from 'react'
import { API_URL } from '../../config'
import { useSocket } from '../../context/SocketContext'
import ChatItem from './ChatItem'
import { errorAlert } from '../ToastGroup'

const wallet_address = 'Player1'

export default function Chat(props: { className: string }) {
  const { messages, onlined } = useSocket()
  const [message, setMessage] = useState('')
  const { users } = useSocket()

  const handleMessage = (value: string) => {
    setMessage(value)
  }

  const handleKeyDown = (event: { keyCode: number }) => {
    if (event.keyCode === 13) {
      console.log('message =>', message)
      handleSubmit()
    }
  }
  const handleSubmit = async () => {
    if (wallet_address === null) {
      errorAlert('Please connect wallet.')
    }
    if (wallet_address === null || message === '') return
    try {
      await axios.post(`${API_URL}writeMessage/`, {
        user: wallet_address,
        msg: message,
      })
      setMessage('')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={props.className}>
      <div className="flex flex-row gap-4">
        <button className="bg-[#17161B00] p-3">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_45_733)">
              <path
                d="M2 0C1.46957 0 0.960859 0.210714 0.585786 0.585786C0.210714 0.960859 0 1.46957 0 2L0 14.793C2.10149e-05 14.8919 0.0293926 14.9886 0.0843973 15.0709C0.139402 15.1531 0.217567 15.2172 0.308999 15.255C0.400432 15.2928 0.501021 15.3026 0.598036 15.2832C0.695051 15.2638 0.784131 15.216 0.854 15.146L3.707 12.293C3.89449 12.1055 4.14881 12.0001 4.414 12H14C14.5304 12 15.0391 11.7893 15.4142 11.4142C15.7893 11.0391 16 10.5304 16 10V2C16 1.46957 15.7893 0.960859 15.4142 0.585786C15.0391 0.210714 14.5304 0 14 0L2 0Z"
                fill="#868587"
              />
            </g>
            <defs>
              <clipPath id="clip0_45_733">
                <rect width="16" height="16" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </button>
        <p className="text-[20px] text-white font-[600] pb-3 mt-3">
          {onlined} Online
        </p>
      </div>
      <div className="rounded-[5px] flex flex-col p-2 gap-3">
        <div className="h-[320px] overflow-auto scrollbar mt-2 flex flex-col-reverse">
          {messages &&
            messages.length !== 0 &&
            messages.map((item, key) => (
              <ChatItem
                users={users}
                name={item.user_name}
                time={item.timestamp}
                message={item.message}
                key={key}
              />
            ))}
        </div>
        <div className="w-full flex flex-row px-4 border-[0.5px] border-[#FFFFFF10] yolo-stats rounded-[4px]">
          <input
            type="text"
            className="w-full bg-transparent text-[14px] text-white-100 py-3 px-3 focus:outline-none"
            value={message}
            onChange={(e: any) => handleMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={wallet_address == null}
            placeholder="Type Message Here..."
          />
          <div className="flex flex-row items-center justify-between">
            <button
              className="items-center text-center px-3"
              onClick={() => handleSubmit()}
              disabled={wallet_address == null}
            >
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.69761 4.49683L0.750863 0.0528648C0.660773 0.00811985 0.560505 -0.00873242 0.461704 0.00426501C0.362903 0.0172625 0.269621 0.0595763 0.192692 0.126293C0.115763 0.19301 0.0583418 0.281392 0.0270972 0.381176C-0.00414747 0.48096 -0.00793397 0.588053 0.0161775 0.690018L0.654028 3.38361L4.7369 4.99955L0.654028 6.61549L0.0161775 9.30908C-0.00838764 9.41112 -0.00491716 9.51844 0.026183 9.61847C0.0572831 9.7185 0.114727 9.80712 0.191795 9.87396C0.268863 9.9408 0.362369 9.98309 0.461374 9.99589C0.56038 10.0087 0.660791 9.99147 0.750863 9.94624L9.69761 5.50227C9.78802 5.45741 9.86447 5.38632 9.91801 5.29729C9.97156 5.20827 10 5.105 10 4.99955C10 4.8941 9.97156 4.79083 9.91801 4.70181C9.86447 4.61278 9.78802 4.54169 9.69761 4.49683Z"
                  fill="#F7B831"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
