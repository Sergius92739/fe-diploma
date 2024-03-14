import { DirectionBtn } from '4_features';
import {
  IDirectionProps,
  TDepartureArrival,
  TDirectionObject
} from '5_entities';
import { DirectionTimeInfo } from '5_entities';
import { SeatsAndServiceInfo } from '5_entities';
import { TrainIconView } from '5_entities';
import { TrainNameInfo } from '5_entities';
import { ArrowRightYellow } from '6_shared';
import type { FC } from 'react';

type T_GroupDirectionsViewProps = {
  DirectionLayout: FC<IDirectionProps>;
  directionsInfo: TDirectionObject;
};

export const GroupDirectionsView: FC<T_GroupDirectionsViewProps> = ({
  DirectionLayout,
  directionsInfo
}) => {
  const { departure, arrival } = directionsInfo;
  const {
    train: departureTrain,
    to: departureTo,
    from: departureFrom,
    duration: departureDuration,
    have_first_class: departureHaveFirstClass,
    have_second_class: departureHaveSecondClass,
    have_third_class: departureHaveThirdClass,
    have_fourth_class: departureHaveFourthClass,
    have_air_conditioning: departureHaveAirConditioning,
    have_wifi: departureHaveWifi,
    available_seats_info: departureAvailableSeatsInfo,
    price_info: departurePriceInfo,
    is_express: departureIsExpress
  } = departure as TDepartureArrival;

  const {
    train: arrivalTrain,
    to: arrivalTo,
    from: arrivalFrom,
    duration: arrivalDuration,
    have_first_class: arrivalHaveFirstClass,
    have_second_class: arrivalHaveSecondClass,
    have_third_class: arrivalHaveThirdClass,
    have_fourth_class: arrivalHaveFourthClass,
    have_air_conditioning: arrivalHaveAirConditioning,
    have_wifi: arrivalHaveWifi,
    available_seats_info: arrivalAvailableSeatsInfo,
    price_info: arrivalPriceInfo,
    is_express: arrivalIsExpress
  } = arrival as TDepartureArrival;

  return (
    <div className="mt-12">
      <DirectionLayout
        borderNone="border-b-0"
        TrainNameInfo={
          <TrainNameInfo
            trainName={departureTrain.name}
            fromCityName={departureFrom.city.name}
            toCityName={departureTo.city.name}
            icon={<TrainIconView />}
          />
        }
        DirectionTimeInfo={
          <DirectionTimeInfo
            fromDateTime={departureFrom.datetime}
            fromCityName={departureFrom.city.name}
            fromRailwayStation={departureFrom.railway_station_name}
            duration={departureDuration}
            toDateTime={departureTo.datetime}
            toCityName={departureTo.city.name}
            toRailwayStation={departureTo.railway_station_name}
            arrow={<ArrowRightYellow />}
          />
        }
        SeatsAndServiceInfo={
          <SeatsAndServiceInfo
            haveFirstClass={departureHaveFirstClass}
            haveSecondClass={departureHaveSecondClass}
            haveThirdClass={departureHaveThirdClass}
            haveFourthClass={departureHaveFourthClass}
            priceInfo={departurePriceInfo}
            availableSeatsInfo={departureAvailableSeatsInfo}
            haveAirConditioning={departureHaveAirConditioning}
            haveWifi={departureHaveWifi}
            isExpress={departureIsExpress}
          />
        }
      />
      <DirectionLayout
        borderNone="border-t-0"
        TrainNameInfo={
          <TrainNameInfo
            trainName={arrivalTrain.name}
            fromCityName={arrivalFrom.city.name}
            toCityName={arrivalTo.city.name}
            icon={<TrainIconView />}
          />
        }
        DirectionTimeInfo={
          <DirectionTimeInfo
            fromDateTime={arrivalFrom.datetime}
            fromCityName={arrivalFrom.city.name}
            fromRailwayStation={arrivalFrom.railway_station_name}
            duration={arrivalDuration}
            toDateTime={arrivalTo.datetime}
            toCityName={arrivalTo.city.name}
            toRailwayStation={arrivalTo.railway_station_name}
            arrow={<ArrowRightYellow />}
          />
        }
        SeatsAndServiceInfo={
          <SeatsAndServiceInfo
            haveFirstClass={arrivalHaveFirstClass}
            haveSecondClass={arrivalHaveSecondClass}
            haveThirdClass={arrivalHaveThirdClass}
            haveFourthClass={arrivalHaveFourthClass}
            priceInfo={arrivalPriceInfo}
            availableSeatsInfo={arrivalAvailableSeatsInfo}
            haveAirConditioning={departureHaveAirConditioning}
            haveWifi={arrivalHaveWifi}
            isExpress={arrivalIsExpress}
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
