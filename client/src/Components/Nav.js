import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div id="Nav">
      <Link to="/" class="navButt">
        <button type="button">Home</button>
      </Link>
      <Link to="/Main" class="navButt">
        <button type="button">Main</button>
      </Link>
      <Link to="/gaming" class="navButt">
        <button type="button">Gaming Room</button>
      </Link>
    </div>
  );
};

export default Nav;
