import axios, {AxiosResponse} from "axios";

const base_url = "https://api.blockcypher.com/v1/btc/test3/addrs";
const polygon_base_url = "https://api-testnet.polygonscan.com/api?module=account&action=balance";
// tb1qjmfryl0lgycf0saheyw50558szxpakjkcmrltu
// &address=0xCB05FE33C5396E006d32788b22baD1EcfbD3Fa2e
const polygon_api_key='E8YJH1RSGKJ6UJ8E7KB9A2JC3I4DPZSYKJ';
const polygon_trxn_history = 'https://api-testnet.polygonscan.com/api?module=account&action=txlist&sort=asc&apikey=E8YJH1RSGKJ6UJ8E7KB9A2JC3I4DPZSYKJ&address=';

export const getBitcoinWalletInfo = async (address: string): Promise<any> => {
	const url = `${base_url}/${address}`;
	const response: AxiosResponse = await axios.get(url);
	return await response.data;
};

export const getPolygonWalletInfo = async (address: string): Promise<any> => {
	const url = `${polygon_base_url}&address=${address}&apikey=${polygon_api_key}`
	const trxn_url = `${polygon_trxn_history}${address}`;
	const response: AxiosResponse = await axios.get(url);
	const trxn_response: AxiosResponse = await axios.get(trxn_url);
	return await {walletInfo: response.data, transaction: trxn_response.data};
};

export const getPolygonTrxnOnly = async (address: string): Promise<any> => {
	const trxn_url = `${polygon_trxn_history}${address}`;
	const trxn_response: AxiosResponse = await axios.get(trxn_url);
	return await {transaction: trxn_response.data};
};

export const getBitcoinTrxnOnly = async (address: string): Promise<any> => {
	const url = `${base_url}/${address}`;
	const response: AxiosResponse = await axios.get(url);
	return await response.data.txrefs;
};