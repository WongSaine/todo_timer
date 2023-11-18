import React from 'react';
import '../index.css';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import PropTypes from 'prop-types';

export default class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.todo.task,
      isEditing: false,
    };
  }

  submit(event) {
    const { value } = this.state;
    event.preventDefault();
    const {
      editTodo,
      todo: { id },
    } = this.props;
    editTodo(id, value);
    this.setState({ isEditing: false });
  }

  render() {
    const { deleteTodo, todo, changeCheck } = this.props;
    // eslint-disable-next-line object-curly-newline
    const { id, completed, date, task } = todo;
    const { isEditing, value } = this.state;
    return !isEditing ? (
      //!
      <li className={(completed && 'completed') || (isEditing && 'editing') || null}>
        <div className="view">
          <input
            id={id}
            className="toggle"
            type="checkbox"
            onChange={(e) => changeCheck(id, e.target.checked)}
            checked={completed}
          />
          <label htmlFor={id}>
            <span className="description">{value}</span>
            <span className="created">
              {` created ${formatDistanceToNow(date, {
                addSuffix: true,
                includeSeconds: true,
              })}`}
            </span>
          </label>
          <button
            type="button"
            aria-label="edit"
            className="icon icon-edit"
            onClick={() => {
              const text = task;
              this.setState(() => ({ isEditing: !isEditing, value: text })); //!
            }}
          />
          <button type="button" aria-label="destroy" className="icon icon-destroy" onClick={() => deleteTodo(id)} />
        </div>
      </li>
    ) : (
      <form onSubmit={this.submit.bind(this)}>
        <input
          value={value}
          onChange={(event) => {
            const text = event.target.value;
            this.setState({
              value: text,
            });
          }}
          type="text"
          className="edit"
        />
      </form>
    );
  }
}

Task.defaultProps = {
  todo: {},
};

Task.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.string,
    task: PropTypes.string,
    completed: PropTypes.bool,
    isEditing: PropTypes.bool,
    date: PropTypes.instanceOf(Date),
  }),
  deleteTodo: PropTypes.func.isRequired,
  changeCheck: PropTypes.func.isRequired,
  editTodo: PropTypes.func.isRequired,
};
