import React, { useContext } from "react";
import { SnackbarContext } from "../../Contexts/SnackbarContext";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

function SnackbarComponent() {
  const { open, message, handleClose } = useContext<any>(SnackbarContext);

  console.log("message");

  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      open={open}
      onClose={handleClose}
      autoHideDuration={6000}
      message={message}
      key={"bottom" + "right"}
      action={
        <React.Fragment>
          <IconButton aria-label="close" color="inherit" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </React.Fragment>
      }
    />
  );
}

export default SnackbarComponent;
