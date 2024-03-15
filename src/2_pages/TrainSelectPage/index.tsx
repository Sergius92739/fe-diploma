import { DirectionView } from '3_widgets';
import { GroupDirectionsView } from '3_widgets';
import { useGetByDirectionStartDateEndDateQuery } from '3_widgets/ticketSearchForm/api/api';
import { selectTicketSearch } from '3_widgets/ticketSearchForm/model/ticketSearchSlice';
import { TDepartureArrival } from '5_entities';
import { DirectionLayout } from '5_entities';
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
      {data?.items.length
        ? data.items.map((e) =>
            e.arrival ? (
              <GroupDirectionsView
                key={e.departure?._id}
                DirectionLayout={DirectionLayout}
                directionsInfo={e}
              />
            ) : (
              <DirectionView
                key={e.departure?._id}
                DirectionLayout={DirectionLayout}
                directionInfo={e}
              />
            )
          )
        : null}
    </div>
  );
};

export default TrainSelectPage;
