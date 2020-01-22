import React from 'react';
import { getJobById } from '../services/jobs';
import { updateJob } from '../services/jobs';

class Edit extends React.Component {
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
            const job = await getJobById(this.props.id);
            this.setState({ job, isLoading: false });
        } catch (error) {
            this.setState({ error });
        }
     }

     handleOverview() {
        this.props.changeView('overview');
    }


     async handleUpdateJob() {
        const { job } = this.state;
        await updateJob(job);
        this.props.changeView('details', {id: this.props.id});
    }

    handleChange(field, event) {
        const { job } = this.state;
        job[field] = event.target.value;
        this.setState({ job });
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
                    <p>Loading jobs...</p>
                </div>
            );
        }

        return (
            <div>
                <h3>Edit job</h3>
                <form className="job-form">
                    <label htmlFor="title">
                        Title
                        <input 
                        value={job.title} onChange={this.handleChange.bind(this, 'title')} 
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
                        Company
                        <input 
                        value={job.company} 
                        onChange={this.handleChange.bind(this, 'company')} 
                        type="text" 
                        name="company"/>
                    </label>
                    <label htmlFor="homepage">
                        Homepage
                        <input 
                        value={job.homepage} 
                        onChange={this.handleChange.bind(this, 'homepage')} 
                        type="text" 
                        name="homepage"/>
                    </label>
                </form>
                <button onClick={this.handleUpdateJob.bind(this)} className="save-job">SAVE CHANGES</button>
                <button onClick={this.handleOverview.bind(this)} className="cancel-job">CANCEL</button>
            </div>
        )
     }


}

export default Edit;