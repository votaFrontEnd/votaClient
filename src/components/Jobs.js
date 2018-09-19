import React, { Component } from 'react'
import JobItem from './JobItem';
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";
import { Link } from "react-router-dom";
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { withStyles } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import * as types from '../actions/actionTypes';

class Jobs extends Component {
  render() {
    const { classes } = this.props;
    const style = {
      content: {
        margin: 10
      }
    };

    return (
      <div style={style.content}>

        <div style={style.content}>
        <span style={style.content}>
          <InputLabel htmlFor="role-select">Role:</InputLabel>
          <Select value={this.props.roleFilter} onChange={this.props.handleRoleChange} inputProps={{name: 'role',id: 'role-select',}}>
            <MenuItem value={'SHOW_ALL'}>All</MenuItem>
            <MenuItem value={'SHOW_OWNER'}>Owner</MenuItem>
            <MenuItem value={'SHOW_VIEWER'}>Viewer</MenuItem>
            <MenuItem value={'SHOW_INTERVIEWER'}>Interviewer</MenuItem>
          </Select>
        </span>

        <span style={style.content}>
          <InputLabel htmlFor="status-select">Status:</InputLabel>
          <Select value={this.props.statusFilter} onChange={this.props.handleStatusChange} inputProps={{name: 'status',id: 'status-select',}}>
            <MenuItem value={'SHOW_ALL'}>All</MenuItem>
            <MenuItem value={'SHOW_DRAFT'}>Draft</MenuItem>
            <MenuItem value={'SHOW_PUBLISHED'}>Published</MenuItem>
            <MenuItem value={'SHOW_CLOSED'}>Closed</MenuItem>
          </Select>
        </span>
        </div>

        <div className='row'>        
              {this.props.jobs.map((job, i) =>  
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4">
                  <JobItem job={job} applicants={this.props.applicants} users={this.props.users}/>
                </div>
              )}
              <Link to="/newjob">
                  <FloatingActionButton>
                      <ContentAdd />
                  </FloatingActionButton>
              </Link>
        </div>
      </div>
    )
  }
}

export default Jobs