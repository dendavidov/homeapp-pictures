import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { withJob } from 'react-jobs';

import LoadingComponent from '../../../components/common/loading-component/LoadingComponent';
import ErrorComponent from '../../../components/common/error-component/ErrorComponent';

import { fetchTodos } from '../../../redux/todos';

import DataStatusProcessor from '../../common/data-status-processor/DataStatusProcessor';

import styles from './Todos.styl';

class Todos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  get renderedTodos() {
    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th>#</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {this.props.todos.data.map(({ title, id }, index) => (
            <tr key={id}>
              <th>{index + 1}</th>
              <td>{title}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  render() {
    return (
      <div className={styles.root}>
        <h1>ToDo list</h1>
        <DataStatusProcessor
          data={this.props.todos}
          content={this.renderedTodos}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  todos: state.todos.list,
});

const mapActionsToProps = dispatch =>
  bindActionCreators(
    {
      fetchTodos,
    },
    dispatch
  );

Todos.propTypes = {
  todos: PropTypes.shape().isRequired,
};

export default compose(
  connect(mapStateToProps, mapActionsToProps),
  withJob({
    work: props => props.fetchTodos(),
    LoadingComponent,
    ErrorComponent,
    // serverMode: 'defer',
  })
)(Todos);
