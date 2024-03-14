import type { FC } from 'react';
import { IDirectionProps } from '../model/types';

export const DirectionLayout: FC<IDirectionProps> = ({
  TrainNameInfo,
  DirectionTimeInfo,
  SeatsAndServiceInfo,
  borderNone
}) => {
  return (
    <div
      className={`max-w-[59.9375rem] bg-white border border-[#C4C4C4] ${borderNone} grid grid-cols-[1.01fr_2.42fr_1.5fr]`}
    >
      {TrainNameInfo}
      {DirectionTimeInfo}
      {SeatsAndServiceInfo}
    </div>
  );
};
