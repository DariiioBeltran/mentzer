import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { NotionalExercise } from '../../../models/notionalExercise.model';
import { useFormik } from "formik";
import { useOutlinesContext } from '../OutlinesContext';


const CreateOutlineForm = () => {
    const { exercises } = useOutlinesContext();
    const onSubmit = (values: any, actions: any) => {
        
    }

    // const {
    //     values,
    //     setFieldValue,
    //     handleSubmit,
    // } = useFormik({
    //     initialValues: null,
    //     onSubmit,
    // });

    return (
        <Box
            sx={{
                border: 1,
                padding: 1
            }}
        >
            {/* Select Exercise Field */}
            {exercises && <Autocomplete
                    id="tags-standard"
                    options={exercises}
                    getOptionLabel={(option) => option.exercise_name}
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
                            name="exerciseName"
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
                name="sets"
            />

            {/* Number of Reps Field */}
            <TextField
                type="number"
                variant="standard"
                label="Reps"
                name="reps"
            />
        </Box>
    )
}

export default CreateOutlineForm;