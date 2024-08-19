import { useParams } from 'react-router-dom';
import Layout from "../../components/layout";
import { LoggingProvider } from "./LoggingProvider"
import LoggingForm from "./components/LoggingForm";


const LoggingPage = () => {
    const { id } = useParams()
    if (!id) { return null; }

    return (
        <LoggingProvider id={parseInt(id)}>
            <Layout {...{ route: "/log/"}}>
                <LoggingForm />
            </Layout>
        </LoggingProvider>
    )
}

export default LoggingPage;