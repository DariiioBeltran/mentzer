import FormGroup from '@mui/material/FormGroup';
import { FormattedMuslceGroups } from "../../../constants/constants";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useOutlinesContext } from "../OutlinesContext"
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

import Step1, { Step1SubRequest } from "./Step1";
import Step2, { Step2SubRequest } from "./Step2";
import Step3 from "./Step3";






import { useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { ExerciseScope } from '../../../models/notionalExercise.model';
import StepConnector, {stepConnectorClasses} from '@mui/material/StepConnector';

const CreateOutlineStepper = () => {
    const { exercises } = useOutlinesContext();

    const [step1Data, setStep1Data] = useState<Step1SubRequest | undefined>(undefined);
    const [step2Data, setStep2Data] = useState<Step2SubRequest | undefined>(undefined);
    const [step3Data, setStep3Data] = useState(undefined);

    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    // hande local submissions
    const handleStep1Submit = (values: Step1SubRequest) => {
        setStep1Data(values)
    }
    const handleStep2Submit = (values: Step2SubRequest) => {
        setStep2Data(values)
    }
    const handleStep3Submit = (values: any) => {
        setStep3Data(values)
    }

    // handle global submission
    const handleGlobalSubmission = () => {}

    // define steps labels
    const steps = ["Name your workout outline", "Select your exercises", "Sets and reps for each exercise"]

    const renderStepContent = (step: number) => {
        switch (step) {
            case 0:
            return <Step1 localSubmit={handleStep1Submit} />;
            case 1:
            return <Step2 exercises={exercises} localSubmit={handleStep2Submit} />;
            case 2:
            return <Step3 selectedExercises={step2Data?.selected_exercises || []} localSubmit={handleStep3Submit} />;
            default:
            return <div>Not Found</div>;
        }
    }

  return (
    <Box display="flex" justifyContent="center" sx={{ height: "75%" }}>
      <Stepper 
        activeStep={activeStep} 
        orientation="vertical" 
        sx={{ 
            width: "75%",
            "& .MuiStep-root": {
                "& .MuiStepLabel-root": {
                  padding: 0,
                  height: '20px'
                }
              },
              "& .MuiStepConnector-root": {
                marginLeft: "11px"
            }
        }}
        connector={<StepConnector sx={{
          [`&.${stepConnectorClasses.active}`]: {
            [`& .${stepConnectorClasses.line}`]: {
              borderColor: 'transparent',
            },
          },
          [`&.${stepConnectorClasses.completed}`]: {
            [`& .${stepConnectorClasses.line}`]: {
              borderColor: 'transparent',
            },
          },
          [`& .${stepConnectorClasses.line}`]: {
            borderColor: 'transparent',
            borderTopWidth: 3,
            borderRadius: 1,
          },
        }} />}
    >
        {steps.map((step, index) => (
            <Step key={step} sx={{ height: "75%" }}>
                <StepLabel
                    optional={
                        index === 2 ? (
                        <Typography variant="caption">Last step</Typography>
                        ) : null
                    }
                >
                    <h1>{step}</h1>
                </StepLabel>
                <StepContent style={{ width: "100%", height: "100%"}}>
                    <div style={{ paddingTop: "20px" }}>{renderStepContent(activeStep)}</div>
                    <Box sx={{ mb: 2 }}>
                        <div>
                            <Button
                                variant="contained"
                                onClick={handleNext}
                                sx={{ mt: 1, mr: 1 }}
                            >
                                {index === steps.length - 1 ? 'Finish' : 'Continue'}
                            </Button>
                            <Button
                                disabled={index === 0}
                                onClick={handleBack}
                                sx={{ mt: 1, mr: 1 }}
                            >
                                Back
                            </Button>
                        </div>
                    </Box>
                </StepContent>
            </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )}
    </Box>
  );
}

export default CreateOutlineStepper;
