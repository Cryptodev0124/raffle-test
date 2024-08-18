export interface Asset {
    symbol: string
    src: string
    name: string
    address: string
    decimals?: number
}

export const assets = [
    {
        symbol: 'SOL',
        src: '/img/sol.png',
        name: 'Solana',
        address: 'So11111111111111111111111111111111111111112'
    },
    {
        symbol: 'JUP',
        src: '/img/jup.png',
        name: 'Jupiter',
        address: 'JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN',
        decimals: 6
    },
    {
        symbol: 'BONK',
        src: '/img/bonk.png',
        name: 'Bonk',
        address: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263',
        decimals: 5
    },
    {
        symbol: 'WIF',
        src: '/img/wif.png',
        name: 'dogwifhat',
        address: 'EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm',
        decimals: 6
    },
    {
        symbol: 'POPCAT',
        src: '/img/popcat.png',
        name: 'Popcat',
        address: '7GCihgDB8fe6KNjn2MYtkzZcRjQy3t9GHdC8uHYmW2hr'
    },
] as Asset[]

export const getDecimals = (mint: string): number => {
    const asset = assets.find(asset => asset.address === mint);
    return asset ? asset.decimals ? asset.decimals : 9 : 0;
};

export const getSymbol = (mint: string): string => {
    const asset = assets.find(asset => asset.address === mint);
    return asset ? asset.symbol : 'ETH';
};