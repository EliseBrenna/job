const API_URL = 'http://localhost:4444';

export function getJobs() {
    return fetch(`${API_URL}/jobs`)
    .then((response) => response.json());
  }
  
  export function getJobById(id) {
    return fetch(`${API_URL}/jobs/${id}`)
    .then((res) => res.json());
  }
  
  
  export function addJob(job) {
    return fetch(`${API_URL}/jobs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(job)
    })
    .then((res) => res.json());
  }
  
  export function updateJob(updatedJob) {
    return fetch(`${API_URL}/jobs/${updatedJob.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedJob)
    })
    .then((res) => res.json());
  }
  
  export function deleteJobById(id) {
    return fetch(`${API_URL}/jobs/${id}`, {
      method: 'DELETE',
    })
    .then((res) => res.json());
  }
