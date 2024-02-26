import { headerTitlesCSS } from '6_shared/config/enums';

type TgetTailwindClasses = typeof headerTitlesCSS;

export const getTailwindClasses = (props: TgetTailwindClasses) => {
  return Object.values(props).join(' ');
};
