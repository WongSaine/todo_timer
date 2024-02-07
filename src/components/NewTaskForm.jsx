import React from 'react';
import '../index.css';
import PropTypes from 'prop-types';

export default class NewTaskForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      minutes: '',
      seconds: '',
    };
  }

  handleSubmit = (event) => {
    const { addTodo } = this.props;
    const { value, minutes, seconds } = this.state;
    event.preventDefault();
    addTodo(value, minutes, seconds);
    this.setState({
      value: '',
      minutes: '',
      seconds: '',
    });
  };

  onInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'task') {
      this.setState({
        value: value.trim(),
      });
    } else if (name === 'minutes') {
      this.setState({
        minutes: Number(value),
      });
    } else if (name === 'seconds') {
      this.setState({
        seconds: Number(value),
      });
    }
  };

  render() {
    const { value, minutes, seconds } = this.state;
    return (
      /* eslint-disable prettier/prettier */
      <header className="header">
        <h1>Todos</h1>
        <form
          id="form"
          className="new-todo-form"
          onSubmit={this.handleSubmit}
        >
          <input
            name="task"
            type="text"
            form="form"
            className="new-todo"
            value={value}
            placeholder="Task"
            onChange={this.onInputChange}
            required
          />
          <input
            name="minutes"
            type="number"
            min={0}
            form="form"
            className="new-todo-form__timer"
            value={minutes}
            placeholder="Min"
            onChange={this.onInputChange}
            required
          />
          <input
            name="seconds"
            type="number"
            min={1}
            max={59}
            form="form"
            className="new-todo-form__timer"
            value={seconds}
            placeholder="Sec"
            onChange={this.onInputChange}
            required
          />
          <button
            type="submit"
            aria-label="Add new todo"
          />
        </form>
      </header>
      /* eslint-enable prettier/prettier */
    );
  }
}

NewTaskForm.propTypes = {
  addTodo: PropTypes.func.isRequired,
};
