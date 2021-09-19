import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import RecipeCard from "./recipeCard.js";

let x = 0;
const useStyles = makeStyles((theme) => ({
    page: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "20px",
        marginBottom: "10px"
    },
    title: {
        padding: "20px",
        color: "rgb(117, 119, 126)",
        fontSize: "1.5rem"
    }
}));

export default function RecipeDisplay({ recipes }) {
    const classes = useStyles();

    return (
        <div style={{height: "100%", display: "flex", flexDirection: "column", boxSizing: "border-box"}}>
            <div className={classes.title}>
                Recommended Recipes&nbsp;&nbsp;&nbsp;<span style={{fontSize: "14px"}}>({recipes.length} recipes found)</span>
            </div>
            <div className={classes.page} style={{overflow: "auto", flex: "1 0 0", padding: "0 20px 10px 20px"}}>
                {recipes.length == 0 ? <div style={{color: "rgb(117, 119, 126)", width: "100%", textAlign: "center"}}>No recipes matched. Add more ingredients to the search to add more.</div> : recipes.map(function (recipe) {
                    return (
                        <RecipeCard
                            key={x++}
                            data={recipe}
                        />
                    );
                })}
            </div>
        </div>
    );
}