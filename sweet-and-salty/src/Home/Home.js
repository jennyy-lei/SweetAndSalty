import { Component } from "react";
import Background from '../img/background_image.jpg';
import { makeStyles } from "@material-ui/core/styles";
// import Button from '@mui/material/Button';

const useStyles = makeStyles(() => ({
    sectionStyle: {
        display: "flex",
        height: "100vh",
        width: "100%",
        flexDirection: "column",
        backgroundPosition: 'center',
        backgroundSize: "100%",
        backgroundRepeat: 'no-repeat',
        backgroundImage: `url(${Background})`
      },
      title: {
        margin: "12%",
        textAlign: "center",
      },
      nav: {
        outline: "solid",
        
      },
      main: {
          fontSize: "500%",
          fontFamily: "serif"
      }
}));

export default function Home() {
    const classes = useStyles();

    return (
        <section className={classes.sectionStyle} >
            <div className={classes.title}>
                <h1 className={classes.main}>Sweet & Salty</h1>
                {/* <Button variant="outlined">Get Started</Button> */}
                {/* <h2>Get started</h2> */}
            </div>
        </section>
    );
}