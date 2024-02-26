import { btnCSS } from '6_shared';
import { Button } from '6_shared';
import type { FC } from 'react';

export const TicketSearchFormBtn: FC = () => {
  return (
    <Button
      content="найти билеты"
      color={btnCSS.TEXT_DARK}
      bgColor={btnCSS.BASE_CLR}
      width={btnCSS.XL_WIDTH}
      height={btnCSS.XL_HEIGHT}
    />
  );
};
