import { ExchangeCurrencyDTO } from 'src/swap-currency/dto/swap-currency.dto';
import { SwapCurrencyService } from 'src/swap-currency/swap-currency.service';
export declare class SwapCurrencyController {
    private readonly swapCurrencyService;
    constructor(swapCurrencyService: SwapCurrencyService);
    getAll(): string[];
    exchange(data: ExchangeCurrencyDTO): string | undefined;
}
