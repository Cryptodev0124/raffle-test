/* eslint-disable @next/next/no-img-element */
import moment from "moment";
import { useEffect, useState } from "react";
// import { base58ToGradient } from "../../utils/util";
// import { Downarrow, UserIcon } from "../Svglist";
import { API_URL } from "../../config";
import { UserType } from "../../utils/type";
export default function ChatItem(props: {
  users: UserType[] | undefined;
  name: string;
  time: number;
  message: string;
}) {
  const [open, setOpen] = useState(false);

  const user = props.users ? props.users.find(user => user.user_address === props.name) : undefined
  const user_name = user ? user.user_name ? user.user_name : props.name.slice(0, 3) + "..." + props.name.slice(-3) : props.name.slice(0, 3) + "..." + props.name.slice(-3);
  const user_avatar = user ? user.avatar ? user.avatar : '/app/assets/mobile-logo.png' : '/app/assets/mobile-logo.png';

  return (
    <div className="flex flex-col mb-2 py-2 gap-1 px-6 rounded-[4px] yolo-stats border-[0.5px] border-[#ffffff10] w-[300px]">
      <div className={`flex flex-row items-center justify-between`}>
        <div className="flex items-center">
          <img src={user_avatar} className="w-[24px] h-[24px]" />
          <div className="flex flex-col ml-2">
            <p
              className={`text-[14px] font-semibold text-white`}
            >
              {user_name}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-[14px] text-[#FFFFFFA8] ">
            {moment(props.time).fromNow()}
          </p>
          {props?.message?.length > 30 && (
            <button className="mt-2" onClick={() => setOpen(!open)}>
              {/* <Downarrow className={`w-3 h-3 ${open ? "rotate-180" : ""}`} /> */}
            </button>
          )}
        </div>
      </div>
      <div
        className={`rounded-b-lg ${!open ? "max-h-8 overflow-hidden" : ""
          }`}
      >
        <p className="text-[14px] text-[#8B8A8D]">{props.message}</p>
      </div>
    </div>
  );
}
