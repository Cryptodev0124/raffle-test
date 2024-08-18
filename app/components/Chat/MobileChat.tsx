/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../../config";
import { useSocket } from "../../context/SocketContext";
// import { RightSvg } from "../Svglist";
import ChatItem from "./ChatItem";
import { useAccount } from "wagmi";
// import Sound from "react-sound";

export default function MobileChat(props: {
  opened: boolean;
  setOpen: Function;
}) {
  const { isConnected, address } = useAccount()
  const [message, setMessage] = useState("");
  const { messages, onlined, users } = useSocket();
  const { opened, setOpen } = props;
  const handleMessage = (value: string) => {
    setMessage(value);
  };

  const handleKeyDown = (event: { keyCode: number }) => {
    if (event.keyCode === 13) {
      console.log("message =>", message);
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    if (address) return;
    try {
      await axios.post(`${API_URL}writeMessage/`, {
        user: address,
        msg: message,
      });
      setMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <> 
    
    {opened && <div
      className={`opacity-70 z-50 transition-opacity ease-in duration-300 delay-100 mt-[80px] fixed top-0 bottom-0 left-0 right-0 cursor-pointer bg-[#17161B]`}
      onClick={() => setOpen(false)}
    />}
    <div
      className={`fixed z-50 mt-[80px] w-[300px] flex-col pt-4 flex border-t border-[#2E2D31] transition-transform duration-300 left-0 top-0 h-[100vh] xl:hidden ${
        !opened ? "translate-x-[-320px]" : "translate-x-0"
      } bg-[#17161B]`}
    >
      <p className="text-[12px] text-[#F7B831] font-[600] pb-3 mt-3 text-center">
        {onlined} Online
      </p>
      <div className="px-2 flex flex-col bg-[#17161B] gap-3 pb-3 border-b border-[#2E2D31]">        
        <div className="h-[calc(100vh-320px)] overflow-auto scrollbar mt-2 flex flex-col-reverse">
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
        <div className="w-full flex flex-row px-4 border-[0.5px] border-[#FFFFFF10] bg-[#28272B] rounded-[4px]">
          <input
            type="text"
            className="w-full bg-transparent text-[14px] text-white-100 py-3 px-3 focus:outline-none"
            value={message}
            onChange={(e: any) => handleMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={address === null}
            placeholder="Type Message Here..."
          />
          <div className="flex flex-row items-center justify-between">
            <button
              className="items-center text-center px-3"
              onClick={() => handleSubmit()}
              disabled={address === null}
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.69761 4.49683L0.750863 0.0528648C0.660773 0.00811985 0.560505 -0.00873242 0.461704 0.00426501C0.362903 0.0172625 0.269621 0.0595763 0.192692 0.126293C0.115763 0.19301 0.0583418 0.281392 0.0270972 0.381176C-0.00414747 0.48096 -0.00793397 0.588053 0.0161775 0.690018L0.654028 3.38361L4.7369 4.99955L0.654028 6.61549L0.0161775 9.30908C-0.00838764 9.41112 -0.00491716 9.51844 0.026183 9.61847C0.0572831 9.7185 0.114727 9.80712 0.191795 9.87396C0.268863 9.9408 0.362369 9.98309 0.461374 9.99589C0.56038 10.0087 0.660791 9.99147 0.750863 9.94624L9.69761 5.50227C9.78802 5.45741 9.86447 5.38632 9.91801 5.29729C9.97156 5.20827 10 5.105 10 4.99955C10 4.8941 9.97156 4.79083 9.91801 4.70181C9.86447 4.61278 9.78802 4.54169 9.69761 4.49683Z" fill="#F7B831"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="px-3 py-3 flex flex-row items-center justify-between gap-2">
        <img src="/img/solana.png" className="w-[59px] h-[59px]" />
        <div className="flex flex-col gap-2">
          <button className="px-[35px] py-[8px] bg-[#28272B] h-[36px] rounded-[4px] w-full text-[#8B8A8D] text-[10px]">
            SOL Token GIVEWAY <span className="text-[#F7B831] font-[600]">$50.00</span>
          </button>
          <button className="px-[35px] py-[8px] bg-[#F7B831] h-[36px] rounded-[4px] w-full text-[12px] text-[#0D0C0F]">
            <span className="font-[600]">Enter Ends in</span> 5:09:54
          </button>
        </div>
      </div>
    </div>
    </>
  );
}
