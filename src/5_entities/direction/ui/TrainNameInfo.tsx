import { ArrowRightBlack } from '6_shared';
import type { FC } from 'react';
import { T_TrainNameInfoProps } from '../model/types';

export const TrainNameInfo: FC<T_TrainNameInfoProps> = ({
  trainName,
  fromCityName,
  toCityName,
  icon
}) => {
  return (
    <div className="bg-[#E4E0E9] p-[1.5rem] text-[#292929]">
      {icon}
      <div className="text-center text-2xl font-medium mt-2">{trainName}</div>
      <div className="font-normal text-base mt-4">
        <div className="flex">
          <div className="">{fromCityName}</div>
          <div className="flex items-center justify-center ml-1">
            <ArrowRightBlack />
          </div>
        </div>
        <div className="">{toCityName}</div>
      </div>
    </div>
  );
};
