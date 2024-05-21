import { useState } from 'react';
import api from "../api";


export interface CreateOutlineRequest {

}



export const createOutline = async (data: CreateOutlineRequest) => {
    const res = await api.post("/notional_exercise/", data);
    return res;
};