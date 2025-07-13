import './App.css';
import { Component, type ReactNode } from 'react';
import Controls from './Controls';
import Results from './Results';

class App extends Component {
  state = {
    responseData: null,
  };

  updateResponseData = (data: object) => {
    this.setState({ responseData: data });
  }

  render(): ReactNode {
    return (
      <>
        <Controls onSearchResponse={this.updateResponseData} />
        <Results fetchedData={this.state.responseData ? this.state.responseData : {}}></Results>
      </>
    );
  }
}

export default App;
