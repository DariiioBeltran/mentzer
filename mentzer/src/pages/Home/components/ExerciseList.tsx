import { useGymRatContext } from "../GymRatContext";
import ScrollableCard, { ScrollableCardItem } from "../components/scrollableCard";
import { NotionalExercise} from "../../../models/gymRat.model";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const ExerciseList = () => {
    const gymRat = useGymRatContext();

    const parseExercises = (exercises: NotionalExercise[]): ScrollableCardItem[] => {
        if (exercises === undefined) {
            return []
        }

        const parsedExercises = exercises.map((e) => {
            return ({
                name: e.exercise_name,
                children: [
                    `Primary Muscle Group: ${e.primary_muscle_group.toLowerCase()}`,
                    `Exercise Scope: ${e.exercise_scope.toLowerCase()}`,
                    `Equipment Category: ${e.equipment_category.toLowerCase()}`,
                ]
            })
        })

        return parsedExercises as ScrollableCardItem[]
    }

    return (
        <Box sx={{ border: 1, borderRadius: 1 }}>
            <h1 style={{ textAlign: "center" }}>Exercises</h1>
            {gymRat.workoutOutlines && <ScrollableCard items={parseExercises(gymRat.exercises)} />}
            <Button variant="outlined" color="secondary">Create more here you fuck</Button>
        </Box>
    );
}

export default ExerciseList;