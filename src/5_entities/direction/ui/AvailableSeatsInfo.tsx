import type { FC } from 'react';
import { AvailableSeatsInfoItem } from './AvailableSeatsInfoItem';
import { TClassPrices, TSeatsInfo } from '../model/types';

type T_AvailableSeatsInfoProps = {
  haveFirstClass: boolean;
  haveSecondClass: boolean;
  haveThirdClass: boolean;
  haveFourthClass: boolean;
  availableSeatsInfo: TSeatsInfo;
  priceInfo:
    | {
        [key: string]: TClassPrices;
      }
    | undefined;
};

export const AvailableSeatsInfo: FC<T_AvailableSeatsInfoProps> = ({
  haveFirstClass,
  haveFourthClass,
  haveSecondClass,
  haveThirdClass,
  availableSeatsInfo,
  priceInfo
}) => {
  const arrOfClasses = [
    { isThere: haveFirstClass, name: 'Люкс', prefix: 'first' },
    { isThere: haveSecondClass, name: 'Купе', prefix: 'second' },
    { isThere: haveThirdClass, name: 'Плацкарт', prefix: 'third' },
    { isThere: haveFourthClass, name: 'Сидячий', prefix: 'fourth' }
  ];
  return (
    <ul>
      {arrOfClasses.map((e) =>
        e.isThere ? (
          <AvailableSeatsInfoItem
            key={e.prefix}
            seatsCount={availableSeatsInfo[e.prefix]}
            bottomPrice={priceInfo?.[e.prefix].bottom_price as number}
            nameOfClass={e.name}
          />
        ) : null
      )}
    </ul>
  );
};
