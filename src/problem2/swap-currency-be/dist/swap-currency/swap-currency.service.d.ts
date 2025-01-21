import { ExchangeCurrencyDTO } from 'src/swap-currency/dto/swap-currency.dto';
export declare class SwapCurrencyService {
    getAll(): string[];
    exchange(data: ExchangeCurrencyDTO): string | undefined;
}
