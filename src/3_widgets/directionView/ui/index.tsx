import { DirectionBtn } from '4_features';
import { DirectionSection, TDepartureArrival } from '5_entities';
import type { FC } from 'react';
import { T_DirectionViewProps } from '../model/types';

export const DirectionView: FC<T_DirectionViewProps> = ({
  DirectionLayout,
  directionInfo
}) => {
  return (
    <div className="mt-12">
      <DirectionSection
        direction={directionInfo.departure as TDepartureArrival}
        DirectionLayout={DirectionLayout}
        borderCss=""
      >
        <DirectionBtn />
      </DirectionSection>
    </div>
  );
};
