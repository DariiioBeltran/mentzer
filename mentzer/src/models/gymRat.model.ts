export interface NotionalExercise {
    id: Number;
    exercise_name: string;
    primary_muscle_group: string;
    secondary_muscle_groups?: string;
    exercise_scope: string;
    equipment_category: string;
}

export interface ExerciseOutline {
    id: Number;
    notional_exercise: NotionalExercise;
    number_of_sets: Number;
    number_of_reps: Number;
}

export interface WorkoutOutline {
    id: Number;
    exercise_outlines: ExerciseOutline[];
    workout_outline_name: string;
}

export interface GymRatData {
    id: Number;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
}

export interface BaseGymRatModel {
    get apiResponse(): any; // Come back and fix this
    get gymRatData(): any; // come back and fix this
    get gymRatExercises(): NotionalExercise[];
    get gymRatWorkoutOutlines(): WorkoutOutline[];
}

export class GymRatModel implements BaseGymRatModel {
    constructor(
        readonly apiResponse: any
    ) {
        this.apiResponse = apiResponse;
    }

    get gymRatData(): GymRatData {
        const data: GymRatData = {
            id: this.apiResponse.id,
            username: this.apiResponse.username,
            first_name: this.apiResponse.first_name,
            last_name: this.apiResponse.last_name,
            email: this.apiResponse.email,
        }
        return data
    }

    get gymRatExercises(): NotionalExercise[] {
        return this.apiResponse.exercises
    }

    get gymRatWorkoutOutlines(): WorkoutOutline[] {
        return this.apiResponse.workout_outline
    }
}
