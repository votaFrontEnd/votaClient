import React, { Component } from 'react';
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";
import { connect } from 'react-redux'
import loadDataIfNeeded from '../actions/jobActions';
import addApplicant from '../actions/jobActions';
import {bindActionCreators} from 'redux';
import Applicants from '../components/Applicants';
import { Link } from "react-router-dom";
import JobDescription from '../components/JobDescription';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import DialogContentText from '@material-ui/core/DialogContentText';
import * as actions from '../actions/jobActions'

import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';

class JobDetails extends Component {

    constructor(props){
        super(props);
        this.handleDialogInputChange = this.handleDialogInputChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            openAddApplicants: false,
            openAddInterviewers: false,
            applicantName: '',
            interviewers: []
        }
    }

    handleChange = event => {
        this.setState({ interviewers: event.target.value });
      };
    

    componentDidMount(){
        this.props.actions.loadData();
    }
    
    getJob(){
        const jobs = this.props.jobs;
        const jobId = this.props.match.params.jobId;
        if (jobs != null && jobId != null && jobs.length > 0)
        {
            var jobArr = jobs.filter( job => {
                return job.id === jobId;
            })
            if (jobArr.length > 0)
            {
                return jobArr[0];
            }
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

    handleAddApplicantsClickOpen = () =>{
        this.setState({openAddApplicants: true})
    }

    handleAddApplicantsClickClose = () =>{
        this.setState({openAddApplicants: false})
    }

    handleAddInterviewerClickOpen = () =>{
        this.setState({openAddInterviewers: true})
    }

    handleAddInterviewerClickClose = () =>{
        this.setState({openAddInterviewers: false})
    }

    handleAddApplicant = () => {
        const { dispatch} = this.props
        const applicant = this.state.applicantName;
        const job = this.getJob();
        this.props.actions.addApplicant(job.id,applicant);
    }

    handleAddInterviewers = () => {
        const { dispatch} = this.props
        const interviewers = this.state.interviewers;
        const job = this.getJob();
        this.props.actions.addInterviewers(job.id,interviewers);
        this.handleAddInterviewerClickClose();
    } 

    handleCloseJob(){
        const job = this.getJob();
        this.props.actions.closeJob(job.id);
    }

    handlePublishJob()
    {
        const job = this.getJob();
        this.props.actions.publishJob(job.id);
    }

    handleDialogInputChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.id;

        this.setState({
            [name]: value
        });
    }    

    updateJobState(event) {
        const field = event.target.name;
        const job = this.state.job;
        job[field] = event.target.value;
        return this.setState({job: job});
    }

    render() {
        const job = this.getJob();
        const users = this.getUsers();
        const applicants = this.getApplicants();

        const styles = {
            content: {
              margin: 20
            },
            buttons: {
              marginRight: 20
            },
              chips: {
                display: 'flex',
                flexWrap: 'wrap',
              },
             
          };
          var potentialInterviewers = [];
          for(var i = 0; i < users.length; i++)
          {
              var user = users[i];
              var interviewers = job.interviewers;
              if (interviewers == null){
                  interviewers = [];
              }
              var add = true;
              for(var j = 0; j < interviewers.length; j++)
              {
                  var intv = interviewers[j];
                  if (intv == user.userid)
                  {
                      add = false;
                      continue;
                  }
              }
              if (add == true)
              {
                potentialInterviewers.push(user);
              }
          }

        return (
            <div>
                <Dialog
                    open={this.state.openAddApplicants}
                    onClose={this.handleAddApplicantsClickClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Add Applicant</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                            Please enter the name of applicant.
                            </DialogContentText>
                            <TextField
                            autoFocus
                            margin="dense"
                            id="applicantName"
                            label="Full Name"
                            type="text"
                            fullWidth
                            value={this.state.applicantName}
                            onChange={this.handleDialogInputChange}
                            />
                        </DialogContent>

                        <DialogActions>
                            <Button onClick={this.handleAddApplicantsClickClose} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={this.handleAddApplicant} color="primary">
                                Add
                            </Button>
                        </DialogActions>
                </Dialog>

                <Dialog
                    open={this.state.openAddInterviewers}
                    onClose={this.handleAddApplicantsClickClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Add Interviewers</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                            Please choose the interviewers.
                            </DialogContentText>

                                <Select
                                    multiple
                                    value={this.state.interviewers}
                                    onChange={this.handleChange}
                                    input={<Input id="select-multiple-chip" />}
                                    renderValue={selected => (
                                    <div>
                                        {selected.map(value => <Chip key={value} label={value}  />)}
                                    </div>
                                    )}
                                >
                                    {potentialInterviewers.map(user => (
                                    <MenuItem
                                        key={user.name}
                                        value={user.userid}
                                    >
                                        {user.name}
                                    </MenuItem>
                                    ))}
                                </Select>


                        </DialogContent>

                        <DialogActions>
                            <Button onClick={this.handleAddInterviewerClickClose} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={this.handleAddInterviewers} color="primary">
                                Add
                            </Button>
                        </DialogActions>
                </Dialog>

                <JobDescription job={job} users={users}/>
                <div style={styles.content}>
                    <Link to={"/editJob/" + job.id}><Button style={styles.buttons} variant="contained" color="primary">Edit Job</Button></Link>
                    <Button style={styles.buttons} variant="contained" color="primary" onClick={this.handleAddApplicantsClickOpen}>Add Applicant</Button>
                    <Button style={styles.buttons} variant="contained" color="primary" onClick={this.handleAddInterviewerClickOpen}>Add Interviewers</Button>                    
                    <Button style={styles.buttons} variant="contained" color="primary" onClick={this.handlePublishJob}>Publish Job</Button>      
                    <Button style={styles.buttons} variant="contained" color="secondary" onClick={this.handleCloseJob}>Close Job</Button>                                      
                </div>

                {applicants.length > 0 &&
                <div>
                  <Applicants job={job} users={users} applicants={applicants}/>
                </div>}
                <br/>
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
  
  function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators(actions, dispatch)}
  }

  export default connect(mapStatetoProps, mapDispatchToProps)(JobDetails);

