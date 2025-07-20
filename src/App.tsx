import './App.css';
import { Component, type ReactNode } from 'react';
import Controls from './components/Controls';
import Results from './components/Results';

class App extends Component {
  state = {
    responseData: {},
  };

  updateResponseData = (data: object) => {
    this.setState({ responseData: data });
  };

  render(): ReactNode {
    return (
      <>
        <Controls onSearchResponse={this.updateResponseData} />
        <Results fetchedData={this.state.responseData}></Results>
      </>
    );
  }
}

export default App;
