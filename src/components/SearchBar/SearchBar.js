import React from "react";
import "./SearchBar.css";
import Maps from "../../util/Maps";
class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: "",
      location: "",
      sortBy: "best_match",
      locationLoading: false,
      locLoading: "",
    };

    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.getCity = this.getCity.bind(this);
  }
  sortByOptions = {
    "Best Match": "best_match",
    "Highest Rated": "rating",
    "Most Reviewed": "review_count",
  };
  getSortByClass(sortByOption) {
    if (this.state.sortBy === sortByOption) {
      return "active";
    }
    return "";
  }
  startLocLoading() {
    var input = document.querySelector(".SearchBar-fields").children[1]
      .children[0];
    input.placeholder = "";
    var loading = window.setInterval(function () {
      if (input.value.length > 3) input.value = "";
      else input.value += ".";
    }, 100);
    this.setState({ locLoading: loading });
  }
  stopLocLoading() {
    clearInterval(this.state.locLoading);
  }
  getCity() {
    this.setState(
      {
        locationLoading: true,
      },
      () => {
        this.startLocLoading();
        Maps.getLocation((data) => {
          this.setState(
            {
              location: data.city + ", " + data.state + ", " + data.country,
              locationLoading: false,
            },
            function () {
              this.stopLocLoading();
            }
          );
        });
      }
    );
  }
  handleSortByChange(sortbyOption) {
    this.setState(
      {
        sortBy: sortbyOption,
      },
      () => {
        this.handleSearch();
      }
    );
  }
  handleTermChange(event) {
    this.setState({
      term: event.target.value,
    });
  }
  handleLocationChange(event) {
    this.setState({
      location: event.target.value,
    });
  }
  handleEnter(e) {
    if (e.key === "Enter") {
      this.handleSearch();
    }
  }
  handleSearch() {
    document.querySelector(".SearchBar-fields").children[1].blur();
    if (this.state.term && this.state.location) {
      this.props.searchYelp(
        this.state.term,
        this.state.location,
        this.state.sortBy
      );
    } else {
      this.props.inputVal(this.state.term, this.state.location);
    }
  }
  handleSubmit(event) {
    this.handleSearch();
    event.preventDefault();
  }
  renderSortByOptions() {
    return Object.keys(this.sortByOptions).map((sortByOption) => {
      let sortByOptionValue = this.sortByOptions[sortByOption];
      return (
        <li
          onClick={this.handleSortByChange.bind(this, sortByOptionValue)}
          className={this.getSortByClass(sortByOptionValue)}
          key={sortByOptionValue}
        >
          {sortByOption}
        </li>
      );
    });
  }
  shortCutFun(type) {
    var inputs = document.getElementsByClassName("SearchBar-inputs")[0];
    inputs.firstChild.value = type;
    this.setState({
      term: type,
    });
    inputs.lastChild.focus();
  }
  render() {
    return (
      <div className="SearchBar">
        <div className="SearchWrapper">
          <div className="SearchBar-sort-options">
            <ul>{this.renderSortByOptions()}</ul>
          </div>
          <div className="SearchBar-fields">
            <div className="SearchBar-inputs">
              <input
                onKeyDown={this.handleEnter}
                onChange={this.handleTermChange}
                autoFocus={true}
                placeholder="e.g. Restaurant, Ice cream"
              />
            </div>

            <div>
              <input
                onKeyDown={this.handleEnter}
                onChange={this.handleLocationChange}
                value={this.state.location}
                placeholder="Where?"
              />
              <button className="locButton" onClick={this.getCity}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
                  <g transform="matrix(3.77953 0 0 3.77953 -1053.26 -73.171)">
                    <path
                      fill="#ff4b3d"
                      d="m 282.64392,19.889062 a 2.6458333,2.6458333 0 0 0 -2.6459,2.6459 c 0,1.9288 1.8997,4.2333 2.6459,4.2333 0.7461,0 2.6458,-2.3045 2.6458,-4.2333 a 2.6458333,2.6458333 0 0 0 -2.6458,-2.6459 z"
                    />
                    <path
                      fill="#fff"
                      d="m 281.32102,22.534962 a 1.3229167,1.3229167 0 1 1 1.3229,1.3229 1.3229167,1.3229167 0 0 1 -1.3229,-1.3229 z"
                    />
                  </g>
                </svg>
              </button>
            </div>
          </div>
          <div>
            <ul className="shortCuts">
              <li>
                <a href="#!" onClick={() => this.shortCutFun("Restaurant")}>
                  <span role="img" aria-label="Dishes">
                    🍽
                  </span>
                  Restaurant
                </a>
              </li>
              <li>
                <a href="#!" onClick={() => this.shortCutFun("Cafe")}>
                  <span role="img" aria-label="Coffee">
                    ☕
                  </span>
                  Cafe
                </a>
              </li>
              <li>
                <a href="#!" onClick={() => this.shortCutFun("Bar")}>
                  <span role="img" aria-label="Beer">
                    🍻
                  </span>
                  Bar
                </a>
              </li>
              <li>
                <a href="#!" onClick={() => this.shortCutFun("Fast Food")}>
                  <span role="img" aria-label="Taco">
                    🌮
                  </span>
                  Fast Food
                </a>
              </li>
            </ul>
          </div>
          <div className="SearchBar-submit">
            <a href="#!" onClick={this.handleSubmit}>
              Search
            </a>
          </div>
          <br></br>
          {this.props.inputError ? (
            <div>
              <h2 className="error">Please enter info.</h2>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}
export default SearchBar;
