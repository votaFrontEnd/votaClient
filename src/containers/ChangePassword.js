import React, { Component } from "react";
import { connect } from "react-redux";
import loadDataIfNeeded from "../actions/jobActions";
import JobForm from "../components/JobForm";
import auth from "../auth/authenticator";
import Paper from "material-ui/Paper";
import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";
import Checkbox from "material-ui/Checkbox";
import { grey500, white } from "material-ui/styles/colors";
import PersonAdd from "material-ui/svg-icons/social/person-add";
import Help from "material-ui/svg-icons/action/help";
import TextField from "material-ui/TextField";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import * as actions from "../actions/sessionActions";

const listStyles = {
  "list-style": "none"
};

var successStyles = {
  color: "green"
};

var errorStyles = {
  color: "red"
};

class Results extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <p>
          Password must be at least{" "}
          <span style={errorStyles}>8 characters</span> long and contain at 3 of
          the 4
        </p>
        <ul style={listStyles}>
          {this.props.passwordErrors.map(function(listValue) {
            return (
              <li>
                {listValue.isValid ? (
                  <i
                    class="fa fa-check"
                    style={successStyles}
                    aria-hidden="true"
                  />
                ) : (
                  <i
                    class="fa fa-times"
                    style={errorStyles}
                    aria-hidden="true"
                  />
                )}
                <span style={errorStyles}>{listValue.text}</span>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      credentials: {
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      },
      isValidPassword: true,
      isPasswordConfirmed: true,
      compareCurrentAndNewPasswordErrorText: "",
      confirmPasswordErrorText: "",
      passwordErrors: [
        { text: "1 uppercase letter", regex: "(?=.*?[A-Z])", isValid: false },
        { text: "1 lowercase letter", regex: "(?=.*?[a-z])", isValid: false },
        { text: "1 number", regex: "(?=.*?[0-9])", isValid: false },
        {
          text: "1 symbol such as @#$%!&^'~/",
          regex: "(?=.*?[#?!@$%^&*-])",
          isValid: false
        }
      ]
    };
    this.onCurrentPasswordChange = this.onCurrentPasswordChange.bind(this);
    this.onNewPasswordChange = this.onNewPasswordChange.bind(this);
    this.onConfirmNewPasswordChange = this.onConfirmNewPasswordChange.bind(
      this
    );
    this.onResetPasswordClick = this.onResetPasswordClick.bind(this);
  }

  onCurrentPasswordChange(event) {
    const credentials = this.state.credentials;

    credentials.currentPassword = event.target.value;
    return this.setState({
      credentials: credentials
    });
  }

  onNewPasswordChange(event) {
    const credentials = this.state.credentials;
    credentials.newPassword = event.target.value;
    //Make sure Current Password is not the same as new Password
    this.compareCurrentAndNewPassword();
    //Make sure all the rules are meet
    var isValidPassword = this.checkPassword(credentials.newPassword);
    //Make sure the confirm password is matching after changes
    this.checkConfirmPassword();

    this.setState({
      isValidPassword: isValidPassword
    });

    return this.setState({
      credentials: credentials
    });
  }

  onConfirmNewPasswordChange(event) {
    const credentials = this.state.credentials;
    credentials.confirmPassword = event.target.value;
    //Check if the Password looks good
    this.checkConfirmPassword();
    return this.setState({
      credentials: credentials
    });
  }

  onResetPasswordClick(event) {
    event.preventDefault();
    if (!this.state.isValidPassword) {
      return;
    }
    //Call the action if everything looks good
    this.props.actions.changePassword(
      this.state.credentials,
      this.props.history
    );
  }

  compareCurrentAndNewPassword() {
    if (
      this.state.credentials.currentPassword ===
      this.state.credentials.newPassword
    ) {
      this.setState({
        compareCurrentAndNewPasswordErrorText:
          "New Password cannot be same as Current Password!"
      });
    } else {
      this.setState({ compareCurrentAndNewPasswordErrorText: "" });
    }
  }

  checkConfirmPassword() {
    //show error when newPassword is not the same as confirmPassword
    if (
      this.state.credentials.newPassword !==
      this.state.credentials.confirmPassword
    ) {
      this.setState({ confirmPasswordErrorText: "Password does not match!" });
    } else {
      this.setState({ confirmPasswordErrorText: "" });
    }
  }

  checkPassword(password) {
    var minValidPasswordCount = 3;
    if (password.length < 8) {
      return false;
    } else {
      var stateCopy = Object.assign({}, this.state);
      stateCopy.passwordErrors.forEach(function(error) {
        var patt = new RegExp(error.regex);
        if (patt.test(password)) {
          minValidPasswordCount--;
          error.isValid = true;
        } else {
          error.isValid = false;
        }
      });
      this.setState(stateCopy);
    }
    return minValidPasswordCount === 0;
  }

  render() {
    const styles = {
      loginContainer: {
        minWidth: 320,
        maxWidth: 400,
        height: "auto",
        position: "absolute",
        top: "0%",
        left: 10,
        right: 0,
        margin: 20
      },
      paper: {
        padding: 20,
        margin: 40,
        overflow: "auto"
      },
      buttonsDiv: {
        textAlign: "center",
        padding: 10
      },
      loginBtn: {
        float: "center"
      },
      btn: {
        background: "#4f81e9",
        color: white,
        padding: 7,
        borderRadius: 2,
        margin: 2,
        fontSize: 13
      }
    };
    return (
      <div>
        <Paper style={styles.paper}>
          <form onSubmit={this.onResetPasswordClick}>
            <h1>Change Password</h1>

            <TextField
              value={this.state.credentials.newPassword}
              onChange={this.onNewPasswordChange}
              hintText="New Password"
              errorText={this.state.compareCurrentAndNewPasswordErrorText}
              floatingLabelText="New Password"
              type="password"
              required
            />
            <br />
            <TextField
              value={this.state.credentials.confirmPassword}
              onChange={this.onConfirmNewPasswordChange}
              errorText={this.state.confirmPasswordErrorText}
              hintText="Confirm New Password"
              floatingLabelText="Confirm New Password"
              type="password"
              required
            />
            <br />
            <div>
              <RaisedButton
                type="submit"
                primary={true}
                style={styles.loginBtn}
                disabled={!this.state.isValidPassword}
                onClick={this.onSave}
              >
                SUBMIT
              </RaisedButton>
            </div>
            <br />
            {!this.state.isValidPassword ? (
              <Results passwordErrors={this.state.passwordErrors} />
            ) : null}
          </form>
        </Paper>
      </div>
    );
  }
}

function mapStatetoProps(state) {
  const jobs = state.jobs;
  const users = state.users;
  const applicants = state.applicants;

  return {
    jobs,
    users,
    applicants
  };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) };
}

export default connect(
  mapStatetoProps,
  mapDispatchToProps
)(ChangePassword);
