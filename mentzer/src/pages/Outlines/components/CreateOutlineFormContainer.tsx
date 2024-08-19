import { useFormik } from "formik";
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

import Button from '@mui/material/Button';
import { useOutlinesContext } from '../OutlinesContext';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { IconButton } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useCreateOutline, CreateOutlineRequest } from '../../../hooks/useCreateOutline';
import { useNavigate } from "react-router-dom";
import { GYM_RAT_ID } from '../../../constants/authConstants';

const CreateOutlineFormContainer = () => {
    const { exercises } = useOutlinesContext();
    const navigate = useNavigate();
    const {
        isLoading,
        error,
        data,
        execute,
    } = useCreateOutline();

    const formatCreateOutlineRequestFromFormData = (values: any): CreateOutlineRequest => {
        return {
            gym_rat: parseInt(localStorage.getItem(GYM_RAT_ID) || "0"),
            exercise_outlines: values.exercises.map((ex: any) => {
                return ({
                    notional_exercise_id: ex.exerciseName.id,
                    number_of_sets: ex.sets,
                    number_of_reps: ex.reps,
                })
            }),
            workout_outline_name: values.workoutOutlineName,
        } as CreateOutlineRequest;
    }

    const onSubmit = async (values: any, actions: any) => {
        try {
            const req = formatCreateOutlineRequestFromFormData(values)
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
            workoutOutlineName: "",
            exercises: [
                {
                    exerciseName: null,
                    sets: "",
                    reps: "",
                }
            ]
        },
        // validationSchema: createOutlineFormSchema,
        onSubmit,
    });

    const handleAddFields = () => {
        let exercises = [...values.exercises];
        exercises.push({
            exerciseName: null,
            sets: "", 
            reps: "",
        });
        setValues({...values, exercises});
    }

    const handleRemoveFields = (index: number) => {
        let exercises = [...values.exercises];
        exercises.splice(index, 1);
        setValues({...values, exercises});
    }

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
                    <h1>Specify Exercises, Sets, and Reps</h1>
                
                    {/* Number of Reps Field */}
                    <Box
                        sx={{
                            border: 1,
                            padding: 1
                        }}
                    >
                        <TextField
                            type="text"
                            variant="standard"
                            label="Outline Name"
                            name="workoutOutlineName"
                            value={values.workoutOutlineName}
                            onChange={handleChange}
                            sx={{ width: "100%" }}
                        />
                    </Box>

                    {values.exercises.map((exerciseOutline, index) => {
                        return (
                            <Box
                                sx={{
                                    border: 1,
                                    padding: 1
                                }}
                                key={`box-${index}`}
                            >
                                {/* Select Exercise Field */}
                                {exercises && <Autocomplete
                                    id="tags-standard"
                                    options={exercises}
                                    getOptionLabel={(option) => option.exercise_name}
                                    value={exerciseOutline.exerciseName}
                                    onChange={(e, value) => {
                                        const event = {...e, target: { ...e.target, name: `exercises.${index}.exerciseName`, value: value }};
                                        handleChange(event);
                                       }}
                                    renderOption={(props, option) => {
                                        return (
                                            <li {...props} key={option.exercise_name}>
                                            {option.exercise_name}
                                            </li>
                                        );
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            type="text"
                                            name={`exercises.${index}.exerciseName`}
                                            variant="standard"
                                            label="Select an Exercise"
                                        />
                                    )}
                                />}

                                {/* Number of Sets Field */}
                                <TextField
                                    type="number"
                                    variant="standard"
                                    label="Sets"
                                    name={`exercises.${index}.sets`}
                                    value={exerciseOutline.sets}
                                    onChange={handleChange}
                                />

                                {/* Number of Reps Field */}
                                <TextField
                                    type="number"
                                    variant="standard"
                                    label="Reps"
                                    name={`exercises.${index}.reps`}
                                    value={exerciseOutline.reps}
                                    onChange={handleChange}
                                />

                                {/* Remove Exercise */}
                                <IconButton
                                    onClick={() => handleRemoveFields(index)}
                                >
                                    <DeleteOutlineIcon />
                                </IconButton>
                            </Box>
                        )
                    })}

                    {/* Add Exercise */}
                    <IconButton
                        onClick={() => handleAddFields()}
                    >
                        <AddIcon />
                    </IconButton>

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

export default CreateOutlineFormContainer;