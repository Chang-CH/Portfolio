import React, { Component } from 'react';
import { Typography, withStyles } from "@material-ui/core";
import Divider from '@material-ui/core/Divider';
import { withRouter } from 'react-router-dom';

const styles = theme => ({
  root: {
    display: 'flex', 
    flexDirection: 'column',
    justifyContent: 'start',
    alignItems: 'center'
  },
  header: {
    color: theme.palette.text.secondary,
    marginTop: '1rem',
    marginBottom: '1rem'
  },
  subHeader: {
    color: theme.palette.text.main,
    marginTop: '0.5rem',
    marginBottom: '0.5rem'
  },
  paragraph: {
    backgroundColor: 'white',
    width: '85%',
    height: 'auto',
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 'thin',
    padding: '1rem',
    paddingLeft: '2rem'
  },
  nestedParagraph: {
    paddingLeft: '2rem'
  },
  paragraphEnd: {
    height: '1rem'
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'underline',
    '&:hover': {
      color: theme.palette.primary.light
    }
  },
  warning: {
    color: 'red'
  },
  divider: {
    width: '100%',
  },
  topSpace: {
    height: '1vh'
  },
  bottomSpace: {
    height: '10vh'
  }
})

class Portfolio extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <span className={classes.topSpace}/>

        <Typography variant='h2' component='h2'>Portfolio</Typography>
        <ul className={classes.paragraph}>
            <li>The Portfolio page shows a preview of the user's portfolio website and provides tools to edit the website.</li>
        </ul>

        <Typography className={classes.header} variant='h5' component='h5'>Tool Panel</Typography>
        <Divider orientation="horizontal" className={classes.divider}/>

        <Typography className={classes.subHeader} variant='h6' component='h6'>Save</Typography>
        <ul className={classes.paragraph}>
            <li>Save button allows for manual saving of current portfolio work.</li>
            <li>A 30s countdown to autosave will begin after every edit to portfolio.</li>
            <li>
                If the user intends to navigate away from the page with unsaved work by the back navigation button or by other navbar buttons, an alert prompt will
                ask the user to either discard or save unsaved work before leaving the portfolio page.
            </li>
        </ul>
        
        <Typography className={classes.subHeader} variant='h6' component='h6'>Add Entry</Typography>
        <ul className={classes.paragraph}>
            <li>Add Entry button allows user to add prebuilt components/templates into their portfolio.</li>
            <li>Clicking on the Add Entry button will open an interface where the user can browse the available templates</li>
            <li>Select a template to add it into your portfolio</li>
            <li>You can then edit the template using the Entry Editor</li>
            <li>{'Read more about the '}
              <span className={classes.link} onClick={() => this.props.history.push('/support/entryeditor')}>Entry Editor</span>
              {` interface`}
            </li>
        </ul>

        <Typography className={classes.subHeader} variant='h6' component='h6'>Manage Directory</Typography>
        <ul className={classes.paragraph}>
            <li>Manage Directory button allows user to manage pages within their portfolio</li>
            <li>
                What are pages?
            </li>

            <div className={classes.nestedParagraph}>
              <li>
                The pages we are referring to are your portfolio website's pages. 
              </li>
              <li>
                The default page in which you currently have would be your root page
                and is available at https://your-github-username.github.io/, where your-github-username is your Github username.
              </li>
              <li>
                Suppose you were to add a page called 'skills', then it would be displayed if you visit https://your-github-username.github.io/skills.
              </li>
            </div>
            
            <li>If you have multiple pages, then it would be a directory. The Manage Directory button will open an interface that allows the user to add, delete and rename pages.</li>
            <li>{'Read more about '}
              <span className={classes.link} onClick={() => this.props.history.push('/support/directorymanager')}>Directory Manager</span>
              {' interface'}
            </li>
        </ul>

        <Typography className={classes.subHeader} variant='h6' component='h6'>Publish for Users</Typography>
        <ul className={classes.paragraph}>
            <li>
                For users, the Publish button will open a dialog asking for the user to input a name for the Github repository they wish to use. 
                If the Github repository does not exist, it will be created.
            </li>
            <div className={classes.nestedParagraph}>
              <li>The name input is by default the root repository of the user's Github page.</li>
              <li>A preview exists to show you the link that your website will have according to the repository name you chose</li>
              <li>You can revert to the default input by clicking on the Set Default button</li>
            </div>
            <li>
                Once done, click on the Finalize button to proceed with publish operation, otherwise click Cancel to cancel the publish operation.
            </li>
            <div className={classes.nestedParagraph}>
              <li>
                If the name provided matches a Github repository already owned by the user, another dialog will show asking the user
                for permission to override the contents in the existing Github repository.
              </li>
              <li>
                If you wish to override, click on Override button, otherwise click on Cancel to cancel the publish operation.
              </li>
              <li>
                <span className={classes.warning}>
                *This override action is irreversible by the app. Make sure you do not have important content already present in your existing Github repository.*
                </span></li>
            </div>
        </ul>

        <Typography className={classes.subHeader} variant='h6' component='h6'>Publish for Guests</Typography>
        <ul className={classes.paragraph}>
            <li>For guests, the Publish button will download a zip file of the portfolio.</li>
            <li>To find out how to build and host your own portfolio website using this zip file, look into tutorial for a quick guide.</li>
        </ul>
        <span className={classes.paragraphEnd} />
        <Divider orientation="horizontal" className={classes.divider}/>

        <span className={classes.bottomSpace}/>
      </div>
    )
  }
}

export default withStyles(styles)(withRouter(Portfolio));