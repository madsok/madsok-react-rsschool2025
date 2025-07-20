import './App.css';
import { Component, type ReactNode } from 'react';
import Controls from './components/Controls';
import Results from './components/Results';
import ErrorButton from './components/ErrorButton';

class App extends Component<object> {
  state = {
    responseData: null,
  };

  updateResponseData = (data: object) => {
    this.setState({ responseData: data });
  };

  render(): ReactNode {
    return (
      <>
        <ErrorButton />
        <Controls onSearchResponse={this.updateResponseData} />
        {this.state.responseData && (
          <Results fetchedData={this.state.responseData} />
        )}
      </>
    );
  }
}

export default App;
