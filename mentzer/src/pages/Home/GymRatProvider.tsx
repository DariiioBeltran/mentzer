import React, { ReactNode, useState, useEffect } from 'react';
import { GYM_RAT_ID } from "../../constants";
import { GymRatModel } from "../../models/gymRat.model";
import api from "../../api";
import { GymRatContext, GymRatContextType } from "./GymRatContext";


interface GymRatContextProviderProps {
    children?: ReactNode;
}

export function GymRatProvider(props: GymRatContextProviderProps) {
    const gymRatId = localStorage.getItem(GYM_RAT_ID);
    const [gymRat, setGymRat] = useState<GymRatModel | undefined>(undefined);

    useEffect(()=>{ 
        (async () => { 
            const resp = await api.get(`/gym_rats/${gymRatId}`)
            console.log("LOGGING RESPONSE")
            console.log(resp)
            const gym_rat = new GymRatModel(resp.data)
            setGymRat(gym_rat)
        })() 
    },[])

    console.log(`GYM RAT: ${gymRat}`)

    const value = {
        gymRatData: gymRat?.gymRatData,
        exercises: gymRat?.gymRatExercises,
        workoutOutlines: gymRat?.gymRatWorkoutOutlines,
    } as GymRatContextType;

    return <GymRatContext.Provider value={value}>{ props?.children }</GymRatContext.Provider>;
}
