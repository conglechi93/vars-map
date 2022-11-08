import React from 'react';
import {
  APPLICATION_SELECTOR_ROUTE,
} from './declareRoute';
const AppSelector = React.lazy(() => import('./AppSelector'));

export const authorize = [
  {
    path: APPLICATION_SELECTOR_ROUTE,
    element: <AppSelector />,
  },
];

export default {authorize};
