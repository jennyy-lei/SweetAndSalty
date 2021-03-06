import React from "react";
import CustomizeModal from "../Modals/CustomizeModal";
import { Link, useHistory } from "react-router-dom";
import { Flowchart } from "../Flowchart/Flowchart";
import { makeStyles } from "@material-ui/core/styles";
import "./RecipeFinder.css";
import RecipeDisplay from "../RecipeDisplay/recipeDisplay";
import { httpGet } from "../Endpoints/endpoints"

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
    },
    header: {
        marginTop: "10px",
        marginLeft: "20px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "1rem"
    },
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
        httpGet("/recipe").then(((data) => {
            console.log("done get recipes for initial ingredients");
            setRecipeList(data.data.data);
        }).bind(this));
    }

    const toTime = (i) => {
        switch (parseInt(i)) {
            case 1: return "0-10 min";
            case 2: return "10-30 min";
            case 3: return "30-60 min";
            case 4: return "No Limit";
            default: return "_";
        }
    }
    
    const newRecommendedRecipes = (newRecommendedRecipes) => {
        setRecipeList(newRecommendedRecipes); 
    }

    const restart = () => {
        window.location.reload();
    }
    
    return (
        <div className={classes.wrapper}>
            <div className={classes.header}>
                <Link to="/" className="name">
                    <div>
                        Sweet &amp; Salty
                    </div>
                </Link>
                <div className="restart" onClick={restart}>Restart</div>
            </div>

            <div className={classes.initial}>
                Time:&nbsp;&nbsp;<span className={classes.important}>{toTime(results?.time)}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ingredients:&nbsp;&nbsp;<span className={classes.important}>{results?.ing || "_"}</span>
            </div>
            <div className={classes.flow}>
                <Flowchart 
                    modalOpen={modalOpen} newRecommendedRecipes={newRecommendedRecipes} />
            </div>
            <div style={{flex: 3, background: "#fafafa"}}>
                <RecipeDisplay 
                    recipes={recipeList} />
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