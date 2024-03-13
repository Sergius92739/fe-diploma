import type { FC } from 'react';
import { TDepartureArrival } from '../model/types';
import {
  ArrowRightBlack,
  ArrowRightYellow,
  Button,
  Conditioner,
  Express,
  Ruble,
  TrainIcon,
  Wifi,
  btnCSS,
  msecToString
} from '6_shared';
import { TrainNameInfo } from './TrainNameInfo';
import { DirectionTimeInfo } from './DirectionTimeInfo';
import { AvailableSeatsInfo } from './AvailableSeatsInfo';

export const Direction: FC<TDepartureArrival> = (props) => {
  const {
    train,
    to,
    from,
    duration,
    have_first_class,
    have_second_class,
    have_third_class,
    have_fourth_class,
    available_seats_info,
    price_info,
    have_air_conditioning,
    have_wifi,
    is_express
  } = props;

  const arrOfClasses = [
    { isThere: have_first_class, name: 'Люкс', prefix: 'first' },
    { isThere: have_second_class, name: 'Купе', prefix: 'second' },
    { isThere: have_third_class, name: 'Плацкарт', prefix: 'third' },
    { isThere: have_fourth_class, name: 'Сидячий', prefix: 'fourth' }
  ];

  return (
    <div className="max-w-[59.9375rem] bg-white border border-[#C4C4C4] grid grid-cols-[1.01fr_1.01fr_0.4fr_1.01fr_1.5fr]">
      <TrainNameInfo
        trainName={train.name}
        fromCityName={from.city.name}
        toCityName={to.city.name}
      />
      <DirectionTimeInfo
        fromCityName={from.city.name}
        fromDateTime={from.datetime}
        fromRailwayStation={from.railway_station_name}
        toCityName={to.city.name}
        duration={duration}
        toDateTime={to.datetime}
        toRailwayStation={to.railway_station_name}
      />
      <div className="pt-6 pb-5 px-5 border-l flex flex-col justify-between">
        <div className="">
          <ul className="">
            {arrOfClasses.map((e) =>
              e.isThere ? (
                <AvailableSeatsInfo
                  key={e.prefix}
                  seatsCount={available_seats_info[e.prefix]}
                  seatsTopPrice={price_info?.[e.prefix].top_price as number}
                  nameOfClass={e.name}
                />
              ) : null
            )}
          </ul>
        </div>
        <div className="text-center">
          <ul className="flex justify-end mb-3 mt-3">
            {have_air_conditioning && (
              <li className="mx-2">
                <Conditioner />
              </li>
            )}
            {have_wifi && (
              <li className="mx-2">
                <Wifi />
              </li>
            )}
            {is_express && (
              <li className="mx-2">
                <Express />
              </li>
            )}
          </ul>
          <Button
            content="Выбрать места"
            color={btnCSS.TEXT_WHITE}
            bgColor={btnCSS.BASE_CLR}
            width={btnCSS.SM_WIDTH}
            height={btnCSS.SM_HEIGHT}
            uppercase=""
          />
        </div>
      </div>
    </div>
  );
};
