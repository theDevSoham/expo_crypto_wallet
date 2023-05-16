import Web3 from "web3";

const providerUrl =
  "https://rpc-mumbai.maticvigil.com/v1/e541384afcd3bb9551d2fa936e3e456c801b196e";
const web3 = new Web3(providerUrl);

const privateKey =
  "a55c28a75ee03bf5234564b003a08553db4f6fa938a6ee5bc24866db68edf39d";
const account = web3.eth.accounts.privateKeyToAccount(privateKey);

const recipientAddress = "0x87879c81C2cF72D382E535977974071a7d858021";
const amount = web3.utils.toWei("1", "ether"); // Assuming 1 MATIC
const gasPrice = "10000000000"; // Gas price in wei
const gasLimit = "21000"; // Gas limit

const transaction = {
  from: account.address,
  to: recipientAddress,
  value: amount,
  gasPrice,
  gas: gasLimit,
};

export const sendTransaction = async () => {
  try {
    const signedTransaction = await account.signTransaction(transaction);
    const result = await web3.eth.sendSignedTransaction(
      signedTransaction.rawTransaction || ""
    );
    console.log("Transaction sent:", result.transactionHash);
  } catch (error) {
    console.error("Failed to send transaction:", error);
  }
};
