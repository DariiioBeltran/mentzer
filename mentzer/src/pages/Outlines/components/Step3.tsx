import { NotionalExercise } from '../../../models/notionalExercise.model';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useFormik } from "formik";
import Button from '@mui/material/Button';

export interface Step3SubRequest {
    selected_exercises: NotionalExercise[];
}

export interface Step3Props {
    selectedExercises: NotionalExercise[];
    localSubmit: (values: any) => void;
}

const Step3 = ({ selectedExercises = [], localSubmit }: Step3Props) => {
    const onSubmit = async (values: any, actions: any) => {
        console.log(values)
        localSubmit({} as Step3SubRequest)
    }

    const {
        values,
        handleChange,
        handleSubmit,
    } = useFormik({
        initialValues: selectedExercises.reduce((o, ex) => ({ ...o, [`${ex.exercise_name}-sets`]: 0, [`${ex.exercise_name}-reps`]: 0}), {}),
        onSubmit,
    });

    return (
        <>
            {selectedExercises &&
                <form onSubmit={handleSubmit}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Exercise Name</TableCell>
                                    <TableCell align="right">Number of Sets</TableCell>
                                    <TableCell align="right">Target Reps</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {selectedExercises.map((row) => (
                                    <TableRow
                                        key={row.exercise_name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">{row.exercise_name}</TableCell>
                                        <TableCell align="right">
                                            <input
                                                type="number"
                                                placeholder="Sets"
                                                name={`${row.exercise_name}-sets`}
                                                value={values[`${row.exercise_name}-sets` as unknown as keyof {}]}
                                                onChange={handleChange}
                                            />
                                        </TableCell>
                                        <TableCell align="right">
                                            <input
                                                type="number"
                                                placeholder="Reps"
                                                name={`${row.exercise_name}-reps`}
                                                value={values[`${row.exercise_name}-reps` as unknown as keyof {}]}
                                                onChange={handleChange}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>


                    <Button variant="outlined" type="submit" color="secondary">NEXT</Button>
                </form>
            }
        </>
    );
}

export default Step3;