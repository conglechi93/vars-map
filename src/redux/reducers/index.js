import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';
import Settings from './Setting';
import Common from './Common';
import Auth from './Auth';
import View from './View';
import SSO from './SSO';
import UserApplication from './UserApplication';
import storage from 'redux-persist/lib/storage';
import {persistReducer} from 'redux-persist';

const persistConfig = {
  key: 'default',
  storage,
  blacklist: ['loading'],
};

const authPersistConfig = {
  key: 'auth',
  storage,
  blacklist: ['OTPTimeout', 'waitOTPConfirm', 'waitFbEmailConfirm', 'profile'],
};


const ssoPersistConfig = {
  key: 'sso',
  storage,
  whitelist: ['settings'],
};

const reducers = (history) =>
  combineReducers({
    router: connectRouter(history),
    settings: persistReducer(persistConfig, Settings),
    common: persistReducer(persistConfig, Common),
    auth: persistReducer(authPersistConfig, Auth),
    view: View,
    sso: persistReducer(ssoPersistConfig, SSO),
    userApplication: UserApplication,
  });
export default reducers;
