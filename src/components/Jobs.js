import React, { Component } from "react";
import JobItem from "./JobItem";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import * as types from "../actions/actionTypes";
import Drawer from "@material-ui/core/Drawer";
import Badge from "@material-ui/core/Badge";
import Button from "@material-ui/core/Button";
import JobFilter from "./JobFilter";
import Chip from "@material-ui/core/Chip";
import { loadCSS } from "fg-loadcss/src/loadCSS";
import Icon from "@material-ui/core/Icon";

class Jobs extends Component {
  componentDidMount() {
    loadCSS(
      "https://use.fontawesome.com/releases/v5.1.0/css/all.css",
      document.querySelector("#insertion-point-jss")
    );
  }

  render() {
    const drawerWidth = 240;

    const { classes } = this.props;
    const style = {
      content: {
        margin: 10
      }
    };

    return (
      <div style={style.content}>
        <div style={style.content}>
          <span
            style={{
              top: "90px",
              left: "0",
              marginLeft: "-20px",
              overflow: "hidden"
            }}
          >
            <Button
              variant="outlined"
              onClick={e => this.props.toggleDrawer(e)}
            >
              Filter
            </Button>
          </span>
          <span>
            <Chip
              label={this.props.statusFilter.replace("SHOW_", "")}
              color="primary"
            />
          </span>
          <span style={{ float: "right", margin: 10 }}>
            Showing {this.props.jobs.length} of {this.props.totalJobs}
          </span>
        </div>

        <Drawer
          open={this.props.drawer}
          onClose={e => this.props.toggleDrawer(e)}
        >
          <JobFilter
            statusFilter={this.props.statusFilter}
            allCount={this.props.totalJobs}
            draftCount={this.props.draftCount}
            publishedCount={this.props.publishedCount}
            closedCount={this.props.closedCount}
            toggleDrawer={this.props.toggleDrawer}
            applyFilter={this.props.applyFilter}
          />
        </Drawer>

        <div className="row">
          {this.props.jobs.map((job, i) => (
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4">
              <JobItem
                job={job}
                applicants={this.props.applicants}
                users={this.props.users}
              />
            </div>
          ))}
          <Link to="/newjob">
            <FloatingActionButton style={{ margin: 10 }}>
              <ContentAdd />
            </FloatingActionButton>
          </Link>
        </div>
      </div>
    );
  }
}

export default Jobs;
