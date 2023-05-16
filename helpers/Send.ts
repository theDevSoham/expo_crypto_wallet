import axios from 'axios';
import { JsonRpcProvider, signTransaction } from './Ethers';

// export async function sendMatic(
//   senderAddress: string,
//   receiverAddress: string,
//   senderPrivateKey: string,
//   amount: string
// ): Promise<void> {
//   const rpcUrl = 'https://rpc-mumbai.maticvigil.com/v1/e541384afcd3bb9551d2fa936e3e456c801b196e';

//   const provider = new JsonRpcProvider(rpcUrl);

//   const transactionData = {
//     from: senderAddress,
//     to: receiverAddress,
//     value: `0x${(Number(amount) * 1e18).toString(16)}`,
//     gas: '0x5208', // Gas limit
//     gasPrice: await provider.getGasPrice(),
//     privateKey: senderPrivateKey,
//   };

//   try {
//     const response = await axios.post(rpcUrl, {
//       method: 'eth_sendTransaction',
//       params: [transactionData],
//       jsonrpc: '2.0',
//       id: 1,
//     });

//     if (response.data && response.data.result) {
//       console.log('Matic sent successfully. Transaction hash:', response.data.result);
//     } else {
//       console.error('Failed to send Matic:', response.data?.error?.message);
//     }
//   } catch (error) {
//     console.error('Error sending Matic:', error);
//   }
// }

export async function sendMatic(
	senderAddress: string,
	receiverAddress: string,
	senderPrivateKey: string,
	amount: string
  ): Promise<void> {
	const rpcUrl = 'https://rpc-mumbai.maticvigil.com/v1';

	const provider = new JsonRpcProvider(rpcUrl);
  
	const transactionData = {
	  from: senderAddress,
	  to: receiverAddress,
	  value: `0x${(Number(amount) * 1e18).toString(16)}`,
	  gas: '0x5208', // Gas limit
	  gasPrice: await provider.getGasPrice(), // Gas price (10 Gwei)
	  chainId: 80001, // Chain ID (Matic Mumbai testnet)
	};
  
	try {
	  const signedTransaction = await signTransaction(senderPrivateKey, transactionData);
  
	  const response = await axios.post(rpcUrl, {
		method: 'eth_sendRawTransaction',
		params: [signedTransaction],
		jsonrpc: '2.0',
		id: 1,
	  });
  
	  if (response.data && response.data.result) {
		console.log('Matic sent successfully. Transaction hash:', response.data
  .result);
  } else {
  console.error('Failed to send Matic:', response.data?.error?.message);
  }
  } catch (error) {
  console.error('Error sending Matic:', error);
  }
  }