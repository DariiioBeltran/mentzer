import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Collapse from "@mui/material/Collapse";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import { useState } from "react";
import { WorkoutRecord,  } from "../../../models/records.model";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import { useRecordsContext } from "../RecordsContext";
import Container from "@mui/material/Container";


interface RecordsRowProps {
    record: WorkoutRecord;
}

const RecordsRow = ({ record }: RecordsRowProps) => {
    if (!record) { return null; }
    const [open, setOpen] = useState(false);
  
    return (
        <>
            <TableRow sx={{ borderBottom: 'unset' }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {record.workout_outline.workout_outline_name}
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Details
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            <Typography variant="body1">
                                                Set
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="body1">
                                                Exercise
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="body1">
                                                Weight
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="body1">
                                            Reps
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {record.set_records.map((set, index) => {
                                        let color = (set.reps_completed >= set.exercise_outline.number_of_reps) ? "green" : "red";
                                        return (
                                            <TableRow key={`setID-${set.id}-index-${index}`}>
                                                <TableCell component="th" scope="row">
                                                    <Typography variant="body2" color={color}>
                                                        {index+1}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell component="th" scope="row">
                                                    <Typography variant="body2" color={color}>
                                                        {set.exercise_outline.notional_exercise.exercise_name}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography variant="body2" color={color}>
                                                    {set.weight}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography variant="body2" color={color}>
                                                        {set.reps_completed}
                                                    </Typography>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}

const RecordsTable = () => {
    const workoutRecords = useRecordsContext();
    if (!workoutRecords.records) { return null; }

    return (
        <Container
            sx={{
                paddingTop: "10px",
            }}
        >
            <h1>Last Two Weeks</h1>
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableBody>
                        {workoutRecords.records.map((record, index) => (
                            <RecordsRow key={`recordId-${record.id}-index-${index}`} record={record} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}

export default RecordsTable;