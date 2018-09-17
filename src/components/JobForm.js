import React, { Component } from 'react'
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import Divider from "material-ui/Divider";
import PageBase from "./PageBase";

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui/Table";


export default class JobForm extends Component {

  constructor(props){
    super(props);
  }

  render() {
    const weightColumnStyle = { width: 12};
    return (
      <PageBase title={this.props.editing == true ? 'Edit Job' : 'Create Job'}>
        <form onSubmit={this.props.onSave}>
          <TextField
            hintText="Job Name"
            floatingLabelText="Name"
            fullWidth={true}
            name="name"
            value={this.props.job.name}
            onChange={this.props.onChange}
          />

          <TextField
            hintText="Reference Id"
            floatingLabelText="ReferenceId"
            fullWidth={true}
            name="reference_id"
            value={this.props.job.reference_id}
            onChange={this.props.onChange}
          />

          <TextField
            hintText="Level"
            floatingLabelText="Level"
            fullWidth={true}
            name="level"
            value={this.props.job.level}
            onChange={this.props.onChange}
          />

          <TextField
            hintText="Summary"
            floatingLabelText="Summary"
            fullWidth={true}
            name="summary"
            value={this.props.job.summary}
            onChange={this.props.onChange}
          />
          <br/>
          <Divider />
          <br/>
          Goals
          <Table>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn style={weightColumnStyle}>%</TableHeaderColumn>
                <TableHeaderColumn>Description</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              {this.props.goals.map((item, counter) => (
                <TableRow key={`tr-${counter}`} selectable={false}>
                  <TableRowColumn  style={weightColumnStyle}>
                    <TextField
                      type="number"
                      name={item.weight}
                      style={{width: 50}}
                      onChange={e =>
                        this.props.handleGoalChange(e, item, "weight", counter)
                      }
                      value={this.props.goals[counter].weight}
                    />
                  </TableRowColumn>
                  <TableRowColumn>
                    <TextField
                      name={item.description}
                      style={{width:'90%'}}
                      onChange={e =>
                        this.props.handleGoalChange(e, item, "description", counter)
                      }
                      value={this.props.goals[counter].description}
                    />
                    <RaisedButton
                      label="X"
                      primary={true}
                      onClick={e =>
                        this.props.deleteGoal(e, counter)
                      }
                    />
                  </TableRowColumn>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <RaisedButton
            label="Add Goal"
            primary={true}
            onClick={this.props.addGoal}
          />
          <br/>
          <Divider />
          <br/>
          Skills
          <Table>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn   style={weightColumnStyle}>%</TableHeaderColumn>
                <TableHeaderColumn>Description</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              {this.props.skills.map((item, counter) => (
                <TableRow key={`tr-${counter}`} selectable={false}>
                  <TableRowColumn   style={weightColumnStyle}>
                    <TextField
                      name={item.weight}
                      type="number"
                      style={{width: 50}}
                      onChange={e =>
                        this.props.handleSkillChange(e, item, "weight", counter)
                      }
                      value={this.props.skills[counter].weight}
                    />
                  </TableRowColumn>
                  <TableRowColumn>
                    <TextField
                      name={item.description}
                      style={{width:'90%'}}
                      onChange={e =>
                        this.props.handleSkillChange(e, item, "description", counter)
                      }
                      value={this.props.skills[counter].description}
                    />
                    <RaisedButton
                      label="X"
                      primary={true}
                      onClick={e =>
                        this.props.deleteSkill(e, counter)
                      }
                    />
                  </TableRowColumn>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <RaisedButton
            label="Add Skill"
            primary={true}
            onClick={this.props.addSkill}
          />
          <br/>
          <br/>
          <RaisedButton label="Cancel" secondary={true} />
          <RaisedButton label="Save" primary={true} type="submit" />
        </form>
      </PageBase>
    );
  }
}