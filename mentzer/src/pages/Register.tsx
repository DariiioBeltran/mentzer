import Layout from '../components/layout'
import AuthForm from '../components/AuthForm';

const Register = () => {
    return (
        <Layout>
            <AuthForm route="/user/register/" method="register" />
        </Layout>
    );
}

export default Register;