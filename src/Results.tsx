import { Component } from 'react';

type PokemonData = {
  name?: string;
  results?: object[];
  location_area_encounters?: string;
};

class Results extends Component<{ fetchedData: PokemonData }> {
  render() {
    return (
      <>
        <h2>Results</h2>
        <ul>
          {this.props.fetchedData.results ? (
            this.props.fetchedData.results.map(
              (item: { name?: string; url?: string }, index) => (
                <li key={index} className="pokemon-item">
                  <div>
                    <h3>Item name</h3>
                    <p>{item.name ?? ''}</p>
                  </div>
                  <div>
                    <h3>Item Description</h3>
                    <p>{item.url ?? ''}</p>
                  </div>
                </li>
              )
            )
          ) : (
            <li className="pokemon-item">
              <div>
                <h3>Item name</h3>
                <p>{this.props.fetchedData.name ?? ''}</p>
              </div>
              <div>
                <h3>Item Description</h3>
                <p>{this.props.fetchedData.location_area_encounters ?? ''}</p>
              </div>
            </li>
          )}
        </ul>
      </>
    );
  }
}

export default Results;
