import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar(){
    return(
        
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
  <div className="container-fluid">
    <a className="navbar-brand" href="/">Form</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item active">
          <NavLink className="nav-link" aria-current="page" exact to="/">Home</NavLink>
        </li>
      
        <li className="nav-item">
          <NavLink className="nav-link " aria-current="page" exact to="/about">About</NavLink>
        </li>

        <li className="nav-item">
          <NavLink className="nav-link" aria-current="page" exact to="/contact">Contact</NavLink>
        </li>
     
      </ul>
    </div>
    <Link className="btn btn-outline-light border shadow" to="/addform">Add Form</Link>
  </div>
</nav>
        
    )
}