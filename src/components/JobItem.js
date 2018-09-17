import React, { Component } from 'react';
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { Link } from 'react-router-dom';

export default class JobItem extends Component {
  render() {
    const job = this.props.job;
    
    const jobId = job.id;
    
    const title = job.name != null ? job.name : '';
    const level = job.level != null ? job.level : '';
    const status = job.status;
    const referenceId = job.reference_id != null ? job.reference_id + ' - ' : '';
    const createdTime = new Date(job.CreateTS);
    const createdTimeDisplay = createdTime != null ? createdTime.toLocaleDateString() : '';
    const numberOfApplicants = job.applicants != null ? job.applicants.length : 0;

    const applicants = this.props.applicants;

    var applicant1 = '';
    var applicant2 = '';
    var applicant3 = '';
    var applicant4 = '';
    var applicant5 = '';

    var applicantMap = {};


    if(job.ratings != null)
    {

      for(var i = 0; i < job.ratings.length; i++)
      {
        var rating = job.ratings[i];
        var score = 0;
        var goals = 0;
        var skills = 0;
        var overall = 0;
        var applicantRatingArr = applicantMap[rating.applicant_id];
        if (applicantRatingArr == null)
        {
          applicantRatingArr = [];
          applicantMap[rating.applicant_id] = applicantRatingArr;
        }
        const ratingValueLength = (rating != null && rating.values != null) ? rating.values.length : 0;
        for(var j = 0; j < ratingValueLength; j++)
        {
          var ratingValue = rating.values[j];
          var parameterMapping = job.parameters.filter( parameter => {
            return parameter.id == ratingValue.parameter_id;
          });
          if (parameterMapping.length > 0)
          {
            var parameterMap = parameterMapping[0];
            if(parameterMap.type == 'goal')
            {
              goals += ratingValue.value * (parameterMap.weight/100);
            }
            if (parameterMap.type == 'skill')
            {
              skills += ratingValue.value * (parameterMap.weight/100);
            }
            if (parameterMap.type == 'overall')
            {
              overall += ratingValue.value;
            }
          }
        }
        applicantRatingArr.push( (goals + skills + overall) / 3 );
      }
     
      var applicantAvgScore = {};
      for(var key in applicantMap)
      {
        var applicantArr = applicantMap[key];
        var sum = 0;
        for(var i = 0; i < applicantArr.length; i++)
        {
          sum += applicantArr[i];
        }
        var average = sum / applicantArr.length;
        applicantAvgScore[key] = average;
      }
  
      var applicantScoreArr = [];
      for(var key in applicantAvgScore)
      {
        var score = applicantAvgScore[key];
        var appArr = applicants.filter ( applicant => {
          return applicant.Id === key;
        });
        if (appArr.length > 0)
        {
          applicantScoreArr.push({
            name: appArr[0].name,
            score: score
          });
        }
      }
  
      applicantScoreArr.sort(function(a, b)
      {
        if ((a == null || a.score == null ) && (b == null || b.score == null))
        {
          return 0;
        }
        if (a == null || a.score == null)
        {
          return -1;
        }
        if (b == null || b.score == null)
        {
          return 1;
        }
        return b.score - a.score
      })

      if (applicantScoreArr != null && applicantScoreArr.length > 0)
      { 
        applicant1 = applicantScoreArr[0].name + ' - ' + applicantScoreArr[0].score.toFixed(2);
        
        if (applicantScoreArr.length >= 2)
        {
          applicant2 = applicantScoreArr[1].name + ' - ' + applicantScoreArr[1].score.toFixed(2);  
        }
  
        if (applicantScoreArr.length >= 3)
        {
          applicant3 = applicantScoreArr[2].name + ' - ' + applicantScoreArr[2].score.toFixed(2);  
        }

        if (applicantScoreArr.length >= 4)
        {
          applicant4 = applicantScoreArr[3].name + ' - ' + applicantScoreArr[3].score.toFixed(2);  
        }

        if (applicantScoreArr.length >= 5)
        {
          applicant5 = applicantScoreArr[4].name + ' - ' + applicantScoreArr[4].score.toFixed(2);  
        }
  
      }
    }




    const styles = theme => ({
      root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
      },
    });

    return (
      <div>
      <Paper style={{padding: 10, margin: 10}} className={styles} elevation={4}>
        <Typography variant="headline" component="h3">
            <Link to={"/jobDetails/" + this.props.job.id}>{referenceId} {title}</Link>
        </Typography>
        <Typography variant="subheading" gutterBottom>
            {level} <br/>
            Created: {createdTimeDisplay} <br/>
            Status: {status} <br/>
        </Typography>      
        <Typography style={{padding: 20}}>
            # of Applicants: {numberOfApplicants} <br/>
            {applicant1} <br/>
            {applicant2} <br/>
            {applicant3} <br/>
            {applicant4} <br/>
            {applicant5} <br/>
        </Typography>
      </Paper>
      </div>
    )
  }
}