import * as React from 'react';

class ErrorButton extends React.Component {
  state = {
    throwError: false,
  };

  handleClick = () => {
    this.setState({ throwError: true });
  };

  render() {
    if (this.state.throwError) {
      throw new Error('Throw ErrorBoundary!');
    }

    return <button onClick={this.handleClick}>ErrorBoundary</button>;
  }
}

export default ErrorButton;
