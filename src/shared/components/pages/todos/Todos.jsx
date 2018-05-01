import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchTodos } from '../../../redux/todos';

import styles from './Todos.styl';
import DataStatusProcessor from '../../common/data-status-processor/DataStatusProcessor';

class Todos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.fetchTodos();
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
  fetchTodos: PropTypes.func.isRequired,
  todos: PropTypes.shape().isRequired,
};

export default connect(mapStateToProps, mapActionsToProps)(Todos);
