import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Button } from "@material-ui/core";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  logoIcon: {
    marginRight: theme.spacing(1),
    width: "32px",
    height: "32px",
  },
  logoTitle: {
    flexGrow: 1,
  },
  styledButton: {
    marginLeft: "16px",
  }
}));

const Navbar = () => {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        <TrendingUpIcon className={classes.logoIcon}/>
        <Typography variant="h6" className={classes.logoTitle}>CryptoWatch</Typography>
        <Button color="inherit" className={classes.styledButton} component={Link} to="/">Watchlist</Button>
        <Button color="inherit" className={classes.styledButton} component={Link} to="/screener">Screener</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
