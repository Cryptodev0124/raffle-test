import React, { useEffect, useRef } from 'react';
import linkIcon from '~/assets/link.svg';
import tokenIcon from '/app/assets/mobile-logo.png';

interface PlayerModalProps {
  player: {
    avatar: string;
    name: string;
    totalPlayed: number;
    totalWon: number;
    biggestWin: number;
    luckiestWin: number;
    entriesValue: number;
    winChance: number;
    pts: number;
  };
  onClose: () => void;
}

const PlayerModal: React.FC<PlayerModalProps> = ({ player, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 backdrop-blur-lg">
      <div className="yolo-card p-8 rounded-lg max-w-[480px] min-w-[280px]" ref={modalRef}>
        <button onClick={onClose} className="float-right mb-4 border-[2px] rounded-full p-2 border-white px-4">
          Close
        </button>
        <div className="flex flex-col items-center">
          <img src={player.avatar} alt={`${player.name}'s Avatar`} className="w-[100px] h-[100px] mb-4 rounded-full" />
          <h2 className="text-2xl font-bold">{player.name}</h2>
          <div className="flex justify-between w-full mt-4">
            <div>Past Rounds</div>
            <a href="http://example.com" className="flex items-center">
              View Wallet
              <img src={linkIcon} alt="Link Icon" className="w-4 h-4 ml-2" />
            </a>
          </div>
          <div className="w-full mt-4 border border-gray-300 rounded-lg">
            <table className="w-full">
              <tbody>
                <tr>
                  <td className="border-r border-gray-300 py-2 px-2">
                    <div className="text-lg">{player.totalPlayed}</div>
                    <div className="text-sm text-gray-500">Played 🐲</div>
                  </td>
                  <td className="border-r border-gray-300 py-2 px-2">
                    <div className="text-lg">{player.totalWon}</div>
                    <div className="text-sm text-gray-500">Won 🚀</div>
                  </td>
                  <td className="border-r border-gray-300 py-2 px-2">
                    <div className="text-lg">{player.biggestWin}</div>
                    <div className="text-sm text-gray-500">Biggest Win 🐠</div>
                  </td>
                  <td className="py-2 px-2">
                    <div className="text-lg">{player.luckiestWin}x</div>
                    <div className="text-sm text-gray-500">Luckiest Win 🤯</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <hr className="my-4" />
          <div className="w-full text-left">
            <div>This Round</div>
            <div className="w-full mt-4 border border-gray-300 rounded-lg">
              <table className="w-full">
                <tbody>
                  <tr>
                    <td className="border-r border-gray-300 py-2 px-2">
                      <div className="text-lg flex items-center">
                        <img src={tokenIcon} alt="Token Icon" className="w-[24px] h-[24px] mr-2" />
                        {player.entriesValue}
                      </div>
                      <div className="text-sm text-gray-500">Entries' Value</div>
                    </td>
                    <td className="border-r border-gray-300 py-2 px-2">
                      <div className="text-lg">{player.winChance.toFixed(2)}%</div>
                      <div className="text-sm text-gray-500">Win Chance</div>
                    </td>
                    <td className="py-2 px-2">
                      <div className="text-lg">{player.pts}</div>
                      <div className="text-sm text-gray-500">Pts</div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <hr className="my-4" />
          <div className="flex flex-row w-full justify-between mt-4">
            <div className="flex flex-row items-center">
              <img src={tokenIcon} alt="Token Icon" className="w-[32px] h-[32px] mr-2" />
              <div className="text-lg">{player.entriesValue} ETH</div>
            </div>
            <div className="flex flex-col items-end">
              <div className="flex items-center">
                <img src={tokenIcon} alt="Token Icon" className="w-6 h-6 mr-2" />
                <div className="text-md">{player.entriesValue}</div>
              </div>
              <div className="text-sm text-gray-500">$0.00</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerModal;
