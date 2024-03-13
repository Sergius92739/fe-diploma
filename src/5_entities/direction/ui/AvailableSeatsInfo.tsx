import { Ruble } from '6_shared';
import type { FC } from 'react';

type T_AvailableSeatsInfoProps = {
  seatsCount: number;
  seatsTopPrice: number;
  nameOfClass: string;
};

export const AvailableSeatsInfo: FC<T_AvailableSeatsInfoProps> = ({
  seatsCount,
  seatsTopPrice,
  nameOfClass
}) => {
  return (
    <li className="flex justify-between items-baseline mt-3">
      <div className="w-20">{nameOfClass}</div>
      <div className="font-medium text-[#FFA800]">{seatsCount}</div>
      <div className="flex items-baseline">
        <div className="text-[#928F94]">от</div>
        <div className="ml-2 text-2xl font-bold w-14">{seatsTopPrice}</div>
        <div className="ml-2">
          <Ruble />
        </div>
      </div>
    </li>
  );
};
