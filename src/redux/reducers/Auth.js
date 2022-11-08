import {
  INCREASE_LOGIN_ATTEMPT,
  LOGOUT,
  RESET_LOGIN_ATTEMPT,
  SET_LOGIN_REDIRECT_TO,
  GET_USER_INFO_REQUEST,
  GET_USER_INFO_SUCCESS,
  GET_USER_INFO_ERROR,
  WIPE_USER,
  RESET_TEMPT,
  SIGN_IN_SSO_SUCCESS,
  GET_TOKEN_SUCCESS,
  UPDATE_AVATAR_SUCCESS,
  SET_CODE_VERIFIER,
} from 'shared/constants/ActionTypes';

const initialState = {
  isAuthenticated: false,
  phone:null,
  user: null,
  role: null,
  sessionToken: null,
  loginRedirectTo: null,
  loginAttempt: 0,
  loginScreen: -1,
  loading: true,
  error: null,
  password: null,
  isSignupSuccess: false,
  authCode: null,
  codeVerifier: null,
  accessToken: null,
  refreshToken: null,
  avatar: null,
  wallet: null,
  confirmPassword: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_AVATAR_SUCCESS: 
    return {
      ...state,
      avatar: action.payload.avatar,
    };
    case GET_TOKEN_SUCCESS:
      return {
        ...state,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        error: null,
      }
    case SET_CODE_VERIFIER:
      return {
        ...state,
        codeVerifier: action.payload.codeVerifier,
      };
    case SIGN_IN_SSO_SUCCESS:
      return {
        ...state,
        authCode: action.payload.authCode,
        codeVerifier: action.payload.codeVerifier,
      };
    case RESET_TEMPT: 
    return {
      ...state,
      phone: null,
      password: null,
    };

    case LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        sessionToken: null,
        phone: null,
        password: null,
        profile: null,
        accessToken: null,
        refreshToken: null,
      };
    case SET_LOGIN_REDIRECT_TO:
      return {
        ...state,
        loginRedirectTo: action.payload,
      };
    case RESET_LOGIN_ATTEMPT:
      return {
        ...state,
        loginAttempt: 0,
        phone: null,
        isAvailable: null
      };
    case INCREASE_LOGIN_ATTEMPT:
      return {
        ...state,
        loginAttempt: state.loginAttempt + 1,
        isAvailable: null,
      };
    case GET_USER_INFO_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_USER_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        error: null,
        profile: action.payload.data,
        avatar: action.payload.data.avatar,
      };
    case GET_USER_INFO_ERROR:
      return {
        ...state,
        loading: false,
        profile: null,
        error: action.payload,
      };
    case WIPE_USER:
      return initialState;
    default:
      return state;
  }
};
export default authReducer;
