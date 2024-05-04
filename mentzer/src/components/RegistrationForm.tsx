import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePostAuth } from "../hooks/useGetAuth";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';

// TODO: Make a confirm password field and add some validation to enfore them

const RegistrationForm = () => {
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
            const req = {
                username: inputData.username,
                first_name: inputData.firstName,
                last_name: inputData.lastName,
                email: inputData.email,
                password: inputData.password
            }
            const res = await execute(req, "/gym_rats/")
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
                        <h1 style={{ textAlign: "center" }}>Register</h1>
                        <Divider />
                        <TextField 
                            id="outlined-basic" 
                            variant="outlined"
                            label="First Name" 
                            type="text"
                            name="firstName"
                            value={inputData.firstName || ""}
                            onChange={handleChange}
                        />
                        <TextField 
                            id="outlined-basic" 
                            variant="outlined"
                            label="Last Name" 
                            type="text"
                            name="lastName"
                            value={inputData.lastName || ""}
                            onChange={handleChange}
                        />
                        <TextField 
                            id="outlined-basic" 
                            variant="outlined"
                            label="email" 
                            type="text"
                            name="email"
                            value={inputData.email || ""}
                            onChange={handleChange}
                        />
                        <TextField 
                            id="outlined-basic" 
                            variant="outlined"
                            label="Username" 
                            type="text"
                            name="username"
                            value={inputData.username || ""}
                            onChange={handleChange}
                        />
                        <TextField 
                            id="outlined-basic" 
                            variant="outlined"
                            label="Password" 
                            type="password"
                            name="password"
                            value={inputData.password || ""}
                            onChange={handleChange}
                        />
                        <Button variant="outlined" type="submit" color="secondary">Register</Button>
                    </Stack>
                </Grid>
            </Grid>
        </form>
    )
}

export default RegistrationForm;