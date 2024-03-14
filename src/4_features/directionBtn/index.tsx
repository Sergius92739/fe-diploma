import { Button, btnCSS } from '6_shared';
import type { FC } from 'react';

export const DirectionBtn: FC = () => {
  return (
    <div>
      <Button
        content="Выбрать места"
        color={btnCSS.TEXT_WHITE}
        bgColor={btnCSS.BASE_CLR}
        width={btnCSS.SM_WIDTH}
        height={btnCSS.SM_HEIGHT}
        uppercase=""
      />
    </div>
  );
};
