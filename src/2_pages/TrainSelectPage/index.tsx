import {
  useGetByDirectionsQuery,
  useGetByDirectionStartDateEndDateQuery
} from '3_widgets/ticketSearchForm/api/api';
import { selectTicketSearch } from '3_widgets/ticketSearchForm/model/ticketSearchSlice';
import { TDepartureArrival } from '5_entities';
import { Direction } from '5_entities/direction/ui';
import { Loader } from '6_shared';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const TrainSelectPage = () => {
  const {
    selectedStartCityObject,
    selectedEndCityObject,
    selectedDepartureDate,
    selectedArrivalDate,
    startCityInputValue,
    endCityInputValue,
    departureDateInputValue,
    arrivalDateInputValue
  } = useSelector(selectTicketSearch);

  const { data, error, isLoading } = useGetByDirectionStartDateEndDateQuery({
    fromCityId: selectedStartCityObject?._id as number,
    toCityId: selectedEndCityObject?._id as number,
    dateStart: selectedDepartureDate,
    dateEnd: selectedArrivalDate
  });

  useEffect(() => {
    console.log({ data, error, isLoading });
  }, [data]);

  return (
    <div>
      {isLoading && <Loader />}
      {error && <div>Error!!!</div>}
      <div>TrainSelectPage</div>
      {data?.items &&
        data?.items.map((e) => (
          <Direction
            key={e.departure?._id}
            {...(e.departure as TDepartureArrival)}
          />
        ))}
    </div>
  );
};

export default TrainSelectPage;
