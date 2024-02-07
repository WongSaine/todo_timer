import React from 'react';

import './index.css';
import NewTaskForm from 'components/NewTaskForm';
import Footer from 'components/Footer';
import TaskList from 'components/TaskList';
import { subscribe, unsubscribe, startPulse } from 'utils/pulse';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      filter: 'All',
      timer: true,
    };
    this.ref = React.createRef();
  }

  componentDidMount() {
    this.ref.current = 1;
  }

  addTodo = (value, minutes, seconds) => {
    const newTodo = {
      id: window.crypto.randomUUID(),
      subscribed: true,
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
    this.setState((state) => ({
      todos: state.todos.filter((todo) => !todo.completed),
    }));
  };

  startTimer = (id) => {
    const { timer } = this.state;
    if (!timer) {
      this.setState({ timer: true });
      this.ref.current = setInterval(() => {
        this.setState(prevState => {
          const itemIdx = prevState.todos.findIndex((todo) => todo.id === id);
          const oldItem = prevState.todos[itemIdx];
          let newItem = {
            ...oldItem, 
            seconds: oldItem.seconds - 1
          };
          if (newItem.seconds < 0) {
            newItem = {
             ...newItem,
             minutes: newItem.minutes - 1,
             seconds: 59  
            };
          }
          if (newItem.seconds === 0 && newItem.minutes === 0) {
            clearInterval(this.ref.current);
            setIsTimerOn(false);
          }
          const updatedData = [
            ...prevState.todos.slice(0, itemIdx),
            newItem,
            ...prevState.todos.slice(itemIdx + 1) 
           ];
           return {
            todos: updatedData  
          }
        });
      }, 1000);
    }
  };

  pauseTimer = () => {
    clearInterval(this.ref.current);
    this.setState({ timer: false });
  };
  
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
            startTimer={(id) => this.startTimer(id)}
            pauseTimer={() => this.pauseTimer()}
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
