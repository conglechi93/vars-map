import React from 'react';
import {
    USER_PROFILE_ROUTE,
} from './declareRoute';

const Profile = React.lazy(() => import('./Profile'));

export const authorize = [
  {
    path: USER_PROFILE_ROUTE,
    element: <Profile />,
  },
];

export default {authorize};