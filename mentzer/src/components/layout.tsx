import React, { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import ColorTabs, { ColorTabsProps } from './colorTabs'

interface LayoutProps {
  route: string;
  children?: ReactNode;
}

const Layout = (props: LayoutProps) => {
  const colorTabsProps = { route: props.route } as ColorTabsProps

  return (
    <div style={{ height: "100vh" }}>
        <ColorTabs {...colorTabsProps} />
          {props.children}
    </div>
  );
};

export default Layout;