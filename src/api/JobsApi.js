class JobsApi {
  static getAllJobs() {
    const request = new Request("http://35.153.120.148:5000/job/getall", {
      method: "POST"
    });
    return fetch(request)
      .then(response => {
        return response.json();
      })
      .catch(error => {
        return error;
      });
  }

  static creatJob(job) {
    const request = new Request(`http://35.153.120.148:5000/job/add`, {
      method: "POST",
      body: JSON.stringify(job)
    });

    return fetch(request)
      .then(response => {
        return response.json();
      })
      .catch(error => {
        return error;
      });
  }

  static editJob(jobId, job) {
    const request = new Request(
      `http://35.153.120.148:5000/job/update/` + jobId,
      {
        method: "POST",
        body: JSON.stringify(job)
      }
    );

    return fetch(request)
      .then(response => {
        return response.json();
      })
      .catch(error => {
        return error;
      });
  }

  static closeJob(jobId, comment) {
    const request = new Request(
      `http://35.153.120.148:5000/job/update/` + jobId,
      {
        method: "POST",
        body: JSON.stringify({
          status: "Closed",
          comment: comment,
          comments: comment
        })
      }
    );
    return fetch(request)
      .then(response => {
        return response.json();
      })
      .catch(error => {
        return error;
      });
  }

  static publishJob(jobId) {
    const request = new Request(
      `http://35.153.120.148:5000/job/update/` + jobId,
      {
        method: "POST",
        body: JSON.stringify({
          status: "Published"
        })
      }
    );
    return fetch(request)
      .then(response => {
        return response.json();
      })
      .catch(error => {
        return error;
      });
  }

  static addApplicant(jobId, applicantName) {
    const request = new Request(
      `http://35.153.120.148:5000/job/update/` + jobId,
      {
        method: "POST",
        body: JSON.stringify({
          action: "addApplicants",
          applicant_names: [applicantName]
        })
      }
    );

    return fetch(request)
      .then(response => {
        return response.json();
      })
      .catch(error => {
        return error;
      });
  }

  static addInterviewers(jobId, interviewers) {
    const request = new Request(
      `http://35.153.120.148:5000/job/update/` + jobId,
      {
        method: "POST",
        body: JSON.stringify({
          action: "addInterviewers",
          interviewers: interviewers
        })
      }
    );
    return fetch(request)
      .then(response => {
        return response.json();
      })
      .catch(error => {
        return error;
      });
  }

  static addRating(jobId, rating) {
    const request = new Request(
      `http://35.153.120.148:5000/job/addrating/` + jobId,
      {
        method: "POST",
        body: JSON.stringify(rating)
      }
    );
    return fetch(request)
      .then(response => {
        return response.json();
      })
      .catch(error => {
        return error;
      });
  }

  static getData(sessionUser) {
    const request = new Request(
      "http://35.153.120.148:5000/job/getByUser/" + sessionUser,
      {
        method: "GET"
      }
    );
    return fetch(request)
      .then(response => {
        return response.json();
      })
      .catch(error => {
        return error;
      });
  }

  static getAllUsers() {
    const request = new Request("http://35.153.120.148:5000/user/getall", {
      method: "GET"
    });
    return fetch(request)
      .then(response => {
        return response.json();
      })
      .catch(error => {
        return error;
      });
  }
}

export default JobsApi;
