import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import RecipeCard from "./recipeCard.js";

const useStyles = makeStyles((theme) => ({
    page: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "20px",
        marginBottom: "20px"
    },
    title: {
        padding: "20px",
        color: "rgb(117, 119, 126)",
        fontSize: "1.5rem"
    }
}));

export default function RecipeDisplay() {
    const classes = useStyles();

    const tempRecipes = [
        // {id : "1", data: { name : "Chocolate Chip Cookies", cookingTime: "45 Min", recipeUrl: "https://www.bettycrocker.com/recipes/ultimate-chocolate-chip-cookies/77c14e03-d8b0-4844-846d-f19304f61c57", matchedIngredients: "flour,egg,sugar" }},
        // {id : "1", data: { name : "Chocolate Chip Cookies", cookingTime: "45 Min", recipeUrl: "https://www.bettycrocker.com/recipes/ultimate-chocolate-chip-cookies/77c14e03-d8b0-4844-846d-f19304f61c57", matchedIngredients: "flour,egg,sugar" }},
        // {id : "1", data: { name : "Chocolate Chip Cookies", cookingTime: "45 Min", recipeUrl: "https://www.bettycrocker.com/recipes/ultimate-chocolate-chip-cookies/77c14e03-d8b0-4844-846d-f19304f61c57", matchedIngredients: "flour,egg,sugar"  }},
        // {id : "1", data: { name : "Chocolate Chip Cookies", cookingTime: "45 Min", recipeUrl: "https://www.bettycrocker.com/recipes/ultimate-chocolate-chip-cookies/77c14e03-d8b0-4844-846d-f19304f61c57", matchedIngredients: "flour,egg,sugar"  }},
        // {id : "1", data: { name : "Chocolate Chip Cookies", cookingTime: "45 Min", recipeUrl: "https://www.bettycrocker.com/recipes/ultimate-chocolate-chip-cookies/77c14e03-d8b0-4844-846d-f19304f61c57", matchedIngredients: "flour,egg,sugar"  }},
        // {id : "1", data: { name : "Chocolate Chip Cookies", cookingTime: "45 Min", recipeUrl: "https://www.bettycrocker.com/recipes/ultimate-chocolate-chip-cookies/77c14e03-d8b0-4844-846d-f19304f61c57", matchedIngredients: "flour,egg,sugar"  }}
    ];

    return (
        <div style={{height: "100%", display: "flex", flexDirection: "column", boxSizing: "border-box"}}>
            <div className={classes.title}>
                Recommended Recipes&nbsp;&nbsp;&nbsp;<span style={{fontSize: "14px"}}>({tempRecipes.length} recipes found)</span>
            </div>
            <div className={classes.page} style={{overflow: "auto", flex: 1, padding: "0 20px"}}>
                {tempRecipes.length == 0 ? <div style={{color: "rgb(117, 119, 126)", width: "100%", textAlign: "center"}}>No recipes matched. Add more ingredients to the search to add more.</div> : tempRecipes.map(function (tempRecipes) {
                    return (
                        <RecipeCard
                            key={tempRecipes.id}
                            data={tempRecipes.data}
                        />
                    );
                })}
            </div>
        </div>
    );
}