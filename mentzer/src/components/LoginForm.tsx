import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, GYM_RAT_ID, REFRESH_TOKEN } from "../constants";
import { usePostAuth } from "../hooks/useGetAuth";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';

const LoginForm = () => {
    const {
        isLoading,
        error,
        data,
        execute,
    } = usePostAuth();

    const [inputData, setInputData] = useState<any>({});
    const navigate = useNavigate();

    const handleChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const name = event.currentTarget.name;
        const value = event.currentTarget.value;
        setInputData((values: any) => ({...values, [name]: value}))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await execute({username: inputData.username, password: inputData.password}, "/token/")
            localStorage.setItem(ACCESS_TOKEN, res.data.access);
            localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
            localStorage.setItem(GYM_RAT_ID, res.data.id);
            navigate("/")
        } catch (error) {
            alert(error);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <Grid
                container
                spacing={2}
                direction="row"
                alignItems="center"
                justifyContent="center"
                style={{ minWidth: '75%' }}
            >
                <Grid item xs={6}>
                    <Stack spacing={2}>
                        <h1 style={{ textAlign: "center" }}>Log In</h1>
                        <Divider />
                        <TextField 
                            id="outlined-basic" 
                            label="Username" 
                            variant="outlined" 
                            type="text"
                            name="username"
                            value={inputData.username || ""}
                            onChange={handleChange}
                        />
                        <TextField 
                            id="outlined-basic" 
                            label="Password" 
                            variant="outlined" 
                            type="password"
                            name="password"
                            value={inputData.password || ""}
                            onChange={handleChange}
                        />
                        <Button variant="outlined" type="submit" color="secondary">Log In</Button>
                    </Stack>
                </Grid>
            </Grid>
        </form>
    )
}

export default LoginForm;