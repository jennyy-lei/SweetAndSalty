import React, { useState }  from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { makeStyles } from "@material-ui/core/styles";
import { httpPost,httpGet } from "../Endpoints/endpoints"
import "./CustomizeModal.css";
import { DialogTitle } from "@material-ui/core";

const useStyles = makeStyles(() => ({
    buttonContainer: {
        display: "flex",
        justifyContent: "space-between",
        marginLeft: "15px",
        marginRight: "15px",
        marginBottom: "10px",
    },
    submitButton: {
        backgroundColor: "#ffebdf !important",
        color: "#ff6c10",
    },
    content: {
        marginLeft: "25px",
        paddingBlockEnd: "10px",
        width: "470px",
        flexWrap: "nowrap",
        gap: "0.5rem"
    }
}));

export default function CustomizeModal({open, handleCancel, handleClose, submit}) {
    const classes = useStyles();

    const [ingredients, setIngredients] = useState("");
    const [timeLimit, setTimeLimit] = useState(1);

    const handleIngredientInputChange = (event) => {
        const inputIngredients = event.target.value;
        setIngredients(inputIngredients);
    };

    const handleTimeRangeChange = (event) => {
        setTimeLimit(event.target.value);
    };

    const handleSubmit = () => {
        httpPost("/init", { data: ingredients, time: timeLimit }).then(((data) => {
            console.log("done post");
        }).bind(this));
        // httpPost("/init", { data: ingredients, time: timeLimit });
        setTimeout(() => { httpGet("/ingre"); }, 2000); //! make sure to finish one request before another
        
        handleClose();
        submit(timeLimit, ingredients);
    };

    return (
        <Dialog open={open}>
            <DialogTitle>
                Initial Input
            </DialogTitle>
            <DialogContent className="text">
                Enter any ingredients you have, as well as your desired cooking time.
            </DialogContent>
            <TextField
                className={classes.content}
                onChange={handleIngredientInputChange}
                helperText="Enter a comma seperated list"
            />
            <FormLabel className="text" component="legend">Cooking Time Range</FormLabel>
            <RadioGroup className={classes.content} row name="row-radio-buttons-group" onChange={handleTimeRangeChange}>
                <FormControlLabel checked={timeLimit==1} className="radio" value={1} control={<Radio />} label="0-10 Min" />
                <FormControlLabel checked={timeLimit==2} className="radio" value={2} control={<Radio />} label="10-30 Min" />
                <FormControlLabel checked={timeLimit==3} className="radio" value={3} control={<Radio />} label="30-60 Min" />
                <FormControlLabel checked={timeLimit==4} className="radio" value={4} control={<Radio />} label="60+ Min"/>
            </RadioGroup>
            <DialogActions className={classes.buttonContainer}>
                <Button onClick={handleCancel}>Back</Button>
                <Button onClick={handleSubmit} color="primary" className={classes.submitButton}>
                    Go
                </Button>
            </DialogActions>
        </Dialog>
    );
}