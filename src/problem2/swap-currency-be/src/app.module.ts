import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SwapCurrencyModule } from './swap-currency/swap-currency.module';

@Module({
  imports: [SwapCurrencyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
