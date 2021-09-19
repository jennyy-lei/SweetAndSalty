import React from "react";
import CustomizeModal from "../Modals/CustomizeModal";
import { useHistory } from "react-router-dom";
import { Flowchart } from "../Flowchart/Flowchart";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    wrapper: {
        height: "100%"
    },
}));

export default function RecipeFinder() {

    const classes = useStyles();
    const history = useHistory();

    const [modalOpen, setModalOpen] = React.useState(
        true
    );

    const onModalCancel = () => {
        setModalOpen(false);
        history.push('/');
    }

    const onModalClose = () => {
        setModalOpen(false);
    }
    
    return (
        <div className={classes.wrapper}>
            <Flowchart />
            <CustomizeModal
                open={modalOpen}
                handleCancel={onModalCancel}
                handleClose={onModalClose}
                 />
        </div>
        
    );
}