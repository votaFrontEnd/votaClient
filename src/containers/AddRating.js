import React, { Component } from "react";
import { connect } from "react-redux";
import loadDataIfNeeded from "../actions/jobActions";
import RatingForm from "../components/RatingForm";
import auth from "../auth/authenticator";
import { bindActionCreators } from "redux";
import * as actions from "../actions/jobActions";

class AddRating extends Component {
  constructor(props) {
    super(props);
    this.state = {
      parameters: []
    };
    this.onSave = this.onSave.bind(this);
    this.handleGoalRatingChange = this.handleGoalRatingChange.bind(this);
    this.handleSkillRatingChange = this.handleSkillRatingChange.bind(this);
    this.handleOverallRatingChange = this.handleOverallRatingChange.bind(this);
    this.handleCommentsChange = this.handleCommentsChange.bind(this);
  }

  componentDidMount() {
    this.props.actions.loadData();
  }

  handleGoalRatingChange = (value, goal) => {
    var parameterForGoal = this.state.parameters.filter(parameter => {
      return parameter.parameter_id == goal.id;
    });
    if (parameterForGoal.length != 0) {
      this.setState({
        parameters: this.state.parameters.map(parameter => {
          return parameter.parameter_id == goal.id
            ? { ...parameter, value: value }
            : parameter;
        })
      });
    } else {
      const currentParameters = this.state.parameters;
      const newArr = [];
      newArr.push({ parameter_id: goal.id, value: value });
      const newParameters = currentParameters.concat(newArr);
      this.setState({ parameters: newParameters });
    }
  };

  onSave() {
    const rating = {};
    rating.interviewer_id = auth.getUser();
    rating.applicant_id = this.props.match.params.applicantId;
    rating.values = this.state.parameters;
    this.props.actions.addRating(this.props.match.params.jobId, rating);
    this.props.history.push("/");
  }

  handleSkillRatingChange = (value, skill) => {
    var parameterForSkill = this.state.parameters.filter(parameter => {
      return parameter.parameter_id == skill.id;
    });
    if (parameterForSkill.length != 0) {
      this.setState({
        parameters: this.state.parameters.map(parameter => {
          return parameter.parameter_id == skill.id
            ? { ...parameter, value: value }
            : parameter;
        })
      });
    } else {
      const currentParameters = this.state.parameters;
      const newArr = [];
      newArr.push({ parameter_id: skill.id, value: value });
      const newParameters = currentParameters.concat(newArr);
      this.setState({ parameters: newParameters });
    }
  };

  handleOverallRatingChange = (value, skill) => {
    var parameterForSkill = this.state.parameters.filter(parameter => {
      return parameter.parameter_id == skill.id;
    });
    if (parameterForSkill.length != 0) {
      this.setState({
        parameters: this.state.parameters.map(parameter => {
          return parameter.parameter_id == skill.id
            ? { ...parameter, value: value }
            : parameter;
        })
      });
    } else {
      const currentParameters = this.state.parameters;
      const newArr = [];
      newArr.push({ parameter_id: skill.id, value: value });
      const newParameters = currentParameters.concat(newArr);
      this.setState({ parameters: newParameters });
    }
  };

  handleCommentsChange = (e, skill) => {
    const value = e.target.value;
    var parameterForSkill = this.state.parameters.filter(parameter => {
      return parameter.parameter_id == skill.id;
    });
    if (parameterForSkill.length != 0) {
      this.setState({
        parameters: this.state.parameters.map(parameter => {
          return parameter.parameter_id == skill.id
            ? { ...parameter, comment: value, comments: value }
            : parameter;
        })
      });
    } else {
      const currentParameters = this.state.parameters;
      const newArr = [];
      newArr.push({ parameter_id: skill.id, description: value });
      const newParameters = currentParameters.concat(newArr);
      this.setState({ parameters: newParameters });
    }
  };

  getApplicant() {
    const applicants = this.props.applicants;
    const applicantId = this.props.match.params.applicantId;
    if (applicants != null && applicantId != null && applicants.length > 0) {
      var arr = applicants.filter(applicant => {
        return applicant.Id === applicantId;
      });
      if (arr.length > 0) {
        return arr[0];
      }
    }
    return {};
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
    return {};
  }

  getGoals(job) {
    if (job != null && job.parameters != null) {
      var goalsArr = job.parameters.filter(parameter => {
        return parameter.type == "goal";
      });
      var goalsWithRatingArr = goalsArr.map(goal => {
        const matchingParameters = this.state.parameters.filter(parameter => {
          return parameter.parameter_id == goal.id;
        });
        var newGoal = Object.assign({}, goal);
        newGoal.rating =
          matchingParameters.length > 0 ? matchingParameters[0].value : 0;
        return newGoal;
      });
      return goalsWithRatingArr;
    }
    return [];
  }

  getSkills(job) {
    if (job != null && job.parameters != null) {
      var skillsArr = job.parameters.filter(parameter => {
        return parameter.type == "skill";
      });
      var skillsWithRatingArr = skillsArr.map(skill => {
        const matchingParameters = this.state.parameters.filter(parameter => {
          return parameter.parameter_id == skill.id;
        });
        var newSkill = Object.assign({}, skill);
        newSkill.rating =
          matchingParameters.length > 0 ? matchingParameters[0].value : 0;
        return newSkill;
      });
      return skillsWithRatingArr;
    }
    return [];
  }

  getOverall(job) {
    if (job != null && job.parameters != null) {
      var skillsArr = job.parameters.filter(parameter => {
        return parameter.type == "overall";
      });
      var skillsWithRatingArr = skillsArr.map(skill => {
        const matchingParameters = this.state.parameters.filter(parameter => {
          return parameter.parameter_id == skill.id;
        });
        var newSkill = Object.assign({}, skill);
        newSkill.rating =
          matchingParameters.length > 0 ? matchingParameters[0].value : 0;
        return newSkill;
      });
      return skillsWithRatingArr;
    }
    return [];
  }

  render() {
    const job = this.getJob();
    const applicant = this.getApplicant();
    const goals = this.getGoals(job);
    const skills = this.getSkills(job);
    const overall = this.getOverall(job);
    return (
      <div>
        <RatingForm
          job={job}
          handleGoalRatingChange={this.handleGoalRatingChange}
          handleSkillRatingChange={this.handleSkillRatingChange}
          handleOverallRatingChange={this.handleOverallRatingChange}
          handleCommentsChange={this.handleCommentsChange}
          applicant={applicant}
          goals={goals}
          onSave={this.onSave}
          skills={skills}
          overall={overall}
        />
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
)(AddRating);
