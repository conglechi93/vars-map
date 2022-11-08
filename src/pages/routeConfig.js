
import {USER_PROFILE_ROUTE} from './ProfileManagement/declareRoute';

const routesConfig = [
  {
    id: 'applicationManagement',
    messageId: 'route.group.userManagement',
    type: 'group',
    children: [
      {
        id: USER_PROFILE_ROUTE,
        messageId: 'profile.information',
        type: 'item',
        path: USER_PROFILE_ROUTE,
      },
    ],
  }

];
export default routesConfig;  
