import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, Min } from "class-validator";
import { IsCurrency } from "src/validators/is-currency";

export class ExchangeCurrencyDTO {
  @ApiProperty()
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  amount: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsCurrency({message: "from is not a valid currency"})
  from: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsCurrency({message: "to is not a valid currency"})
  to: string;
}