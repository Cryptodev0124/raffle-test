/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useState, useEffect, useContext } from 'react';
import userAvatar from '~/assets/mobile-logo.svg'

interface Player {
  address: string;
  name: string;
  amount: number;
  amountUsd: number;
  mint: string;
  color: string;
  avatar: string;
  totalPlayed: number;
  totalWon: number;
  biggestWin: number;
  luckiestWin: number;
  entriesValue: number;
  winChance: number;
  pts: number;
}

interface Winner {
  bet: number;
  payout: number;
  winner: string;
  referrer: string;
  resultHeight: number;
}

interface GameData {
  players: Player[];
  endTimestamp: number;
  pda: string;
  gameStarted: boolean;
}

interface Context {
  gameData?: GameData;
  messages?: any[];
  onlined?: number;
  user?: any;
  users?: any[];
  setClearGame?: Function;
  setStarted?: Function;
  winner?: Winner;
  resultHeight?: number;
  gameEnded?: boolean;
  started?: boolean;
  setIsLocked?: Function;
  isLocked?: boolean;
}

const context = createContext<Context>({});

export const useSocket = () => useContext(context);

const generateRandomString = (length: number): string => {
  let result = '';
  const characters = '0123456789abcdef';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return '0x' + result;
};

const generateRandomColor = (): string => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
};

const generateFakeUser = (id: number, totalAmount: number): Player => {
  const address = generateRandomString(40);
  const name = `User ${id}`;
  const amount = Math.floor(Math.random() * 100) + 100; // Random amount between 100 and 200
  const color = generateRandomColor(); // Generate random color
  return {
    address,
    name,
    amount,
    amountUsd: amount,
    mint: 'eth_address',
    color, // Ensure the color property is included
    avatar: userAvatar,
    totalPlayed: 1000 + Math.floor(Math.random() * 1000),
    totalWon: Math.floor(Math.random() * amount),
    biggestWin: Math.random() * 5,
    luckiestWin: Math.floor(Math.random() * 500),
    entriesValue: Math.floor(Math.random() * 100),
    winChance: amount / totalAmount * 100,
    pts: Math.floor(Math.random() * 1000),
  };
};

const SocketProvider = (props: { children: any }) => {
  const [gameData, setGameData] = useState<GameData>({
    players: [],
    endTimestamp: 1643723400,
    pda: 'test-pda',
    gameStarted: true,
  });

  const [messages, setMessages] = useState([
    {
      id: 1,
      user_name: 'User 1',
      message: 'Hello!',
      timestamp: '10:00',
    },
    {
      id: 2,
      user_name: 'User 2',
      message: 'Hi!',
      timestamp: '10:05',
    },
    {
      id: 3,
      user_name: 'User 1',
      message: 'How are you?',
      timestamp: '10:10',
    },
  ]);

  const [user, setUser] = useState({
    address: '0x1234567890abcdef1234567890abcdef12345678',
    name: 'User 1',
  });

  const [users, setUsers] = useState(() => {
    const totalAmount = 3000; // This can be calculated dynamically if needed
    const fakeUsers = Array.from({ length: 20 }).map((_, idx) =>
      generateFakeUser(idx + 1, totalAmount)
    );
    return fakeUsers;
  });

  const [onlined, setOnlined] = useState(0);
  const [winner, setWinner] = useState<Winner>({
    bet: 0,
    payout: 0,
    winner: '',
    referrer: '',
    resultHeight: 0,
  });

  const [resultHeight, setResultHeight] = useState(0);
  const [gameEnded, setGameEnded] = useState(false);
  const [started, setStarted] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [newRound, setNewRound] = useState(true);

  const players = users;

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080');

    socket.onopen = () => {
      socket.send(JSON.stringify({ type: 'join' }));
    };

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === 'onlined') {
        setOnlined(message.count);
      }
    };

    // socket.onclose = () => {
    //   socket.send(JSON.stringify({ type: 'leave' }));
    // };

    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    if (!isLocked) {
      if (newRound) {
        setGameData((prev) => ({
          ...prev,
          players: [],
        }));
        setNewRound(false);
      }
      let currentIndex = 0;
      const intervalId = setInterval(() => {
        if (currentIndex < players.length && !isLocked) {
          setGameData((prev) => ({
            ...prev,
            players: [...prev.players, players[currentIndex]],
          }));
          currentIndex++;
        }
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [isLocked, players]);

  useEffect(() => {
    if (isLocked) {
      setNewRound(true);
    }
  }, [isLocked]);

  const setClearGame = () => {
    /*setGameData({
      players: [],
      endTimestamp: 0,
      pda: '',
      gameStarted: false,
    });*/
  };

  return (
    <context.Provider
      value={{
        gameData,
        messages,
        onlined,
        user,
        users,
        setClearGame,
        setStarted,
        winner,
        resultHeight,
        gameEnded,
        started,
        setIsLocked,
        isLocked,
      }}
    >
      {props.children}
    </context.Provider>
  );
};

export default SocketProvider;
