import { Loader } from '6_shared';
import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';

export const withRouter = (component: () => React.ReactNode) => () => (
  <BrowserRouter>
    <Suspense fallback={<Loader />}>{component()}</Suspense>
  </BrowserRouter>
);
