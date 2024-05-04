import Layout from '../../components/layout';
import { GymRatProvider } from "./GymRatProvider";
import OutlineList from "./components/OutlineList";
import ExerciseList from "./components/ExerciseList";
import Grid from '@mui/material/Grid';
import { Container } from '@mui/material';

const Home = () => {
    return (
        <GymRatProvider>
            <Layout route="/">
                <Container sx={{ mt: 4 }}>
                    <Grid container spacing={4}>
                        <Grid item md={6}>
                            <OutlineList />
                        </Grid>
                        <Grid item md={6}>
                            <ExerciseList />
                        </Grid>
                    </Grid>
                </Container>
            </Layout>
        </GymRatProvider>
    );
}

export default Home;