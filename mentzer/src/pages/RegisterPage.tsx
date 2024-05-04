import Layout from '../components/layout'
import RegistrationForm from '../components/RegistrationForm';

const RegisterPage = () => {
    return (
        <Layout {...{ route: "/register/"}}>
            <RegistrationForm />
        </Layout>
    );
}

export default RegisterPage;