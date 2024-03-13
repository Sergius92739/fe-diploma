import { ArrowRightBlack, TrainIcon } from '6_shared';
import type { FC } from 'react';

type T_TrainNameInfoProps = {
  trainName: string;
  fromCityName: string;
  toCityName: string;
};

export const TrainNameInfo: FC<T_TrainNameInfoProps> = ({
  trainName,
  fromCityName,
  toCityName
}) => {
  return (
    <div className="bg-[#E4E0E9] p-[1.5rem] text-[#292929]">
      <div className="flex items-center justify-center">
        <div className="py-4 px-5 border-[2px] border-white rounded-[100%]">
          <TrainIcon />
        </div>
      </div>
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
