import React, { Component } from 'react'
import JobItem from './JobItem';
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";
import { Link } from "react-router-dom";

export default class Jobs extends Component {
  render() {

    const styles = {
      content: {
        margin: 10
      }
    };

    return (
      <div style={styles.content}>
        <div className='row'>        
              {this.props.jobs.map((job, i) =>  
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4">
                  <JobItem job={job} applicants={this.props.applicants} users={this.props.users}/>
                </div>
              )}
              <Link to="/newjob">
                  <FloatingActionButton>
                      <ContentAdd />
                  </FloatingActionButton>
              </Link>
        </div>
      </div>
    )
  }
}