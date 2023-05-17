import "node-libs-expo/globals";
import axios from "axios";

import * as Random from "expo-random";

// implement window.getRandomValues(), for packages that rely on it
if (typeof window === "object") {
  if (!window.crypto) window.crypto = {};
  if (!window.crypto.getRandomValues) {
    window.crypto.getRandomValues = async function getRandomValues(arr) {
      let orig = arr;
      if (arr.byteLength != arr.length) {
        // Get access to the underlying raw bytes
        arr = new Uint8Array(arr.buffer);
      }
      const bytes = await Random.getRandomBytesAsync(arr.length);
      for (var i = 0; i < bytes.length; i++) {
        arr[i] = bytes[i];
      }

      return orig;
    };
  }
}

import * as bitcoin from "bitcoinjs-lib";
const satoshiPerBitcoin = 100000000;

let walletA = {
    addr: "mz4o7eZmsKfpvExMvSeSC5U88PcQbWCacw",
    privateKey: "cMrPiFvK9La9msb7HuEtT2wahcgihKEVEoAQUJwabJbDz8Y22ghF"
}

let walletB = {
    addr: "n2ddgS3CUWQ3JnhMEHJ5PZupkhYtaMhB1g",
    privateKey: "cUnKQ1FYqvP3gYcT5oSxhavfJ2ScUHC7rfsQk6PUmekfXXjgumpq"
}

const senderAddress = walletA.addr;
const receiverAddress = walletB.addr;
const pvtKey = walletA.privateKey;
const amount = 0.00001; // Bitcoin amount to send

export async function sendBitcoin() {
	try {
	  // Fetch unspent transaction outputs (UTXOs) for the sender address
	  const response = await axios.get(`https://blockstream.info/testnet/api/address/${senderAddress}/utxo`);
	  const utxos = response.data;
  
	  // Create a new Bitcoin transaction
	  const txb = new bitcoin.TransactionBuilder(bitcoin.networks.testnet);
  
	  // Add the input UTXOs to the transaction
	  utxos.forEach((utxo: any) => {
		txb.addInput(utxo.txid, utxo.vout);
	  });
  
	  // Add the output for the recipient address
	  txb.addOutput(receiverAddress, Math.floor(amount * satoshiPerBitcoin));
  
	  // Sign the transaction inputs with the private keys
	  utxos.forEach((utxo: any, index: number) => {
		txb.sign(index, bitcoin.ECPair.fromWIF(pvtKey, bitcoin.networks.testnet));
	  });
  
	  // Build the transaction
	  const tx = txb.build();
  
	  // Serialize the transaction to hexadecimal format
	  const serializedTx = tx.toHex();
  
	  // Send the transaction request
	  const response2 = await axios.post('https://blockstream.info/testnet/api/tx', serializedTx);
  
	  // Retrieve the transaction ID from the response
	  const transactionId = response2.data;
  
	  console.log('Transaction sent successfully. Transaction ID:', transactionId);
	} catch (error) {
	  console.error('Error sending transaction:', error);
	}
  }

