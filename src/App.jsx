import React from 'react';
import './index.css';
import NewTaskForm from './components/NewTaskForm';
import Footer from './components/Footer';
import TaskList from './components/TaskList';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      filter: 'All',
    };
  }

  addTodo = (todo) => {
    const newTodo = {
      id: window.crypto.randomUUID(),
      task: todo,
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
    this.setState((state) => ({
      todos: state.todos.filter((todo) => !todo.completed),
    }));
  };

  render() {
    const { todos, filter } = this.state;
    return (
      <>
        <NewTaskForm addTodo={this.addTodo} />
        <TaskList
          todos={this.filteredItems()}
          changeCheck={this.changeCheck}
          deleteTodo={this.deleteTodo}
          editTodo={this.editTodo}
        />
        <Footer
          clearCompleted={this.clearCompleted}
          changeFilter={this.changeFilter}
          filter={filter}
          lefts={todos.filter(({ completed }) => !completed).length}
        />
      </>
    );
  }
}
