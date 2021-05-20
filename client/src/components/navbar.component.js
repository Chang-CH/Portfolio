import React, { Component } from 'react';
import { connect } from 'react-redux';
import { log_out_user, repopulate_state } from '../actions/login.action';
import '../styles/navbar.css';
import axios from 'axios';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';
import CssBaseline from '@material-ui/core/CssBaseline';

import { withStyles } from '@material-ui/core/styles';
import { Avatar, Button, Drawer, Hidden, IconButton } from '@material-ui/core';

const drawerWidth='20vw';
const maxWidth='300';

const styles = (theme) => ({
    root: {
      display: 'flex',
    },
    toolbar: {
      paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 8px',
      ...theme.mixins.toolbar,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginRight: drawerWidth,
      width: `calc(100% - ${drawerWidth})`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
    //   marginLeft: 0,
      marginRight: 36,
    },
    menuButtonHidden: {
      display: 'none',
    },
    title: {
      flexGrow: 1,
    },
    drawerDiv: {
        display: 'block',
        justifyContent: 'center',
        textAlign: 'center',
        height: '100vh',
    },
    drawerPaper: {
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerPaperClose: {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(0),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(0),
      },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      height: '100vh',
      overflow: 'auto',
    },
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
    paper: {
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
    },
    fixedHeight: {
      height: 240,
    },
    hide: {
        display: 'none'
    },
    expandedAvatar: {
        
        marginTop: theme.spacing(5),
        height: theme.spacing(20),
        width: theme.spacing(20),
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    maxWidthButton: {
        width: '100%',
        borderRadius: '0px'
    },
    stickyDown: {
        position: 'relative',
        bottom: 0,
    },
    maxHeight: {
        height: '100%',
    }
  });



class Navbar extends Component {
    
    constructor() {
        super();
        this.handleLogout = this.handleLogout.bind(this);
        this.handleUserMenu = this.handleUserMenu.bind(this);
        this.state = {
            menu_open: false,
            user_drawer_open: false
        }
    }

    componentDidMount() {
      if (!this.props.loggedIn) {
        const localStorageItem = JSON.parse(window.localStorage.getItem('portfolioUser'))
        this.props.repopulate_state(localStorageItem)
      }
    }
    
    handleLogout() {
        console.log("logging out")
        this.props.log_out_user()
        localStorage.removeItem("portfolioUser")
        console.log("successfully cleared localStorage")
        axios({
            method: 'GET',
            url: process.env.REACT_APP_BACKEND + '/logout',
            withCredentials: true
        }).then(res => {
            window.location.pathname = '/'
        }).catch(err => {
            console.log(err.message)
        })
    }

    handleUserMenu() {
        console.log(this.state.user_drawer_open);
        this.setState({user_drawer_open: !this.state.user_drawer_open});
    }

    render() {
        const { loggedIn, name, id, avatar_url, gravatar_id, error } = this.props
        
        if (error) {
            return <div>Error! {error.message}</div>
        }
        
        const { classes } = this.props;

        // CssBaseline gets the default body style and applies it (background colour etc.)
        return (
            <div className = {classes.root}>
                <CssBaseline />
                <AppBar position="absolute" 
                className={this.state.user_drawer_open 
                    ? `${classes.appBar} ${classes.appBarShift}` 
                    : classes.appBar}>
                    <ToolBar className={classes.toolbar}>
                        <IconButton>
                            {/* logo here */}
                        </IconButton>
                        <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                            Portfol.io
                        </Typography>
                        <Button startIcon={<Avatar src={avatar_url}/>} 
                        onClick={this.handleUserMenu} 
                        hidden={loggedIn}
                        className={loggedIn && !this.state.user_drawer_open ? "" : classes.hide }>
                            {name}
                        </Button>
                    </ToolBar>
                </AppBar>
                <Drawer 
                    variant="temporary"
                    anchor="right"  
                    onBackdropClick={this.handleUserMenu}
                    classes={{
                        paper: this.state.user_drawer_open 
                        ? classes.drawerPaper 
                        : `${classes.drawerPaper} ${classes.drawerPaperClose}`
                    }}
                    open={this.state.user_drawer_open}
                >
                    <div className={classes.drawerDiv}>
                        <Hidden xsDown>
                            <Avatar src={avatar_url} className={classes.expandedAvatar}/>
                        </Hidden>
                        <Typography variant="h4" className={classes.title}>
                            {name}
                        </Typography>
                        <div className={classes.maxHeight}>
                            <Button color="primary" className={classes.maxWidthButton}>
                                PLACEHOLDER
                            </Button>
                            <Button onClick={this.handleLogout} color="secondary" className={`${classes.maxWidthButton} ${classes.stickyDown}`}>
                              LOGOUT
                            </Button>
                        </div>
                        
                    </div>
                </Drawer>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    loggedIn: state.login.loggedIn,
    name: state.login.name,
    id: state.login.id,
    avatar_url: state.login.avatar_url,
    gravatar_id: state.login.gravatar_id,
    error: state.login.error
})

const mapDispatchToProps = {
  log_out_user,
  repopulate_state
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Navbar))
