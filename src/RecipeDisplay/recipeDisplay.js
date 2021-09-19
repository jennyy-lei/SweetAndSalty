import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import RecipeCard from "./recipeCard.js";

const useStyles = makeStyles((theme) => ({
    page: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    title: {
        marginBottom: theme.spacing(4)
    }
}));

export default function RecipeDisplay() {
    const classes = useStyles();

    const tempRecipes = [{id : "1", data: { name : "Chocolate Chip Cookies", cookingTime: "45 Min", recipeUrl: "https://www.bettycrocker.com/recipes/ultimate-chocolate-chip-cookies/77c14e03-d8b0-4844-846d-f19304f61c57", matchedIngredients: "flour,egg,sugar" }},
    {id : "1", data: { name : "Chocolate Chip Cookies", cookingTime: "45 Min", recipeUrl: "https://www.bettycrocker.com/recipes/ultimate-chocolate-chip-cookies/77c14e03-d8b0-4844-846d-f19304f61c57", matchedIngredients: "flour,egg,sugar" }},
    {id : "1", data: { name : "Chocolate Chip Cookies", cookingTime: "45 Min", recipeUrl: "https://www.bettycrocker.com/recipes/ultimate-chocolate-chip-cookies/77c14e03-d8b0-4844-846d-f19304f61c57", matchedIngredients: "flour,egg,sugar"  }},
    {id : "1", data: { name : "Chocolate Chip Cookies", cookingTime: "45 Min", recipeUrl: "https://www.bettycrocker.com/recipes/ultimate-chocolate-chip-cookies/77c14e03-d8b0-4844-846d-f19304f61c57", matchedIngredients: "flour,egg,sugar"  }},
    {id : "1", data: { name : "Chocolate Chip Cookies", cookingTime: "45 Min", recipeUrl: "https://www.bettycrocker.com/recipes/ultimate-chocolate-chip-cookies/77c14e03-d8b0-4844-846d-f19304f61c57", matchedIngredients: "flour,egg,sugar"  }},
    {id : "1", data: { name : "Chocolate Chip Cookies", cookingTime: "45 Min", recipeUrl: "https://www.bettycrocker.com/recipes/ultimate-chocolate-chip-cookies/77c14e03-d8b0-4844-846d-f19304f61c57", matchedIngredients: "flour,egg,sugar"  }}];

    return (
        <Container component={"main"} maxWidth="lg">
            <CssBaseline />
            <div className={classes.page}>
                <Typography className={classes.title} component="div" variant="h5">
                    Recommended Recipes
                </Typography>
                <Grid
                    container
                    item
                    xs={12}
                    spacing={1}
                    alignItems="center"
                    justify="flex-start"
                >
                    {tempRecipes.map(function (tempRecipes) {
                        return (
                            <RecipeCard
                                key={tempRecipes.id}
                                data={tempRecipes.data}
                            />
                        );
                    })}
                </Grid>
            </div>
        </Container>
    );
}