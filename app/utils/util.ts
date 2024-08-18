import { hexColors, JUPITER_API } from "../config";

// export const getTokenPrice = async (address: string) => {
//     const apiUrl = `${JUPITER_API}${address}`;
//     const response = await fetch(apiUrl);
//     const res = await response.json();
//     return res.data[address] ? res.data[address].price : undefined
// }


// export const base58ToColor = (publicKey: string) => {
//     let hex = '';
//     for (let i = 0; i < publicKey.length; i++) {
//         let code = publicKey.charCodeAt(i).toString(16);
//         hex += code.padStart(2, '0');
//     }
//     return "#" + hex.slice(0, 6);
// };

// export const base58ToGradient = (publicKey: string) => {
//     const intNumber = publicKey.slice(0, 3).split('').map(char => char.charCodeAt(0)).join('');
//     return colors[parseInt(intNumber) % 9];
// }

// export const getUserColor = (address: string, repeat?: boolean) => {
//     const intNumber = address.slice(0, 8).split('').map(char => char.charCodeAt(0)).join('');
//     return hexColors[(parseInt(intNumber) + (repeat ? 1 : 0)) % 90].hex;
// };

interface Pie {
    color: string,
    deg: number,
}

// export const getPieData = (colors: { color: string, value: number }[]) => {
//     const potValue = colors.reduce((acc, curr) => acc + curr.value, 0);
//     let pies: Pie[] = [];

//     for (let i = 0; i < colors.length; i++) {
//         pies.push(
//             {
//                 color: colors[i].color,
//                 deg: colors[i].value / potValue * 720,
//             }
//         )
//     }

//     const resDegs = pies.reduce((acc: any, curr, i) => {
//         const lastValue = (acc[i - 1] && acc[i - 1].second) || 0;
//         return [
//             ...acc,
//             {
//                 color: curr.color,
//                 first: lastValue,
//                 second: lastValue + curr.deg < 360 ? lastValue + curr.deg : 360
//             }
//         ]
//     }, []);

//     const data = resDegs.filter((item: any) => item.first !== 360);
//     return data
// }

export const rot13 = (s: string | null) => {
    if (s === null) return s;
    return s.replace(/[A-Z]/gi, c =>
        "NOPQRSTUVWXYZABCDEFGHIJKLMnopqrstuvwxyzabcdefghijklm"[
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".indexOf(c)])
}

const colors = [
    {
        gradient: "linear-gradient(180deg, #F7B831 0%, #7230FF 100%)",
        color: "#F7B831",
        shadow: "inset 0px 8px 4px rgba(0, 0, 0, 0.1), inset 0px -8px 4px rgba(0, 0, 0, 0.25) "
    },
    {
        gradient: "linear-gradient(180deg, #EF4E4E 0%, #E14646 100%)",
        color: "#EF4E4E",
        shadow: "inset 0px 8px 4px rgba(0, 0, 0, 0.1), inset 0px -8px 4px rgba(0, 0, 0, 0.25)"
    },
    {
        gradient: "linear-gradient(180deg, #6C60F0 0%, #467BE1 100%)",
        color: "#6C60F0",
        shadow: "inset 0px 8px 4px rgba(0, 0, 0, 0.1), inset 0px -8px 4px rgba(0, 0, 0, 0.25)"
    },
    {
        gradient: "linear-gradient(180deg, #48F139 0%, #DEE146 100%)",
        color: "#48F139",
        shadow: " inset 0px 8px 4px rgba(0, 0, 0, 0.1), inset 0px -8px 4px rgba(0, 0, 0, 0.25)"
    },
    {
        gradient: "linear-gradient(180deg, #0811FD 0%, #81E146 100%)",
        color: "#0811FD",
        shadow: " inset 0px 8px 4px rgba(0, 0, 0, 0.1), inset 0px -8px 4px rgba(0, 0, 0, 0.25)"
    },
    {
        gradient: "linear-gradient(180deg, #3DFECF 0%, #46D8E1 100%)",
        color: "#3DFECF",
        shadow: " inset 0px 8px 4px rgba(0, 0, 0, 0.1), inset 0px -8px 4px rgba(0, 0, 0, 0.25)"
    },
    {
        gradient: "linear-gradient(180deg, #ee46bc 0%, #46D8E1 100%)",
        color: "#ee46bc",
        shadow: " inset 0px 8px 4px rgba(0, 0, 0, 0.1), inset 0px -8px 4px rgba(0, 0, 0, 0.25)"
    },
    {
        gradient: "linear-gradient(180deg, #2ed3b7 0%, #46D8E1 100%)",
        color: "#2ed3b7",
        shadow: " inset 0px 8px 4px rgba(0, 0, 0, 0.1), inset 0px -8px 4px rgba(0, 0, 0, 0.25)"
    },
    {
        gradient: "linear-gradient(180deg, #ccfd07 0%, #46D8E1 100%)",
        color: "#ccfd07",
        shadow: " inset 0px 8px 4px rgba(0, 0, 0, 0.1), inset 0px -8px 4px rgba(0, 0, 0, 0.25)"
    },
]