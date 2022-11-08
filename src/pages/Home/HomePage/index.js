import {memo, 
} from 'react';
import {
  useSelector,useDispatch
} from 'react-redux';
import { useEffect } from 'react';
import { useSearchParams  } from "react-router-dom";
import { onGetTokenSSO, onGetUserInfo } from 'redux/actions/Auth';
import Map from '../Map';

const HomePage = () => {
  const { authCode, codeVerifier, accessToken } = useSelector(({ auth }) => auth);
  const key = 'AIzaSyAmaslg9P1CTxK8xnDOlOZ1YDJI0Le02XU';
  const dispatch = useDispatch();
  const [searchParam]= useSearchParams();
  useEffect(() => {
    const authCode = searchParam.get('authCode');
    if(authCode != null) {
      dispatch(onGetTokenSSO({authCode,codeVerifier}));
    }
  },[authCode])

  useEffect(() => {
    console.log("accessToken",accessToken);
    if(accessToken != null) {
      dispatch(onGetUserInfo({accessToken}));
    }
  },[accessToken])

  return (
    <div>
      <Map
      googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${key}&callback=initMap`}
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `90vh`, margin: `auto`, border: '2px solid black' }} />}
      mapElement={<div style={{ height: `100%` }} />}
      ></Map>
    </div>
  );
};

export default memo(HomePage);

HomePage.propTypes = {};

HomePage.defaultProps = {};
