import Layout from '../../components/layout';
import { useState, useEffect } from "react";
import api from "../../api";
import { GymRatProvider } from "./GymRatProvider";
import { useGymRatContext } from "./GymRatContext";
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Container } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Username = () => {
    const gymRat = useGymRatContext();

    return (
        <Paper>
            <p style={{"textAlign": "center"}}>Welcome { gymRat?.gymRatData?.username }</p>
        </Paper>
    )
}

const Exercises = () => {
    const gymRat = useGymRatContext();

    return (
        <Paper>
            <h4 style={{"textAlign": "center"}}>Exercises:</h4>
            {
                gymRat?.exercises ?
                (
                    <ul>
                        {gymRat.exercises.map((ex) => {
                            return (
                                <li key={ex.exercise_name}>{ex.exercise_name}</li>
                            )
                        })}
                    </ul>
                ) : (
                    <p>No Exercises Yet, you fuck...</p>
                )
            }
        </Paper>
    );
}

const WorkoutOutlines = () => {
    const gymRat = useGymRatContext();

    return (
        <Paper>
            <h4 style={{"textAlign": "center"}}>Workout Outlines:</h4>
            {
                gymRat?.workoutOutlines ?
                (
                    <Container>
                        {gymRat.workoutOutlines.map((wo) => {
                            return (
                                <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                >
                                    {wo.workout_outline_name}
                                </AccordionSummary>
                                <AccordionDetails>
                                    {wo.exercise_outlines?.map((eo) => {
                                        return (
                                            <li key={`${wo.workout_outline_name}-${eo.notional_exercise.exercise_name}`}>
                                                {eo.notional_exercise.exercise_name}: {`${eo.number_of_sets}`} sets of {`${eo.number_of_reps}`} reps
                                            </li>
                                        )
                                    })}
                                </AccordionDetails>
                                </Accordion>
                            );
                            })
                        }
                    </Container>
                ) : (
                    <p>No Workout Outlines yet, you fuck...</p>
                )
            }
        </Paper>
    );
}

const Home = () => {
    return (
        <GymRatProvider>
            <Layout>
                <Container>
                    <Username />
                    <Grid container spacing={4} justifyContent="center">
                        <Grid item md={6}>
                            <Exercises />
                        </Grid>
                        <Grid item md={6}>
                            <WorkoutOutlines />
                        </Grid>
                    </Grid>
                </Container>
            </Layout>
        </GymRatProvider>
    );
}

export default Home;