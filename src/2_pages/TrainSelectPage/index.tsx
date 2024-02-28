import { useGetByDirectionsQuery } from '3_widgets/ticketSearchForm/api/api';
import { Loader } from '6_shared';
import { useEffect } from 'react';

const TrainSelectPage = () => {
  const { data, error, isLoading } = useGetByDirectionsQuery({
    fromCityId: '65a7e30393154100421a14b6',
    toCityId: '65a7e30393154100421a14b7'
  });

  useEffect(() => {
    console.log({ data, error, isLoading });
  }, [data]);

  return (
    <div>
      {isLoading && <Loader />}
      {error && <div>Error!!!</div>}
      <div>TrainSelectPage</div>
    </div>
  );
};

export default TrainSelectPage;
