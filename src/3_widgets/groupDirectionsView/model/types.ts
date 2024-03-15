import {
  IDirectionProps,
  TDepartureArrival,
  TDirectionObject
} from '5_entities';
import { FC } from 'react';

export interface DirectionSectionProps {
  direction: TDepartureArrival;
  DirectionLayout: FC<IDirectionProps>;
  isLast: boolean;
}

export type T_GroupDirectionsViewProps = {
  DirectionLayout: FC<IDirectionProps>;
  directionsInfo: TDirectionObject;
};
