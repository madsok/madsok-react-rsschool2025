import { Component } from 'react';

type PokemonData = {
  name?: string;
};

class Results extends Component<{ fetchedData: PokemonData }> {
  render() {
    return (
      <>
        <h2>Results</h2>
        <ul>
          <li>
            <p>{this.props.fetchedData ? this.props.fetchedData.name : ''}</p>
            <p>{JSON.stringify(this.props.fetchedData)}</p>
          </li>
        </ul>
      </>
    );
  }
}

export default Results;
