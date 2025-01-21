import { Price } from 'src/swap-currency/model/prices';

export const Utils = {
  findTheLatest: (array: Price[]): Price => {
    array.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateB - dateA;
    });
    return array[0];
  },
};
