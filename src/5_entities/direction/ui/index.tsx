import { FC } from 'react';
import { DirectionSectionProps } from '../model/types';
import { DirectionTimeInfo } from './DirectionTimeInfo';
import { SeatsAndServiceInfo } from './SeatsAndServiceInfo';
import { TrainIconView } from './TrainIconView';
import { TrainNameInfo } from './TrainNameInfo';
import { ArrowRightYellow } from '6_shared';

export const DirectionSection: FC<DirectionSectionProps> = ({
  direction,
  DirectionLayout,
  borderCss,
  children
}) => {
  const {
    train,
    to,
    from,
    duration,
    have_first_class,
    have_second_class,
    have_third_class,
    have_fourth_class,
    have_air_conditioning,
    have_wifi,
    available_seats_info,
    price_info,
    is_express
  } = direction;

  return (
    <DirectionLayout
      borderCss={borderCss}
      TrainNameInfo={
        <TrainNameInfo
          trainName={train.name}
          fromCityName={from.city.name}
          toCityName={to.city.name}
          icon={<TrainIconView />}
        />
      }
      DirectionTimeInfo={
        <DirectionTimeInfo
          fromDateTime={from.datetime}
          fromCityName={from.city.name}
          fromRailwayStation={from.railway_station_name}
          duration={duration}
          toDateTime={to.datetime}
          toCityName={to.city.name}
          toRailwayStation={to.railway_station_name}
          arrow={<ArrowRightYellow />}
        />
      }
      SeatsAndServiceInfo={
        <SeatsAndServiceInfo
          haveFirstClass={have_first_class}
          haveSecondClass={have_second_class}
          haveThirdClass={have_third_class}
          haveFourthClass={have_fourth_class}
          priceInfo={price_info}
          availableSeatsInfo={available_seats_info}
          haveAirConditioning={have_air_conditioning}
          haveWifi={have_wifi}
          isExpress={is_express}
        >
          {<div className="text-right">{children}</div>}
        </SeatsAndServiceInfo>
      }
    />
  );
};
