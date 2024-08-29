import Layout from '../../components/layout/layout';
import { GymRatProvider } from "./GymRatProvider";
import OutlineList from "./components/OutlineList";
import ExerciseList from "./components/ExerciseList";
import Grid from '@mui/material/Grid';
import { Container, useTheme, useMediaQuery, Hidden, Box, Tabs, Tab } from '@mui/material';
import { useState } from 'react';
import MobileHomePage from './MobileHomePage';

const Home = () => {
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down("sm"))

    return (
        <GymRatProvider>
            <Layout route="/">
                <Hidden smDown>
                    <Grid container spacing={4}>
                        <Grid item md={6}>
                            <Box
                                display="flex"
                                flexDirection="column"
                                height="90vh"
                                my={2}
                                px={2}
                            >
                                <Box
                                    sx={{
                                        marginLeft: 2,
                                        overflow: "auto"
                                    }}
                                >
                                    <OutlineList />
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item md={6}>
                            <Box
                                display="flex"
                                flexDirection="column"
                                height="90vh"
                                my={2}
                                px={2}
                            >
                                <Box
                                    sx={{
                                        marginRight: 2,
                                        overflow: "auto"
                                    }}
                                >
                                    <ExerciseList />
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Hidden>
                <Hidden smUp>
                    <MobileHomePage />
                </Hidden>
            </Layout>
        </GymRatProvider>
    );
}

export default Home;