import { Conditioner, Wifi, Express } from '6_shared';
import type { FC } from 'react';

export type T_ServiceInfoProps = {
  haveAirConditioning: boolean;
  haveWifi: boolean;
  isExpress: boolean;
};

export const ServiceInfo: FC<T_ServiceInfoProps> = ({
  haveAirConditioning,
  haveWifi,
  isExpress
}) => {
  return (
    <ul className="flex justify-end my-3">
      {haveAirConditioning && (
        <li className="mx-2">
          <Conditioner />
        </li>
      )}
      {haveWifi && (
        <li className="mx-2">
          <Wifi />
        </li>
      )}
      {isExpress && (
        <li className="mx-2">
          <Express />
        </li>
      )}
    </ul>
  );
};
