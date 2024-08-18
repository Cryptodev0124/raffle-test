import React from 'react'
import Chat from '../../components/Chat'

interface BottomActionsProps {
  handleOpenModal: () => void
  handleEndGame: () => void
  isCurrentTimerEnded: boolean
}

const BottomActions: React.FC<BottomActionsProps> = ({
  handleOpenModal,
  handleEndGame,
  isCurrentTimerEnded,
}) => {
  // console.log('BottomActions - isCurrentTimerEnded:', isCurrentTimerEnded)

  return (
    <div className="xl:flex flex-col gap-4 mt-4">
      <div className="flex flex-col items-center gap-2 p-4 justify-center yolo-card py-[22px] min-h-[372px]">
        <button
          className={`
            w-full text-xl play-button px-4 h-14 hover:scale-${
              isCurrentTimerEnded ? 100 : 105
            } rounded-full
            relative outline outline-2 outline-offset-[6px] outline-yellow-300 text-black
            yolo-button disabled:brightness-50 disabled:saturate-0
          `}
          onClick={handleOpenModal}
          disabled={isCurrentTimerEnded}
        >
          <span className="font-[600]">Enter Now</span>
        </button>
      </div>
      {/*<div className="yolo-card">
        <Chat className="gap-3 flex-col flex" />
      </div>*/}
    </div>
  )
}

export default BottomActions
