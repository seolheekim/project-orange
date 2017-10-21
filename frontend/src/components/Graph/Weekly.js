import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getWeekEntries } from '../../actions';
import demoGraph from '../../assets/graph.png';

class Weekly extends Component {
  constructor(props) {
    super(props);

    this.state = {
      entries: []
    };
  }

  componentWillMount() {
    this.props.getWeekEntries();
  }

  loadEntries() {
    if (Array.isArray(this.props.weekEntries.entries)) {
      return this.props.weekEntries.entries.map(entry => {
        return (
          <article
            key={entry.id}
            className="media"
            onClick={this.handleOpenTextClick.bind(this)}
            id={this.state.bool ? 'showText' : 'hiddenText'}
          >
            <div className="media-content">
              <div className="content">
                <p>
                  <small>{entry.createdAt}</small>
                  <br />
                  {entry.text}
                </p>
              </div>
            </div>
          </article>
        );
      });
    }
  }

  handleOpenTextClick(bool) {
    this.setState({ bool: !this.state.bool });
  }

  render() {
    // this.props.weekEntries.entries - all entries for the week
    // this.props.weekEntries.keywordSummary -  top five keywords for the week
    return (
      <div className="container is-mobile" id="mainBox">
        <img src={demoGraph} alt="demo graph" />
        {this.loadEntries()}
      </div>
    );
  }
}

const mapStatetoProps = state => {
  return { weekEntries: state.weekEntries };
};

const mapDispatchtoProps = dispatch => {
  return {
    getWeekEntries: () => {
      dispatch(getWeekEntries());
    }
  };
};

const ConnectedWeekly = connect(mapStatetoProps, mapDispatchtoProps)(Weekly);

export default ConnectedWeekly;
