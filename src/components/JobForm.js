import React, { Component } from "react";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import Divider from "material-ui/Divider";
import PageBase from "./PageBase";
import { Link } from "react-router-dom";

import { Typography } from "@material-ui/core";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui/Table";

export default class JobForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const weightColumnStyle = { width: 12 };
    return (
      <PageBase title={this.props.editing == true ? "Edit Job" : "Create Job"}>
        <form onSubmit={this.props.onSave}>
          <TextField
            required
            hintText="Job Name"
            floatingLabelText="Name"
            fullWidth={true}
            name="name"
            value={this.props.job.name}
            onChange={this.props.onChange}
            disabled={this.props.viewOnly}
          />
          <TextField
            hintText="Reference Id"
            floatingLabelText="ReferenceId"
            fullWidth={true}
            name="reference_id"
            value={this.props.job.reference_id}
            onChange={this.props.onChange}
            disabled={this.props.viewOnly}
          />
          <TextField
            hintText="Level"
            floatingLabelText="Level"
            fullWidth={true}
            required
            name="level"
            value={this.props.job.level}
            onChange={this.props.onChange}
            disabled={this.props.viewOnly}
          />
          <TextField
            hintText="Summary"
            floatingLabelText="Summary"
            fullWidth={true}
            name="summary"
            required
            value={this.props.job.summary}
            onChange={this.props.onChange}
            disabled={this.props.viewOnly}
          />
          <br />
          <Divider />
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
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              {this.props.goals.map((item, counter) => (
                <TableRow key={`tr-${counter}`} selectable={false}>
                  <TableRowColumn style={weightColumnStyle}>
                    <TextField
                      type="number"
                      required
                      name={item.weight}
                      disabled={this.props.viewOnly}
                      style={{ width: 50 }}
                      onChange={e =>
                        this.props.handleGoalChange(e, item, "weight", counter)
                      }
                      value={this.props.goals[counter].weight}
                    />
                  </TableRowColumn>
                  <TableRowColumn>
                    <TextField
                      name={item.description}
                      required
                      style={{ width: "90%" }}
                      disabled={this.props.viewOnly}
                      onChange={e =>
                        this.props.handleGoalChange(
                          e,
                          item,
                          "description",
                          counter
                        )
                      }
                      value={this.props.goals[counter].description}
                    />
                    <RaisedButton
                      label="X"
                      primary={true}
                      disabled={this.props.viewOnly}
                      onClick={e => this.props.deleteGoal(e, counter)}
                    />
                  </TableRowColumn>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div style={{ color: "red" }}>{this.props.goalsError}</div>
          <RaisedButton
            label="Add Goal"
            primary={true}
            disabled={this.props.viewOnly}
            onClick={this.props.addGoal}
          />
          <br />
          <Divider />
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
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              {this.props.skills.map((item, counter) => (
                <TableRow key={`tr-${counter}`} selectable={false}>
                  <TableRowColumn style={weightColumnStyle}>
                    <TextField
                      name={item.weight}
                      type="number"
                      required
                      style={{ width: 50 }}
                      disabled={this.props.viewOnly}
                      onChange={e =>
                        this.props.handleSkillChange(e, item, "weight", counter)
                      }
                      value={this.props.skills[counter].weight}
                    />
                  </TableRowColumn>
                  <TableRowColumn>
                    <TextField
                      name={item.description}
                      style={{ width: "90%" }}
                      required
                      disabled={this.props.viewOnly}
                      onChange={e =>
                        this.props.handleSkillChange(
                          e,
                          item,
                          "description",
                          counter
                        )
                      }
                      value={this.props.skills[counter].description}
                    />
                    <RaisedButton
                      label="X"
                      primary={true}
                      disabled={this.props.viewOnly}
                      onClick={e => this.props.deleteSkill(e, counter)}
                    />
                  </TableRowColumn>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div style={{ color: "red" }}>{this.props.skillsError}</div>
          <RaisedButton
            label="Add Skill"
            primary={true}
            disabled={this.props.viewOnly}
            onClick={this.props.addSkill}
          />
          <br />
          <br />
          <Link to="/">
            <RaisedButton
              label="Cancel"
              secondary={true}
              disabled={this.props.viewOnly}
            />
          </Link>
          <RaisedButton
            label="Save"
            primary={true}
            disabled={this.props.viewOnly}
            type="submit"
          />
        </form>
      </PageBase>
    );
  }
}
