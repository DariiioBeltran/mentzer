import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import { NotionalExercise } from '../../../models/notionalExercise.model';
import { useFormik } from "formik";
import Button from '@mui/material/Button';

export interface Step2SubRequest {
    selected_exercises: NotionalExercise[];
}

export interface Step2Props {
    exercises: NotionalExercise[];
    localSubmit: (values: any) => void;
}

const Step2 = ({ exercises, localSubmit }: Step2Props) => {
    const onSubmit = (values: any, actions: any) => {
        localSubmit({ selected_exercises: values.selectedExercises } as Step2SubRequest)
    }

    const {
        values,
        setFieldValue,
        handleSubmit,
    } = useFormik({
        initialValues: {
            selectedExercises: [],
        },
        onSubmit,
    });

    return (
        <form onSubmit={handleSubmit}>
            {exercises && 
                <Autocomplete
                    multiple
                    id="tags-standard"
                    options={exercises}
                    getOptionLabel={(option) => option.exercise_name}
                    value={values.selectedExercises}
                    onChange={(event, value) => setFieldValue('selectedExercises', value)}
                    renderOption={(props, option) => {
                        return (
                          <li {...props} key={option.exercise_name}>
                            {option.exercise_name}
                          </li>
                        );
                    }}
                    renderTags={(tagValue, getTagProps) => {
                        return tagValue.map((option, index) => (
                          <Chip {...getTagProps({ index })} key={option.exercise_name} label={option.exercise_name} />
                        ))
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="standard"
                            label="Multiple values"
                            placeholder="Exercises"
                        />
                    )}
                />
            }


            <Button variant="outlined" type="submit" color="secondary">NEXT</Button>
        </form>
    );
}

export default Step2;