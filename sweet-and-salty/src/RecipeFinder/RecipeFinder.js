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
    }
}));

export default function RecipeFinder() {

    const classes = useStyles();
    const history = useHistory();

    const [modalOpen, setModalOpen] = React.useState(
        true
    );
    const [recipeList, setRecipeList] = React.useState([]);

    const onModalCancel = () => {
        setModalOpen(false);
        history.push('/');
    }

    const onModalClose = () => {
        setModalOpen(false);
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

            <div className={classes.flow}>
                <Flowchart 
                    handleAddRecommendedRecipes={newRecommendedRecipes}/>
            </div>
            <div style={{flex: 3, background: "white"}}>
                <RecipeDisplay 
                    recipes={recipeList}
                />
            </div>
            <CustomizeModal
                open={modalOpen}
                handleCancel={onModalCancel}
                handleClose={onModalClose}
                 />
        </div>
        
    );
}