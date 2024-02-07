import React, { Component } from 'react';

import '../index.css';
import PropTypes from 'prop-types'
import { subscribe, unsubscribe } from 'utils/pulse';

export default class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minutes: props.minutes,
      seconds: props.seconds,
      styles: 'icon icon-pause',
    };
  }

  componentDidMount() {
    subscribe(this.props.tickCallback);
  }

  componentWillUnmount() {
    unsubscribe(this.props.tickCallback);
  }

  tickCallback = () => {
    const { minutes, seconds } = this.state;
    if (seconds <= 0) {
      this.setState({
        minutes: minutes - 1,
        seconds: 59,
      });
    }
    else this.setState((prevState) => ({
      seconds: prevState.seconds - 1
    }));
  };

  onPlayback = () => {
    this.setState((prevState) => {
      if (prevState.styles === 'icon icon-pause') {
        unsubscribe(this.tickCallback);
        return {
          styles: 'icon icon-play',
        };
      }
      subscribe(this.tickCallback);
      return {
        styles: 'icon icon-pause',
      };
    });
  };

  render() {
    const { minutes, seconds, styles } = this.props;
    return (
      <span className="description">
        <button className={styles} onClick={this.onPlayback} />
        {'\t'}{minutes}:{seconds}
      </span>
    );
  }
}
// import React, { Component } from 'react';

// import '../index.css';

// export default class Timer extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       minutes: props.minutes,
//       seconds: props.seconds,
//       styles: 'icon icon-pause',
//     };
//   }
//   rootRef = React.createRef();

//   componentDidMount() {
//     const root = this.rootRef.current;
//     root.animate(
//       [
//         { transform: 'scale(1)', opacity: 1, offset: 0 },
//         { transform: 'scale(2)', opacity: 0, offset: 0.5 },
//         { transform: 'scale(1)', opacity: 1, offset: 1 },
//       ],
//       {
//         duration: 1000,
//         iterations: Infinity,
//       },
//     );

//     root.currentTime = this.state.seconds * 1000;

//     root.onfinish = () => {
//       this.setState(state => ({
//         seconds: state.seconds - 1
//       }), () => {
      
//         root.currentTime = this.state.seconds * 1000; 
      
//       });
//     };
//   }

//   componentDidUpdate(prevProps, prevState) {
//     if (prevState.seconds !== this.state.seconds) {
//       console.log(prevState);
//       console.log(this.state);
//       const root = this.rootRef.current;
//       root.currentTime = this.state.seconds * 1000;
//     } 
//   }

//   render() {
//     return (
//       <div ref={this.rootRef}>
//         <span>{this.state.seconds}</span>
//       </div>
//     );
//   }
// }
