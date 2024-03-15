import { IDirectionProps, TDepartureArrival } from '5_entities';
import { FC } from 'react';

export interface DirectionSectionProps {
  direction: TDepartureArrival;
  DirectionLayout: FC<IDirectionProps>;
  isLast: boolean;
}
