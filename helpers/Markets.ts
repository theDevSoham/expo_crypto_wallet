import axios, {AxiosResponse} from 'axios';
const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=7d&locale=en';

const matic_to_usdt_url = 'https://api.binance.com/api/v3/ticker/price?symbol=MATICUSDT';

export const getMarketInfo = async (): Promise<any> => {
	const response: AxiosResponse = await axios.get(url);
	return await response.data;
};

export const getMaticToUSDT = async (): Promise<any> => {
	const response: AxiosResponse = await axios.get(matic_to_usdt_url);
	return await response.data.price;
};