import React from 'react'
//import { render } from 'react-dom'
import PropTypes from 'prop-types';
import ShowProducts from './Show';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios'         //apiを叩くためのライブラリ

const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit*3,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
        width: 200,
    },
  },
});


class SearchAppBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = { search: '',data: {},
     Show:''
    }

    this.handleChangeSearchText = this.handleChangeSearchText.bind(this);
  }

  handleChangeSearchText(event) {
    this.setState({search: event.target.value});
    if(event.target.value){
      axios.get('http://localhost/teamLab_task_Version1/api/users/search/'+ event.target.value)
      .then(res => {
         console.log('body:', res.data);
         this.setState({ data: [res.data] });

         if(res.data.length>0){
          this.setState({Show: <ShowProducts data={res.data}/>});
         }
      })
      .catch(err => {
         console.log('err:',err);
      });

    }else{
      this.setState({Show:''});
    }

  }



  render() {
      const {classes} = this.props;
      return (
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer">
                <MenuIcon />
              </IconButton>
              <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                管理画面
              </Typography>
              <div className={classes.grow} />
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  onChange = {this.handleChangeSearchText}
                />
              </div>
            </Toolbar>
          </AppBar>
          {this.state.Show}
        </div>
      );
  }
}

SearchAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SearchAppBar);
