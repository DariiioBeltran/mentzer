import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, GYM_RAT_ID, REFRESH_TOKEN } from "../constants/authConstants";
import { usePostAuth } from "../hooks/useGetAuth";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { useFormik } from "formik";

const LoginForm = () => {
    const onSubmit = async (values: any, actions: any) => {
        try {
            const res = await execute({username: values.username, password: values.password}, "/token/")
            localStorage.setItem(ACCESS_TOKEN, res.data.access);
            localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
            localStorage.setItem(GYM_RAT_ID, res.data.id);
            navigate("/")
        } catch (error) {
            alert(error);
        }
    }

    const {
        isLoading,
        error,
        data,
        execute,
    } = usePostAuth();

    const {
        values,
        handleChange,
        handleSubmit,
      } = useFormik({
        initialValues: {
          username: "",
          password: "",
        },
        onSubmit,
      });

    const navigate = useNavigate();

    return (
        <Box sx={{ border: 1, borderRadius: 1, width: "50%" }}>
            <form onSubmit={handleSubmit}>
                <Stack spacing={2} sx={{ py: 2 }}>
                    <h1 style={{ textAlign: "center" }}>Log In</h1>
                    <Divider />
                    <TextField 
                        id="outlined-basic" 
                        label="Username" 
                        variant="outlined" 
                        type="text"
                        name="username"
                        value={values.username}
                        onChange={handleChange}
                    />
                    <TextField 
                        id="outlined-basic" 
                        label="Password" 
                        variant="outlined" 
                        type="password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                    />
                    <Divider />
                    <Button variant="outlined" type="submit" color="secondary">Log In</Button>
                </Stack>
            </form>
        </Box>
    )
}

export default LoginForm;