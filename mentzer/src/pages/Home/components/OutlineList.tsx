import { useGymRatContext } from "../GymRatContext";
import ScrollableCard, { ScrollableCardItem } from "../components/scrollableCard";
import { WorkoutOutline} from "../../../models/gymRat.model";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const OutlineList = () => {
    const gymRat = useGymRatContext();

    const parseWorkoutOutlines = (outlines: WorkoutOutline[]): ScrollableCardItem[] => {
        if (outlines === undefined) {
            return []
        }
    
        const parsedOutlines = outlines.map((outline) => {
            if (!outline.exercise_outlines) {
                return {name: outline.workout_outline_name, items: []}
            }
            return ({
                name: outline.workout_outline_name,
                children: outline.exercise_outlines.map((eo) => {
                    return (
                        `${eo.notional_exercise.exercise_name}: ${eo.number_of_sets} for ${eo.number_of_reps} reps`
                    );
                })
            });
        });
    
        return parsedOutlines as ScrollableCardItem[]
    }

    return (
        <Box sx={{ border: 1, borderRadius: 1 }}>
            <h1 style={{ textAlign: "center" }}>Workout Outlines</h1>
            {gymRat.workoutOutlines && <ScrollableCard items={parseWorkoutOutlines(gymRat.workoutOutlines)} />}
            <Button variant="outlined" color="secondary">Create more here you fuck</Button>
        </Box>
    );
}

export default OutlineList;