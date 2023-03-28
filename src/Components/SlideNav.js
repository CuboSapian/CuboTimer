import React from "react";
import "./SlideNav.css";
import { Link } from "react-router-dom";

const SlideNav = () => {
  // const [state, setState] = useState(false);
  return (
    <nav className="navbar navbar-expand-lg bck">
      <div className="container-fluid">
        <Link className="navbar-brand" style={{color: "red"}} to="/home">
          <h4>

          CuboTimer
          </h4>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/home" style={{color: "#c70b0b"}}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/timer" style={{color: "#c70b0b"}}>
                Timer
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

  );
};

export default SlideNav;
