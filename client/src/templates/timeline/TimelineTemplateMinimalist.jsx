import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import preview from '../../res/preview/timeline/TimelineMinimalist.JPG'

const styles = (theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  std: {display: 'block'},
  timelineImg: {
    borderRadius: '50%',
    height: '5vw',
    width: '5vw'
  },
  title: {
    margin: '5%'
  },
  section: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'left',
    textAlign: 'left',
    width: '50%',
    margin: '1%'
  },
  sectionTextDiv: {
    marginLeft: '3%',
    display: 'flex',
    flexDirection: 'column'
  }
});

class TimelineTemplateMinimalist extends Component {
  constructor() {
    super();
  }

  static templateName = "Minimalist";

  static script = (index) => "";

  static preview = preview;

  static info = {
    fonts: {titleFont: {label: "title font"}},
    colours: {primary: {label: "primary"},secondary: {label: "secondary"}},
    images: { bg: {label: "Entry background", allowColour: true}},
    texts: {title: {label: "Timeline title"}},
    sections: {
      enabled: true,
      defaultEntry: {
        images: {timelineImage: "https://bit.ly/3c3wsNL"},
        texts: {timelineTitle: "New section", timelineDate: "2077"}
      },
      entryFormat: {
        images: {timelineImage: {label: "Event Image", allowColour: true}},
        texts: {timelineTitle: {label: "Event name"}, timelineDate: {label: "Event date"}}
      }
    }
  };

  static defaultField = {
    width: "100%", 
    height: "fit-content", 
    fonts: {titleFont: "roboto"},
    colours: {primary: "#d19a19", secondary: "#000000"},
    images: {bg: "https://bit.ly/3i3I9I2"},
    texts: {title: "My past experiences"},
    sections: [{
      images: {timelineImage: "https://bit.ly/3hXPM2R"},
      texts: {timelineTitle: "Portfolio Deployed on Github!", timelineDate: "2021"}
    },
    {
      images: {timelineImage: "https://bit.ly/3c3wsNL"},
      texts: {timelineTitle: "Portfolio added to resume", timelineDate: "2021"}
    }]
  };

  render() {
    const { classes, fields } = this.props;
    return (
      <div className = {classes.root} style={{
        backgroundRepeat: false,
        backgroundImage: `url("${fields.images.bg}")`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        width: fields.width,
        height: fields.height,
        display: "flex",
        flexDirection: "column",
        textAlign: "center"
      }}>
        <CssBaseline/>
          <Typography 
            component="h2" 
            variant="h2" 
            style={{
              color: fields.colours.primary, 
              fontFamily: `${fields.fonts.titleFont}, Helvetica, sans-serif`
              }}
            className={classes.title}
          >
            {fields.texts.title}
          </Typography>
          {fields.sections.map((section, index) => {
            return (
              <div className={classes.section}>
                <img src={section.images.timelineImage} className={classes.timelineImg}/>
                <div className={classes.sectionTextDiv}>
                  <Typography 
                    style={{color: fields.colours.secondary}}
                    component="h5"
                    variant="h5"
                  >
                      {section.texts.timelineDate}
                  </Typography>
                  <Typography 
                    style={{color: fields.colours.secondary}}
                    component="h5"
                    variant="h5"
                  >
                    {section.texts.timelineTitle}
                  </Typography>
                </div>
              </div>
            );
          })}
        <img src={fields.images.dp} alt="my portrait" style={{height: "100%", width: "auto", marginRight: "auto"}}/>
      </div>);
  }
}

export default withStyles(styles)(TimelineTemplateMinimalist);
