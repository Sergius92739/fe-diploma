import { FC } from 'react';
import { DirectionSectionProps } from '../model/types';
import {
  DirectionTimeInfo,
  SeatsAndServiceInfo,
  TrainIconView,
  TrainNameInfo
} from '5_entities';
import { ArrowRightYellow } from '6_shared';
import { DirectionBtn } from '4_features';

export const DirectionSection: FC<DirectionSectionProps> = ({
  direction,
  DirectionLayout,
  isLast
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
      borderNone={isLast ? 'border-t-0' : 'border-b-0'}
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
          {isLast && (
            <div className="text-right">
              <DirectionBtn />
            </div>
          )}
        </SeatsAndServiceInfo>
      }
    />
  );
};
