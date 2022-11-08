import {
  CLEAN_STATE,
  LOGOUT,
  SET_LOGIN_REDIRECT_TO,
  SHOW_MESSAGE,
  GET_USER_INFO_SUCCESS,
  WIPE_USER,
  SIGN_IN_SSO_SUCCESS,
  GET_TOKEN_SUCCESS,
  UPDATE_AVATAR_SUCCESS,
  SET_CODE_VERIFIER,
} from 'shared/constants/ActionTypes';
import {
  GET_USER_INFO_API,
  LOGOUT_API,
  UPDATE_AVATAR_API,
  UPDATE_PROFILE_API,
} from 'shared/constants/ApiUrls';
import API from 'api/Request';
import { appIntl } from '@crema/utility/helper/Utils';
import { REQUEST_MUTED, REQUEST_IGNORE_401_ERROR } from '@api/RequestEnum';
import SSOCore from '../../../src/vars-id'
import { generateCodeChallengeFromVerifier, randomVerifier } from 'utils/CodeChallenge';

export const SSO = new SSOCore({
  serverUrl:'https://192-168-1-26.nip.io:8582/vid',
  appCode: 'VARS_CMS',
  clientId: '0e7001ef2cc94e2db5ef44d5c22be366',
  windowOpts: 'redirect',
  redirectTo: 'http://localhost:3000/home/index',
});


export const onLogoutSSO = ({accessToken}) => {
  return (dispatch) => {
    const sessionToken = accessToken;
    SSO.logoutAll(sessionToken,{
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (e) => {
        console.log("error", e);
      }
    })
    dispatch(onLogout())
  };
};

export const onLogout = () => {
  return (dispatch) => {
    dispatch({ type: LOGOUT });
    API.post(LOGOUT_API, null, { REQUEST_MUTED, REQUEST_IGNORE_401_ERROR });
    dispatch({ type: CLEAN_STATE });
  };
};

export const onUpdateInfo = ({dataReq, accessToken}) => {
  const { messages } = appIntl();
  const token = "Bearer " + accessToken;
  return (dispatch) => {
    API.patch(UPDATE_PROFILE_API, dataReq, { headers: {
      'Authorization': token,
    }})
      .then((data) => {
        console.log(data,dispatch);
        dispatch({ type: SHOW_MESSAGE, payload: messages['common.successUpdate'] });
      })
      .catch((e) => {
        console.log("error", e);
      });
  };
};

export const onUpdateAvatar = ({image,accessToken}) => {
  const { messages } = appIntl();
  return (dispatch) => {
    let formData = new FormData();
    formData.append("image",image)
    const token = "Bearer " + accessToken;
    API.post(UPDATE_AVATAR_API, formData, { headers: {
      "Content-Type": "multipart/form-data",
      'Authorization': token,
    }})
      .then((data) => {
        const avatar = data;
        dispatch({ type: SHOW_MESSAGE, payload: messages['common.successUpdate'] });
        dispatch({type: UPDATE_AVATAR_SUCCESS, payload: {avatar}});
        
      })
      .catch((e) => {
        console.log("error", e);
      });
  };
};

export const onGetUserInfo = ({accessToken}) => {
  const token = "Bearer " + accessToken;
  return (dispatch) => {
    API.get(GET_USER_INFO_API, { headers: {
      'Authorization': token,
    }})
      .then((data) => {
        dispatch({type: GET_USER_INFO_SUCCESS, payload: {data}});
      })
      .catch((e) => {
        console.log("error", e);
      });
  };
};

export const onGetTokenSSO = ({authCode,codeVerifier}) => {
  return (dispatch) => {
    SSO.exchangeOTAC(authCode, codeVerifier, {
      onSuccess: (data) => {
        const accessToken = data.accessToken;
        const refreshToken = data.refreshToken;
        console.log("accessToken", accessToken);
        dispatch({type: GET_TOKEN_SUCCESS, payload: {accessToken,refreshToken}});
      },
      onError: (e) => {
        console.log("error", e);
      }
    })
    
  }
}

export const onSigninwithSS0 = () => {
  const serverUrl = 'https://192-168-1-26.nip.io:8582/vid';
  const appCode = 'VARS_CMS';
  const clientId = '0e7001ef2cc94e2db5ef44d5c22be366';
  const windowOpts = 'redirect';
  const redirectTo = 'http://localhost:3000/home/index';
  return async (dispatch) => {
    const codeVerifier = randomVerifier();
    dispatch({ type: SET_CODE_VERIFIER, payload: { codeVerifier } });
    const base64encoded = await generateCodeChallengeFromVerifier(codeVerifier);
    const SSO = new SSOCore({
      serverUrl: serverUrl,
      appCode: appCode,
      clientId: clientId,
      windowOpts: windowOpts,
      redirectTo: redirectTo,
      codeChallenge: base64encoded,
    });
    SSO.login({
      onSuccess: (authCodeObj) => {
        const authCode = authCodeObj.authCode;
        dispatch({ type: SIGN_IN_SSO_SUCCESS, payload: { authCode, codeVerifier } });
      },
      onError: (e) => {
        console.log(e);
      }
    });
  }
}

export const onLogoutAndSetRedirect = (url) => {
  return (dispatch) => {
    dispatch({ type: SET_LOGIN_REDIRECT_TO, payload: url });
    dispatch(onLogout());
  };
};

export const onSetRedirectTo = (url) => {
  return (dispatch) => {
    dispatch({ type: SET_LOGIN_REDIRECT_TO, payload: url });
  };
};

export const onWipeUser = () => {
  return (dispatch) => {
    dispatch({ type: WIPE_USER });
  };
};


