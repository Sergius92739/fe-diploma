import { TDepartureArrival } from '5_entities';
import type { FC } from 'react';
import { DirectionSection } from '5_entities';
import { T_GroupDirectionsViewProps } from '../model/types';
import { DirectionBtn } from '4_features';

export const GroupDirectionsView: FC<T_GroupDirectionsViewProps> = ({
  DirectionLayout,
  directionsInfo
}) => (
  <div className="mt-12">
    <DirectionSection
      direction={directionsInfo.departure as TDepartureArrival}
      DirectionLayout={DirectionLayout}
      borderCss="border-b-0"
    />
    <DirectionSection
      direction={directionsInfo.arrival as TDepartureArrival}
      DirectionLayout={DirectionLayout}
      borderCss="border-t-0"
    >
      <DirectionBtn />
    </DirectionSection>
  </div>
);
