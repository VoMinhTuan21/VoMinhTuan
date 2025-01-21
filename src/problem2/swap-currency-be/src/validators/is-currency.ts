import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
import { prices } from 'src/swap-currency/model/prices';

export function IsCurrency(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isCurrency',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          return typeof value === 'string'  && Boolean(prices.find(item => item.currency === value)); // you can return a Promise<boolean> here as well, if you want to make async validation
        },
      },
    });
  };
}