import React from 'react'
//import { render } from 'react-dom'

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close'
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
//import MuiDialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
//import Button from '@material-ui/core/Button';


const DialogTitle = withStyles(theme => ({
  root: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit * 5,
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing.unit,
    top: theme.spacing.unit,
    color: theme.palette.grey[500],
  },
}))(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing.unit * 2,
    variant: "h6",
  },
}))(MuiDialogContent);

/*
const DialogActions = withStyles(theme => ({
  root: {
    borderTop: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit,
  },
}))(MuiDialogActions);
*/


const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    padding: 20,
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 800,
    height: 'auto',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
});


class ShowProducts extends React.Component {
  constructor(props) {
    super(props)
    //const products = this.props.data;

    this.state = {open:false, description:''}

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleOpen(des) {
    this.setState({
      open: true,
      description: des.currentTarget.getAttribute('data-description'),
    });
  };

  handleClose() {
    this.setState({
      open: false
    });
  };



  render() {
    const {classes} = this.props;
    //const products = this.props.data;
    return (
      <div className={classes.root}>
        <GridList cellHeight={180} className={classes.gridList} cols={2}>
        <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
          <ListSubheader component="div" style={{ fontSize: '2em' }}>検索結果</ListSubheader>
        </GridListTile>
          {this.props.data.map(tile => (
            <GridListTile key={tile.id}>
              <image src={tile.image} alt="image not found" />
              <GridListTileBar
                title={tile.title}
                subtitle={<span>価格: {tile.price}円 </span>}
                actionIcon={
                  <IconButton className={classes.icon} onClick = {this.handleOpen} data-description = {tile.description} >
                    <InfoIcon />
                  </IconButton>
                }
              />
            </GridListTile>
          ))}
        </GridList>
                  <Dialog
                    onClose={this.handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={this.state.open}
                  >
                    <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
                      DESCRIPTION
                    </DialogTitle>
                    <DialogContent>
                      <Typography gutterBottom>
                        {this.state.description}
                      </Typography>
                    </DialogContent>
                    </Dialog>
      </div>
    );
  }
}

ShowProducts.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ShowProducts);
