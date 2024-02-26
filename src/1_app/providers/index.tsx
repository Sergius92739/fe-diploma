import compose from 'compose-function';
import { withRouter } from './with-router';
import { withRedux } from './with-redux';

export const withProviders = compose(withRedux, withRouter);
