import React, { Component } from 'react';
import { connect } from 'react-redux';
import { repopulate_state } from '../actions/LoginAction';
import axios from 'axios';

//MUI component imports
import Fab from '@material-ui/core/Fab';
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Slide from '@material-ui/core/Slide';
import CircularProgress from '@material-ui/core/CircularProgress';
import { FaUpload, FaTimes, FaRegCopy } from 'react-icons/fa';
import { handleErrors } from '../handlers/errorHandler';



/**
 * @file Publish component representing user interface for publishing portfolios to ghpages.
 * 
 * @author Chen En
 * 
 * @see Publish
 */

/**
 * Style generator to dynamically adjust styles based on theme provided
 * 
 * @memberof Publish
 * @param {Object} theme 
 */
const styles = (theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        alignItems: 'center'
    },
    actionFAB: {
        position: 'static',
        marginRight: '0.5vw',
        marginBottom: '0.5vw',
        textAlign: 'center'
    }
})

/**
 * The publish component renders functionalities to allow user to publish their
 * portfolio to ghpages.
 * 
 * @component
 */
class Publish extends Component {

    /**
     * @constructor
     */
    constructor(props) {
        super(props);
        this.state = {
            finalizeDialogState: false,
            overrideDialogState: false,
            repositoryName: "",
            repositoryContent: [],
            anchorEl: null,
            publishLoading: false,
            statusState: false,
            publishError: false,
            publishErrorMessage: "",
            pageUrl: "",
            pageCheckIntervalTask: null
        }
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleFinalizeDialogOpen = this.handleFinalizeDialogOpen.bind(this);
        this.handleFinalizeDialogClose = this.handleFinalizeDialogClose.bind(this);
        this.handleOverrideDialogOpen = this.handleOverrideDialogOpen.bind(this);
        this.handleOverrideDialogClose = this.handleOverrideDialogClose.bind(this);
        this.handleFinalizeEdits = this.handleFinalizeEdits.bind(this);
        this.handleOverrideAllowed = this.handleOverrideAllowed.bind(this);
        this.handlePushToGithub = this.handlePushToGithub.bind(this);
        this.handleCheckPageStatus = this.handleCheckPageStatus.bind(this);
        this.handleStatusClose = this.handleStatusClose.bind(this);
        this.handleCopyClipboard = this.handleCopyClipboard.bind(this);
    }


    /**
     * Handles onChange events. Changes a state variable under the name of the event target to value provided by user.
     *
     * @param {Object} event
     * @return void
     * @memberof Publish
     */
    handleOnChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    /**
     * Handles the opening of finalize dialog by setting state boolean finalizeDialogState to true. Also creates
     * the html, css and js files and pushes them into state array repositoryContent.
     * 
     * @return void
     * @memberof Publish
     */
    handleFinalizeDialogOpen() {

        const pushables = this.props.createPushables();
        console.log(pushables)

        this.setState({
            repositoryContent: pushables
        })

        this.setState({
            anchorEl: null,
            finalizeDialogState: true
        })
    }

    /**
     * Handles the closing of finalize dialog by setting state boolean finalizeDialogState to false.
     * 
     * @return void
     * @memberof Publish
     */
    handleFinalizeDialogClose() {
        this.setState({
            finalizeDialogState: false
        })
    }

    /**
     * Handles the opening of override dialog by setting state boolean overrideDialogState to true.
     * 
     * @return void
     * @memberof Publish
     */
    handleOverrideDialogOpen() {
        this.setState({
            overrideDialogState: true
        })
    }

    /**
     * Handles the closing of override dialog by setting state boolean overrideDialogState to false.
     * 
     * @return void
     * @memberof Publish
     */
    handleOverrideDialogClose() {
        this.setState({
            overrideDialogState: false
        })
    }



    /**
     * This handles the event whereby override button in override dialog is clicked. It calls and
     * wait for handlePushToGithub() to complete before closing the override dialog.
     *
     * @return void
     * @memberof Publish
     */
    async handleOverrideAllowed() {
        console.log(`Override permission given to push to ${this.state.repositoryName} and toggle pages for it`)
        //no need to await this
        this.handlePushToGithub();
        this.setState({
            overrideDialogState: false
        })
    }


    /**
     * First starts a interval task to send a request to backend to retrieve github page deployment status at an interval of
     * 15s. Sets the interval task to state pageCheckIntervalTask.
     * 
     * Then sends a PUT request to backend API which will take over and handle the pushing to specified Github
     * repository and its deployment to ghpages if not already done so. 
     * 
     * The PUT request requires route (The path relative to Github repository root to push to), repo (The
     * name of Github repository to push to) and content (An array of objects representing files to be pushed).
     * 
     * 
     * Note: For files within sub directories, the path can be prepended to the filename like so "folder/index.html"
     * 
     * Note: This clears out the repositoryContent after the PUT request is completed.
     * 
     * @return void
     * @memberof Publish
     */
    async handlePushToGithub() {
        console.log(`files are being pushed to ${this.state.repositoryName}`)
        //reset loading, error and error message
        this.setState({
            publishLoading: true,
            publishError: false,
            publishErrorMessage: "",
            statusState: false,
            pageCheckIntervalTask: setInterval(this.handleCheckPageStatus, 15000)
        });

        await axios({
            method: "PUT",
            url: process.env.REACT_APP_BACKEND + "/portfolio/publishGithub",
            withCredentials: true,
            data: {
                route: "",
                content: this.state.repositoryContent,
                repo: this.state.repositoryName
            }
        }).then(res => {
            console.log(res.data.message);
        }).catch(err => {
            handleErrors(err, this.props.history);
            
            this.setState({
                publishLoading: false,
                publishError: true,
                publishErrorMessage: "Failed to push files to Github",
                statusState: true
            })
            if (this.state.pageCheckIntervalTask) {
                window.clearInterval(this.state.pageCheckIntervalTask);
            }
        })

        this.setState({
            repositoryContent: []
        })
    }

    /**
     * This handles the event whereby the finalize button in finalize dialog is clicked. A GET request is sent to
     * backend API to check for existing Github repository of specified name under the user's Github account and sends a POST
     * request to create a new Github repository if there are none.
     * 
     * If a new repository is created, this then calls and waits for handlePushToGithub() to complete before closing
     * the finalize dialog.
     * 
     * If a Github repository exists, this then opens an override dialog to warn and ask user for permission to overwrite the
     * exisiting Github repository's content.
     *
     * @return void
     * @memberof Publish
     */
    async handleFinalizeEdits() {
        console.log("chosen repository name is " + this.state.repositoryName)
        await axios({
            method: "GET",
            url: process.env.REACT_APP_BACKEND + "/portfolio/checkExistingRepos",
            withCredentials: true,
            params: {
                repo: this.state.repositoryName
            }
        }).then(async res => {
            console.log(res.data.message)
            //waits for repository to be created
            await axios({
                method: "POST",
                url: process.env.REACT_APP_BACKEND + "/portfolio/createRepo",
                withCredentials: true,
                data: {
                    repo: this.state.repositoryName
                }
            }).then(response => {
                console.log(response.data.message)
            }).catch(err => {
                handleErrors(err, this.props.history);
            })

            //no need to wait for push to go through
            this.handlePushToGithub();
        }).catch(err => {
            handleErrors(err, this.props.history);

            this.setState({
                overrideDialogState: true
            })
        })

        //Intentional: closes finalizeDialog but doesn't remove repository name.
        this.setState({
            finalizeDialogState: false
        })
    }

    /**
     * Sends a request to backend to retrieve the status of the deployed page. Sets state publishLoading to true to show loading indicator.
     * 
     * If status is "building", the page is being built.
     * 
     * If status is "built", the page is built. Set state publishLoading to false to remove loading indicator. 
     * State pageCheckIntervalTask will be cleared.
     * Then set state pageUrl to the url of newly deployed github page and set state statusState to true to show
     * a snackbar allowing user to copy the newly deployed github page url to clipboard.
     * 
     * If status is "errored", the page encountered errors in the process of building and deployment has failed.
     * Set state publishLoading to false to remove loading indicator. Then set state publishError to true and state publishErrorMessage
     * to appropriate error message to showcase errors.
     * 
     * @returns void
     * @memberof Publish
     */
    async handleCheckPageStatus() {
        if (this.state.repositoryName !== "") {
            await axios({
                method: "GET",
                url: process.env.REACT_APP_BACKEND + "/portfolio/pageStatus",
                withCredentials: true,
                params: {
                    repo: this.state.repositoryName
                }
            }).then(res => {
                console.log(res.data.status);
                if (res.data.status === "built" || res.data.status === "errored") {
                    if (this.state.pageCheckIntervalTask) {
                        window.clearInterval(this.state.pageCheckIntervalTask);
                    }
                    if (res.data.status === "built") {
                        this.setState({
                            publishLoading: false,
                            pageUrl: res.data.url,
                            statusState: true
                        })
                    } else {
                        this.setState({
                            publishLoading: false,
                            publishError: true,
                            publishErrorMessage: "Github page deployment failed",
                            statusState: true
                        })
                    }
                }
            }).catch(err => {
                handleErrors(err, this.props.history);

            })
        }
    }

    /**
     * Handles hiding of snackbar.
     * 
     * @param {Object} event 
     * @param {string} reason detail of event
     * @returns void
     * @memberof Publish
     */
    handleStatusClose(event, reason) {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({
            publishLoading: false,
            publishError: false,
            publishErrorMessage: "",
            statusState: false
        })
    }

    /**
     * Handles copying state pageUrl to clipboard
     * 
     * @returns void
     * @memberof Publish
     */
    handleCopyClipboard() {
        navigator.clipboard.writeText(this.state.pageUrl)
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Fab
                    size='large'
                    aria-label='publish panel'
                    aria-controls='simple-menu'
                    aria-haspopup='true'
                    className={classes.actionFAB}
                    onClick={this.handleFinalizeDialogOpen}
                >
                    {this.state.publishLoading ? <CircularProgress size="2rem"/> : <FaUpload />}
                </Fab>

                <Snackbar
                    key="Github Page Status"
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    open={this.state.statusState}
                    onClose={this.handleStatusClose}
                    TransitionComponent={props => <Slide {...props} direction="up" />}
                >
                    <SnackbarContent
                        style={{backgroundColor: '#303030', color: 'white'}}
                        message={this.state.publishError ? this.state.publishErrorMessage : this.state.pageUrl}
                        action={
                            <React.Fragment>
                                {!this.state.publishError
                                    ?
                                        <Button onClick={this.handleCopyClipboard}>
                                            <FaRegCopy/>
                                        </Button>
                                    :
                                        <div/>
                                }
                                <Button
                                    onClick={this.handleStatusClose}
                                >
                                    <FaTimes/>
                                </Button>
                            </React.Fragment>
                        }
                    />

                    
                </Snackbar>

                <Dialog
                    open={this.state.finalizeDialogState}
                    onClose={this.handleFinalizeDialogClose}
                    aria-labelledby="repo name input"
                >
                    <DialogTitle id="repo name input">
                        Repository Name
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText style={{ color: "white" }}>
                            Choose a Github repository name to save portfolio edits
                        </DialogContentText>
                        <TextField
                            name="repositoryName"
                            autoFocus
                            margin="dense"
                            label="Repository Name"
                            type="string"
                            defaultValue={this.state.repositoryName}
                            fullWidth
                            onChange={this.handleOnChange}
                            InputLabelProps={{
                                style: { color: "whitesmoke" },
                            }}
                            InputProps={{
                                color: 'secondary'
                            }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleFinalizeDialogClose}>
                            Cancel
                        </Button>
                        <Button onClick={this.handleFinalizeEdits}>
                            Finalize
                        </Button>
                    </DialogActions>
                </Dialog>

                <Dialog
                    open={this.state.overrideDialogState}
                    onClose={this.handleOverrideDialogClose}
                    aria-labelledby="override permission input"
                >
                    <DialogTitle id="override permission input">
                        Warning!
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Repository already exists. This will override data in your existing repository and could lead to possible data loss! Do you still wish to continue?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleOverrideDialogClose}>
                            Cancel
                        </Button>
                        <Button onClick={this.handleOverrideAllowed}>
                            Allow Override
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

/**
 * Function that maps variables from Redux Store to Home component's props.
 *
 * @param {Object} state - Redux Store
 * @memberof EntryEditor
 */
const mapStateToProps = state => ({
    loggedIn: state.login.loggedIn,

})

/** 
 * Provides action creators to Home component's props.
 * 
 * @type {Object.<Function>} 
 * @memberof EntryEditor
 */
const mapDispatchToProps = {
    repopulate_state
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Publish))