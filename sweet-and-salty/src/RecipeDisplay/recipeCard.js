import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    link: {
        height: "100%",
        width: "250px",
        flexShrink: 0,
        textDecoration: "none",
        color: "inherit",
        overflow: "auto",
        borderRadius: "5px",
        padding: "15px",
        boxSizing: "border-box",
        background: "#ffebdf",
        borderBottom: "5px solid #ffb78b",
    },
    metadata: {
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
    },
    recipeData: {
        lineHeight: "normal",
        whiteSpace: "normal",
        color: "rgb(117, 119, 126)"
    },
    name: {
        whiteSpace: "normal",
        fontSize: "1.25rem",
        marginBottom: "10px"
    }
}));

export default function AssetCard({ data }) {
    const classes = useStyles();

    return (
        <a href={"https://" + data.link} className={classes.link} target="_blank">
            <div className={classes.metadata}>
                <div className={`${classes.recipeData} ${classes.name}`}>{data.name}</div>
                <div className={classes.recipeData}>Expected Cooking Time: { data.time == 0 ? "N/A" : `${data.time} min`}</div>
            </div>
        </a>
    );
}