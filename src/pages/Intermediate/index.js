import {AppLoader} from '@crema';
import IntlMessages from '@crema/utility/IntlMessages';
import Countdown from 'antd/lib/statistic/Countdown';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {onRequestAuthCode, onReturnObj} from 'redux/actions/SSO';
import {defaultAdminUrl} from 'shared/constants/AppConst';
import isEqual from 'lodash/isEqual';

const Intermediate = () => {
  const {enabled, authCode, errorCode, settings} = useSelector(({sso}) => sso);
  const {profile, accessToken} = useSelector(({auth}) => auth);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [turnBack] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!!profile && !isEqual(profile, {})) {
      console.log("profile",profile);
      console.log("accessToken",accessToken);
      if (!enabled && !window.opener) {
        navigate(defaultAdminUrl);
      } else {
        dispatch(onRequestAuthCode());
      }
    }
  }, [profile]);

  useEffect(() => {
    if (errorCode) setError(errorCode);
  }, [errorCode]);

  useEffect(() => {
    if (authCode) {
      const {mode, redirectTo} = settings
      if (mode == 'window')
        dispatch(onReturnObj(authCode));
      else {
        const data = {
          authCode
        }
        const encode = btoa(JSON.stringify(data))
        const url = new URL(redirectTo)
        const searchParam = url.searchParams
        searchParam.append('sd', encode)
        window.open(url.toString(), '_self')
      }
    } 
  }, [authCode]);

  if (error)
    return (
      <>
        <p className='my-2 text-center'>{error}</p>
        {turnBack && (
          <p className='text-center'>
            <IntlMessages id='auth.turnBackAfter' />
            <Countdown
              value={Date.now() + turnBack}
              onFinish={() => window.close()}
            />
          </p>
        )}
      </>
    );

  return <AppLoader />;
};

export default Intermediate;
