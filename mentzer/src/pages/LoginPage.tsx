import Layout from '../components/layout'
import LoginForm from '../components/LoginForm';
import Card from '@mui/material/Card';
import { Container } from '@mui/material';
import Grid from '@mui/material/Grid';

const Login = () => {
    return (
        <Layout {...{ route: "/login/"}}>
            {/* <Grid
                container
                // spacing={0}
                direction="row"
                alignItems="center"
                justifyContent="center"
                style={{ minWidth: '75%' }}
            >
                <Grid item xs={2}>
                    <LoginForm />
                </Grid>      
            </Grid> */}





            <Container>
                {/* <Card sx={{ my: 4, pb:4, bgcolor: "#808f85" }}> */}
                    <LoginForm />
                {/* </Card> */}
            </Container>
        </Layout>
    );
}

export default Login;