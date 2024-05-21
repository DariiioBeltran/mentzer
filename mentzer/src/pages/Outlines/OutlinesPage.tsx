import { Container } from "@mui/material";
import Layout from "../../components/layout"
import CreateOutlineStepper from "./components/Stepper";
import { OutlineProvider } from "./OutlineProvider";

const OutlinesPage = () => {
    return (
        <OutlineProvider>
            <Layout {...{ route: "/outlines/"}}>
                    <CreateOutlineStepper />
                    {/* <CreateOutlineWizzard /> */}

            </Layout>
        </OutlineProvider>
    );
}

export default OutlinesPage;