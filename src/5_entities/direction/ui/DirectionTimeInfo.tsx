import { ArrowRightYellow, msecToString } from '6_shared';
import type { FC } from 'react';

type T_DirectionTimeInfoProps = {
  fromDateTime: number;
  fromCityName: string;
  fromRailwayStation: string;
  duration: number;
  toDateTime: number;
  toCityName: string;
  toRailwayStation: string;
};

export const DirectionTimeInfo: FC<T_DirectionTimeInfoProps> = ({
  fromDateTime,
  fromCityName,
  fromRailwayStation,
  duration,
  toDateTime,
  toCityName,
  toRailwayStation
}) => {
  return (
    <>
      <div className="pl-9 py-10">
        <div className="text-2xl font-bold">{msecToString(fromDateTime)}</div>
        <div className="font-normal text-[18px]">{fromCityName}</div>
        <div className="text-[#C4C4C4] text-[16px]">{fromRailwayStation}</div>
      </div>
      <div>
        <div className="text-[18px] text-center text-[#C4C4C4] mt-9">
          {msecToString(duration)}
        </div>
        <div className="flex justify-center mt-2">
          <ArrowRightYellow />
        </div>
      </div>
      <div className="pl-9 py-10">
        <div className="text-2xl font-bold">{msecToString(toDateTime)}</div>
        <div className="font-normal text-[18px]">{toCityName}</div>
        <div className="text-[#C4C4C4] text-[16px]">{toRailwayStation}</div>
      </div>
    </>
  );
};
