import React, { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import ColorTabs from './colorTabs'

interface LayoutProps {
    children?: ReactNode;
}

const Layout = (props: LayoutProps) => {
  return (
    <div style={{ height: '100%' }}>
        <ColorTabs />
        {props.children}
    </div>
  );
};

export default Layout;