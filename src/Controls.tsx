import { Component } from 'react';
import spinner from './assets/Loading_icon.gif';
class Controls extends Component<{ onSearchResponse: (data: object) => void }> {
  state = {
    searchValue: '',
    isLoading: false,
  };

  async getData(request: string): Promise<object | null> {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${request}`
      );

      this.setState({ isLoading: true });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        this.props.onSearchResponse(data);
        this.setState({ isLoading: false });
        return data;
      } else {
        console.log(response.status);
        this.setState({ isLoading: false });
        return null;
      }
    } catch (err) {
      console.log(err);
      this.setState({ isLoading: false });
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
          {this.state.isLoading ? (
            <img src={spinner} alt="" />
          ) : (
            <button className="search-button" onClick={this.handleSearchButton}>
              Search Button
            </button>
          )}
        </div>
      </>
    );
  }
}

export default Controls;
