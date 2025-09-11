import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Navbar = (props) => {
  return (
    <nav
      className={`navbar navbar-expand-lg ${
        props.modeGreen === "green"
          ? "navbar-dark bg-success" // greenish theme
          : props.mode === "dark"
          ? "navbar-dark bg-dark" // dark theme
          : "navbar-light bg-light" // light theme
      }`}
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          {props.title}
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
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/">
                {props.aboutText}
              </Link>
            </li>
          </ul>

        {/* Green Mode Toggle */}
<div
  className="form-check form-switch mx-2"
  style={{
    color:
      props.mode === "dark"
        ? "white" // visible in dark mode
        : props.modeGreen === "green"
        ? "white" // visible in green navbar
        : "black", // default for light mode
  }}
>
  <input className="form-check-input" onClick={props.toggleGreenMode} type="checkbox" role="switch" id="greenModeSwitch"
    checked={props.modeGreen === "green"}
    readOnly
  />
  <label className="form-check-label" htmlFor="greenModeSwitch">
    Enable Green Mode
  </label>
</div>


          {/* Dark Mode Toggle */}
          <div
            className={`form-check form-switch text-${
              props.mode === "light" ? "dark" : "light"
            }`}
          >
            <input
              className="form-check-input"
              onClick={props.toggleMode}
              type="checkbox"
              role="switch"
              id="darkModeSwitch"
              checked={props.mode === "dark"}
              readOnly
            />
            <label className="form-check-label" htmlFor="darkModeSwitch">
              Enable Dark Mode
            </label>
          </div>
        </div>
      </div>
    </nav>
  );
};

// Prop types validation
Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  aboutText: PropTypes.string.isRequired,
  mode: PropTypes.string.isRequired,
  modeGreen: PropTypes.string.isRequired,
  toggleMode: PropTypes.func.isRequired,
  toggleGreenMode: PropTypes.func.isRequired,
};

// Default props
Navbar.defaultProps = {
  title: "Set Title Here",
  aboutText: "About Text",
};

export default Navbar;
