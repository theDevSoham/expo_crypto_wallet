import axios, {AxiosResponse} from 'axios';
const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=7d&locale=en';

export const getMarketInfo = async (): Promise<any> => {
	const response: AxiosResponse = await axios.get(url);
	return await response.data;
};