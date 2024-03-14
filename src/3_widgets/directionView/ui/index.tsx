import { DirectionBtn } from '4_features';
import { TDepartureArrival } from '5_entities';
import { IDirectionProps } from '5_entities';
import { DirectionTimeInfo } from '5_entities';
import { SeatsAndServiceInfo } from '5_entities';
import { TrainIconView } from '5_entities';
import { TrainNameInfo } from '5_entities';
import { ArrowRightYellow } from '6_shared';
import type { FC } from 'react';

type T_DirectionViewProps = {
  DirectionLayout: FC<IDirectionProps>;
  directionInfo: TDepartureArrival;
};

export const DirectionView: FC<T_DirectionViewProps> = ({
  DirectionLayout,
  directionInfo
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
  } = directionInfo;

  return (
    <div className="mt-12">
      <DirectionLayout
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
            duration={duration}
            fromDateTime={from.datetime}
            fromCityName={from.city.name}
            fromRailwayStation={from.railway_station_name}
            toRailwayStation={to.railway_station_name}
            toCityName={to.city.name}
            toDateTime={to.datetime}
            arrow={<ArrowRightYellow />}
          />
        }
        SeatsAndServiceInfo={
          <SeatsAndServiceInfo
            haveAirConditioning={have_air_conditioning}
            haveFirstClass={have_first_class}
            haveSecondClass={have_second_class}
            haveThirdClass={have_third_class}
            haveFourthClass={have_fourth_class}
            haveWifi={have_wifi}
            priceInfo={price_info}
            isExpress={is_express}
            availableSeatsInfo={available_seats_info}
          >
            <div className="text-right">
              <DirectionBtn />
            </div>
          </SeatsAndServiceInfo>
        }
      />
    </div>
  );
};
