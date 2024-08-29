import { ReactNode } from 'react';
import Navigation from './navigation';
import { AppBar, Toolbar, Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import BasicSpeedDial from "../SpeedDial"

interface LayoutProps {
  route: string;
  children?: ReactNode;
}

const Layout = (props: LayoutProps) => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"))

  return (
    <Box 
      sx={{
        background: "black",
        height: "100vh",
        backgroundPosition: 'center',
      }}
    >
      <AppBar position="fixed" sx={{ background: "black" }}>
        <Toolbar>
          <Box flexGrow={1}>
            <Box display="flex" alignItems="center">
              <Typography variant="h5" sx={{ width: "fit-content" }} color="primary">Swole Stats</Typography>
            </Box>
          </Box>
          <Navigation />
        </Toolbar>
      </AppBar>
      <Box>
        <Toolbar />
        {props.children}
        {isSmall && <BasicSpeedDial />}
      </Box>
    </Box>
  );
};

export default Layout;