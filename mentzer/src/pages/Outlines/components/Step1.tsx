import TextField from '@mui/material/TextField';
import { useFormik } from "formik";
import Button from '@mui/material/Button';

export interface Step1SubRequest {
    workout_outline_name: string;
}

export interface Step1Props {
    localSubmit: (values: any) => void;
}

const Step1 = ({ localSubmit }: Step1Props) => {
    const onSubmit = async (values: any, actions: any) => {
        console.log(values)
        localSubmit({ workout_outline_name: values.workoutOutlineName } as Step1SubRequest)
    }

    const {
        values,
        handleChange,
        handleSubmit,
    } = useFormik({
        initialValues: {
            workoutOutlineName: "",
        },
        onSubmit,
    });

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                id="outlined-basic"
                label="Workout Name"
                variant="outlined"
                type="text"
                name="workoutOutlineName"
                value={values.workoutOutlineName}
                onChange={handleChange}
                style={{ width: "100%"}}
            />

            <Button variant="outlined" type="submit" color="secondary">NEXT</Button>
        </form>
    )
}

export default Step1;