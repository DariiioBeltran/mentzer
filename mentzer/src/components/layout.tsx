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
      <Box
        sx={{
          display: 'grid',
          height: '100%',
          margin: '0 auto',
          minWidth: 0,
          gridTemplateColumns: 'max-content 1fr',
        }}
      >
        <Box className='flex flex-col h-full min-w-0 box-border m-0'>
            <Box 
                className='flex flex-col h-full min-w-0 box-border m-0 shrink-0'
                sx={{
                    background: {
                        color: 'red',
                      }
                }}
            >
            <ColorTabs />
            <Box className='flex flex-col min-w-0 box-border mt-4'>
              <Container maxWidth='xl' sx={{ margin: 0 }}>
                {props.children}
              </Container>
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Layout;