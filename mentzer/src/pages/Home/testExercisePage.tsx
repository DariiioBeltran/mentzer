import CreateExerciseForm from "./components/CreateExerciseForm"
import Layout from '../../components/layout';
import Box from '@mui/material/Box';

const ExercisePage = () => {
    return (
        <Layout route="/testExercises/">
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="80vh"
            >
                <CreateExerciseForm />
            </Box>
        </Layout>
    )
}

export default ExercisePage;