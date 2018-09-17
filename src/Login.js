import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Checkbox from 'material-ui/Checkbox';
import {grey500, white} from 'material-ui/styles/colors';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import Help from 'material-ui/svg-icons/action/help';
import TextField from 'material-ui/TextField';
import {Link} from 'react-router-dom';
import logo from './votaLogo.svg'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as sessionActions from './actions/sessionActions';

class Login extends React.Component{

  constructor(props){
    super(props);
    this.state = {credentials: {user: ''}};
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  onChange(event) {
    const field = event.target.name;
    const credentials = this.state.credentials;
    credentials[field] = event.target.value;
    return this.setState({credentials: credentials});
  }

  onSave(event) {
    event.preventDefault();
    debugger;
    this.props.actions.loginUser(this.state.credentials, this.props.history);
  }

  render(){

    const styles = {
      loginContainer: {
        minWidth: 320,
        maxWidth: 400,
        height: 'auto',
        position: 'absolute',
        top: '20%',
        left: 10,
        right: 0,
        margin: 'auto'
      },
      paper: {
        padding: 20,
        overflow: 'auto'
      },
      buttonsDiv: {
        textAlign: 'center',
        padding: 10
      },
      flatButton: {
        color: grey500
      },
      checkRemember: {
        style: {
          float: 'left',
          maxWidth: 180,
          paddingTop: 5
        },
        labelStyle: {
          color: grey500
        },
        iconStyle: {
          color: grey500,
          borderColor: grey500,
          fill: grey500
        }
      },
      loginBtn: {
        float: 'right'
      },
      btn: {
        background: '#4f81e9',
        color: white,
        padding: 7,
        borderRadius: 2,
        margin: 2,
        fontSize: 13
      },
      btnFacebook: {
        background: '#4f81e9'
      },
      btnGoogle: {
        background: '#e14441'
      },
      btnSpan: {
        marginLeft: 5
      },
    };

    return (

    

      <MuiThemeProvider>
        <div>
          <div style={styles.loginContainer}>
  
            <img src={logo} className="App-logo" alt="logo" />
  
            <Paper style={styles.paper}>
  
              <form>
                <TextField
                  hintText="Username"
                  name="user"
                  floatingLabelText="Username"
                  fullWidth={true}
                  value={this.state.credentials.user}
                  onChange={this.onChange}
                />
                <TextField
                  hintText="Password"
                  floatingLabelText="Password"
                  fullWidth={true}
                  value={this.state.credentials.password}
                  onChange={this.onChange}
                  type="password"
                />
  
                <div>
  
                  <Link to="/">
                    <RaisedButton label="Login"
                                  primary={true}
                                  style={styles.loginBtn} onClick={this.onSave}/>
                  </Link>
                </div>
              </form>
            </Paper>
  
            <div style={styles.buttonsDiv}>
              <FlatButton
                label="Register"
                href="/"
                style={styles.flatButton}
                disabled={true}
                icon={<PersonAdd />}
              />
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
  }
  

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(sessionActions, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(Login);