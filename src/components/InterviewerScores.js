import React, { Component } from 'react';
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { Link } from 'react-router-dom';

export default class InterviewerScores extends Component {
  render() {

    const interviewer = this.props.interviewer;
    const interviewerGoalsScore = interviewer.individualGoalsArr.map((individualGoal) => <div> {individualGoal.description} - {individualGoal.value} </div>);   
    const interviewerSkillsScore = interviewer.individualSkillsArr.map((individualSkill) => <div>{individualSkill.description} - {individualSkill.value} </div>);
    const overallScore = interviewer.overall;
    return (
        <div>
            {interviewer.name} - {interviewer.score}
            <br/>
            <br/>
            Overall: {overallScore}
            <br/>
            <br/>
            {interviewerGoalsScore}
            <br/>
            {interviewerSkillsScore}
            <br/>
            {}
        </div>
    )
  }
}