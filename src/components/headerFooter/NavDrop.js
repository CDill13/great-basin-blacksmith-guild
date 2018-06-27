import React from "react";
import {Link} from "react-router-dom";
import "./header.css";

export default function NavDrop(){
    return (
        <div className="navdrop">
            {/* <b onClick={this.click}>X</b> */}
            <Link to={{pathname: "/"}}>HOME</Link>
            <Link to={{pathname: "/about"}}>ABOUT</Link>
            <Link to={{pathname: "/meetings"}}>MEETINGS</Link>
            <Link to={{pathname: "/contact"}}>CONTACT</Link>
            <Link to={{pathname: "/membership"}}>MEMBERSHIP</Link>
        </div>
    )
}