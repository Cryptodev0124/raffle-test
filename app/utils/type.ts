export interface Player {
    player: string;
    referrer: string;
    mint: string;
    amount: number;
    amountUsd: number;
}

export interface Coinflip {
    pda: string,
    winner: string,
    creator: string,
    creator_player: string,
    creator_name: string,
    creator_mint: string,
    creator_amount: number,
    creator_number: number,
    joiner: string,
    joiner_player: string,
    joiner_name: string,
    joiner_mint: string,
    joiner_amount: number,
    joiner_number: number,
    pool_amount: number,
}

export interface ChatType {
    user_name: string,
    message: string,
    timestamp: number
}

export interface UserType {
    user_name: string,
    user_address: string,
    avatar: string
}

export interface UserWageredType {
    totalBetAmount: number,
    totalPayout: number
}

export interface UserReferralInfoType {
    totalReferrals: number,
    totalEarnings: number,
    totalWagered: number
}

export interface HistoryType {
    status: boolean,
    chance: number,
    date: string,
    bet: number
}

export interface UserHistoryType {
    jackpotHistory: HistoryType[],
    coinflipHistory: HistoryType[]
}

export interface ModalData {
    pda: string,
    player: string,
    number: number,
    mint: string,
    amount: number
}

export interface ServerToClientEvents {
    startGame: (pda: string, endTimestamp: number, players: Player[], startTimeStamp?: number) => void;
    coinflip: (coinflipPools: Coinflip[]) => void;
    connectionUpdated: (counter: number) => void;
    newGameReady: (endTimestamp: number, players: Player[]) => void;
    endGame: (random: number) => void;
    notifyJoinedPlayers: (players: Player[]) => void;
    // checkAccount: (user: User) => void
    sendBangHistory: (gameHistory: any[]) => void;
    notifyPlayerWithdrawn: (players: Player[]) => void;
    currentPositionUpdated: (currentPosition: number) => void;
    endTimeUpdated: (pda: string, last_ts: number, players: Player[]) => void;
    joiningCoinflip: (pda: string, player: string, number: number, mint: string, amount: number) => void;
    joinedCoinflip: (coinflipPools: Coinflip[], winner: string) => void;
    gameEnded: (winner: {
        bet: number,
        payout: number,
        winner: string,
        referrer: string,
        resultHeight: number
    }) => void;
    chatUpdated: (
        msgs: ChatType[]
    ) => void;
    userUpdated: (
        user: UserType, users: UserType[]
    ) => void;
    gameStarting: (
        isStarting: number
    ) => void;
    getWinners: (
        winners: any[]
    ) => void;
    heartbeat: (
        nowTimeStamp: number
    ) => void;

}

export interface ClientToServerEvents {

}
