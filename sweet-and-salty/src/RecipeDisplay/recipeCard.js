import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    link: {
        height: "100%",
        width: "200px",
        flexShrink: 0,
        textDecoration: "none",
        color: "inherit"
    },
    metadata: {
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: "5px",
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

    return (
        <a href={"https://" + data.link} className={classes.link} target="_blank">
            <div className={classes.metadata}>
                <div className={`${classes.recipeData} ${classes.name}`}>{data.name}</div>
                <div className={classes.recipeData}>{"Expected Cooking Time: " + data.time + " Min"}</div>
            </div>
        </a>
    );
}