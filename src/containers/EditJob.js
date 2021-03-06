import React, { Component } from "react";
import { connect } from "react-redux";
import loadDataIfNeeded from "../actions/jobActions";
import JobForm from "../components/JobForm";
import auth from "../auth/authenticator";
import { bindActionCreators } from "redux";
import * as courseActions from "../actions/jobActions";

class EditJob extends Component {
  constructor(props) {
    super(props);
    this.state = {
      job: {},
      goals: [],
      skills: [],
      saving: false,
      skillsError: "",
      goalsError: ""
    };
    this.handleGoalChange = this.handleGoalChange.bind(this);
    this.handleSkillChange = this.handleSkillChange.bind(this);
    this.updateJobState = this.updateJobState.bind(this);
    this.addGoal = this.addGoal.bind(this);
    this.deleteGoal = this.deleteGoal.bind(this);
    this.deleteSkill = this.deleteSkill.bind(this);
    this.addSkill = this.addSkill.bind(this);
    this.saveJob = this.saveJob.bind(this);
  }

  componentDidMount() {
    this.props.loadData();
  }

  static getDerivedStateFromProps(props, state) {
    if (state.job != null && state.job.id != null) {
      return null;
    }
    const jobs = props.jobs;
    const jobId = props.match.params.jobId;
    if (jobs != null && jobId != null && jobs.length > 0) {
      var jobArr = jobs.filter(job => {
        return job.id === jobId;
      });
      if (jobArr.length > 0) {
        const job = jobArr[0];
        const goals = job.parameters.filter(parameter => {
          return parameter.type == "goal";
        });
        const skills = job.parameters.filter(parameter => {
          return parameter.type == "skill";
        });

        return { job: job, goals: goals, skills: skills };
      }
    }
    return null;
  }

  saveJob(event) {
    event.preventDefault();
    const job = this.state.job;
    const goals = this.state.goals;
    const skills = this.state.skills;

    const goalsWeight = goals.reduce(function(sum, goal) {
      return goal.weight + sum;
    }, 0);

    const skillsWeight = skills.reduce(function(sum, skill) {
      return skill.weight + sum;
    }, 0);

    if (goalsWeight != 100 || skillsWeight != 100) {
      this.setState({
        goalsError: goalsWeight != 100 ? "Goals % must equal 100" : "",
        skillsError: skillsWeight != 100 ? "Skills % must equal 100" : ""
      });
      return;
    }

    const newJob = {};
    newJob.name = job.name;
    newJob.id = job.id;
    newJob.referenceId = job.referenceId;
    newJob.level = job.level;
    newJob.summary = job.summary;
    newJob.owner = job.owner;
    newJob.applicants = [];
    newJob.ratings = [];
    newJob.parameters = [].concat(goals).concat(skills);
    newJob.parameters.push({ weight: 0, type: "overall", description: "" });
    this.props.editJob(job.id, newJob);
    this.props.history.push("/");
  }

  handleGoalChange = (e, name, prop, i) => {
    var value =
      e.target.type === "number" ? parseInt(e.target.value) : e.target.value;
    this.setState(state => ({
      goals: state.goals.map(
        (row, j) => (j === i ? { ...row, [prop]: value } : row)
      )
    }));
  };

  handleSkillChange = (e, name, prop, i) => {
    var value =
      e.target.type === "number" ? parseInt(e.target.value) : e.target.value;
    this.setState(state => ({
      skills: state.skills.map(
        (row, j) => (j === i ? { ...row, [prop]: value } : row)
      )
    }));
  };

  deleteGoal(event, counter) {
    this.setState(state => ({
      goals: state.goals.filter((row, j) => (j != counter ? true : false))
    }));
  }

  deleteSkill(event, counter) {
    this.setState(state => ({
      skills: state.skills.filter((row, j) => (j != counter ? true : false))
    }));
  }

  addGoal(event) {
    const currentGoals = this.state.goals;
    const newArr = [];
    newArr.push({ type: "goal", weight: 0, description: "New Goal" });
    const newGoals = currentGoals.concat(newArr);
    this.setState({ goals: newGoals });
  }

  addSkill(event) {
    const currentSkills = this.state.skills;
    const newArr = [];
    newArr.push({ type: "skill", weight: 0, description: "New Skill" });
    const newSkills = currentSkills.concat(newArr);
    this.setState({ skills: newSkills });
  }

  updateJobState(event) {
    const field = event.target.name;
    const job = this.state.job;
    job[field] = event.target.value;
    return this.setState({ job: job });
  }

  getJob() {
    const jobs = this.props.jobs;
    const jobId = this.props.match.params.jobId;
    if (jobs != null && jobId != null && jobs.length > 0) {
      var jobArr = jobs.filter(job => {
        return job.id === jobId;
      });
      if (jobArr.length > 0) {
        return jobArr[0];
      }
    }
    return [];
  }

  render() {
    const job = this.getJob();
    return (
      <div>
        <JobForm
          editing={true}
          viewOnly={job.status == "Draft" ? false : true}
          job={this.state.job}
          goals={this.state.goals}
          skills={this.state.skills}
          onSave={this.saveJob}
          onChange={this.updateJobState}
          addGoal={this.addGoal}
          deleteGoal={this.deleteGoal}
          deleteSkill={this.deleteSkill}
          addSkill={this.addSkill}
          handleGoalChange={this.handleGoalChange}
          handleSkillChange={this.handleSkillChange}
          goalsError={this.state.goalsError}
          skillsError={this.state.skillsError}
        />
      </div>
    );
  }
}

function mapStatetoProps(state) {
  const { jobs } = state;
  return {
    jobs
  };
}

export default connect(
  mapStatetoProps,
  courseActions
)(EditJob);
