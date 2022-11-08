import {errorPagesConfigs} from './errorPages';
import {defaultSignInUrl, initialUrl} from '../shared/constants/AppConst';
import React from 'react';
import applicationConfig from './ApplicationManagement';
import receptionConfig from './SSOReception';
import {Navigate} from 'react-router-dom';
import {ERROR_404_ROUTE} from './errorPages/declareRoute';
import Intermediate from './Intermediate';
import profileConfig from './ProfileManagement';
import {authorize} from './Home';
const Error403 = React.lazy(() => import('./errorPages/Error403'));

const authorizedStructure = {
  fallbackPath: defaultSignInUrl,
  unAuthorizedComponent: <Error403 />,
  routes: [
    {
      path: initialUrl,
      element: <Intermediate />,
    },
    ...applicationConfig.authorize,
    ...profileConfig.authorize,
  ],
};

const unAuthorizedStructure = {
  fallbackPath: initialUrl,
  routes: [...authorize],
};

const anonymousStructure = {
  routes: [
    ...receptionConfig.unauthorize,
    ...errorPagesConfigs.concat([
      {
        path: '*',
        element: <Navigate to={ERROR_404_ROUTE} replace />,
      },
    ]),
  ],
};

export {authorizedStructure, unAuthorizedStructure, anonymousStructure};
