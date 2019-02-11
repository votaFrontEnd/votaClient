import React, { Component } from "react";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import Divider from "material-ui/Divider";
import Grid from "@material-ui/core/Grid";
import { Rating } from "material-ui-rating";
import PageBase from "./PageBase";

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui/Table";
import { Typography } from "@material-ui/core";

export default class RatingForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const weightColumnStyle = { width: 7 };
    const descriptionColumnStyle = { align: "left" };
    const jobName = this.props.job.name == null ? "" : this.props.job.name;
    const applicantName =
      this.props.applicant.name == null ? "" : this.props.applicant.name;
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
          <br />
          <br />
          Goals{" "}
          <Typography variant="caption">
            {" "}
            Rate the candidates’ ability to achieve the required goals based on
            their knowledge/experience{" "}
          </Typography>
          <Table>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn style={weightColumnStyle}>
                  %
                </TableHeaderColumn>
                <TableHeaderColumn>Description</TableHeaderColumn>
                <TableHeaderColumn>
                  Rating <br />
                  <Typography variant="caption">
                    1 = Poor | 2 = Fair | 3 = Average | 4 = Good | 5 = Excellent
                  </Typography>
                </TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false} />
          </Table>
          {this.props.goals.map((item, counter) => (
            <div>
              <Grid container spacing={24}>
                <Grid item xs={6} sm={3}>
                  {this.props.goals[counter].weight}
                </Grid>
                <Grid item xs={6} sm={3}>
                  {this.props.goals[counter].description}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Rating
                    name={item.rating}
                    value={this.props.goals[counter].rating}
                    max={5}
                    onChange={value =>
                      this.props.handleGoalRatingChange(
                        value,
                        this.props.goals[counter]
                      )
                    }
                  />
                </Grid>
              </Grid>
              <Divider />
            </div>
          ))}
          <br />
          <br />
          <br />
          Skills{" "}
          <Typography variant="caption">
            {" "}
            Rate proficiency the candidate has for the below skills required for
            this role{" "}
          </Typography>
          <Table>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn style={weightColumnStyle}>
                  %
                </TableHeaderColumn>
                <TableHeaderColumn>Description</TableHeaderColumn>
                <TableHeaderColumn>
                  Rating <br />
                  <Typography variant="caption">
                    1 = Poor | 2 = Fair | 3 = Average | 4 = Good | 5 = Excellent
                  </Typography>
                </TableHeaderColumn>
              </TableRow>
            </TableHeader>
          </Table>
          {this.props.skills.map((item, counter) => (
            <div>
              <Grid container spacing={24}>
                <Grid item xs={6} sm={3}>
                  {this.props.skills[counter].weight}
                </Grid>
                <Grid item xs={6} sm={3}>
                  {this.props.skills[counter].description}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Rating
                    name={item.rating}
                    value={this.props.skills[counter].rating}
                    max={5}
                    onChange={value =>
                      this.props.handleSkillRatingChange(
                        value,
                        this.props.skills[counter]
                      )
                    }
                  />
                </Grid>
              </Grid>
              <Divider />
            </div>
          ))}
          <br />
          <br />
          Overall{" "}
          <Typography variant="caption">
            Rate overall job fit based on the Goals, Skills, Company Culture,
            Personality, etc.
          </Typography>
          <Table>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn style={weightColumnStyle}>
                  %
                </TableHeaderColumn>
                <TableHeaderColumn>Description</TableHeaderColumn>
                <TableHeaderColumn>
                  Rating <br />
                  <Typography variant="caption">
                    1 = Poor | 2 = Fair | 3 = Average | 4 = Good | 5 = Excellent
                  </Typography>
                </TableHeaderColumn>
              </TableRow>
            </TableHeader>
          </Table>
          {this.props.overall.map((item, counter) => (
            <div>
              <Grid container spacing={24}>
                <Grid item xs={6} sm={3}>
                  100
                </Grid>
                <Grid item xs={6} sm={3}>
                  Overall
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Rating
                    name={item.rating}
                    value={this.props.overall[counter].rating}
                    max={5}
                    onChange={value =>
                      this.props.handleOverallRatingChange(
                        value,
                        this.props.overall[counter]
                      )
                    }
                  />
                </Grid>
              </Grid>
              <Divider />
            </div>
          ))}
          <br />
          Comments:{" "}
          <Typography variant="caption">
            Provide details for overall score/feedback for this candidate.
          </Typography>
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
          <br />
          <RaisedButton label="Cancel" secondary={true} />
          <RaisedButton label="Save" primary={true} type="submit" />
        </form>
      </PageBase>
    );
  }
}
