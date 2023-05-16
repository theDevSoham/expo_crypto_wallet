// import axios from 'axios';
// import {Buffer} from 'buffer';

// export class JsonRpcProvider {
//   private url: string;

//   constructor(url: string) {
//     this.url = url;
//   }

//   async send(method: string, params: any[]): Promise<any> {
//     try {
//       const response = await axios.post(this.url, {
//         jsonrpc: '2.0',
//         id: 1,
//         method: method,
//         params: params,
//       });

//       if (response.data && response.data.error) {
//         throw new Error(response.data.error.message);
//       }

//       return response.data.result;
//     } catch (error: any) {
//       throw new Error(`Error sending JSON-RPC request: ${error.message}`);
//     }
//   }

//   async getGasPrice(): Promise<string> {
//     try {
//       const gasPrice = await this.send('eth_gasPrice', []);
//       return gasPrice;
//     } catch (error: any) {
//       throw new Error('Error retrieving gas price:', error);
//     }
//   }
// }

// // sign trxn

// import { keccak256 } from 'js-sha3';

// export async function signTransaction(privateKey: string, transactionData: Record<string, string | number>): Promise<string> {
// 	const unsignedTx = {
// 	  nonce: String(transactionData.nonce) || '0x0',
// 	  gasPrice: String(transactionData.gasPrice) || '0x3B9ACA00', // Gas price (10 Gwei)
// 	  gasLimit: String(transactionData.gas) || '0x5208', // Gas limit
// 	  to: String(transactionData.to),
// 	  value: String(transactionData.value) || '0x0',
// 	  data: String(transactionData.data) || '0x',
// 	  chainId: String(transactionData.chainId) || 80001, // Chain ID (Matic Mumbai testnet)
// 	};

// 	const txHash = keccak256(
// 	  Buffer.concat([
// 		Buffer.from(unsignedTx.nonce.slice(2), 'hex'),
// 		Buffer.from(unsignedTx.gasPrice.slice(2), 'hex'),
// 		Buffer.from(unsignedTx.gasLimit.slice(2), 'hex'),
// 		Buffer.from(unsignedTx.to.slice(2), 'hex'),
// 		Buffer.from(unsignedTx.value.slice(2), 'hex'),
// 		Buffer.from(unsignedTx.data.slice(2), 'hex'),
// 		Buffer.from(unsignedTx.chainId.toString(16), 'hex'),
// 		Buffer.from('00', 'hex'),
// 		Buffer.from('00', 'hex'),
// 	  ])
// 	);

// 	console.log('txHash', txHash);

// 	const signature = await axios.post('https://rpc-mumbai.maticvigil.com/v1/e541384afcd3bb9551d2fa936e3e456c801b196e', {
// 	  method: 'eth_sign',
// 	  params: [transactionData.from, `0x${txHash}`],
// 	  jsonrpc: '2.0',
// 	  id: 1,
// 	});

// 	console.log('signature', signature.data, transactionData.from);

// 	const signatureString = signature.data.toString(); // Convert signature to string

// 	const v = `0x${signatureString.slice(130, 132)}`;
// 	const r = `0x${signatureString.slice(2, 66)}`;
// 	const s = `0x${signatureString.slice(66, 130)}`;

// 	const signedTx = {
// 	  ...unsignedTx,
// 	  v: v + Number(unsignedTx.chainId) * 2 + 35,
// 	  r,
// 	  s,
// 	};

// 	return `0x${Buffer.from(JSON.stringify(signedTx)).toString('hex')}`;
//   }

import axios from "axios";
import { keccak256 } from "js-sha3";
import { Buffer } from "buffer";
import secp256k1 from "secp256k1";

class JsonRpcProvider {
  private url: string;

  constructor(url: string) {
    this.url = url;
  }

  async send(method: string, params: any[]): Promise<any> {
    const response = await axios.post(this.url, {
      method,
      params,
      jsonrpc: "2.0",
      id: 1,
    });

    console.log("response", response.data);

    return response.data.result;
  }

  async getGasPrice(): Promise<string> {
    try {
      const gasPrice = await this.send("eth_gasPrice", []);
      return gasPrice;
    } catch (error: any) {
      throw new Error("Error retrieving gas price:", error);
    }
  }
}

class Wallet {
  private privateKey: string;
  private provider: JsonRpcProvider;

  constructor(privateKey: string, provider: JsonRpcProvider) {
    this.privateKey = privateKey;
    this.provider = provider;
  }

  async sendTransaction(transactionData: Record<string, any>): Promise<any> {
    const unsignedTx = {
      ...transactionData,
      from: this.getAddress(),
    };

    const signedTx = await this.signTransaction(unsignedTx);

    return this.provider.send("eth_sendRawTransaction", [signedTx]);
  }

  //   public async signTransaction(
  //     transactionData: Record<string, any>
  //   ): Promise<string> {
  //     const unsignedTx = {
  //       ...transactionData,
  //       nonce: transactionData.nonce || "0x0",
  //       gasPrice: transactionData.gasPrice || "0x3B9ACA00", // Gas price (10 Gwei)
  //       gasLimit: transactionData.gas || "0x5208", // Gas limit
  //       to: transactionData.to,
  //       value: transactionData.value || "0x0",
  //       data: transactionData.data || "0x",
  //       chainId: transactionData.chainId || 80001, // Chain ID (Matic Mumbai testnet)
  //     };

  //     const serializedTx = JSON.stringify(unsignedTx);
  //     // Implement the signing logic using the private key
  //     // ...

  //     return serializedTx; // Placeholder for the signed transaction
  //   }
  public async signTransaction(
    transactionData: Record<string, any>
  ): Promise<string> {
    const unsignedTx = {
      ...transactionData,
      nonce: transactionData.nonce || "0x0",
      gasPrice: transactionData.gasPrice || "0x3B9ACA00", // Gas price (10 Gwei)
      gasLimit: transactionData.gas || "0x5208", // Gas limit
      to: transactionData.to,
      value: transactionData.value || "0x0",
      data: transactionData.data || "0x",
      chainId: transactionData.chainId || 80001, // Chain ID (Matic Mumbai testnet)
    };

    const serializedTx = JSON.stringify(unsignedTx);

    const privateKey = this.privateKey;
    const hashedPrivateKey = keccak256(privateKey.slice(2));
    const privateKeyBuffer = new Uint8Array(
      Buffer.from(hashedPrivateKey, "hex")
    );

    const hash = new Uint8Array(
      Buffer.from(keccak256(Buffer.from(serializedTx, "utf8")), "hex")
    );
    const signature = secp256k1.ecdsaSign(hash, privateKeyBuffer);

    const v = `0x${(
      signature.recid +
      (Number(unsignedTx.chainId) * 2 + 35)
    ).toString(16)}`;
    const r = `0x${Buffer.from(signature.signature.slice(0, 32)).toString(
      "hex"
    )}`;
    const s = `0x${Buffer.from(signature.signature.slice(32)).toString("hex")}`;

    const signedTx = {
      ...unsignedTx,
      v,
      r,
      s,
    };

    return JSON.stringify(signedTx);
  }

  private getAddress(): string {
    const privateKeyBuffer = Buffer.from(this.privateKey, "hex");
    const publicKeyBuffer = secp256k1
      .publicKeyCreate(privateKeyBuffer, false)
      .slice(1);
    const addressBuffer = keccak256(publicKeyBuffer).slice(-20);
    const address = "0x" + Buffer.from(addressBuffer).toString("hex");
    return address;
  }
}

class BigNumber {
  private value: string;

  constructor(value: string) {
    this.value = value;
  }

  static from(value: string | number): BigNumber {
    return new BigNumber(String(value));
  }

  toString(): string {
    return this.value;
  }

  mul(value: string | number | BigNumber): BigNumber {
    const multiplied =
      parseFloat(this.value) *
      parseFloat(String(value instanceof BigNumber ? value.toString() : value));
    return new BigNumber(String(multiplied));
  }
  toHexString(): string {
    const parsedValue = parseFloat(this.value);
    const hexString = parsedValue.toString(16);
    return `0x${hexString}`;
  }
}

function parseEther(value: string | number): BigNumber {
  const etherValue = Number(value) * 1e18;
  return new BigNumber(etherValue.toString());
}

export { JsonRpcProvider, Wallet, BigNumber, parseEther };
