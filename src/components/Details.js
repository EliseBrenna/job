import React from 'react';
import { getJobById, deleteJobById } from '../services/jobs';

class Details extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            job: {},
            isLoading: false,
            error: null,
        }
    }

    async componentDidMount() {
        try {
            this.setState({ isLoading: true });
            const { id } = this.props;
            const selectedJob = await getJobById(id);
            this.setState({ job: selectedJob, isLoading: false });
        } catch (error) {
            this.setState({ error });
        }
    }

    async handleDeleteJob(jobId) {
        await deleteJobById(jobId);
        this.props.changeView('overview')
     }

     handleEditJob(id) {
        this.props.changeView('edit', id);
    }


    render() {
        const { job, isLoading, error } = this.state;

        if (error) {
            return (
                <div>
                    <p>Oops! Something went wrong!</p>
                    <pre>{error.message}</pre>
                    <button>Retry</button>
                </div>
            );
        }

        if (isLoading) {
            return (
                <div>
                    <p>Loading books...</p>
                </div>
            );
        }

        return (
            <div>
                <form className="details">
                    <div className="detailsTitle">{job.title}</div>
                    <p className="detailsInfo">
                    <img className="suitcaseImg" src="suitcase.png"></img>
                    &nbsp;{job.company}
                    <br/>
                    <img className="webpageImg" src="webpage.png"></img>
                    &nbsp;<a href="">{job.homepage}</a>
                    <br/>
                    <img className="envelopeImg" src="envelope.png"></img>
                    &nbsp;{job.email}
                    </p>
                    <p className="detailsSummary">
                    {job.description}
                    </p>
                    <p className="detailsDate">
                    <img className="calendarImg" src="calendar.png"/>
                    &nbsp;Posted on {new Date(job.createdAt).toLocaleDateString()}
                    </p>
                </form>
                <button onClick={this.handleDeleteJob.bind(this, job.id)} className="delete-job">DELETE</button>
                <button onClick={this.handleEditJob.bind(this, {id: this.props.id})} className="edit-job">EDIT</button>
            </div>
        )
    }
}

export default Details;