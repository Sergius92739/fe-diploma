import { store } from '1_app/store';
import { ReactNode } from 'react';
import { Provider as ReduxProvider } from 'react-redux';

export const withRedux = (component: () => ReactNode) => () => (
  <ReduxProvider store={store}>{component()}</ReduxProvider>
);
