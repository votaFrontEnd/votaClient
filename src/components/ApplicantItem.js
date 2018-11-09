import React, { Component } from "react";
import InterviewerScores from "./InterviewerScores";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ScoreLabel from "./ScoreLabel";
import Button from "@material-ui/core/Button";
import auth from "../auth/authenticator";

export default class ApplicantItem extends Component {
  render() {
    const styles = {
      content: {
        margin: 20
      },
      buttons: {
        margin: 10
      },
      chips: {
        display: "flex",
        flexWrap: "wrap"
      }
    };

    const job = this.props.job;
    const applicant = this.props.applicant;
    const applicantID = applicant != null ? applicant.Id : "";
    const users = this.props.users;
    const name = applicant != null ? applicant.name : "";

    const goalsArr = job.parameters.filter(p => {
      return p.type == "goal";
    });
    const skillsArr = job.parameters.filter(p => {
      return p.type == "skill";
    });
    const overallArr = job.parameters.filter(p => {
      return p.type == "overall";
    });
    const ratingsForApplicantArr =
      job.ratings != null
        ? job.ratings.filter(rating => {
            return applicant != null && rating.applicant_id === applicant.Id;
          })
        : [];

    const myRating = ratingsForApplicantArr.filter(rating => {
      return rating.interviewer_id === auth.getUser();
    });
    const disableRatingButton = myRating.length == 0 ? false : true;

    const averagesPerGoal = [];
    for (var i = 0; i < goalsArr.length; i++) {
      var goal = goalsArr[i];
      var sum = 0;
      for (var j = 0; j < ratingsForApplicantArr.length; j++) {
        const ratingApplicantLength =
          ratingsForApplicantArr[j] != null &&
          ratingsForApplicantArr[j].values != null
            ? ratingsForApplicantArr[j].values.length
            : 0;
        for (var k = 0; k < ratingApplicantLength; k++) {
          var value = ratingsForApplicantArr[j].values[k];
          if (value.parameter_id == goal.id) {
            sum += value.value;
          }
        }
      }
      averagesPerGoal.push({
        goal: goal,
        average: sum / ratingsForApplicantArr.length
      });
    }

    const averagesPerSkill = [];
    for (var i = 0; i < skillsArr.length; i++) {
      var skill = skillsArr[i];
      var sum = 0;
      for (var j = 0; j < ratingsForApplicantArr.length; j++) {
        const ratingApplicantLength =
          ratingsForApplicantArr[j] != null &&
          ratingsForApplicantArr[j].values != null
            ? ratingsForApplicantArr[j].values.length
            : 0;
        for (var k = 0; k < ratingApplicantLength; k++) {
          var value = ratingsForApplicantArr[j].values[k];
          if (value.parameter_id == skill.id) {
            sum += value.value;
          }
        }
      }
      averagesPerSkill.push({
        skill: skill,
        average: sum / ratingsForApplicantArr.length
      });
    }

    var overallAverage = 0;
    for (var i = 0; i < overallArr.length; i++) {
      var overall = overallArr[i];
      var sum = 0;
      for (var j = 0; j < ratingsForApplicantArr.length; j++) {
        const ratingApplicantLength =
          ratingsForApplicantArr[j] != null &&
          ratingsForApplicantArr[j].values != null
            ? ratingsForApplicantArr[j].values.length
            : 0;
        for (var k = 0; k < ratingApplicantLength; k++) {
          var value = ratingsForApplicantArr[j].values[k];
          if (value.parameter_id == overall.id) {
            sum += value.value;
          }
        }
      }
      overallAverage = sum / ratingsForApplicantArr.length;
    }

    const scorePerInterviewer = ratingsForApplicantArr.map(rating => {
      var interviewer = rating.interviewer_id;
      var goals = 0;
      var skills = 0;
      var overall = 0;

      var individualGoalsArr = [];
      var individualSkillsArr = [];
      var individualOverallArr = [];
      var totalComments = "";
      if (users.length > 0) {
        interviewer = users.filter(user => {
          return user.userid == rating.interviewer_id;
        })[0].name;
      }
      const ratingValueLength =
        rating != null && rating.values != null ? rating.values.length : 0;
      for (var i = 0; i < ratingValueLength; i++) {
        var ratingValue = rating.values[i];
        var parameter_id = ratingValue.parameter_id;
        var matchingParameter = job.parameters.filter(p => {
          return p.id == parameter_id;
        });
        if (matchingParameter.length > 0) {
          var parameter = matchingParameter[0];
          if (parameter.type === "goal") {
            goals += (parameter.weight / 100) * ratingValue.value;
            individualGoalsArr.push({
              description: parameter.description,
              value: ratingValue.value
            });
          } else if (parameter.type == "skill") {
            skills += (parameter.weight / 100) * ratingValue.value;
            individualSkillsArr.push({
              description: parameter.description,
              value: ratingValue.value
            });
          } else if (parameter.type == "overall") {
            overall += ratingValue.value;
            totalComments += ratingValue.comment;
            individualOverallArr.push({ value: ratingValue.value });
          }
        }
      }

      return {
        name: interviewer,
        individualGoalsArr: individualGoalsArr,
        individualSkillsArr: individualSkillsArr,
        score: (goals + skills + overall) / 3,
        goals: goals,
        skills: skills,
        overall: overall,
        comments: totalComments
      };
    });

    const averageScore =
      scorePerInterviewer.length > 0
        ? scorePerInterviewer.reduce((a, b) => a + b.score, 0) /
          scorePerInterviewer.length
        : "N/A";
    const scorePerGoalDisplay =
      averagesPerGoal.length > 0
        ? averagesPerGoal.map(goal => (
            <div>
              {" "}
              {goal.goal.description}{" "}
              {isNaN(goal.average) ? "" : " - " + goal.average}{" "}
            </div>
          ))
        : "N/A";
    const scorePerSkillDisplay =
      averagesPerSkill.length > 0
        ? averagesPerSkill.map(skill => (
            <div>
              {" "}
              {skill.skill.description}{" "}
              {isNaN(skill.average) ? "" : " - " + skill.average}{" "}
            </div>
          ))
        : "N/A";

    const averagesForGoals =
      averagesPerGoal.length > 0
        ? averagesPerGoal.reduce((a, b) => a + b.average, 0) /
          averagesPerGoal.length
        : "N/A";
    const averagesForSkills =
      averagesPerSkill.length > 0
        ? averagesPerSkill.reduce((a, b) => a + b.average, 0) /
          averagesPerSkill.length
        : "N/A";

    return (
      <div>
        <Paper style={{ padding: 10, margin: 10 }}>
          <ExpansionPanel style={{ padding: 0, margin: 0 }}>
            <ExpansionPanelSummary>
              <ScoreLabel label={name} score={averageScore} />
            </ExpansionPanelSummary>
          </ExpansionPanel>

          <ExpansionPanel style={{ padding: 0, margin: 0 }}>
            <ExpansionPanelSummary>
              <ScoreLabel label="Overall" score={overallAverage} />
            </ExpansionPanelSummary>
          </ExpansionPanel>

          <ExpansionPanel style={{ padding: 0, margin: 0 }}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <ScoreLabel label="Goals" score={averagesForGoals} />
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>{scorePerGoalDisplay}</Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>

          <ExpansionPanel style={{ padding: 0, margin: 0 }}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <ScoreLabel label="Skills" score={averagesForSkills} />
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>{scorePerSkillDisplay}</Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>

          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <ScoreLabel
                label="Reviewers"
                score={ratingsForApplicantArr.length}
                hideColor={true}
              />
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                {scorePerInterviewer.map((interviewer, i) => (
                  <InterviewerScores interviewer={interviewer} />
                ))}
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>

          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <ScoreLabel
                label="Comments"
                score={ratingsForApplicantArr.length}
                hideColor={true}
              />
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                {scorePerInterviewer.map((interviewer, i) => (
                  <div>
                    {interviewer.name} - {interviewer.comments}
                  </div>
                ))}
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>

          <Link to={"/addRatings/" + job.id + "/" + applicantID}>
            <Button
              style={styles.buttons}
              variant="contained"
              color="primary"
              disabled={disableRatingButton}
              onClick={this.handleAddApplicantsClickOpen}
            >
              Rate!
            </Button>
          </Link>
        </Paper>
      </div>
    );
  }
}
