import React from 'react';
import '../index.css';
import PropTypes from 'prop-types';

export default class NewTaskForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }

  handleSubmit(event) {
    const { addTodo } = this.props;
    const { value } = this.state;
    event.preventDefault();
    const inputValue = value;
    if (value.trim()) {
      addTodo(inputValue);
      this.setState({
        value: '',
      });
    }
  }

  onInputChange(event) {
    this.setState({
      value: event.target.value,
    });
  }

  render() {
    const { value } = this.state;
    return (
      <form className="header" onSubmit={this.handleSubmit.bind(this)}>
        <h1>Todos</h1>
        <label htmlFor="task">
          <input
            name="task"
            type="text"
            className="new-todo"
            value={value}
            placeholder="What needs to be done?"
            onChange={this.onInputChange.bind(this)}
          />
        </label>
      </form>
    );
  }
}

NewTaskForm.propTypes = {
  addTodo: PropTypes.func.isRequired,
};
