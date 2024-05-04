import Layout from '../components/layout'
import LoginForm from '../components/LoginForm';
import Card from '@mui/material/Card';
import { Container } from '@mui/material';
import Grid from '@mui/material/Grid';

const Login = () => {
    return (
        <Layout {...{ route: "/login/"}}>
            <Container>
                <LoginForm />
            </Container>
        </Layout>
    );
}

export default Login;