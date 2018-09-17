import React, { Component } from 'react';
import { connect } from 'react-redux'
import loadDataIfNeeded from '../actions/jobActions';
import Jobs from '../components/Jobs';

class Dashboard extends Component {

    componentDidMount(){
        const { dispatch} = this.props
        dispatch(loadDataIfNeeded());
    }
    
    getJobs(){
        if (this.props.jobs){
            return this.props.jobs;
        }
        return [];
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
            {jobs.length > 0 &&
                <div>
                  <Jobs jobs={jobs} users={users} applicants={applicants}/>
                </div>}
            </div>
    );
  }
}


function mapStatetoProps(state){
    const jobs = state.jobs;
    const users = state.users;
    const applicants = state.applicants;
    return {
      jobs,
      users,
      applicants
    }
  }
  
  export default connect(mapStatetoProps)(Dashboard);

