import { IDirectionLayoutProps, TDirectionObject } from '5_entities';
import { FC } from 'react';

export type T_GroupDirectionsViewProps = {
  DirectionLayout: FC<IDirectionLayoutProps>;
  directionsInfo: TDirectionObject;
};
