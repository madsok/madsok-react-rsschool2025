import './App.css';
import { Component, type ReactNode } from 'react';
import Controls from './Controls';

class App extends Component {
  state = {
    responseData: null,
  };

  updateResponseData(data: object) {
    this.setState({ responseData: data });
  }

  render(): ReactNode {
    return (
      <>
        <Controls onSearchResponse={this.updateResponseData} />
      </>
    );
  }
}

export default App;
