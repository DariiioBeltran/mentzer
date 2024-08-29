import { useState } from "react";
import { AppBar, Box, Chip, Stack, Tab, Tabs, Typography, useTheme } from "@mui/material";
import OutlineList from "./components/OutlineList";
import ExerciseList from "./components/ExerciseList";

interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: number;
    value: number;
  }
  
  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  function a11yProps(index: number) {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
  }

const MobileHomePage = () => {
    const theme = useTheme();
    const [tab, setTab] = useState("workouts");

    const handleTabChange = (event: any, value: any) => {
        setTab(value);
    }

    const handleClick = () => {
        console.info('You clicked the Chip.');
      };

    return (
        <Box sx={{ height: "100vh" }}>
            <Box
                display="flex"
                flexDirection="row"
                justifyContent="center"
                sx={{
                    // paddingTop: 4,
                    background: "purple"
                }}
                my={4}
            >
                <AppBar position="static">
                    <Tabs
                        value={tab}
                        onChange={handleTabChange}
                        indicatorColor="secondary"
                        textColor="inherit"
                        variant="fullWidth"
                        aria-label="full width tabs example"
                    >
                        <Tab label="Item One" />
                        <Tab label="Item Two" />
                    </Tabs>
                    <TabPanel value={0} index={0} dir={theme.direction}></TabPanel>
                    <TabPanel value={1} index={1} dir={theme.direction}></TabPanel>
                </AppBar>
            </Box>


            
        </Box>
        // <Box
        //     display="flex"
        //     flexDirection="column"
        //     height="85vh"
        //     mx={2}
        //     px={2}
        //     sx={{ 
        //         background: "white", 
        //         overflow: "auto",
        //         marginTop: 2,
        //     }}
        // >
        //     <Box sx={{ flexGrow: 1 }}>
        //         <Tabs
        //             value={tab}
        //             onChange={handleTabChange}
        //             textColor="secondary"
        //             indicatorColor="secondary"
        //             aria-label="secondary tabs example"
        //             variant="fullWidth"
        //             sx={{
        //                 marginBottom: 0,
        //                 paddingBottom: 0,
        //             }}
        //         >
        //             <Tab value="workouts" label="Workouts" />
        //             <Tab value="exercises" label="Exercises" />
        //         </Tabs>
        //         <Box
        //             display="flex"
        //             flexDirection="column"
        //             height="100vh"
        //         >
        //             <Box
        //                 sx={{
        //                     overflow: "auto"
        //                 }}
        //             >
        //                 {(tab === "workouts")
        //                     ? <OutlineList />
        //                     : <ExerciseList />
        //                 }
        //             </Box>
        //         </Box>
        //     </Box>
        // </Box>
    )
}

export default MobileHomePage;