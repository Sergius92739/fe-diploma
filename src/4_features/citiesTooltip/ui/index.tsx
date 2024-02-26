import { citiesObjMapper } from '4_features/citiesTooltip/lib/citiesObjMapper';
import { TCityObj } from '4_features/citiesTooltip/model/types';
import { TooltipCitiesItem } from '4_features/citiesTooltip/ui/tooltipCitiesItem';
import { btnCSS } from '6_shared';
import type { FC } from 'react';

type T_CitiesTooltipProps = {
  cities: TCityObj[];
  handleCitySelection: (cityObj: TCityObj) => void;
};

export const CitiesTooltip: FC<T_CitiesTooltipProps> = ({
  cities,
  handleCitySelection
}) => {
  cities = citiesObjMapper(cities);

  return cities.length ? (
    <ul
      className={`py-3 ${btnCSS.XL_WIDTH} bg-white text-base rounded-[3px] mt-1 absolute z-10`}
    >
      {cities.map((el) => (
        <TooltipCitiesItem
          key={el._id}
          cityObj={el}
          onClick={() => handleCitySelection(el)}
        />
      ))}
    </ul>
  ) : null;
};
