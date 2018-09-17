import React, { Component } from 'react'
import ApplicantItem from './ApplicantItem';

export default class Applicants extends Component {
    getApplicantsForJob(){
        const job = this.props.job;
        const applicants = this.props.applicants;
        const applicantsForJob = [];
        if (job != null && job.applicants != null && job.applicants.length > 0)
        {
            for(var i = 0; i < job.applicants.length; i++)
            {
                const jobApplicant = job.applicants[i];
                applicantsForJob.push(applicants.filter(applicant => {
                    return applicant.Id === jobApplicant
                })[0]);
            }
            return applicantsForJob;
        }
        return [];
    }
  render() {

    const styles = {
        content: {
          margin: 20
        }
      };
  
    const job = this.props.job;
    const applicantsForJob = this.getApplicantsForJob();
    return (
        <div style={styles.content}>
            <div className='row'>   
                {applicantsForJob.map((applicant, i) => 
                    <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4">
                        <ApplicantItem job={job} applicant={applicant} users={this.props.users}/>
                    </div>
                )}
            </div>
        </div>
    )
  }
}