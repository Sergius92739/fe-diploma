import { IDirectionLayoutProps, TDirectionObject } from '5_entities';
import type { FC } from 'react';

export type T_DirectionViewProps = {
  DirectionLayout: FC<IDirectionLayoutProps>;
  directionInfo: TDirectionObject;
};
