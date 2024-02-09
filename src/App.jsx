import React from 'react';

import './index.css';
import NewTaskForm from 'components/NewTaskForm';
import Footer from 'components/Footer';
import TaskList from 'components/TaskList';
import { callbacks, unsubscribe, startPulse } from 'utils/pulse';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      filter: 'All',
    };
  }

  componentDidMount() {
    startPulse();
  }

  addTodo = (value, minutes, seconds) => {
    const newTodo = {
      id: window.crypto.randomUUID(),
      task: value,
      minutes,
      seconds,
      completed: false,
      date: new Date(),
    };
    this.setState((state) => ({
      todos: [...state.todos, newTodo],
    }));
  };

  deleteTodo = (id) => {
    this.setState(({ todos }) => ({
      todos: todos.filter((todo) => todo.id !== id),
    }));
  };

  changeCheck = (id, event) => {
    this.setState(({ todos }) => ({
      todos: todos.map((todo) => {
        const result = { ...todo };
        if (id === todo.id) result.completed = event;
        return result;
      }),
    }));
  };

  editTodo = (id) => {
    this.setState(({ todos }) => ({
      todos: todos.map((todo) => (todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo)),
    }));
  };

  filteredItems = () => {
    const { todos, filter } = this.state;
    switch (filter) {
      case 'Active':
        return todos.filter((todo) => !todo.completed);
      case 'Completed':
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  };

  changeFilter = (data) => {
    this.setState({ filter: data });
  };

  clearCompleted = () => {
    this.state.todos.map((todo) => todo.completed ? unsubscribe(todo.id) : undefined);
    this.setState((state) => ({
      todos: state.todos.filter((todo) => !todo.completed),
    }));
  };

/**
   * @param {string} id
   * @returns {void}
   */
  tickCallback = () => {
    const { todos } = this.state;
    const result = todos.map((todo) => {
      if (callbacks.has(todo.id)) {
        if (todo.seconds <= 0) {
          return {
            ...todo,
            minutes: todo.minutes - 1,
            seconds: 59,
          };
        }
        return { ...todo, seconds: todo.seconds - 1, };
      }
      return todo;
    });
    this.setState({todos: result});
  }
  
  render() {
    const { todos, filter } = this.state;
    return (
      <>
        <NewTaskForm addTodo={this.addTodo} />
        <section className="main">
          <TaskList
            todos={this.filteredItems()}
            changeCheck={this.changeCheck}
            deleteTodo={this.deleteTodo}
            editTodo={this.editTodo}
            tickCallback={this.tickCallback}
          />
          <Footer
            clearCompleted={this.clearCompleted}
            changeFilter={this.changeFilter}
            filter={filter}
            lefts={todos.filter(({ completed }) => !completed).length}
          />
        </section>
      </>
    );
  }
}
