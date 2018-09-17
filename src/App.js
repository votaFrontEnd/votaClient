import React, { Component } from 'react';
import logo from './logo.svg';

import { connect } from 'react-redux'
import HeaderBar from './components/HeaderBar';
import Dashboard from './containers/Dashboard';
import NewJob from './containers/NewJob';
import EditJob from './containers/EditJob';
import JobDetail from './containers/JobDetails';
import AddRating from './containers/AddRating';
import ThemeDefault from './theme-default';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Switch, Route, withRouter } from 'react-router-dom'

import './App.css';

class App extends Component {

  constructor(props){
    super(props)
  }

  render() {

    const styles = {
      container: {
        margin: '80px 20px 20px 15px'
      }
    };

    return (
      <MuiThemeProvider muiTheme={ThemeDefault}>
        <HeaderBar />
          <div style={styles.container}>
            {this.props.children}
          </div>
          <Switch>
            <Route path= "/jobDetails/:jobId" component={JobDetail}/>
            <Route path="/newJob" component={NewJob} />
            <Route path="/editJob/:jobId" component={EditJob} />
            <Route path="/addRatings/:jobId/:applicantId" component={AddRating} />
            <Route path="/" component={Dashboard} />
          </Switch>
      </MuiThemeProvider>
    );
  }
}


function mapStatetoProps(state){
  const {jobs} = state
  return {
    jobs
  }
}

export default withRouter(connect(mapStatetoProps)(App));