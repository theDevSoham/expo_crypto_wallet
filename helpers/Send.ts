import "@ethersproject/shims";
import { ethers } from "ethers";

const provider = new ethers.providers.JsonRpcProvider(
  "https://rpc-mumbai.maticvigil.com/v1/e541384afcd3bb9551d2fa936e3e456c801b196e"
);

export const send = async (recepient: string, amt: number, pvtKey: string) => {
  const recipientAddress = recepient;
  const amount = ethers.utils.parseUnits(amt.toString(), 18); // Adjust the amount as needed
  const privateKey = pvtKey;
  // "a55c28a75ee03bf5234564b003a08553db4f6fa938a6ee5bc24866db68edf39d";
  const wallet = new ethers.Wallet(privateKey, provider);

  const tx = {
    to: recipientAddress,
    value: amount,
    gasLimit: 21000,
    gasPrice: ethers.utils.parseUnits("10", "gwei"),
  };
  const signedTx = await wallet.sendTransaction(tx);
  return signedTx.hash;
};
