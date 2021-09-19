import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    metadata: {
        width: "200px",
        display: "flex",
        flexDirection: "column",
        borderRadius: "5px",
        height: "100%",
        background: "#ffebdf",
        padding: "15px",
        boxSizing: "border-box",
        borderBottom: "5px solid #ffb78b",
    },
    recipeData: {
        lineHeight: "normal",
        whiteSpace: "normal",
        color: "rgb(117, 119, 126)"
    },
    name: {
        whiteSpace: "normal",
        fontSize: "1.5rem",
        marginBottom: "15px"
    }
}));

export default function AssetCard({ data }) {
    const classes = useStyles();

    const handleCardClick = () => {
        window.open(data.url);
    };

    return (
        <div className={classes.metadata} onClick={handleCardClick}>
            <div className={`${classes.recipeData} ${classes.name}`}>{data.name}</div>
            <div className={classes.recipeData}>{"Expected Cooking Time: " + data.time + " Min"}</div>
        </div>
    );
}