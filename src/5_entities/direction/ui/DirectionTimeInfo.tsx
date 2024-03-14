import { msecToString } from '6_shared';
import type { FC, ReactNode } from 'react';
import { T_DirectionTimeInfoProps } from '../model/types';

export const DirectionTimeInfo: FC<T_DirectionTimeInfoProps> = ({
  fromDateTime,
  fromCityName,
  fromRailwayStation,
  duration,
  toDateTime,
  toCityName,
  toRailwayStation,
  arrow
}) => {
  return (
    <div className="flex p-8 justify-between">
      <div className="">
        <div className="text-2xl font-bold">{msecToString(fromDateTime)}</div>
        <div className="font-normal text-[18px]">{fromCityName}</div>
        <div className="text-[#C4C4C4] text-[16px]">{fromRailwayStation}</div>
      </div>
      <div>
        <div className="text-[18px] text-center text-[#C4C4C4]">
          {msecToString(duration)}
        </div>
        <div className="flex justify-center mt-2">{arrow}</div>
      </div>
      <div className="">
        <div className="text-2xl font-bold">{msecToString(toDateTime)}</div>
        <div className="font-normal text-[18px]">{toCityName}</div>
        <div className="text-[#C4C4C4] text-[16px]">{toRailwayStation}</div>
      </div>
    </div>
  );
};
