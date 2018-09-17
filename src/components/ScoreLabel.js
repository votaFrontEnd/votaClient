import React, { Component } from 'react';
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { Link } from 'react-router-dom';

export default class ScoreLabel extends Component {
  render() {

    const label = this.props.label;
    const score = isNaN(this.props.score) == false ? this.props.score.toFixed(2) : 'N/A';
    const hideColor = this.props.hideColor;
    const style = {align:'center'};
    if (!hideColor)
    {
      if (score >= 4.0)
      {
        style.backgroundColor='green';
      }
      else if (score >=3 && score < 4)
      {
        style.backgroundColor='yellow';
      }
      else if (score >=0 && score < 3)
      {
        style.backgroundColor='yellow';
      }
      else{
        style.backgroundColor='white';
        style.color = 'black';
      }
    }


    return (
        <div style={{width:'100%'}}>
          <table style={{width:'100%'}}>
            <tr>
              <td style={{width:'85%'}}>
                {label}
              </td>
              <td style={style}>
                {score}
              </td>
            </tr>
          </table>
        </div>
    )
  }
}