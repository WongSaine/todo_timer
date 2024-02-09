import React from 'react';
import '../index.css';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import PropTypes from 'prop-types';
import { subscribe, unsubscribe } from 'utils/pulse';

export default class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.todo.task,
      isEditing: false,
    };
  }

  onPlayback = () => {
    const { todo, tickCallback } = this.props;
    const { id } = todo;//!!!
    return tickCallback();
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
    const { id, completed, date, minutes, seconds } = todo;
    const { isEditing, value } = this.state;
    // subscribe(id, this.onPlayback);
    /* eslint-disable prettier/prettier */
    return !isEditing ? (
      <li className={(completed && 'completed') || (isEditing && 'editing') || null}>
        <div className="view">
          <input
            id={id}
            className="toggle"
            type="checkbox"
            onChange={(e) => changeCheck(id, e.target.checked)}
            checked={completed}
          />
          <label htmlFor={id} className="label">
            <span className="title">{value}</span>
            <span className="description">
              <button className="icon icon-play" onClick={() => subscribe(id, this.onPlayback)} />
              <button className="icon icon-pause" onClick={() => unsubscribe(id)} />
              {'\t'}{minutes}:{seconds}
            </span>
            <span className="description">
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
              this.setState(() => ({ isEditing: !isEditing, value: task }));
            }}
          />
          <button
            type="button"
            aria-label="destroy"
            className="icon icon-destroy"
            onClick={() => {
              unsubscribe(id);
              deleteTodo(id);
              }
            }/>
        </div>
      </li>
    ) : (
      <form onSubmit={this.submit.bind(this)}>
        <input
          value={value}
          onChange={(event) => {
            this.setState({
              value: event.target.value,
            });
          }}
          type="text"
          className="edit"
        />
      </form>
    );
    /* eslint-enable prettier/prettier */
  }
}

Task.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    task: PropTypes.string.isRequired,
    completed: PropTypes.bool,
    isEditing: PropTypes.bool,
    date: PropTypes.instanceOf(Date),
  }).isRequired,
  deleteTodo: PropTypes.func.isRequired,
  changeCheck: PropTypes.func.isRequired,
  editTodo: PropTypes.func.isRequired,
};
