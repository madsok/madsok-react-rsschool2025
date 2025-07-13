import { Component } from 'react';

class Controls extends Component<{ onSearchResponse: (data: object) => void }> {
  state = {
    searchValue: '',
  };

  async getData(request: string): Promise<object | null> {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${request}`
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        this.props.onSearchResponse(data);
        return data;
      } else {
        console.log(response.status);
        return null;
      }
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  handleSearchInput = (event: React.ChangeEvent) => {
    const target = event.target;

    if (target && target instanceof HTMLInputElement) {
      if (target.value) {
        this.setState({ searchValue: target.value });
      } else {
        this.setState({ searchValue: '' });
      }
    }
  };

  handleSearchButton = () => {
    if (this.state.searchValue || this.state.searchValue == '') {
      this.getData(this.state.searchValue);
    }
  };

  render() {
    return (
      <>
        <h2>Top controls</h2>
        <div className="controls-wrapper">
          <input
            className="search-field"
            type="text"
            onChange={this.handleSearchInput}
          />
          <button className="search-button" onClick={this.handleSearchButton}>
            Search Button
          </button>
        </div>
      </>
    );
  }
}

export default Controls;
