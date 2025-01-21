import { Injectable } from '@nestjs/common';
import { prices } from './model/prices';
import { ExchangeCurrencyDTO } from 'src/swap-currency/dto/swap-currency.dto';
import { Utils } from 'src/utils';
@Injectable()
export class SwapCurrencyService {
  getAll() {
    return Array.from(new Set(prices.map(coin => coin.currency)));
  }

  exchange(data: ExchangeCurrencyDTO) {
    const from = Utils.findTheLatest(prices.filter(item => item.currency === data.from));
    const to = Utils.findTheLatest(prices.filter(item => item.currency === data.to));

    if (!from) {
      return;
    }

    if (!to) {
      return;
    }

    return (data.amount * to.price / from.price).toFixed(4);
  }
}
