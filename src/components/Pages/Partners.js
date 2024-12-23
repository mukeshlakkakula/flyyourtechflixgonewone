import React from "react";

import partner1 from "../../img/partners/themeforest-light-background.png";

import partner2 from "../../img/partners/audiojungle-light-background.png";

import partner3 from "../../img/partners/codecanyon-light-background.png";

import partner4 from "../../img/partners/photodune-light-background.png";

import partner5 from "../../img/partners/activeden-light-background.png";

import partner6 from "../../img/partners/3docean-light-background.png";

const Partners = () => {
  return (
    <div className="section">
      {" "}
      <div className="container">
        <div className="row">
          {/* section title */}
          <div className="col-12">
            <h2 className="section__title section__title--no-margin">
              Our Partners
            </h2>
          </div>
          {/* end section title */}
          {/* section text */}
          <div className="col-12">
            <p className="section__text section__text--last-with-margin">
              It is a long <b>established</b> fact that a reader will be
              distracted by the readable content of a page when looking at its
              layout. The point of using Lorem Ipsum is that it has a
              more-or-less normal distribution of letters, as opposed to using.
            </p>
          </div>
          {/* end section text */}
          {/* partner */}
          <div className="col-6 col-sm-4 col-md-3 col-lg-2">
            <a href="#" className="partner">
              <img src={partner1} alt="" className="partner__img" />
            </a>
          </div>
          {/* end partner */}
          {/* partner */}
          <div className="col-6 col-sm-4 col-md-3 col-lg-2">
            <a href="#" className="partner">
              <img src={partner2} alt="" className="partner__img" />
            </a>
          </div>
          {/* end partner */}
          {/* partner */}
          <div className="col-6 col-sm-4 col-md-3 col-lg-2">
            <a href="#" className="partner">
              <img src={partner3} alt="" className="partner__img" />
            </a>
          </div>
          {/* end partner */}
          {/* partner */}
          <div className="col-6 col-sm-4 col-md-3 col-lg-2">
            <a href="#" className="partner">
              <img src={partner4} alt="" className="partner__img" />
            </a>
          </div>
          {/* end partner */}
          {/* partner */}
          <div className="col-6 col-sm-4 col-md-3 col-lg-2">
            <a href="#" className="partner">
              <img src={partner5} alt="" className="partner__img" />
            </a>
          </div>
          {/* end partner */}
          {/* partner */}
          <div className="col-6 col-sm-4 col-md-3 col-lg-2">
            <a href="#" className="partner">
              <img src={partner6} alt="" className="partner__img" />
            </a>
          </div>
          {/* end partner */}
        </div>
      </div>
    </div>
  );
};

export default Partners;
