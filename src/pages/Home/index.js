import React from 'react';
import {
  HOME_PAGE_ROUTE,
} from './declareRoute';

const Home = React.lazy(() => import('./HomePage'));

export const authorize = [
  {
    path: HOME_PAGE_ROUTE,
    element: <Home />,
  },
];

export default {authorize};