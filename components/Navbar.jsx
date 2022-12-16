import React from "react";

export default function Navbar() {
    return (
        <nav className="navbar">
            <img className="logo" src="src/assets/logo.jpg"></img>
            <button className="navbar-library">
                The Library
            </button>
            <button className="navbar-funFact" >
                Fun Fact
            </button>
            <button className="navbar-about" >
                About
            </button>
        </nav>
    )
}
