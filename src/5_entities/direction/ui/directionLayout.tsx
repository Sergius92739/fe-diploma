import type { FC } from 'react';
import { IDirectionLayoutProps } from '../model/types';

export const DirectionLayout: FC<IDirectionLayoutProps> = ({
  TrainNameInfo,
  DirectionTimeInfo,
  SeatsAndServiceInfo,
  borderCss
}) => {
  return (
    <div
      className={`max-w-[59.9375rem] bg-white border border-[#C4C4C4] ${borderCss} grid grid-cols-[1.01fr_2.42fr_1.5fr]`}
    >
      {TrainNameInfo}
      {DirectionTimeInfo}
      {SeatsAndServiceInfo}
    </div>
  );
};
