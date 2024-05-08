import { useGymRatContext } from "../GymRatContext";
import ScrollableCard, { ScrollableCardItem } from "../components/scrollableCard";
import { NotionalExercise } from "../../../models/notionalExercise.model";
import CreateExerciseForm from "./CreateExerciseForm";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useState } from "react";
import Modal from '@mui/material/Modal';
import Container from '@mui/material/Container';

const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "50%",
    height: "80%",
    border: '1px solid black',
    borderRadius: 1,
    backgroundColor: "white",
};

const ExerciseList = () => {
    const gymRat = useGymRatContext();
    const [openModal, setOpenModal] = useState<boolean>(false)
    const handleOpenModal = () => setOpenModal(true)
    const handleCloseModal = () => setOpenModal(false)

    const closeModalAtSubmit = () => {
        setOpenModal(false)
    }

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
            <Container>
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={handleOpenModal}
                    sx={{
                        width: "100%",
                        mb: 2
                    }}
                >
                    Create more here you fuck
                </Button>
            </Container>
            <Modal open={openModal} onClose={handleCloseModal}>
                <div style={modalStyle}>
                    <CreateExerciseForm updateModalState={closeModalAtSubmit} />
                </div>
            </Modal>
        </Box>
    );
}

export default ExerciseList;