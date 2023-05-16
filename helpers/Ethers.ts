import axios from 'axios';
import {Buffer} from 'buffer';

export class JsonRpcProvider {
  private url: string;

  constructor(url: string) {
    this.url = url;
  }

  async send(method: string, params: any[]): Promise<any> {
    try {
      const response = await axios.post(this.url, {
        jsonrpc: '2.0',
        id: 1,
        method: method,
        params: params,
      });

      if (response.data && response.data.error) {
        throw new Error(response.data.error.message);
      }

      return response.data.result;
    } catch (error: any) {
      throw new Error(`Error sending JSON-RPC request: ${error.message}`);
    }
  }

  async getGasPrice(): Promise<string> {
    try {
      const gasPrice = await this.send('eth_gasPrice', []);
      return gasPrice;
    } catch (error: any) {
      throw new Error('Error retrieving gas price:', error);
    }
  }
}

// sign trxn

import { keccak256 } from 'js-sha3';

export async function signTransaction(privateKey: string, transactionData: Record<string, string | number>): Promise<string> {
	const unsignedTx = {
	  nonce: String(transactionData.nonce) || '0x0',
	  gasPrice: String(transactionData.gasPrice) || '0x3B9ACA00', // Gas price (10 Gwei)
	  gasLimit: String(transactionData.gas) || '0x5208', // Gas limit
	  to: String(transactionData.to),
	  value: String(transactionData.value) || '0x0',
	  data: String(transactionData.data) || '0x',
	  chainId: String(transactionData.chainId) || 80001, // Chain ID (Matic Mumbai testnet)
	};
  
	const txHash = keccak256(
	  Buffer.concat([
		Buffer.from(unsignedTx.nonce.slice(2), 'hex'),
		Buffer.from(unsignedTx.gasPrice.slice(2), 'hex'),
		Buffer.from(unsignedTx.gasLimit.slice(2), 'hex'),
		Buffer.from(unsignedTx.to.slice(2), 'hex'),
		Buffer.from(unsignedTx.value.slice(2), 'hex'),
		Buffer.from(unsignedTx.data.slice(2), 'hex'),
		Buffer.from(unsignedTx.chainId.toString(16), 'hex'),
		Buffer.from('00', 'hex'),
		Buffer.from('00', 'hex'),
	  ])
	);
  
	const signature = await axios.post('https://rpc-mumbai.maticvigil.com/v1/e541384afcd3bb9551d2fa936e3e456c801b196e', {
	  method: 'eth_sign',
	  params: [transactionData.from, `0x${txHash}`],
	  jsonrpc: '2.0',
	  id: 1,
	});

	console.log('signature', signature.data);
  
	const signatureString = signature.data.toString(); // Convert signature to string
  
	const v = `0x${signatureString.slice(130, 132)}`;
	const r = `0x${signatureString.slice(2, 66)}`;
	const s = `0x${signatureString.slice(66, 130)}`;
  
	const signedTx = {
	  ...unsignedTx,
	  v: v + Number(unsignedTx.chainId) * 2 + 35,
	  r,
	  s,
	};
  
	return `0x${Buffer.from(JSON.stringify(signedTx)).toString('hex')}`;
  }