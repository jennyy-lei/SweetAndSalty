import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import defaultImage from "../img/default_recipe_img_4.jpg";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(() => ({
    card: {
        fontSize: 16,
    },
    cardImage: {
        borderTopLeftRadius: "6px",
        borderTopRightRadius: "6px",
        width: "90%",
        height: "70px",
        maxWidth: 400,
        marginTop: 16,
        objectFit: "cover",
    },
    metadata: {
        display: "flex",
        flexDirection: "column",
        marginLeft: "5.7%",
        marginRight: "5.7%",
        marginTop: -4,
        backgroundColor: "white",
        borderBottomLeftRadius: "6px",
        borderBottomRightRadius: "6px",
        height: 150,
    },
    recipeData: {
        lineHeight: "normal",
        marginTop: 8,
        marginBottom: 0,
        marginLeft: 10,
        maxWidth: "75%",
    },
    ingredients: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FF9F8B",
        borderTopLeftRadius: "12px",
        borderTopRightRadius: "12px",
        borderBottomLeftRadius: "12px",
        borderBottomRightRadius: "12px",
    }
}));

export default function AssetCard({ data, handleDeleteClick }) {
    const classes = useStyles();

    const handleCardClick = () => {
        window.open(data.recipeUrl);
    };

    return (
        <Grid
            container
            item
            xs={12}
            md={6}
            lg={4}
            spacing={1}
            alignItems="center"
            justify="flex-start"
            className={classes.card}
        >
            <Grid
                container
                item
                xs={12}
                alignItems="center"
                justify="center"
                onClick={handleCardClick}
            >
                <img
                    className={classes.cardImage}
                    src={defaultImage}
                    alt="Recipe"
                />
            </Grid>
            <Grid
                container
                item
                xs={12}
                alignItems="left"
                className={classes.metadata}
                onClick={handleCardClick}
            >
                <Typography className={classes.recipeData} gutterBottom variant="h5" component="h2">{data.name}</Typography>
                <Typography className={classes.recipeData} component="p">{"Expected Cooking Time: " + data.cookingTime}</Typography>
                <Typography className={classes.recipeData} component="p">{"Matching Ingredients: " + data.matchedIngredients}</Typography>

                {/* <div>
                    {data.matchedIngredients.split(",").map(function (ingredient) {
                            return (
                                <Typography className={classes.ingredients} component="p">{ingredient}</Typography>
                            );
                        })}
                </div> */}

            </Grid>
        </Grid>
    );
}