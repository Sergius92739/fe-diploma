import { TCityObj } from '../model/types';

export const citiesObjMapper = (cities: TCityObj[]) => {
  return cities.map((el) => ({ ...el, name: el.name.toUpperCase() }));
};
