// Resdii custom

import React from 'react'; 
import clsx from 'clsx';
import {Avatar, Button, Dropdown, Menu} from 'antd';
import './index.style.less';
import {useThemeContext} from '../../../../utility/AppContextProvider/ThemeContextProvider';
import {useSidebarContext} from '../../../../utility/AppContextProvider/SidebarContextProvider';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import IntlMessages from '@crema/utility/IntlMessages';
import emptyAvatar from '@assets/profile/empty-avatar.jpg';
import {BsChevronDown} from '@react-icons/all-files/bs/BsChevronDown';
import { onSigninwithSS0, onLogoutSSO } from 'redux/actions/Auth';


const UserInfo = ({hasColor}) => {
  const {themeMode} = useThemeContext();
  const {profile, accessToken, avatar} = useSelector(({auth}) => auth);
  const userInfo = profile?.userInfo || {};
  const dispatch = useDispatch();
  const {sidebarColorSet} = useSidebarContext();
  const {isSidebarBgImage} = useSidebarContext();


  const getUserAvatar = () => {
    return avatar ?? emptyAvatar;
  };

  const logOutPage = () => {
    dispatch(onLogoutSSO({accessToken}));
  }

  const menu = (
    <Menu
      items={[
        {
          key: '1',
          label: (
            <a
              onClick={logOutPage}
              target='_blank'
              rel='noopener noreferrer'>
              <IntlMessages id='common.logout' />
            </a>
          ),
        },
      ]}
    />
  );

  const onLogin = () => {
    dispatch(onSigninwithSS0());
  }

  return (
    <>
      {
        profile != null ? hasColor ? (
          <div
            style={{
              backgroundColor: isSidebarBgImage
                ? ''
                : sidebarColorSet.sidebarHeaderColor,
              color: sidebarColorSet.sidebarTextColor,
            }}
            className={clsx('cr-user-info cr-user-info-hasColor', {
              light: themeMode === 'light',
            })}>
            <Dropdown
              className='user-profile-dropdown'
              overlay={menu}
              trigger={['click']}
              placement='bottomRight'
              overlayStyle={{
                zIndex: 1052,
                minWidth: 150,
              }}>
              <a className='cr-user-info-inner ant-dropdown-link'>
                <Avatar
                  className='cr-user-info-avatar'
                  src={getUserAvatar()}
                  alt='avatar'
                />
                <span className='cr-user-info-content'>
                  <span className='cr-user-name-info'>
                    <h3
                      className={clsx('cr-user-name text-truncate', {
                        light: themeMode === 'light',
                      })}>
                      {userInfo.email}
                    </h3>
                    <span className='cr-user-arrow'>
                      <BsChevronDown />
                    </span>
                  </span>
                  {/* <span className='cr-user-designation text-truncate'>
                    System Manager
                  </span> */}
                </span>
              </a>
            </Dropdown>
          </div>
        ) : (
          <div
            className={clsx('cr-user-info', {
              light: themeMode === 'light',
            })}>
            <Dropdown
              className='user-profile-dropdown'
              overlay={menu}
              trigger={['click']}
              placement='bottomRight'
              overlayStyle={{
                zIndex: 1052,
                minWidth: 150,
              }}>
              <a className='cr-user-info-inner ant-dropdown-link'>
                <Avatar className='cr-user-info-avatar' src={getUserAvatar()} />
                <span className='cr-user-info-content'>
                  <span className='cr-user-name-info'>
                    <h3
                      className={clsx('cr-user-name text-truncate', {
                        light: themeMode === 'light',
                      })}>
                      {userInfo.email}
                    </h3>
                    <span className='cr-user-arrow'>
                      <BsChevronDown />
                    </span>
                  </span>
                  {/* <span className='cr-user-designation text-truncate'>
                    System Manager
                  </span> */}
                </span>
              </a>
            </Dropdown>
          </div>
        )  : (<Button onClick={onLogin} className="btn-header" style={{maxWidth:"120px"}}><IntlMessages id="common.login"/></Button>) 
      }

    </>
  );
};

export default UserInfo;

UserInfo.propTypes = {
  hasColor: PropTypes.bool,
};
