import { useNavigate } from "react-router-dom";
import { usePostAuth } from "../hooks/useGetAuth";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import { useFormik } from "formik";
import { registrationFormSchema } from "../formSchemas/registrationFormSchema";

const RegistrationForm = () => {
    const onSubmit = async (values: any, actions: any) => {
        try {
            const req = {
                username: values.username,
                first_name: values.firstName,
                last_name: values.lastName,
                email: values.email,
                password: values.password
            }
            const res = await execute(req, "/gym_rats/")
            navigate("/login")
        } catch (error) {
            alert(error);
        }
    }

    const {
        values,
        errors,
        touched,
        isSubmitting,
        handleBlur,
        handleChange,
        handleSubmit,
        } = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            username: "",
            password: "",
            confirmPassword: "",
        },
        validationSchema: registrationFormSchema,
        onSubmit,
    });

    const {
        isLoading,
        error,
        data,
        execute,
    } = usePostAuth();
    const navigate = useNavigate();

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
                            value={values.firstName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.firstName && touched.firstName && <p style={{ color: "red" }}>{errors.firstName}</p>}
                        <TextField 
                            id="outlined-basic" 
                            variant="outlined"
                            label="Last Name" 
                            type="text"
                            name="lastName"
                            value={values.lastName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.lastName && touched.lastName && <p style={{ color: "red" }}>{errors.lastName}</p>}
                        <TextField 
                            id="outlined-basic" 
                            variant="outlined"
                            label="email" 
                            type="text"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.email && touched.email && <p style={{ color: "red" }}>{errors.email}</p>}
                        <TextField 
                            id="outlined-basic" 
                            variant="outlined"
                            label="Username" 
                            type="text"
                            name="username"
                            value={values.username}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.username && touched.username && <p style={{ color: "red" }}>{errors.username}</p>}
                        <TextField 
                            id="outlined-basic" 
                            variant="outlined"
                            label="Password" 
                            type="password"
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.password && touched.password && <p style={{ color: "red" }}>{errors.password}</p>}
                        <TextField 
                            id="outlined-basic" 
                            variant="outlined"
                            label="Confirm Password" 
                            type="password"
                            name="confirmPassword"
                            value={values.confirmPassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.confirmPassword && touched.confirmPassword && <p style={{ color: "red" }}>{errors.confirmPassword}</p>}
                        <Button variant="outlined" type="submit" color="secondary">Register</Button>
                    </Stack>
                </Grid>
            </Grid>
        </form>
    )
}

export default RegistrationForm;