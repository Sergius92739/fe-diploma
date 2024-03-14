import type { FC, ReactNode } from 'react';
import { AvailableSeatsInfo } from './AvailableSeatsInfo';
import { T_SeatsAndServiceInfoProps } from '../model/types';
import { ServiceInfo } from './ServiceInfo';

export const SeatsAndServiceInfo: FC<T_SeatsAndServiceInfoProps> = ({
  haveAirConditioning,
  haveFirstClass,
  haveFourthClass,
  haveSecondClass,
  haveThirdClass,
  haveWifi,
  priceInfo,
  availableSeatsInfo,
  isExpress,
  children
}) => {
  return (
    <div className="pt-3 pb-5 px-5 border-l flex flex-col justify-between">
      <AvailableSeatsInfo
        haveFirstClass={haveFirstClass}
        haveSecondClass={haveSecondClass}
        haveThirdClass={haveThirdClass}
        haveFourthClass={haveFourthClass}
        priceInfo={priceInfo}
        availableSeatsInfo={availableSeatsInfo}
      />
      <div>
        <ServiceInfo
          haveAirConditioning={haveAirConditioning}
          haveWifi={haveWifi}
          isExpress={isExpress}
        />
        {children}
      </div>
    </div>
  );
};
