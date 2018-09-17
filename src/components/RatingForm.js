import React, { Component } from 'react'
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import Divider from "material-ui/Divider";

import { Rating } from 'material-ui-rating';
import PageBase from "./PageBase";

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui/Table";
import { Typography } from '@material-ui/core';


export default class RatingForm extends Component {

  constructor(props){
    super(props);
  }

  render() {
      const weightColumnStyle = { width: 12};
      const descriptionColumnStyle = {align: 'center'};
      const jobName = this.props.job.name == null ? '' : this.props.job.name;
      const applicantName = this.props.applicant.name == null ? '' : this.props.applicant.name;
    return (
      <PageBase title={"Ratings"}>
        <form onSubmit={this.props.onSave}>

          <TextField
            hintText="Job Name"
            floatingLabelText="Job"
            fullWidth={true}
            name="name"
            value={jobName}
            disabled={true}
          />

          <TextField
            hintText="Applciant Name"
            floatingLabelText="Applicant Name"
            fullWidth={true}
            name="name"
            value={applicantName}
            disabled={true}
          />

          <br/>
          <br/>
          
          Goals <Typography variant="caption" > Rate the candidates’ ability to achieve the required goals based on their knowledge/experience </Typography>
          <Table >
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn style={weightColumnStyle}>%</TableHeaderColumn>
                <TableHeaderColumn>Description</TableHeaderColumn>
                <TableHeaderColumn>Rating <br/><Typography variant="caption" >1 = Poor   |    2 = Fair    |   3 = Average |   4 = Good |   5 = Excellent</Typography></TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              {this.props.goals.map((item, counter) => (
                <TableRow key={`tr-${counter}`} selectable={false}>
                  <TableRowColumn style={weightColumnStyle}>
                    {this.props.goals[counter].weight}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.props.goals[counter].description}
                  </TableRowColumn>
                  <TableRowColumn>
                    <Rating
                      name={item.rating}
                      value={this.props.goals[counter].rating}
                      max={5}
                      onChange={value =>
                        this.props.handleGoalRatingChange(value, this.props.goals[counter])
                      }
                    />
                  </TableRowColumn>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <br/>
          <Divider />
          <br/>
          <br/>
          Skills  <Typography variant="caption" > Rate proficiency the candidate has for the below skills required for this role </Typography>
          <Table >
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn style={weightColumnStyle}>%</TableHeaderColumn>
                <TableHeaderColumn>Description</TableHeaderColumn>
                <TableHeaderColumn>Rating <br/><Typography variant="caption" >1 = Poor   |    2 = Fair    |   3 = Average |   4 = Good |   5 = Excellent</Typography></TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              {this.props.skills.map((item, counter) => (
                <TableRow key={`tr-${counter}`} selectable={false}>
                  <TableRowColumn style={weightColumnStyle}>
                    {this.props.skills[counter].weight}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.props.skills[counter].description}
                  </TableRowColumn>
                  <TableRowColumn>
                    <Rating
                      name={item.rating}
                      value={this.props.skills[counter].rating}
                      max={5}
                      onChange={value =>
                        this.props.handleSkillRatingChange(value, this.props.skills[counter])
                      }
                    />
                  </TableRowColumn>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <br/>
          <Divider />
          <br/>
          Overall  <Typography variant="caption" >Rate overall job fit based on the Goals, Skills, Company Culture, Personality, etc.</Typography>
          <Table >
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn style={weightColumnStyle}>%</TableHeaderColumn>
                <TableHeaderColumn>Description</TableHeaderColumn>
                <TableHeaderColumn>Rating <br/><Typography variant="caption" >1 = Poor   |    2 = Fair    |   3 = Average |   4 = Good |   5 = Excellent</Typography></TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              {this.props.overall.map((item, counter) => (
                <TableRow key={`tr-${counter}`} selectable={false}>
                  <TableRowColumn style={weightColumnStyle}>
                  {this.props.overall[counter].weight}
                  </TableRowColumn>
                  <TableRowColumn>
                    Overall
                  </TableRowColumn>
                  <TableRowColumn>
                    <Rating
                      name={item.rating}
                      value={this.props.overall[counter].rating}
                      max={5}
                      onChange={value =>
                        this.props.handleOverallRatingChange(value, this.props.overall[counter])
                      }
                    />
                  </TableRowColumn>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <br/>
          Comments: <Typography variant="caption" >Provide details for overall score/feedback for this candidate.</Typography>
          
          {this.props.overall.map((item, counter) => (
            <TextField
              width={"80%"}
              name={item.description}
              value={this.props.overall[counter].description}
              onChange={e =>
                this.props.handleCommentsChange(e, item, "description", counter)
              }
              fullWidth={true}
              hintText=""
              multiLine={true}
              rows={1}
              rowsMax={5}
            />
          ))}
          <br/>
          <RaisedButton label="Cancel" secondary={true} />
          <RaisedButton label="Save" primary={true} type="submit" />
        </form>
      </PageBase>
    );
  }
}