import { TrainIcon } from '6_shared';
import type { FC } from 'react';

export const TrainIconView: FC = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="py-4 px-5 border-[2px] border-white rounded-[100%]">
        <TrainIcon />
      </div>
    </div>
  );
};
