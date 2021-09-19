import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import RecipeCard from "./recipeCard.js";

let x = 0;
const useStyles = makeStyles((theme) => ({
    page: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "20px",
        marginBottom: "20px"
    },
    title: {
        padding: "20px"
    }
}));

export default function RecipeDisplay() {
    const classes = useStyles();

    const recipes = [{id : "1", data: { name : "Chocolate Chip Cookies", cookingTime: "45 Min", recipeUrl: "https://www.bettycrocker.com/recipes/ultimate-chocolate-chip-cookies/77c14e03-d8b0-4844-846d-f19304f61c57", matchedIngredients: "flour,egg,sugar" }},
    {id : "1", data: { name : "Chocolate Chip Cookies", cookingTime: "45 Min", recipeUrl: "https://www.bettycrocker.com/recipes/ultimate-chocolate-chip-cookies/77c14e03-d8b0-4844-846d-f19304f61c57", matchedIngredients: "flour,egg,sugar" }},
    {id : "1", data: { name : "Chocolate Chip Cookies", cookingTime: "45 Min", recipeUrl: "https://www.bettycrocker.com/recipes/ultimate-chocolate-chip-cookies/77c14e03-d8b0-4844-846d-f19304f61c57", matchedIngredients: "flour,egg,sugar"  }},
    {id : "1", data: { name : "Chocolate Chip Cookies", cookingTime: "45 Min", recipeUrl: "https://www.bettycrocker.com/recipes/ultimate-chocolate-chip-cookies/77c14e03-d8b0-4844-846d-f19304f61c57", matchedIngredients: "flour,egg,sugar"  }},
    {id : "1", data: { name : "Chocolate Chip Cookies", cookingTime: "45 Min", recipeUrl: "https://www.bettycrocker.com/recipes/ultimate-chocolate-chip-cookies/77c14e03-d8b0-4844-846d-f19304f61c57", matchedIngredients: "flour,egg,sugar"  }},
    {id : "1", data: { name : "Chocolate Chip Cookies", cookingTime: "45 Min", recipeUrl: "https://www.bettycrocker.com/recipes/ultimate-chocolate-chip-cookies/77c14e03-d8b0-4844-846d-f19304f61c57", matchedIngredients: "flour,egg,sugar"  }}];

    return (
        <div style={{height: "100%", display: "flex", flexDirection: "column", boxSizing: "border-box"}}>
            <Typography className={classes.title} component="div" variant="h5">
                Recommended Recipes
            </Typography>
            <div className={classes.page} style={{overflow: "auto", flex: 1, padding: "0 20px"}}>
                {recipes.map(function (value) {
                    return (
                        <RecipeCard
                            key={x++}
                            data={value}
                        />
                    );
                })}
            </div>
        </div>
    );
}