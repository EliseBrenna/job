import React from 'react';
import { getJobs } from '../services/jobs';

class Overview extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            jobs: [],
            isLoading: false,
            error: null,
        }
    }

    async componentDidMount() {
        try {
            this.setState({ isLoading: true });
            const jobs = await getJobs();
            this.setState({ jobs, isLoading: false });
        } catch (error) {
            this.setState({ error });
        }
    }


    handleJobClicked(jobId) {
        this.props.changeView('details', { id: jobId });
    }


    render() {
        const { jobs, isLoading, error } = this.state;
        console.log(jobs);

        if (error) {
            return (
                <div>
                    <p>Oops! Something went wrong!</p>
                    <pre>{error.message}</pre>
                    <button>Retry</button>
                </div>
            )
        };

        if (isLoading) {
            return (
                <div>
                    <p>Loading jobs ...</p>
                </div>
            )
        };

        const jobElements = jobs.map((job) => {
            return (
                <li onClick={this.handleJobClicked.bind(this, job.id)} 
                key={job.id}
                className="job"
                >
                    <p className="title">{job.title}</p>
                    <div className="createdAt">
                        <img className="calendarImg" src="calendar.png"/>
                        &nbsp;{new Date(job.createdAt).toLocaleDateString()}
                        __________________________________________________ 
                        <img className="suitcaseImg" src="suitcase.png"></img>
                        &nbsp;{job.company}
                    </div>
                    
                </li>
            )
        });

        return (
            <div>
                {jobs.length ? (
                    <ul className="jobs">{jobElements}</ul>
                ) : (
                    <p>No jobs available</p>
                )}
            </div>
        )
    }
}


export default Overview;