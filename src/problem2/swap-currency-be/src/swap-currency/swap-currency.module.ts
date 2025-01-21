import { Module } from '@nestjs/common';
import { SwapCurrencyController } from './swap-currency.controller';
import { SwapCurrencyService } from './swap-currency.service';

@Module({
  controllers: [SwapCurrencyController],
  providers: [SwapCurrencyService]
})
export class SwapCurrencyModule {}
