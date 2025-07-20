import './App.css';
import { Component, type ReactNode } from 'react';
import Controls from './components/Controls';
import Results from './components/Results';
import type I_PokemonData from './interfaces/I_PokemonData';

class App extends Component<I_PokemonData | null> {
  state = {
    responseData: null,
  };

  updateResponseData = (data: object) => {
    this.setState({ responseData: data });
  };

  render(): ReactNode {
    return (
      <>
        <Controls onSearchResponse={this.updateResponseData} />
        {this.state.responseData && (
          <Results fetchedData={this.state.responseData} />
        )}
      </>
    );
  }
}

export default App;
