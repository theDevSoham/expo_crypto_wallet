import { ethers } from "ethers";

const provider = new ethers.JsonRpcProvider(
  "https://rpc-mumbai.maticvigil.com/v1/e541384afcd3bb9551d2fa936e3e456c801b196e"
);

const privateKey =
  "0xa55c28a75ee03bf5234564b003a08553db4f6fa938a6ee5bc24866db68edf39d";
const wallet = new ethers.Wallet(privateKey, provider);

const recipientAddress = "0x87879c81C2cF72D382E535977974071a7d858021";
const amount = ethers.parseUnits("1", 18); // Assuming 1 MATIC
const gasPrice = ethers.parseUnits("10", "gwei"); // Gas price in Gwei
const gasLimit = 21000; // Gas limit

const transaction = {
  to: recipientAddress,
  value: amount,
  gasPrice,
  gasLimit,
};

export const sendTransaction = async () => {
  try {
    const signedTransaction = await wallet.sendTransaction(transaction);
    console.log("Transaction sent:", signedTransaction.hash);
  } catch (error) {
    console.error("Failed to send transaction:", error);
  }
};
