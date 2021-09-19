import React from "react";
import CustomizeModal from "../Modals/CustomizeModal";
import { Link, useHistory } from "react-router-dom";
import { Flowchart } from "../Flowchart/Flowchart";
import { makeStyles } from "@material-ui/core/styles";
import "./RecipeFinder.css";
import RecipeDisplay from "../RecipeDisplay/recipeDisplay";

const useStyles = makeStyles((theme) => ({
    wrapper: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
    },
    flow: {
        flex: 7,
    },
    initial: {
        display: "flex",
        flexDirection: "row",
        padding: "5px",
        paddingLeft: "50px",
        color: "rgb(117, 119, 126)",
        alignItems: "center"
    },
    important: {
        color: "#ff6c10",
        padding: "3px 10px",
        borderRadius: "5px",
        backgroundColor: "#ffebdf"
    }
}));

export default function RecipeFinder() {

    const classes = useStyles();
    const history = useHistory();

    const [modalOpen, setModalOpen] = React.useState(true);
    const [results, setResults] = React.useState(null);
    const [recipeList, setRecipeList] = React.useState([]);

    const onModalCancel = () => {
        setModalOpen(false);
        history.push('/');
    }

    const onModalClose = () => {
        setModalOpen(false);
    }

    const onSubmit = (time, ing) => {
        setResults({ time: time, ing: ing });
    }

    const toTime = (i) => {
        switch (parseInt(i)) {
            case 1: return "10-15 min";
            case 2: return "15-30 min";
            case 3: return "30-60 min";
            case 4: return "60+ min";
            default: return "_";
        }
    }
    
    const newRecommendedRecipes = (newRecommendedRecipes) => {
        setRecipeList(newRecommendedRecipes + recipeList); 
    }
    
    return (
        <div className={classes.wrapper}>
            <Link to="/" className="name">
                <div>
                    Sweet &amp; Salty
                </div>
            </Link>

            <div className={classes.initial}>
                Time:&nbsp;&nbsp;<span className={classes.important}>{toTime(results?.time)}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ingredients:&nbsp;&nbsp;<span className={classes.important}>{results?.ing || "_"}</span>
            </div>
            <div className={classes.flow}>
                <Flowchart 
                    newRecommendedRecipes={newRecommendedRecipes}/>
            </div>
            <div style={{flex: 3, background: "#fafafa"}}>
                <RecipeDisplay 
                    recipes={recipeList}
                />
            </div>
            <CustomizeModal
                open={modalOpen}
                handleCancel={onModalCancel}
                handleClose={onModalClose}
                submit={onSubmit}
                 />
        </div>
        
    );
}