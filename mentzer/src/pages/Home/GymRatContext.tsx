import { useContext, createContext } from "react";
import { GymRatData, NotionalExercise, WorkoutOutline } from "../../models/gymRat.model";


export interface GymRatContextType {
    gymRatData: GymRatData;
    exercises: NotionalExercise[];
    workoutOutlines: WorkoutOutline[];
}

export const GymRatContext = createContext<GymRatContextType>({} as GymRatContextType);

export const useGymRatContext = () => {
    return useContext(GymRatContext)
}
