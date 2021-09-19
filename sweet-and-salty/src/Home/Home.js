import Background from '../img/background_image.jpg';
import { makeStyles } from "@material-ui/core/styles";
import Button from '@mui/material/Button';
import { useHistory } from "react-router-dom";
import "./Home.css"

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
          marginBottom: "20px",
          fontFamily: 'Nothing You Could Do, cursive',
      },
}));

export default function Home() {
    const classes = useStyles();
    const history = useHistory();

    const handleGetStartedClick = () => {
        history.push('/flow');
    };

    return (
        <section className={classes.sectionStyle} >
            <div className={classes.title}>
                <h1 className={classes.main}>Sweet &amp; Salty</h1>
                <Button variant="outlined" onClick={handleGetStartedClick} color="primary">Get Started</Button>
            </div>
        </section>
    );
}