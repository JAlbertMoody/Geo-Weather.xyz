import React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import MobileHeader from './MobileHeader';
import DesktopHeader from './DesktopHeader';

function Header() {
  const isMobile = useMediaQuery('(max-width: 750px)');

  return isMobile ? <MobileHeader /> : <DesktopHeader />;
}

export default Header;