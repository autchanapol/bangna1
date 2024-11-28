import React from "react";
import "./loader.scss";
import { Spinner } from "reactstrap";

const Loader = ({ message = "Loading, please wait..." }) => (
  <div className="fallback-spinner">
    <div className="loading">
      <Spinner color="primary" />
      <p>{message}</p>
    </div>
  </div>
);

export default Loader;
