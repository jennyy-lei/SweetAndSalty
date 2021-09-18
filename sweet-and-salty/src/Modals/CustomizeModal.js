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

const useStyles = makeStyles(() => ({
    buttonContainer: {
        display: "flex",
        justifyContent: "space-between",
        marginLeft: "15px",
        marginRight: "15px",
        marginBottom: "10px"
    },
    submitButton: {
        backgroundColor: "#F52000",
        color: "#ffffff",
    },
    content: {
        marginLeft: "25px",
        paddingBlockEnd: "10px",
        width: "470px"
    }
}));

export default function CustomizeModal({open, handleClose, handleSubmit }) {
    const classes = useStyles();

    const [ingredients, setIngredients] = useState("");
    const [timeLimit, setTimeLimit] = useState("");

    const handleIngredientInputChange = (event) => {
        const inputIngredients = event.target.value;
        setIngredients(inputIngredients);
        console.log(ingredients);
    };

    const handleTimeRangeChange = (event) => {
        setTimeLimit(event.target.value);
        console.log(timeLimit);
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogContent>
                Enter any ingredients you have, as well as your desired cooking time.
            </DialogContent>
            <TextField
                className={classes.content}
                onChange={handleIngredientInputChange}
                helperText="Enter a comma seperated list"
            />
            <FormLabel className={classes.content} component="legend">Cooking Time Range</FormLabel>
            <RadioGroup className={classes.content} row aria-label="gender" name="row-radio-buttons-group" onChange={handleTimeRangeChange}>
                <FormControlLabel value={"0-10"} control={<Radio />} label="0-10 Min" />
                <FormControlLabel value={"10-30"} control={<Radio />} label="10-30 Min" />
                <FormControlLabel value={"30-60"} control={<Radio />} label="30-60 Min" />
                <FormControlLabel value={"60+"} control={<Radio />} label="60+ Min"/>
            </RadioGroup>
            <DialogActions className={classes.buttonContainer}>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSubmit} color="primary" className={classes.submitButton}>
                    Go
                </Button>
            </DialogActions>
        </Dialog>
    );
}