import React, {useEffect, useState} from 'react';
import {Grid, Layout} from 'antd';
import AppHeader from './AppHeader';
import './index.style.less';
import {AppContentView} from '../../../index';
import AppFooter from '../components/AppFooter';
import AppScrollbar from '../../AppScrollbar';
import clsx from 'clsx';
import {FooterType} from '../../../../shared/constants/AppEnums';
import {isEmpty} from '../../../utility/GlobalHelper';
import {useLayoutContext} from '../../../utility/AppContextProvider/LayoutContextProvider';
import {useLocation} from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector} from 'react-redux';

const {useBreakpoint} = Grid;

const UserStandard = ({headerOnly}) => {
  const width = useBreakpoint();
  const [isCollapsed, setCollapsed] = useState(true);
  const {footer, footerType} = useLayoutContext();
  const location = useLocation();
  

  const onToggleSidebar = () => {
    setCollapsed(!isCollapsed);
  };

  const { accessToken } = useSelector(({auth}) => auth);

  useEffect(() => {
    if (!isEmpty(width)) {
      if (!width.xl) {
        setCollapsed(true);
      }
    }
  }, [location]);

  

  useEffect(() => {
    console.log("accessToken width ",accessToken);
    if (!isEmpty(width)) {
      if (width.xl) {
        setCollapsed(false);
      } else {
        setCollapsed(true);
      }
    }
    
    
  }, [width]);

  useEffect(() => {
    setCollapsed(false);
  }, [accessToken]);

  return (
    <Layout
      className={clsx('app-layout-standard', {
        appMainFooter: footer && footerType === FooterType.FLUID,
        appMainFixedFooter: footer && footerType === FooterType.FIXED,
        headerOnly,
      })}>
      <AppHeader isCollapsed={isCollapsed} onToggleSidebar={onToggleSidebar}/>
      <Layout className='app-layout-standard-row'>
        <Layout className='app-layout-standard-main'>
          <AppScrollbar className='standard-main-scrollbar'>
            <AppContentView />
            <AppFooter />
          </AppScrollbar>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default React.memo(UserStandard);

UserStandard.propTypes = {
  headerOnly: PropTypes.bool,
};
