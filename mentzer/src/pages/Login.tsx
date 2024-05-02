import Layout from '../components/layout'
import AuthForm from '../components/AuthForm';

const Login = () => {
    return (
        <Layout>
            <AuthForm route="/token/" method="login" />
        </Layout>
    );
}

export default Login;