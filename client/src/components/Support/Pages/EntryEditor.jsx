import React, { Component } from 'react';
import { Typography, withStyles } from "@material-ui/core";
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
  root: {
    display: 'flex', 
    flexDirection: 'column',
    justifyContent: 'start',
    alignItems: 'center'
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

class Entryeditor extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <span className={classes.topSpace}/>

        <Typography variant='h2' component='h2'>Entry Editor</Typography>
        <Divider orientation="horizontal" className={classes.divider}/>

        <Typography variant='h5' component='h5'>Accessing the Entry Editor</Typography>
        <Divider orientation="horizontal" className={classes.divider}/>
        <ul className={classes.paragraph}>
            <li>To access the Entry Editor, there must be an existing entry.</li>
            <li>The Entry Editor is by default hidden from view.</li>
            <li>Hover your cursor over an entry to reveal a Settings button.</li>
            <li>Click on the Settings button, then click on the Edit entry button to open the Entry Editor for the entry.</li>
        </ul>
        <Divider orientation="horizontal" className={classes.divider}/>

        <Typography variant='h5' component='h5'>Deleting an entry</Typography>
        <Divider orientation="horizontal" className={classes.divider}/>
        <ul className={classes.paragraph}>
            <li>To delete an entry, it must be existing.</li>
            <li>The Entry Editor is by default hidden from view.</li>
            <li>Hover your cursor over an entry to reveal a Settings button.</li>
            <li>Click on the Settings button, then click on the Delete entry button to delete the entry.</li>
        </ul>
        <Divider orientation="horizontal" className={classes.divider}/>

        <Typography variant='h5' component='h5'>Repositioning an entry</Typography>
        <Divider orientation="horizontal" className={classes.divider}/>
        <ul className={classes.paragraph}>
            <li>To reposition an entry, it must be existing.</li>
            <li>The Entry Editor is by default hidden from view.</li>
            <li>Hover your cursor over an entry to reveal a Settings button, along with a pair of "up" and "down" buttons at the extreme right of the screen.</li>
            <li>If you have entries above or below the current entry, click "up"/"down" button will shift the entry up and down respectively.</li>
        </ul>
        <Divider orientation="horizontal" className={classes.divider}/>

        <Typography variant='h5' component='h5'>Entry Editor Interface</Typography>
        <Divider orientation="horizontal" className={classes.divider}/>

        <Typography variant='h6' component='h6'>Dimensions</Typography>
        <Divider orientation="horizontal" className={classes.divider}/>
        <ul className={classes.paragraph}>
            <li>The dimension category allows you to edit the height and width of the entry.</li>
            <li>You can experiment with the various units provided to change the height and width of the entry.</li>
            <li>
              It is recommended to use % and vh which are units that change accordingly to the screen dimensions. rem can sometimes be used since it is a unit that is relative to
              the root element's font size.
            </li>
        </ul>
        <Divider orientation="horizontal" className={classes.divider}/>

        <Typography variant='h6' component='h6'>Colours</Typography>
        <Divider orientation="horizontal" className={classes.divider}/>
        <ul className={classes.paragraph}>
            <li>The colours category allows you to edit colors of permitted parts of the template.</li>
            <li>Hover your mouse over the colour boxes, which will show descriptions of the entry part that the color is used for.</li>
            <li>Click on the colour boxes. A colour picker will appear, allowing you to change the color of the corresponding entry part</li>
        </ul>
        <Divider orientation="horizontal" className={classes.divider}/>

        <Typography variant='h6' component='h6'>Fonts</Typography>
        <Divider orientation="horizontal" className={classes.divider}/>
        <ul className={classes.paragraph}>
            <li>The font category allows you to select the font style for text present within the entry.</li>
            <li>Select on the font to change the font style from a wide array of fonts.</li>
        </ul>
        <Divider orientation="horizontal" className={classes.divider}/>

        <Typography variant='h6' component='h6'>Media</Typography>
        <Divider orientation="horizontal" className={classes.divider}/>
        <ul className={classes.paragraph}>
            <li>The media category allows you to change media present within the entry</li>
            <li>Click on a media object to open an interface from which you can either select from a gallery of stock images or upload your own image.</li>
        </ul>
        <Divider orientation="horizontal" className={classes.divider}/>

        <Typography variant='h6' component='h6'>Texts</Typography>
        <Divider orientation="horizontal" className={classes.divider}/>
        <ul className={classes.paragraph}>
            <li>The texts category allows you to change text present within the entry.</li>
            <li>Clicking on a text box will either open a complex or simple text editor, from which you can edit text within the template to varying degrees of freedom.</li>
        </ul>
        <Divider orientation="horizontal" className={classes.divider}/>

        <Divider orientation="horizontal" className={classes.divider}/>

        <span className={classes.bottomSpace}/>
      </div>
    )
  }
}

export default withStyles(styles)(Entryeditor);