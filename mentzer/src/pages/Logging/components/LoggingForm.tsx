import { useLoggingContext } from "../LoggingContext";
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { ExerciseOutline } from "../../../models/gymRat.model";
import { useFormik } from "formik";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { GYM_RAT_ID } from '../../../constants/authConstants';
import { useNavigate } from "react-router-dom";
import { useCreateWorkoutRecord, SetRecordRequestData, WorkoutRecordRequestData } from "../../../hooks/useCreateWorkoutRecord";

interface SetRecordFormData {
    exerciseId: number;
    reps: number | string;
    weight: number | string;
    skipped: string;
}

interface ExerciseOutlineFormData {
    name: string;
    [key: number]: SetRecordFormData;
}

const LoggingForm = () => {
    const outline = useLoggingContext();
    if (!outline.outline) { return null; }
    const navigate = useNavigate();
    const {
        isLoading,
        error,
        data,
        execute,
    } = useCreateWorkoutRecord();

    const mapExerciseOutlineToFormInitialValues = (exerciseOutline: ExerciseOutline): ExerciseOutlineFormData => {
        let exerciseInitialValues = {
            name: exerciseOutline.notional_exercise.exercise_name
        } as ExerciseOutlineFormData;

        for (let i = 0; i < exerciseOutline.number_of_sets; i++) {
            exerciseInitialValues[i] = {
                exerciseId: exerciseOutline.notional_exercise.id,
                reps: "",
                weight: "",
                skipped: "",
            } as SetRecordFormData
        }
        return exerciseInitialValues
    }

    const formatLogWorkoutRecordRequest = (values: any): WorkoutRecordRequestData => {
        let setRecords: SetRecordRequestData[] = []
        for (const set of values.exercises) {
            const { name, ...sets } = set
            setRecords = setRecords.concat(Object.values(sets).map((s: any) => {
                return {
                    exercise_outline_id: s.exerciseId,
                    weight: s.weight,
                    reps_completed: s.reps,
                    skipped: s.skipped == "" ? false : true,
                } as SetRecordRequestData;
            }))
        }

        return {
            gym_rat: parseInt(localStorage.getItem(GYM_RAT_ID) || "0"),
            workout_outline_id: outline.outline.id,
            set_records: setRecords,
        } as WorkoutRecordRequestData;
    }

    const onSubmit = async (values: any, actions: any) => {
        try {
            const req = formatLogWorkoutRecordRequest(values)
            const res = await execute(req)
            navigate("/")
        } catch (error) {
            alert(error);
        }
    }

    const {
        values,
        errors,
        touched,
        isSubmitting,
        handleBlur,
        handleChange,
        setValues,
        handleSubmit,
        } = useFormik({
        initialValues: {
            exercises: outline.outline.exercise_outlines.map((e) => mapExerciseOutlineToFormInitialValues(e))
        },
        // validationSchema: ,
        onSubmit,
    });

    return (
        <Box
            width="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
            marginTop="20px"
        >
            <form onSubmit={handleSubmit}>
                <Stack spacing={2}>
                    <h1>{outline.outline.workout_outline_name}</h1>
                    {outline.outline.exercise_outlines.map((outline, index) => {
                        return (
                            <Box
                                sx={{
                                    border: 1,
                                    padding: 1,
                                }}
                                key={`box-${index}`}
                            >
                                <h3>{outline.notional_exercise.exercise_name}</h3>
                                <Stack>
                                    {[...Array(outline.number_of_sets).keys()].map((set, idx) => {
                                        return (
                                            <Box
                                                sx={{
                                                    display: 'row',
                                                    flexDirection: 'column',
                                                    py: 2,
                                                }}
                                            >
                                                <TextField
                                                    type="number"
                                                    variant="standard"
                                                    label="Weight"
                                                    name={`exercises.${index}.${idx}.weight`}
                                                    value={values.exercises[index][idx].weight}
                                                    onChange={handleChange}
                                                />
                                                
                                                <TextField
                                                    type="number"
                                                    variant="standard"
                                                    label="Reps"
                                                    name={`exercises.${index}.${idx}.reps`}
                                                    value={values.exercises[index][idx].reps}
                                                    onChange={handleChange}
                                                />

                                                <label>
                                                    <input 
                                                        type="checkbox" 
                                                        name={`exercises.${index}.${idx}.skipped`}
                                                        value={values.exercises[index][idx].skipped}
                                                    />
                                                    Skipped?
                                                </label>
                                            </Box>
                                        )
                                    })}
                                </Stack>
                            </Box>
                        )
                    })}

                    {/* Submit Form */}
                    <Button
                        variant="outlined"
                        color="secondary"
                        type="submit" 
                        sx={{
                            width: "100%",
                            mb: 2
                        }}
                    >
                        DONE!
                    </Button>
                </Stack>
            </form>
        </Box>
    )
}

export default LoggingForm;