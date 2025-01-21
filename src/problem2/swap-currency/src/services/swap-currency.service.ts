import axios from 'axios';
import { ExchangeCurrencyDTO } from '../../types';

const baseUrl = 'http://localhost:3000';

export const swapCurrencyService = {
  getAllCurrency: () => {
    return axios.get<string[]>(`${baseUrl}/swap-currency`);
  },
  exchange: (data: ExchangeCurrencyDTO) => {
    return axios.post<number>(`${baseUrl}/swap-currency`, data);
  }
}

export default swapCurrencyService;