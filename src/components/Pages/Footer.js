import React from "react";

import playstorelogo from "../../img/google-play-badge.png";
import appstorelogo from "../../img/Download_on_the_App_Store_Badge.svg";

const Footer = () => {
  return (
    <div className="footer " style={{ padding: "0px" }}>
      <div className="container">
        <div className="row">
          {/* footer list */}

          {/* end footer list */}
          {/* footer list */}

          {/* end footer list */}
          {/* footer copyright */}

          <div className="footer__copyright pb-3">
            <small>
              <a target="_blank" href="#">
                Dhruv Agarwal
              </a>
            </small>
            <ul>
              <li>
                <a href="#">Flixgo </a>
              </li>
            </ul>
          </div>

          {/* end footer copyright */}
        </div>
      </div>
    </div>
  );
};

export default Footer;
