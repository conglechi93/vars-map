import {Dropdown, Layout, Menu} from 'antd';
import './index.style.less';
import AppLogo from '../components/AppLogo';
import AppLanguageSwitcher from '../../AppLanguageSwitcher';
// import AppHeaderMessages from '../../AppHeaderMessages';
// import AppNotifications from '../../AppNotifications';
import PropTypes from 'prop-types';
import {FiMoreVertical} from '@react-icons/all-files/fi/FiMoreVertical';
import UserInfo from '../components/UserInfo';
import clsx from 'clsx';
import { useEffect } from 'react';

const AppHeader = ({isCollapsed, className}) => {
  const {Header} = Layout;
  const menuMobile = (
    <Menu>
      {/* <AppHeaderMessages />
      <AppNotifications /> */}
      <AppLanguageSwitcher />
    </Menu>
  );

  useEffect(() => {
    console.log("isCollapsed",isCollapsed)
    //onToggleSidebar(false);
  },[isCollapsed])

  return (
    <Header
      className={clsx(
        'app-standard-header',
        {behind: !isCollapsed},
        className,
      )}>
      <AppLogo mini />
      <div className='app-standard-header-section-mobile'>
        <Dropdown overlay={menuMobile} trigger={['click']}>
          <a className='ant-dropdown-link' onClick={(e) => e.preventDefault()}>
            <FiMoreVertical />
          </a>
        </Dropdown>
      </div>
      <UserInfo />
    </Header>
  );
};

export default AppHeader;

AppHeader.propTypes = {
  onToggleSidebar: PropTypes.func,
  isCollapsed: PropTypes.bool,
  className: PropTypes.string,
};
