import React from 'react';
import './App.css';

import Overview from './components/Overview';
import Details from './components/Details';
import AddJob from './components/AddJob';
import Edit from './components/Edit';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      view: '',
      params: {},
    }
  }


  handleChangeView(view = '', params = {}) {
    this.setState({ view, params });
  }

  handleAddJob() {
    this.handleChangeView('add-job');
  }

  handleBrowseJobs() {
    this.handleChangeView('browse-jobs');
  }

  render() {
    const { view, params } = this.state;

    let ActiveView;

    switch (view) {
      case 'details':
        ActiveView = Details;
        break;
      case 'add-job':
        ActiveView = AddJob;
        break;
      case 'edit':
        ActiveView = Edit;
        break;
      default:
        ActiveView = Overview;
    }

    return (
      <div>
        <h1 className="header">
          Job Board
          <p>Find your dream job or post an available position at your company!</p>
          <button onClick={this.handleAddJob.bind(this)} className="add-job">ADD JOB</button>
          <button onClick={this.handleBrowseJobs.bind(this)} className="browse-job">BROWSE JOB</button>
        </h1>
        <div className="main">
          <ActiveView
          {...params}
          changeView={this.handleChangeView.bind(this)}
          />
        </div>
      </div>
    )
  }
}

export default App;
