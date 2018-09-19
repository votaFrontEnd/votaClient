import React, { Component } from 'react';
import { connect } from 'react-redux'
import loadDataIfNeeded from '../actions/jobActions';
import Jobs from '../components/Jobs';
import setStatusFilter from '../actions/statusFilterActions';
import setRoleFilter from '../actions/roleFilterActions';
import * as types from '../actions/actionTypes';
import auth from '../auth/authenticator';

class Dashboard extends Component {

    constructor(props){
        super(props);
        this.handleStatusChange = this.handleStatusChange.bind(this);
        this.handleRoleChange = this.handleRoleChange.bind(this);
    }

    handleStatusChange = (e, name, prop, i) => {
        var value =  e.target.type === 'number' ? parseInt(e.target.value) : e.target.value;
        const {dispatch} = this.props;
        dispatch(setStatusFilter(value))
    };

    handleRoleChange = (e, name, prop, i) => {
        var value =  e.target.type === 'number' ? parseInt(e.target.value) : e.target.value;
        const {dispatch} = this.props;
        dispatch(setRoleFilter(value))
    };

    componentDidMount(){
        const { dispatch} = this.props
        dispatch(loadDataIfNeeded());
    }
    
    getJobs(){
        const statusFilter = this.props.statusFilter;
        const roleFilter = this.props.roleFilter;

        var statusJobs = [];
        var jobs = [];

        const myUser = auth.getUser();

        if (this.props.jobs){
            switch(statusFilter){
                case types.StatusFilters.SHOW_ALL:
                    statusJobs = this.props.jobs;
                    break;
                case types.StatusFilters.SHOW_CLOSED:
                    statusJobs = this.props.jobs.filter(j => j.status=='Closed');
                    break;
                case types.StatusFilters.SHOW_DRAFT:
                    statusJobs = this.props.jobs.filter(j => j.status=='Draft');
                    break;
                case types.StatusFilters.SHOW_PUBLISHED:
                    statusJobs = this.props.jobs.filter(j=>j.status=='Published');
                default:
                    statusJobs = this.props.jobs
                    break;
            }

            jobs = statusJobs;

            switch(roleFilter){
                case types.RoleFilters.SHOW_OWNER:
                    jobs = statusJobs.filter(j => {
                        return j.owner == myUser
                    })
                    break;
                case types.RoleFilters.SHOw_VIEWER:
                    jobs = statusJobs.filter(j => j.editors!= null && j.editors.includes(myUser))
                    break;
                case types.RoleFilters.SHOW_INTERVIEWER:
                    jobs = statusJobs.filter(j => j.interviewers != null && j.interviewers.includes(myUser))
                    break;
            }
        }
        return jobs;
    }

    getApplicants(){
        if (this.props.applicants)
        {
            return this.props.applicants;
        }
        return [];
    }

    getUsers(){
        if(this.props.users)
        {
            return this.props.users;
        }
        return [];
    }

    render() {
        const jobs = this.getJobs();
        const users = this.getUsers();
        const applicants = this.getApplicants();

        return (
            <div>
                <div>
                  <Jobs jobs={jobs} users={users} applicants={applicants} statusFilter={this.props.statusFilter} 
                        roleFilter={this.props.roleFilter} handleStatusChange={this.handleStatusChange} handleRoleChange={this.handleRoleChange}/>
                </div>
            </div>
    );
  }
}


function mapStatetoProps(state){
    const jobs = state.jobs;
    const users = state.users;
    const applicants = state.applicants;
    const statusFilter = state.statusFilter;
    const roleFilter = state.roleFilter;
    return {
      jobs,
      users,
      applicants,
      statusFilter,
      roleFilter
    }
  }
  

  export default connect(mapStatetoProps)(Dashboard);

