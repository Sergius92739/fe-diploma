import { upperCaseFirst } from '6_shared';
import { TCityObj } from '../model/types';

export const citiesObjMapper = (cities: TCityObj[]) => {
  return cities.map((el) => ({ ...el, name: upperCaseFirst(el.name) }));
};
