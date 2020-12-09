import React from "react";
import "./BusinessList.css";
import Business from "../Business/Business";
import BusinessSkeleton from "./BusinessSkeleton";
import toTop from "./toTop.png";
class BusinessList extends React.Component {
  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
  }
  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll() {
    window.onscroll = function () {
      let pageOffset =
        document.documentElement.scrollTop || document.body.scrollTop;
      let toTopButton = document.querySelector(".toTop");
      if (pageOffset >= 900 && document.querySelector(".toTop")) {
        toTopButton.style.opacity = "1";
        toTopButton.style.visibility = "visible";
      } else if (document.querySelector(".toTop")) {
        toTopButton.style.opacity = "0";
        toTopButton.style.visibility = "hidden";
      }
    };
  }
  render() {
    if (this.props.loading === false && this.props.businesses) {
      return (
        <div className="BusinessList">
          {this.props.businesses.map((business) => {
            return <Business key={business.id} business={business} />;
          })}
          <footer>Built with Yelp API</footer>

          <button
            onClick={() => {
              document.body.scrollTop = 0;
              document.documentElement.scrollTop = 0;
            }}
            className="toTop"
          >
            <div>
              <img src={toTop} alt="To Top" />
            </div>
          </button>
        </div>
      );
    } else if (this.props.loading) {
      return (
        <div className="BusinessList">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
            <BusinessSkeleton key={index} />
          ))}
        </div>
      );
    } else if (this.props.loading === false && !this.props.business) {
      return (
        <div className="BusinessList">
          <div className="void">
            <div className="voidImg" />
            <p>
              No places found{" "}
              <span role="img" aria-labelledby="Surprise">
                😯
              </span>
            </p>
          </div>
        </div>
      );
    } else return null;
  }
}
export default BusinessList;
