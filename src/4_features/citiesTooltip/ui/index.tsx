import { citiesObjMapper } from '4_features/citiesTooltip/lib/citiesObjMapper';
import { TCityObj } from '4_features/citiesTooltip/model/types';
import { TooltipCitiesItem } from '4_features/citiesTooltip/ui/tooltipCitiesItem';
import { btnCSS } from '6_shared';
import type { FC } from 'react';

type T_CitiesTooltipProps = {
  cities: TCityObj[];
  handleCitySelection: (cityObj: TCityObj) => void;
  loading: boolean;
  error: string;
};

export const CitiesTooltip: FC<T_CitiesTooltipProps> = ({
  cities,
  handleCitySelection,
  loading,
  error
}) => {
  const modifyCities = citiesObjMapper(cities);

  return cities.length ? (
    <ul
      className={`py-3 ${btnCSS.XL_WIDTH} bg-white text-base rounded-[3px] mt-1 absolute z-10`}
    >
      {loading && <li className="px-5 py-1">Загрузка...</li>}
      {error && <li className="px-5 py-1">{error}</li>}
      <li className="px-5 py-2 text-xl font-medium">
        Выберите город из списка:
      </li>
      {modifyCities.map((el) => (
        <TooltipCitiesItem
          key={el._id}
          cityObj={el}
          onClick={(el) => handleCitySelection(el)}
        />
      ))}
    </ul>
  ) : null;
};
