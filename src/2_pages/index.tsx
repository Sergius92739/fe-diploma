import { navigationMap } from '6_shared';
import { lazy } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

const HomePage = lazy(() => import('./HomePage'));
const OrderConfirmPage = lazy(() => import('./OrderConfirmPage'));
const PassengersPage = lazy(() => import('./PassengersPage'));
const PaymentPage = lazy(() => import('./PaymentPage'));
const PlaceSelectPage = lazy(() => import('./PlaceSelectPage'));
const SuccessfulOrderPage = lazy(() => import('./SuccessfulOrderPage'));
const TrainSelectPage = lazy(() => import('./TrainSelectPage'));

export const Routing = () => {
  return (
    <Routes>
      <Route path={navigationMap.HOME} element={<HomePage />} />
      <Route path="*" element={<Navigate to={navigationMap.HOME} />} />
      <Route path={navigationMap.TRAIN} element={<TrainSelectPage />} />
      <Route path={navigationMap.PLACE} element={<PlaceSelectPage />} />
      <Route path={navigationMap.PASSENGERS} element={<PassengersPage />} />
      <Route path={navigationMap.PAYMENT} element={<PaymentPage />} />
      <Route
        path={navigationMap.ORDER_CONFIRM}
        element={<OrderConfirmPage />}
      />
      <Route
        path={navigationMap.SUCCESSFUL_ORDER}
        element={<SuccessfulOrderPage />}
      />
    </Routes>
  );
};
