import React from 'react';
import { addJob } from '../services/jobs';

class AddJob extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            job: {},
            isLoading: false,
            error: null,
        }
    }

    handleChange(field, event) {
        const { job } = this.state;
        job[field] = event.target.value;
        this.setState({ job });
    }

    handleAddJob() {
        this.props.changeView('add.job');
    }

    handleBrowseJobs() {
        this.props.changeView('overview');
    }

    async handleNewJob() {
        const { job } = this.state;
        await addJob(job);
        this.props.changeView('overview');
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
            )
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
                <form className="job-form">
                    <label htmlFor="title">
                        Title
                        <input 
                        value={job.title} 
                        onChange={this.handleChange.bind(this, 'title')} 
                        type="text" 
                        name="title"/>
                    </label>
                    <label htmlFor="Description">
                        Description
                        <input 
                        value={job.description} 
                        onChange={this.handleChange.bind(this, 'description')} 
                        type="text" 
                        name="description"/>
                    </label>
                    <label htmlFor="email">
                        E-Mail
                        <input 
                        value={job.email} 
                        onChange={this.handleChange.bind(this, 'email')} 
                        type="text" 
                        name="email"/>
                    </label>
                    <label htmlFor="company">
                        Company (optional)
                        <input 
                        value={job.company} 
                        onChange={this.handleChange.bind(this, 'company')} 
                        type="text" 
                        name="company"/>
                    </label>
                    <label htmlFor="homepage">
                        Homepage (optional)
                        <input 
                        value={job.homepage} 
                        onChange={this.handleChange.bind(this, 'homepage')} 
                        type="text" 
                        name="homepage"/>
                    </label>
                </form>
                <button onClick={this.handleNewJob.bind(this)} className="save-job">SAVE</button>
            </div>
        )
        
    }
}

export default AddJob;