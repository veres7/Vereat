import React from "react";
import "./App.css";
import BusinessList from "../BusinessList/BusinessList";
import SearchBar from "../SearchBar/SearchBar";
import Yelp from "../../util/Yelp";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      businesses: [],
      loading: "",
      inputError: false,
    };
    this.searchYelp = this.searchYelp.bind(this);
    this.inputVal = this.inputVal.bind(this);
  }

  searchYelp(term, location, sortBy) {
    this.setState(
      {
        loading: true,
      },
      () => {
        this.setState({
          inputError: false,
        });
        let element = document.querySelector(".BusinessList");
        element.scrollIntoView();
        Yelp.search(term, location, sortBy).then((businesses) => {
          this.setState({ businesses: businesses, loading: false });
        });
      }
    );
  }
  inputVal(term, location) {
    if (!term || !location) {
      this.setState({
        inputError: true,
      });
    }
  }
  render() {
    return (
      <div className="App">
        <h1>
          <a href=".">Vereat</a>
        </h1>
        <SearchBar
          inputVal={this.inputVal}
          searchYelp={this.searchYelp}
          inputError={this.state.inputError}
        />
        <BusinessList
          loading={this.state.loading}
          businesses={this.state.businesses}
        />
      </div>
    );
  }
}

export default App;
