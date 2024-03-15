import {
  IDirectionProps,
  TDepartureArrival,
  TDirectionObject
} from '5_entities';
import type { FC } from 'react';
import { DirectionSection } from './DirectionSection';

type T_GroupDirectionsViewProps = {
  DirectionLayout: FC<IDirectionProps>;
  directionsInfo: TDirectionObject;
};

export const GroupDirectionsView: FC<T_GroupDirectionsViewProps> = ({
  DirectionLayout,
  directionsInfo
}) => (
  <div className="mt-12">
    <DirectionSection
      direction={directionsInfo.departure as TDepartureArrival}
      DirectionLayout={DirectionLayout}
      isLast={false}
    />
    <DirectionSection
      direction={directionsInfo.arrival as TDepartureArrival}
      DirectionLayout={DirectionLayout}
      isLast={true}
    />
  </div>
);
