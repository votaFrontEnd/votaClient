import React, { Component } from "react";
import TextField from "material-ui/TextField";
import logo from "../votaLogo.svg";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Badge from "@material-ui/core/Badge";
import * as types from "../actions/actionTypes";

class JobFilter extends Component {
  constructor(props) {
    super(props);
    this.handleStatusChange = this.handleStatusChange.bind(this);
    this.handleApply = this.handleApply.bind(this);
    this.state = {
      status: props.statusFilter
    };
  }

  handleApply = function() {
    this.props.applyFilter(this.state.status, types.RoleFilters.SHOW_ALL);
    this.props.toggleDrawer();
  };

  handleStatusChange = function(e, status) {
    this.setState(state => ({
      status: status
    }));
  };

  render() {
    const styles = {
      logo: {
        justifyContent: "center",
        alignItems: "top",
        width: 250,
        height: 250
      }
    };

    return (
      <div style={{ width: 250 }}>
        <div>
          <img src={logo} style={styles.logo} alt="logo" />
          <Divider />
          <List component="nav">
            <TextField
              style={{ margin: 10 }}
              required
              floatingLabelText="Search Job ..."
              fullWidth={true}
              name="jobSearch"
            />

            <ListItem
              button
              style={
                this.state.status == types.StatusFilters.SHOW_ALL
                  ? { background: "#c2c2c2" }
                  : {}
              }
              onClick={event =>
                this.handleStatusChange(event, types.StatusFilters.SHOW_ALL)
              }
            >
              <Badge badgeContent={this.props.allCount} color="primary">
                <ListItemText primary="ALL" />
              </Badge>
            </ListItem>

            <ListItem
              button
              style={
                this.state.status == types.StatusFilters.SHOW_DRAFT
                  ? { background: "#c2c2c2" }
                  : {}
              }
              onClick={event =>
                this.handleStatusChange(event, types.StatusFilters.SHOW_DRAFT)
              }
            >
              <Badge badgeContent={this.props.draftCount} color="primary">
                <ListItemText primary="DRAFT" />
              </Badge>
            </ListItem>

            <ListItem
              button
              style={
                this.state.status == types.StatusFilters.SHOW_PUBLISHED
                  ? { background: "#c2c2c2" }
                  : {}
              }
              onClick={event =>
                this.handleStatusChange(
                  event,
                  types.StatusFilters.SHOW_PUBLISHED
                )
              }
            >
              <Badge badgeContent={this.props.publishedCount} color="primary">
                <ListItemText primary="PUBLISHED" />
              </Badge>
            </ListItem>

            <ListItem
              button
              style={
                this.state.status == types.StatusFilters.SHOW_CLOSED
                  ? { background: "#c2c2c2" }
                  : {}
              }
              onClick={event =>
                this.handleStatusChange(event, types.StatusFilters.SHOW_CLOSED)
              }
            >
              <Badge badgeContent={this.props.closedCount} color="primary">
                <ListItemText primary="CLOSED" />
              </Badge>
            </ListItem>

            <Divider />
            <div style={{ margin: 5 }}>
              <Button
                onClick={this.handleApply}
                style={{
                  display: "block",
                  margin: "auto"
                }}
                variant="outlined"
                color="primary"
              >
                APPLY FILTERS
              </Button>
            </div>
          </List>
        </div>
      </div>
    );
  }
}

export default JobFilter;
