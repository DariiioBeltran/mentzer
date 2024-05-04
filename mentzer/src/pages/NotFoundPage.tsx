import Layout from '../components/layout'

const NotFound = () => {
    return (
        <Layout {...{ route: "/not-found/"}}>
            <div>NotFound</div>
        </Layout>
    );
}

export default NotFound;