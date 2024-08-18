// import { web3 } from "@project-serum/anchor";
// import * as anchor from "@project-serum/anchor";
// import { associatedAddress, TOKEN_PROGRAM_ID } from "@project-serum/anchor/dist/cjs/utils/token";
// import {
//   createAssociatedTokenAccountInstruction
// } from "@solana/spl-token"
// import { bs58 } from "@project-serum/anchor/dist/cjs/utils/bytes";
// import axios from "axios";
// import { IDL, Jackpot } from "./jackpot";
// import {
//   PublicKey,
//   SystemProgram,
//   ComputeBudgetProgram,
//   sendAndConfirmTransaction,
//   Transaction,
// } from "@solana/web3.js";

// import {
//   GamePool,
//   GAME_SEED,
//   JACKPOT_PROGRAM_ID,
//   VAULT_SEED,
//   GLOBAL_AUTHORITY_SEED,
//   SPL_ESCROW_SEED,
//   REFERRAL_SEED,
//   JUP_FEED,
//   BONK_FEED,
//   WIF_FEED,
//   POPCAT_FEED,
//   SOL_FEED,
//   SOL,
//   JUP,
//   BONK,
//   WIF,
//   POPCAT,
//   COINFLIP_SEED,
// } from "./types";
// import { WalletContextState } from "@solana/wallet-adapter-react";
// import { API_URL, RPC_URL } from "../../config";
// import { errorAlert, successAlert } from "../../components/ToastGroup";
// import { useSocket } from "../SocketContext";

// export const solConnection = new web3.Connection(RPC_URL);

// export const playGame = async (
//   wallet: WalletContextState,
//   mint: PublicKey,
//   amount: number,
//   referrer: PublicKey | null,
//   setLoading: Function,
// ) => {
//   if (wallet.publicKey === null) return;

//   let programId = new anchor.web3.PublicKey(JACKPOT_PROGRAM_ID);

//   const cloneWindow: any = window;
//   const userAddress = wallet.publicKey;
//   const provider = new anchor.AnchorProvider(
//     solConnection,
//     cloneWindow["solana"],
//     anchor.AnchorProvider.defaultOptions()
//   );
//   const program = new anchor.Program(
//     IDL as anchor.Idl,
//     programId,
//     provider
//   );
//   try {
//     setLoading(true);
//     const tx = await createPlayGameTx(userAddress, mint, amount, referrer, program);
//     const { blockhash } = await solConnection.getLatestBlockhash();
//     tx.feePayer = userAddress;
//     tx.recentBlockhash = blockhash;
//     if (wallet.signTransaction) {
//       // check if creating room conflicts
//       try {
//         await axios.post(`${API_URL}requestCreate/`);
//       } catch (e) {
//         console.error(" --> playGame: Failed due to creating conflict");
//         errorAlert("Something went wrong. Please try again!");
//         setLoading(false);
//         return;
//       }

//       const signedTx = await wallet.signTransaction(tx);
//       const encodedTx = Buffer.from(signedTx.serialize()).toString("base64");
//       const txId = await provider.connection.sendRawTransaction(
//         signedTx.serialize(),
//         {
//           skipPreflight: true,
//           maxRetries: 3,
//           preflightCommitment: "confirmed",
//         }
//       );
//       await solConnection.confirmTransaction(txId, "confirmed");
//       await axios.post(`${API_URL}createGame/`, {
//         txId: txId,
//         encodedTx: encodedTx
//       });

//       console.log("Signature:", encodedTx);
//       // release mutex for processing request if success
//       await axios.post(`${API_URL}endRequest/`);
//       setLoading(false);
//       successAlert('Bet successfully!');
//     }
//   } catch (error) {
//     console.log(" --> playGame:", error);
//     errorAlert("Something went wrong. Please try again!");
//     // release mutex for processing request if failed
//     await axios.post(`${API_URL}endRequest/`);
//     setLoading(false);
//   }
// };

// export const enterGame = async (
//   wallet: WalletContextState,
//   mint: PublicKey,
//   pda: PublicKey,
//   amount: number,
//   referrer: PublicKey | null,
//   setLoading: Function,
//   endTimestamp: number
// ) => {
//   if (wallet.publicKey === null) return;

//   /// Comment this because backend is processed such conflict
//   // console.log(endTimestamp - now, "(endTimestamp - now)", endTimestamp);

//   let programId = new anchor.web3.PublicKey(JACKPOT_PROGRAM_ID);

//   const cloneWindow: any = window;
//   const userAddress = wallet.publicKey;
//   const provider = new anchor.AnchorProvider(
//     solConnection,
//     cloneWindow["solana"],
//     anchor.AnchorProvider.defaultOptions()
//   );
//   const program = new anchor.Program(
//     IDL as anchor.Idl,
//     programId,
//     provider
//   );
//   try {
//     setLoading(true);
//     const tx = await createEnterGameTx(userAddress, mint, pda, amount, referrer, program);
//     const { blockhash } = await solConnection.getLatestBlockhash();
//     tx.feePayer = userAddress;
//     tx.recentBlockhash = blockhash;
//     if (wallet.signTransaction) {
//       // check if creating room conflicts
//       try {
//         await axios.post(`${API_URL}requestEnter/`);
//       } catch (e) {
//         console.error(
//           " --> enterGame: Failed due to entering and setting winner conflict"
//         );
//         errorAlert("Something went wrong. Please try again!");
//         setLoading(false);
//         return;
//       }
//       const signedTx = await wallet.signTransaction(tx);
//       const encodedTx = Buffer.from(signedTx.serialize()).toString("base64");
//       const txId = await provider.connection.sendRawTransaction(
//         signedTx.serialize(),
//         {
//           skipPreflight: true,
//           maxRetries: 3,
//           preflightCommitment: "confirmed",
//         }
//       );
//       await solConnection.confirmTransaction(txId, "confirmed");
//       await axios.post(`${API_URL}enterGame/`, {
//         txId: txId,
//         encodedTx: encodedTx
//       });
//       console.log("Signature:", txId);
//       // release mutex for processing request if success
//       await axios.post(`${API_URL}endEnterRequest/`);
//       setLoading(false);
//     }
//     setLoading(false);
//     successAlert('Bet successfully!');
//   } catch (error) {
//     console.error(" --> enterGame:", error);
//     errorAlert("Something went wrong. Please try again!");
//     // release mutex for processing request if failed
//     await axios.post(`${API_URL}endEnterRequest/`);
//     setLoading(false);
//   }
// };

// export const getPriceFeed = (mint: PublicKey) => {
//   switch (mint.toBase58()) {
//     case "JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN":
//       return JUP_FEED

//     case "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263":
//       return BONK_FEED

//     case "EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm":
//       return WIF_FEED

//     case "7GCihgDB8fe6KNjn2MYtkzZcRjQy3t9GHdC8uHYmW2hr":
//       return POPCAT_FEED

//     default:
//       return SOL_FEED
//   }
// }

// export const createPlayGameTx = async (
//   userAddress: PublicKey,
//   mint: PublicKey,
//   amount: number,
//   referrer: PublicKey | null,
//   program: anchor.Program,
// ) => {
//   let now = new Date();
//   let ts = Math.floor(now.getTime() / 1000);

//   const [solVault] = await PublicKey.findProgramAddress(
//     [Buffer.from(VAULT_SEED)],
//     program.programId
//   );

//   const [gamePool] = await PublicKey.findProgramAddress(
//     [
//       Buffer.from(GAME_SEED),
//       userAddress.toBuffer(),
//       new anchor.BN(ts).toArrayLike(Buffer, "le", 8),
//     ],
//     program.programId
//   );

//   const [globalData] = await PublicKey.findProgramAddress(
//     [
//       Buffer.from(GLOBAL_AUTHORITY_SEED)
//     ],
//     program.programId
//   );

//   let tokenAccount, splEscrow

//   if (mint.toBase58() === SOL.toBase58()) {
//     tokenAccount = await associatedAddress({ mint: JUP, owner: userAddress });
//     [splEscrow] = await PublicKey.findProgramAddress(
//       [Buffer.from(SPL_ESCROW_SEED), JUP.toBuffer()],
//       program.programId
//     );
//   } else {
//     tokenAccount = await associatedAddress({ mint, owner: userAddress });

//     [splEscrow] = await PublicKey.findProgramAddress(
//       [Buffer.from(SPL_ESCROW_SEED), mint.toBuffer()],
//       program.programId
//     );
//   }

//   const [referralData] = await PublicKey.findProgramAddress(
//     [Buffer.from(REFERRAL_SEED)],
//     program.programId
//   );

//   console.log("Input Data for PlayGame: ",
//     userAddress.toBase58(),
//     globalData.toBase58(),
//     gamePool.toBase58(),
//     solVault.toBase58(),
//     tokenAccount.toBase58(),
//     mint.toBase58(),
//     splEscrow.toBase58(),
//     referralData.toBase58(),
//     getPriceFeed(mint).toBase58(),
//   );

//   const tx = new Transaction();
//   const computePriceIx = ComputeBudgetProgram.setComputeUnitPrice({
//     microLamports: 2000000,
//   });
//   tx.add(computePriceIx);

//   const tokenAAccount = await associatedAddress({ mint: JUP, owner: userAddress });
//   const tokenBAccount = await associatedAddress({ mint: BONK, owner: userAddress });
//   const tokenCAccount = await associatedAddress({ mint: WIF, owner: userAddress });
//   const tokenDAccount = await associatedAddress({ mint: POPCAT, owner: userAddress });

//   const accountAInfo = await program.provider.connection.getAccountInfo(tokenAAccount, "confirmed");
//   const accountBInfo = await program.provider.connection.getAccountInfo(tokenBAccount, "confirmed");
//   const accountCInfo = await program.provider.connection.getAccountInfo(tokenCAccount, "confirmed");
//   const accountDInfo = await program.provider.connection.getAccountInfo(tokenDAccount, "confirmed");
//   if (!accountAInfo) {
//     // create the token account if it doesn't exist
//     tx.add(
//       createAssociatedTokenAccountInstruction(
//         userAddress,
//         tokenAAccount,
//         userAddress,
//         JUP
//       )
//     )
//   }
//   if (!accountBInfo) {
//     // create the token account if it doesn't exist
//     tx.add(
//       createAssociatedTokenAccountInstruction(
//         userAddress,
//         tokenBAccount,
//         userAddress,
//         BONK
//       )
//     )
//   }
//   if (!accountCInfo) {
//     // create the token account if it doesn't exist
//     tx.add(
//       createAssociatedTokenAccountInstruction(
//         userAddress,
//         tokenCAccount,
//         userAddress,
//         WIF
//       )
//     )
//   }
//   if (!accountDInfo) {
//     // create the token account if it doesn't exist
//     tx.add(
//       createAssociatedTokenAccountInstruction(
//         userAddress,
//         tokenDAccount,
//         userAddress,
//         POPCAT
//       )
//     )
//   }

//   if (referrer) {
//     const tokenAAccount = await associatedAddress({ mint: JUP, owner: referrer });
//     const tokenBAccount = await associatedAddress({ mint: BONK, owner: referrer });
//     const tokenCAccount = await associatedAddress({ mint: WIF, owner: referrer });
//     const tokenDAccount = await associatedAddress({ mint: POPCAT, owner: referrer });

//     const accountAInfo = await program.provider.connection.getAccountInfo(tokenAAccount, "confirmed");
//     const accountBInfo = await program.provider.connection.getAccountInfo(tokenBAccount, "confirmed");
//     const accountCInfo = await program.provider.connection.getAccountInfo(tokenCAccount, "confirmed");
//     const accountDInfo = await program.provider.connection.getAccountInfo(tokenDAccount, "confirmed");
//     if (!accountAInfo) {
//       // create the token account if it doesn't exist
//       tx.add(
//         createAssociatedTokenAccountInstruction(
//           userAddress,
//           tokenAAccount,
//           referrer,
//           JUP
//         )
//       )
//     }
//     if (!accountBInfo) {
//       // create the token account if it doesn't exist
//       tx.add(
//         createAssociatedTokenAccountInstruction(
//           userAddress,
//           tokenBAccount,
//           referrer,
//           BONK
//         )
//       )
//     }
//     if (!accountCInfo) {
//       // create the token account if it doesn't exist
//       tx.add(
//         createAssociatedTokenAccountInstruction(
//           userAddress,
//           tokenCAccount,
//           referrer,
//           WIF
//         )
//       )
//     }
//     if (!accountDInfo) {
//       // create the token account if it doesn't exist
//       tx.add(
//         createAssociatedTokenAccountInstruction(
//           userAddress,
//           tokenDAccount,
//           referrer,
//           POPCAT
//         )
//       )
//     }
//   }

//   tx.add(
//     program.instruction.playGame(
//       new anchor.BN(ts),
//       new anchor.BN(amount),
//       referrer ? referrer : userAddress,
//       {
//         accounts: {
//           admin: userAddress,
//           globalData,
//           gamePool,
//           solVault,
//           tokenAccount,
//           mint,
//           splEscrow,
//           referralData,
//           priceFeed: getPriceFeed(mint),
//           systemProgram: SystemProgram.programId,
//           tokenProgram: TOKEN_PROGRAM_ID
//         },
//         instructions: [],
//         signers: [],
//       }
//     )
//   );

//   return tx;
// };

// export const createEnterGameTx = async (
//   userAddress: PublicKey,
//   mint: PublicKey,
//   gamePool: PublicKey,
//   amount: number,
//   referrer: PublicKey | null,
//   program: anchor.Program,
// ) => {
//   const [solVault, bump] = await PublicKey.findProgramAddress(
//     [Buffer.from(VAULT_SEED)],
//     program.programId
//   );
//   console.log(solVault.toBase58());

//   const [globalData] = await PublicKey.findProgramAddress(
//     [
//       Buffer.from(GLOBAL_AUTHORITY_SEED)
//     ],
//     program.programId
//   );

//   let tokenAccount, splEscrow

//   if (mint.toBase58() === SOL.toBase58()) {
//     tokenAccount = await associatedAddress({ mint: JUP, owner: userAddress });
//     [splEscrow] = await PublicKey.findProgramAddress(
//       [Buffer.from(SPL_ESCROW_SEED), JUP.toBuffer()],
//       program.programId
//     );
//   } else {
//     tokenAccount = await associatedAddress({ mint, owner: userAddress });

//     [splEscrow] = await PublicKey.findProgramAddress(
//       [Buffer.from(SPL_ESCROW_SEED), mint.toBuffer()],
//       program.programId
//     );
//   }

//   const [referralData] = await PublicKey.findProgramAddress(
//     [Buffer.from(REFERRAL_SEED)],
//     program.programId
//   );

//   const tx = new Transaction();
//   const computePriceIx = ComputeBudgetProgram.setComputeUnitPrice({
//     microLamports: 2000000,
//   });
//   tx.add(computePriceIx);

//   const tokenAAccount = await associatedAddress({ mint: JUP, owner: userAddress });
//   const tokenBAccount = await associatedAddress({ mint: BONK, owner: userAddress });
//   const tokenCAccount = await associatedAddress({ mint: WIF, owner: userAddress });
//   const tokenDAccount = await associatedAddress({ mint: POPCAT, owner: userAddress });

//   const accountAInfo = await program.provider.connection.getAccountInfo(tokenAAccount, "confirmed");
//   const accountBInfo = await program.provider.connection.getAccountInfo(tokenBAccount, "confirmed");
//   const accountCInfo = await program.provider.connection.getAccountInfo(tokenCAccount, "confirmed");
//   const accountDInfo = await program.provider.connection.getAccountInfo(tokenDAccount, "confirmed");
//   if (!accountAInfo) {
//     // create the token account if it doesn't exist
//     tx.add(
//       createAssociatedTokenAccountInstruction(
//         userAddress,
//         tokenAAccount,
//         userAddress,
//         JUP
//       )
//     )
//   }
//   if (!accountBInfo) {
//     // create the token account if it doesn't exist
//     tx.add(
//       createAssociatedTokenAccountInstruction(
//         userAddress,
//         tokenBAccount,
//         userAddress,
//         BONK
//       )
//     )
//   }
//   if (!accountCInfo) {
//     // create the token account if it doesn't exist
//     tx.add(
//       createAssociatedTokenAccountInstruction(
//         userAddress,
//         tokenCAccount,
//         userAddress,
//         WIF
//       )
//     )
//   }
//   if (!accountDInfo) {
//     // create the token account if it doesn't exist
//     tx.add(
//       createAssociatedTokenAccountInstruction(
//         userAddress,
//         tokenDAccount,
//         userAddress,
//         POPCAT
//       )
//     )
//   }

//   if (referrer) {
//     const tokenAAccount = await associatedAddress({ mint: JUP, owner: referrer });
//     const tokenBAccount = await associatedAddress({ mint: BONK, owner: referrer });
//     const tokenCAccount = await associatedAddress({ mint: WIF, owner: referrer });
//     const tokenDAccount = await associatedAddress({ mint: POPCAT, owner: referrer });

//     const accountAInfo = await program.provider.connection.getAccountInfo(tokenAAccount, "confirmed");
//     const accountBInfo = await program.provider.connection.getAccountInfo(tokenBAccount, "confirmed");
//     const accountCInfo = await program.provider.connection.getAccountInfo(tokenCAccount, "confirmed");
//     const accountDInfo = await program.provider.connection.getAccountInfo(tokenDAccount, "confirmed");
//     if (!accountAInfo) {
//       // create the token account if it doesn't exist
//       tx.add(
//         createAssociatedTokenAccountInstruction(
//           userAddress,
//           tokenAAccount,
//           referrer,
//           JUP
//         )
//       )
//     }
//     if (!accountBInfo) {
//       // create the token account if it doesn't exist
//       tx.add(
//         createAssociatedTokenAccountInstruction(
//           userAddress,
//           tokenBAccount,
//           referrer,
//           BONK
//         )
//       )
//     }
//     if (!accountCInfo) {
//       // create the token account if it doesn't exist
//       tx.add(
//         createAssociatedTokenAccountInstruction(
//           userAddress,
//           tokenCAccount,
//           referrer,
//           WIF
//         )
//       )
//     }
//     if (!accountDInfo) {
//       // create the token account if it doesn't exist
//       tx.add(
//         createAssociatedTokenAccountInstruction(
//           userAddress,
//           tokenDAccount,
//           referrer,
//           POPCAT
//         )
//       )
//     }
//   }

//   tx.add(
//     program.instruction.enterGame(
//       new anchor.BN(amount),
//       referrer ? referrer : userAddress, {
//       accounts: {
//         admin: userAddress,
//         globalData,
//         gamePool,
//         solVault,
//         tokenAccount,
//         mint,
//         splEscrow,
//         referralData,
//         priceFeed: getPriceFeed(mint),
//         systemProgram: SystemProgram.programId,
//         tokenProgram: TOKEN_PROGRAM_ID
//       },
//       instructions: [],
//       signers: [],
//     })
//   );

//   return tx;
// };

// async function getPriorityFeeEstimate(transaction: any) {
//   const response = await fetch(RPC_URL, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       jsonrpc: "2.0",
//       id: "1",
//       method: "getPriorityFeeEstimate",
//       params: [
//         {
//           transaction: bs58.encode(transaction.serialize()), // Pass the serialized transaction in Base58
//           options: { "priority_level": "HIGH" },
//         },
//       ],
//     }),
//   });
//   const data = await response.json();
//   return data.result;
// }

// export const getCoinflipAccounts = async () => {
//   type CoinflipDataRaw = anchor.IdlAccounts<Jackpot>['CoinflipPool'];
//   let accounts: anchor.ProgramAccount<CoinflipDataRaw>[] = []
//   let programId = new anchor.web3.PublicKey(JACKPOT_PROGRAM_ID);

//   const cloneWindow: any = window;
//   const provider = new anchor.AnchorProvider(
//     solConnection,
//     cloneWindow["solana"],
//     anchor.AnchorProvider.defaultOptions()
//   );
//   const program = new anchor.Program(
//     IDL as anchor.Idl,
//     programId,
//     provider
//   );
//   try {
//     const result = await provider.connection.getProgramAccounts(programId);
//     const coinflipDiscriminator = anchor.BorshAccountsCoder.accountDiscriminator('CoinflipPool');
//     result.forEach(({ pubkey, account }) => {
//       const discriminator = account.data.slice(0, 8);

//       if (coinflipDiscriminator.compare(discriminator) === 0) {

//         accounts.push({
//           publicKey: pubkey,
//           account: program.coder.accounts.decode<CoinflipDataRaw>(
//             'CoinflipPool',
//             account.data
//           ),
//         });
//       }
//     });
//     return accounts;
//   } catch (error) {
//     console.log(error);
//     return accounts;
//   }

// }

// export const createCoinflip = async (
//   wallet: WalletContextState,
//   setNumber: number,
//   mint: PublicKey,
//   amount: number,
//   referrer: PublicKey | null,
//   setLoading: Function,
// ) => {
//   if (wallet.publicKey === null) return;

//   let programId = new anchor.web3.PublicKey(JACKPOT_PROGRAM_ID);

//   const cloneWindow: any = window;
//   const userAddress = wallet.publicKey;
//   const provider = new anchor.AnchorProvider(
//     solConnection,
//     cloneWindow["solana"],
//     anchor.AnchorProvider.defaultOptions()
//   );
//   const program = new anchor.Program(
//     IDL as anchor.Idl,
//     programId,
//     provider
//   );
//   try {
//     setLoading(true);
//     const tx = await createCoinflipTx(userAddress, setNumber, mint, amount, referrer, program);
//     const { blockhash } = await solConnection.getLatestBlockhash();
//     tx.feePayer = userAddress;
//     tx.recentBlockhash = blockhash;
//     if (wallet.signTransaction) {
//       const signedTx = await wallet.signTransaction(tx);
//       const encodedTx = Buffer.from(signedTx.serialize()).toString("base64");
//       const txId = await provider.connection.sendRawTransaction(
//         signedTx.serialize(),
//         {
//           skipPreflight: true,
//           maxRetries: 3,
//           preflightCommitment: "confirmed",
//         }
//       );
//       await solConnection.confirmTransaction(txId, "confirmed");
//       await axios.post(`${API_URL}coinflip/`, {
//         txId: txId,
//         encodedTx: encodedTx
//       });
//       console.log("Signature:", txId);
//       setLoading(false);
//       successAlert('Bet successfully');
//     }
//   } catch (error) {
//     console.log(" --> createCoinflip:", error);
//     errorAlert("Something went wrong. Please try again!");
//     setLoading(false);
//   }

// }

// export const createCoinflipTx = async (
//   userAddress: PublicKey,
//   setNumber: number,
//   mint: PublicKey,
//   amount: number,
//   referrer: PublicKey | null,
//   program: anchor.Program,
// ) => {
//   let now = new Date();
//   let ts = Math.floor(now.getTime() / 1000);

//   const [solVault] = await PublicKey.findProgramAddress(
//     [Buffer.from(VAULT_SEED)],
//     program.programId
//   );

//   const [coinflipPool] = await PublicKey.findProgramAddress(
//     [
//       Buffer.from(COINFLIP_SEED),
//       userAddress.toBuffer(),
//       new anchor.BN(ts).toArrayLike(Buffer, "le", 8),
//     ],
//     program.programId
//   );

//   const [globalData] = await PublicKey.findProgramAddress(
//     [
//       Buffer.from(GLOBAL_AUTHORITY_SEED)
//     ],
//     program.programId
//   );

//   let tokenAccount, splEscrow

//   if (mint.toBase58() === SOL.toBase58()) {
//     tokenAccount = await associatedAddress({ mint: JUP, owner: userAddress });
//     [splEscrow] = await PublicKey.findProgramAddress(
//       [Buffer.from(SPL_ESCROW_SEED), JUP.toBuffer()],
//       program.programId
//     );
//   } else {
//     tokenAccount = await associatedAddress({ mint, owner: userAddress });

//     [splEscrow] = await PublicKey.findProgramAddress(
//       [Buffer.from(SPL_ESCROW_SEED), mint.toBuffer()],
//       program.programId
//     );
//   }

//   const [referralData] = await PublicKey.findProgramAddress(
//     [Buffer.from(REFERRAL_SEED)],
//     program.programId
//   );

//   console.log("Input Data for Coinflip: ",
//     userAddress.toBase58(),
//     globalData.toBase58(),
//     coinflipPool.toBase58(),
//     solVault.toBase58(),
//     tokenAccount.toBase58(),
//     mint.toBase58(),
//     splEscrow.toBase58(),
//     referralData.toBase58(),
//     getPriceFeed(mint).toBase58(),
//   );

//   const tx = new Transaction();
//   const computePriceIx = ComputeBudgetProgram.setComputeUnitPrice({
//     microLamports: 2000000,
//   });
//   tx.add(computePriceIx);

//   const tokenAAccount = await associatedAddress({ mint: JUP, owner: userAddress });
//   const tokenBAccount = await associatedAddress({ mint: BONK, owner: userAddress });
//   const tokenCAccount = await associatedAddress({ mint: WIF, owner: userAddress });
//   const tokenDAccount = await associatedAddress({ mint: POPCAT, owner: userAddress });

//   const accountAInfo = await program.provider.connection.getAccountInfo(tokenAAccount, "confirmed");
//   const accountBInfo = await program.provider.connection.getAccountInfo(tokenBAccount, "confirmed");
//   const accountCInfo = await program.provider.connection.getAccountInfo(tokenCAccount, "confirmed");
//   const accountDInfo = await program.provider.connection.getAccountInfo(tokenDAccount, "confirmed");
//   if (!accountAInfo) {
//     // create the token account if it doesn't exist
//     tx.add(
//       createAssociatedTokenAccountInstruction(
//         userAddress,
//         tokenAAccount,
//         userAddress,
//         JUP
//       )
//     )
//   }
//   if (!accountBInfo) {
//     // create the token account if it doesn't exist
//     tx.add(
//       createAssociatedTokenAccountInstruction(
//         userAddress,
//         tokenBAccount,
//         userAddress,
//         BONK
//       )
//     )
//   }
//   if (!accountCInfo) {
//     // create the token account if it doesn't exist
//     tx.add(
//       createAssociatedTokenAccountInstruction(
//         userAddress,
//         tokenCAccount,
//         userAddress,
//         WIF
//       )
//     )
//   }
//   if (!accountDInfo) {
//     // create the token account if it doesn't exist
//     tx.add(
//       createAssociatedTokenAccountInstruction(
//         userAddress,
//         tokenDAccount,
//         userAddress,
//         POPCAT
//       )
//     )
//   }

//   tx.add(
//     program.instruction.createCoinflip(
//       new anchor.BN(ts),
//       new anchor.BN(setNumber),
//       new anchor.BN(amount),
//       referrer ? referrer : userAddress,
//       {
//         accounts: {
//           admin: userAddress,
//           globalData,
//           coinflipPool,
//           solVault,
//           tokenAccount,
//           mint,
//           splEscrow,
//           referralData,
//           priceFeed: getPriceFeed(mint),
//           systemProgram: SystemProgram.programId,
//           tokenProgram: TOKEN_PROGRAM_ID
//         },
//         instructions: [],
//         signers: [],
//       }
//     )
//   );

//   return tx;
// };

// export const joinCoinflip = async (
//   wallet: WalletContextState,
//   pda: PublicKey,
//   setNumber: number,
//   mint: PublicKey,
//   amount: number,
//   referrer: PublicKey | null,
//   setLoading: Function,
//   handleCloseModal: Function
// ) => {
//   if (wallet.publicKey === null) return;

//   let programId = new anchor.web3.PublicKey(JACKPOT_PROGRAM_ID);

//   const cloneWindow: any = window;
//   const userAddress = wallet.publicKey;
//   const provider = new anchor.AnchorProvider(
//     solConnection,
//     cloneWindow["solana"],
//     anchor.AnchorProvider.defaultOptions()
//   );
//   const program = new anchor.Program(
//     IDL as anchor.Idl,
//     programId,
//     provider
//   );
//   try {
//     setLoading(true);
//     const tx = await joinCoinflipTx(userAddress, pda, setNumber, mint, amount, referrer, program);
//     const { blockhash } = await solConnection.getLatestBlockhash();
//     tx.feePayer = userAddress;
//     tx.recentBlockhash = blockhash;
//     if (wallet.signTransaction) {
//       const signedTx = await wallet.signTransaction(tx);
//       const encodedTx = Buffer.from(signedTx.serialize()).toString("base64");
//       const txId = await provider.connection.sendRawTransaction(
//         signedTx.serialize(),
//         {
//           skipPreflight: true,
//           maxRetries: 3,
//           preflightCommitment: "confirmed",
//         }
//       );
//       await solConnection.confirmTransaction(txId, "confirmed");
//       handleCloseModal();
//       await axios.post(`${API_URL}joinCoinflip/`, {
//         txId: txId,
//         encodedTx: encodedTx,
//         pda: pda.toBase58(),
//         player: wallet.publicKey.toBase58(),
//         number: setNumber,
//         mint: mint.toBase58(),
//         amount: amount
//       });
//       console.log("Signature:", txId);
//       setLoading(false);
//       successAlert('Bet successfully!');
//     }
//   } catch (error) {
//     console.log(" --> joinCoinflip:", error);
//     errorAlert("Something went wrong. Please try again!");
//     setLoading(false);
//   }

// }

// export const joinCoinflipTx = async (
//   userAddress: PublicKey,
//   pda: PublicKey,
//   setNumber: number,
//   mint: PublicKey,
//   amount: number,
//   referrer: PublicKey | null,
//   program: anchor.Program,
// ) => {
//   const [solVault] = await PublicKey.findProgramAddress(
//     [Buffer.from(VAULT_SEED)],
//     program.programId
//   );

//   const [globalData] = await PublicKey.findProgramAddress(
//     [
//       Buffer.from(GLOBAL_AUTHORITY_SEED)
//     ],
//     program.programId
//   );

//   let tokenAccount, splEscrow

//   if (mint.toBase58() === SOL.toBase58()) {
//     tokenAccount = await associatedAddress({ mint: JUP, owner: userAddress });
//     [splEscrow] = await PublicKey.findProgramAddress(
//       [Buffer.from(SPL_ESCROW_SEED), JUP.toBuffer()],
//       program.programId
//     );
//   } else {
//     tokenAccount = await associatedAddress({ mint, owner: userAddress });

//     [splEscrow] = await PublicKey.findProgramAddress(
//       [Buffer.from(SPL_ESCROW_SEED), mint.toBuffer()],
//       program.programId
//     );
//   }

//   const [referralData] = await PublicKey.findProgramAddress(
//     [Buffer.from(REFERRAL_SEED)],
//     program.programId
//   );

//   console.log("Input Data for Coinflip: ",
//     userAddress.toBase58(),
//     globalData.toBase58(),
//     pda.toBase58(),
//     solVault.toBase58(),
//     tokenAccount.toBase58(),
//     mint.toBase58(),
//     splEscrow.toBase58(),
//     referralData.toBase58(),
//     getPriceFeed(mint).toBase58(),
//   );

//   const tx = new Transaction();
//   const computePriceIx = ComputeBudgetProgram.setComputeUnitPrice({
//     microLamports: 2000000,
//   });
//   tx.add(computePriceIx);

//   const tokenAAccount = await associatedAddress({ mint: JUP, owner: userAddress });
//   const tokenBAccount = await associatedAddress({ mint: BONK, owner: userAddress });
//   const tokenCAccount = await associatedAddress({ mint: WIF, owner: userAddress });
//   const tokenDAccount = await associatedAddress({ mint: POPCAT, owner: userAddress });

//   const accountAInfo = await program.provider.connection.getAccountInfo(tokenAAccount, "confirmed");
//   const accountBInfo = await program.provider.connection.getAccountInfo(tokenBAccount, "confirmed");
//   const accountCInfo = await program.provider.connection.getAccountInfo(tokenCAccount, "confirmed");
//   const accountDInfo = await program.provider.connection.getAccountInfo(tokenDAccount, "confirmed");
//   if (!accountAInfo) {
//     // create the token account if it doesn't exist
//     tx.add(
//       createAssociatedTokenAccountInstruction(
//         userAddress,
//         tokenAAccount,
//         userAddress,
//         JUP
//       )
//     )
//   }
//   if (!accountBInfo) {
//     // create the token account if it doesn't exist
//     tx.add(
//       createAssociatedTokenAccountInstruction(
//         userAddress,
//         tokenBAccount,
//         userAddress,
//         BONK
//       )
//     )
//   }
//   if (!accountCInfo) {
//     // create the token account if it doesn't exist
//     tx.add(
//       createAssociatedTokenAccountInstruction(
//         userAddress,
//         tokenCAccount,
//         userAddress,
//         WIF
//       )
//     )
//   }
//   if (!accountDInfo) {
//     // create the token account if it doesn't exist
//     tx.add(
//       createAssociatedTokenAccountInstruction(
//         userAddress,
//         tokenDAccount,
//         userAddress,
//         POPCAT
//       )
//     )
//   }

//   tx.add(
//     program.instruction.joinCoinflip(
//       new anchor.BN(setNumber),
//       new anchor.BN(amount),
//       referrer ? referrer : userAddress,
//       {
//         accounts: {
//           admin: userAddress,
//           globalData,
//           coinflipPool: pda,
//           solVault,
//           tokenAccount,
//           mint,
//           splEscrow,
//           referralData,
//           priceFeed: getPriceFeed(mint),
//           systemProgram: SystemProgram.programId,
//           tokenProgram: TOKEN_PROGRAM_ID
//         },
//         instructions: [],
//         signers: [],
//       }
//     )
//   );

//   return tx;
// };

// export const claimCoinflip = async (
//   wallet: WalletContextState,
//   pda: PublicKey,
//   mintA: PublicKey,
//   mintB: PublicKey,
//   setLoading: Function
// ) => {
//   if (wallet.publicKey === null) return;

//   let programId = new anchor.web3.PublicKey(JACKPOT_PROGRAM_ID);

//   const cloneWindow: any = window;
//   const userAddress = wallet.publicKey;
//   const provider = new anchor.AnchorProvider(
//     solConnection,
//     cloneWindow["solana"],
//     anchor.AnchorProvider.defaultOptions()
//   );
//   const program = new anchor.Program(
//     IDL as anchor.Idl,
//     programId,
//     provider
//   );
//   try {
//     setLoading(true);
//     const tx = await claimCoinflipTx(userAddress, pda, mintA, mintB, program);
//     const { blockhash } = await solConnection.getLatestBlockhash();
//     tx.feePayer = userAddress;
//     tx.recentBlockhash = blockhash;
//     if (wallet.signTransaction) {
//       const signedTx = await wallet.signTransaction(tx);
//       const encodedTx = Buffer.from(signedTx.serialize()).toString("base64");
//       const txId = await provider.connection.sendRawTransaction(
//         signedTx.serialize(),
//         {
//           skipPreflight: true,
//           maxRetries: 3,
//           preflightCommitment: "confirmed",
//         }
//       );
//       await solConnection.confirmTransaction(txId, "confirmed");
//       await axios.post(`${API_URL}coinflip/`, {
//         txId: txId,
//         encodedTx: encodedTx
//       });
//       console.log("Signature:", txId);
//       setLoading(false);
//       successAlert('Claimed successfully!')
//     }
//   } catch (error) {
//     console.log(" --> claimCoinflip:", error);
//     errorAlert("Something went wrong. Please try again!");
//     setLoading(false);
//   }

// }

// export const claimCoinflipTx = async (
//   userAddress: PublicKey,
//   pda: PublicKey,
//   mintA: PublicKey,
//   mintB: PublicKey,
//   program: anchor.Program,
// ) => {
//   const [solVault, bump] = await PublicKey.findProgramAddress(
//     [Buffer.from(VAULT_SEED)],
//     program.programId
//   );

//   const [globalData] = await PublicKey.findProgramAddress(
//     [
//       Buffer.from(GLOBAL_AUTHORITY_SEED)
//     ],
//     program.programId
//   );

//   const [referralData] = await PublicKey.findProgramAddress(
//     [Buffer.from(REFERRAL_SEED)],
//     program.programId
//   );

//   const referralState = await getReferralStateByKey(referralData, program);
//   const players = referralState.players;
//   const referrers = referralState.referrers;

//   let j = 0;
//   for (let i = 0; i < players.length; i++) {
//     if (players[i].toBase58() === userAddress.toBase58()) {
//       j = i;
//       break;
//     }
//   }

//   let winnerSplA, winnerSplB, splEscrowA, splEscrowB, referrerSplA, referrerSplB

//   if (mintA.toBase58() === SOL.toBase58()) {
//     winnerSplA = await associatedAddress({ mint: JUP, owner: userAddress });
//     referrerSplA = await associatedAddress({ mint: JUP, owner: referrers[j] });
//     [splEscrowA] = await PublicKey.findProgramAddress(
//       [Buffer.from(SPL_ESCROW_SEED), JUP.toBuffer()],
//       program.programId
//     );
//   } else {
//     winnerSplA = await associatedAddress({ mint: mintA, owner: userAddress });
//     referrerSplA = await associatedAddress({ mint: mintA, owner: referrers[j] });
//     [splEscrowA] = await PublicKey.findProgramAddress(
//       [Buffer.from(SPL_ESCROW_SEED), mintA.toBuffer()],
//       program.programId
//     );
//   }

//   if (mintB.toBase58() === SOL.toBase58()) {
//     winnerSplB = await associatedAddress({ mint: JUP, owner: userAddress });
//     referrerSplB = await associatedAddress({ mint: JUP, owner: referrers[j] });
//     [splEscrowB] = await PublicKey.findProgramAddress(
//       [Buffer.from(SPL_ESCROW_SEED), JUP.toBuffer()],
//       program.programId
//     );
//   } else {
//     winnerSplB = await associatedAddress({ mint: mintB, owner: userAddress });
//     referrerSplB = await associatedAddress({ mint: mintB, owner: referrers[j] });
//     [splEscrowB] = await PublicKey.findProgramAddress(
//       [Buffer.from(SPL_ESCROW_SEED), mintB.toBuffer()],
//       program.programId
//     );
//   }

//   const tx = new Transaction();
//   const computePriceIx = ComputeBudgetProgram.setComputeUnitPrice({
//     microLamports: 2000000,
//   });
//   tx.add(computePriceIx);

//   const tokenAAccount = await associatedAddress({ mint: JUP, owner: referrers[j] });
//   const tokenBAccount = await associatedAddress({ mint: BONK, owner: referrers[j] });
//   const tokenCAccount = await associatedAddress({ mint: WIF, owner: referrers[j] });
//   const tokenDAccount = await associatedAddress({ mint: POPCAT, owner: referrers[j] });

//   const accountAInfo = await program.provider.connection.getAccountInfo(tokenAAccount, "confirmed");
//   const accountBInfo = await program.provider.connection.getAccountInfo(tokenBAccount, "confirmed");
//   const accountCInfo = await program.provider.connection.getAccountInfo(tokenCAccount, "confirmed");
//   const accountDInfo = await program.provider.connection.getAccountInfo(tokenDAccount, "confirmed");
//   if (!accountAInfo) {
//     // create the token account if it doesn't exist
//     tx.add(
//       createAssociatedTokenAccountInstruction(
//         userAddress,
//         tokenAAccount,
//         referrers[j],
//         JUP
//       )
//     )
//   }
//   if (!accountBInfo) {
//     // create the token account if it doesn't exist
//     tx.add(
//       createAssociatedTokenAccountInstruction(
//         userAddress,
//         tokenBAccount,
//         referrers[j],
//         BONK
//       )
//     )
//   }
//   if (!accountCInfo) {
//     // create the token account if it doesn't exist
//     tx.add(
//       createAssociatedTokenAccountInstruction(
//         userAddress,
//         tokenCAccount,
//         referrers[j],
//         WIF
//       )
//     )
//   }
//   if (!accountDInfo) {
//     // create the token account if it doesn't exist
//     tx.add(
//       createAssociatedTokenAccountInstruction(
//         userAddress,
//         tokenDAccount,
//         referrers[j],
//         POPCAT
//       )
//     )
//   }

//   tx.add(
//     program.instruction.claimCoinflip(
//       bump,
//       {
//         accounts: {
//           admin: userAddress,
//           globalData,
//           coinflipPool: pda,
//           mintA,
//           mintB,
//           winnerSplA,
//           winnerSplB,
//           referrer: referrers[j],
//           referrerSplA,
//           referrerSplB,
//           solVault,
//           splEscrowA,
//           splEscrowB,
//           referralData,
//           systemProgram: SystemProgram.programId,
//           tokenProgram: TOKEN_PROGRAM_ID
//         },
//         instructions: [],
//         signers: [],
//       }
//     )
//   );

//   return tx;
// };

// interface ReferralData {
//   players: PublicKey[];
//   referrers: PublicKey[];
// }

// const getReferralStateByKey = async (
//   referralKey: PublicKey,
//   program: anchor.Program
// ): Promise<ReferralData> => {
//   const referralState = await program.account.referralData.fetch(referralKey);
//   return referralState as unknown as ReferralData;
// };

// /// Comment this because no need to read PDA data from FE side directly
// // export const getStateByKey = async (
// //   wallet: WalletContextState,
// //   gameKey: PublicKey
// // ): Promise<GamePool | null> => {
// //   if (wallet.publicKey === null) return null;
// //   const cloneWindow: any = window;
// //   const userAddress = wallet.publicKey;
// //   const provider = new anchor.AnchorProvider(
// //     solConnection,
// //     cloneWindow["solana"],
// //     anchor.AnchorProvider.defaultOptions()
// //   );
// //   const program = new anchor.Program(
// //     IDL as anchor.Idl,
// //     JACKPOT_PROGRAM_ID,
// //     provider
// //   );
// //   try {
// //     const gameState = await program.account.gamePool.fetch(gameKey);
// //     return gameState as unknown as GamePool;
// //   } catch {
// //     return null;
// //   }
// // };
