import { Body, Controller, Get, Post } from '@nestjs/common';
import { ExchangeCurrencyDTO } from 'src/swap-currency/dto/swap-currency.dto';
import { SwapCurrencyService } from 'src/swap-currency/swap-currency.service';

@Controller('swap-currency')
export class SwapCurrencyController {
  constructor(private readonly swapCurrencyService: SwapCurrencyService) {}

  @Get()
  getAll(): string[] {
    try {
      return this.swapCurrencyService.getAll();
    } catch (error) {
      return [];
    }
  }

  @Post()
  exchange(@Body() data: ExchangeCurrencyDTO) {
    return this.swapCurrencyService.exchange(data);
  }
}
