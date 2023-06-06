import React from "react";
import "./SlideNav.css";
import { Link ,useNavigate } from "react-router-dom";

// import Button from "react-st-modal/build/components/UI/Button/Button";

const SlideNav = () => {
  let history= useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    history('/login');
  }
  // const [state, setState] = useState(false);
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <Link className="navbar-brand" style={{ color: "red" }} to="/">
          <h4>

            CuboTimer
          </h4>
        </Link>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/" style={{ color: "#c70b0b" }}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={localStorage.getItem('token') ?  "/timer" : "/login"} style={{ color: "#c70b0b" }}>
                Timer
              </Link>
            </li>
          </ul>
        </div>
        {!localStorage.getItem('token') ? <form className="d-flex">
          <Link className="btn btn-outline-danger mx-2" role="button" to="/login">Login</Link>
          <Link className="btn btn-outline-danger mx-2" role="button" to="/signup">Signup</Link>
        </form> :  <button onClick={handleLogout} className="btn btn-primary">Logout</button>}
      </div>
    </nav>

  );
};

export default SlideNav;
