import React, { Component } from 'react';
import { connect } from 'react-redux';
import { repopulate_state } from '../actions/LoginAction'
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { theme } from '../styles/styles';
import { ReactComponent as ResumateSVG } from '../res/assets/resumate3.svg';
import homeWelcome from '../res/assets/homeWelcome.png';
import sunsetBackground from '../res/assets/sunset.png';
import { RiFileCodeLine } from 'react-icons/ri';
import { withRouter } from 'react-router';


/**
 * @file Home component serves as a welcome page to users and provides functionalities that allow
 * user's to login via Github Oauth.
 * 
 * @author Chuan Hao
 * 
 * @see Home
 */

/**
 * Style generator to dynamically adjust styles based on theme provided
 * 
 * @memberof Home
 * @param {Object} theme 
 */
const styles = (theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    overflowX: 'auto',
    backgroundImage: `url(${sunsetBackground})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed'
  },
  centeredDiv: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  welcomeDiv: {
    width: '100%',
    height: '100vh',
    display: 'flex',
    flexDirection: 'row',
    textAlign: 'left',
    justifyContent: 'center',
    alignItems: 'left',
    position: 'relative'
  },
  tutorialDiv: {
    width: '90%',
    height: '100vh',
    display: 'flex',
    flexDirection: 'row',
    textAlign: 'left',
    justifyContent: 'center',
    alignItems: 'left',
    position: 'relative'
  },
  welcomeText: {
    flexGrow: 1,

  },
  typoHeader: {
  },
  typoSubtitle: {

  },

  portfolioIcon: {
    width: '40vh',
    height: '40vh',
    borderRadius: '20vh',
  },
  featuresDiv: {
    position: 'relative',
    width: '80vw',
    height: '70vh',
    flexDirection: 'row',
    marginBlock: '10vh',
    backgroundColor: 'transparent',
    borderWidth: '1px',
    borderStyle: 'solid'
  },
  boxShadow: {
    zIndex: '-1',
    top: '5vh',
    left: '-5vh',
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  boxShadowColor1: {
    backgroundColor: '#FEF9C7'
  },
  boxShadowColor2: {
    backgroundColor: '#FCE181'
  },
  boxShadowColor3: {
    backgroundColor: '#9FEDD7'
  },
  boxShadowColor4: {
    backgroundColor: '#026670'
  },
  // boxShadowLeft: {
  //   marginLeft: 'auto',
  //   boxShadow: '-5vh 5vh #00000044, calc(80vw - 5vh) 5vh #00000044',
  // },
  // boxShadowRight: {
  //   marginRight: 'auto',
  //   boxShadow: '-5vh 5vh #00000044',
  // },
  fullSize: {
    width: '100%',
    height: '100%',
  },
  floating: {
    zIndex: 1,
  },
  featureRight: {
    marginLeft: 'auto',
    borderRight: 'none'
  },
  featureLeft: {
    marginRight: 'auto',
    borderLeft: 'none'
  },
  featureImg: {
    width: '50%',
    height: 'inherit',
    objectFit: 'cover',
    maxHeight: '90%',
    maxWidth: '90%',
    margin: '5vh',
    marginInline: '5vh'
  },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row'
  },
  homeButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: 'transparent',
    top: 0,
    left: 0,
    padding: '1%'
  },
  logoFont: {
    fontFamily: 'Helvetica', 
    fontSize: '1.5em', 
    fontWeight: 'bold'
  },
  autoMargin: {
    margin: 'auto'
  },
  boldFont: {
    fontWeight: 'bold'
  },
  whiteSpacePreLine: {
    whiteSpace: 'pre-line'
  },
  loginButton: {
    width: 'max-content'
  },
  welcomeImage: {
    marginRight: 'auto', 
    maxWidth: '50%', 
    minHeight: '50%', 
    maxHeight: '100%'
  },
  featureDiv: {
    marginInline: 'auto', 
    maxWidth: '50%', 
    padding: '6vh'
  },
  messageDiv: {
    borderColor: '#000', 
    padding: '5vh', 
    border: 'solid 1px', 
    margin: 'auto', 
    marginBottom: '15vh'
  },
  riFileCodeLine: {
    margin: 'auto'
  },
  bottomLogoDiv: {
    backgroundColor: '#000', 
    height: '50vh', 
    width: '100%'
  },
  bottomLogoFill: {
    fill: "#fff"
  }
});

/**
 * Home component of Portfolio.
 * 
 * @author Chen En
 * @author Chuan Hao
 * 
 * @component
 */
class Home extends Component {

  /**
   * @constructor
   */
  constructor() {
    super();
  }

  /**
   * Attempts to fetch user details and logged in status from localStorage after component is rendered.
   * 
   * @returns void
   * @memberof Home
   */
  async componentDidMount() {
    if (!this.props.loggedIn) {
      const localStorageItem = await JSON.parse(window.localStorage.getItem(process.env.REACT_APP_USER_LOCALSTORAGE))
      if (localStorageItem !== null) {
        this.props.repopulate_state(localStorageItem);
      }
    }
  }

  render() {
    const { loggedIn, classes } = this.props;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <Button
          className={classes.homeButton}
          href="/"
        >
          <ResumateSVG width="2em" height="2em" />
          <Typography component="h1" variant="h2" color="inherit" className={`${classes.title} ${classes.logoFont}`}>
            RESUMATE
          </Typography>
        </Button>
        <div className={classes.welcomeDiv}>
          <div className={classes.autoMargin}>
            <Typography component="h2" variant="h2" color="inherit" gutterBottom className={`${classes.typoHeader} ${classes.boldFont}`}>
              {'Show, not tell.'}
            </Typography>
            <Typography component="h6" variant="subtitle1" color="inherit" gutterBottom className={classes.whiteSpacePreLine}>
              {'Sometimes words don\'t do your accomplishments justice.\nShowcase your best work in a visual, interactive website.'}
            </Typography>
            {loggedIn
              ?
                <Button
                  variant="outlined"
                  className={classes.loginButton}
                  onClick={() => this.props.history.push('/dashboard')}
                >
                  To Dashboard
                </Button>    
              :
                <Button
                  href={`https://github.com/login/oauth/authorize?scope=repo&client_id=` + process.env.REACT_APP_CLIENT_ID}
                  variant="outlined"
                  className={classes.loginButton}
                >
                  GET STARTED
                </Button>
            }
            
            <Button
              onClick={() => this.props.history.push('/dashboard')}
              variant="outlined"
              className={classes.loginButton}
            >
              LOGIN AS GUEST
            </Button>
          </div>
          <img src={homeWelcome} className={classes.welcomeImage} />
        </div>
        <div
          className={`${classes.featuresDiv} ${classes.centeredDiv} ${classes.featureRight}`}
        >
          <img
            className={classes.featureImg}
            src="https://edut.to/2TeoUBz"
            alt="feature"
          />
          <div
            className={`${classes.flexColumn} ${classes.featureDiv}`}
          >
            <Typography component="h4" variant="h4" color="inherit" className={classes.title}>
              Pre-Built templates
            </Typography>
            <Typography component="body1" variant="body1" color="inherit" className={classes.title}>
              Not a designer? No worries, choose from a selection of templates
            </Typography>
          </div>
          <div
            className={`${classes.boxShadow} ${classes.boxShadowColor1}`}
          />
        </div>
        <div
          className={`${classes.featuresDiv} ${classes.centeredDiv} ${classes.featureLeft}`}
        >
          <div
            className={`${classes.flexColumn} ${classes.featureDiv}`}
          >
            <Typography component="h4" variant="h4" color="inherit" className={classes.title}>
              Free forever, no watermarks
          </Typography>
            <Typography component="body1" variant="body1" color="inherit" className={classes.title}>
              You own your website. No watermarks, no restrictions. Take full control of your website.
          </Typography>
          </div>
          <img
            className={classes.featureImg}
            src="https://edut.to/2TeoUBz"
            alt="feature"
          />
          <div
            className={`${classes.boxShadow} ${classes.boxShadowColor2}`}
          />
        </div>
        <div
          className={`${classes.featuresDiv} ${classes.centeredDiv} ${classes.featureRight}`}
        >
          <img
            className={classes.featureImg}
            src="https://edut.to/2TeoUBz"
            alt="feature"
          />
          <div
            className={`${classes.flexColumn} ${classes.featureDiv}`}
          >
            <Typography component="h4" variant="h4" color="inherit" className={classes.title}>
              Fuss free process
          </Typography>
            <Typography component="body1" variant="body1" color="inherit" className={classes.title}>
              Pick your templates, edit your entries. We'll handle the rest — compilation and hosting all by us.
          </Typography>
          </div>
          <div
            className={`${classes.boxShadow} ${classes.boxShadowColor3}`}
          />
        </div>
        <div className={`${classes.flexRow} ${classes.messageDiv}`}>
          <RiFileCodeLine size="20em" className={classes.riFileCodeLine} />
          <div className={classes.autoMargin}>
            <Typography component="h3" variant="h3" color="inherit" gutterBottom className={`${classes.typoHeader} ${classes.boldFont}`}>
              Ready to take it a step further?
            </Typography>
            <Typography component="h6" variant="subtitle1" color="inherit" gutterBottom className={classes.whiteSpacePreLine}>
              {'You\'ve got your website up and running.\n How about giving web development a shot? \n Beginner javascript projects to advanced full stack tutorials, we have it all.'}
            </Typography>
            <Button
              href="/"
              onClick={() => alert('Coming soon in the near future!')}
              color="primary"
              variant="outlined"
            >
              Browse tutorials
          </Button>
          </div>

          <div
            className={`${classes.boxShadow} ${classes.boxShadowColor4}`}
          />
        </div>
        <div className={`${classes.centeredDiv} ${classes.bottomLogoDiv}`}>
          <ResumateSVG width="7em" height="7em" className={classes.bottomLogoFill} />
        </div>
      </div>
    )
  }
}

/**
 * Function that maps variables from Redux Store to Home component's props.
 *
 * @param {Object} state - Redux Store
 * @memberof Home
 */
const mapStateToProps = state => ({
  loggedIn: state.login.loggedIn,
  name: state.login.name,
  id: state.login.id,
  avatar_url: state.login.avatar_url,
  gravatar_id: state.login.gravatar_id,
  error: state.login.error
})

/** 
 * Provides action creators to Home component's props.
 * 
 * @type {Object.<Function>} 
 * @memberof Home
 */
const mapDispatchToProps = {
  repopulate_state
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withRouter(Home)));
