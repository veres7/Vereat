import React from "react";
import "./Business.css";
class Business extends React.Component {
  render() {
    let addresEncoded = encodeURIComponent(this.props.business.name + " " + this.props.business.address + " " + this.props.business.city);
    let gMaps = `https://www.google.com/maps/search/?api=1&query=${addresEncoded}`;
    let telhref = "tel:" + this.props.business.phoneNumber;
    return (
      <div className="Business">
        <div className="image-container">
          <img src={this.props.business.imageSrc} alt="" />
        </div>
          <h2>{this.props.business.name}</h2><br></br>
        <div className="Business-information">
          <div className="Business-address">
            <a href={gMaps} target="_blank" rel="noopener noreferrer">
              <p>{this.props.business.address}</p>
              <p>{this.props.business.city}</p>
              <p>
                {`${this.props.business.state} ${this.props.business.zipCode}`}
              </p>
            </a>
          </div>
          <div className="Business-reviews">
            <h3>{this.props.business.category}</h3>
            <h3 className="rating">{this.props.business.rating}</h3>
            <p>{`Reviews: ${this.props.business.reviewCount}`}</p>
          </div>
        </div>
        
          <div className="Business-phone">
          { this.props.business.phoneNumber 
            ? <p><a href={telhref}>Call Now {this.props.business.phoneNumber}</a></p>
            : <p>Number unavailable</p>
          }
          </div>
      </div>
    );
  }
}
export default Business;
