import React, {Component} from "react";
import arrow from "./whiteArrow.png";
import searchIcon from "./icon-search-grey.png";
import {Link} from "react-router-dom";
// import {Link} from "react-router-dom";
import "./header.css";
// import NavDrop from "./NavDrop";

// var clicked = false;


export default class Header extends Component{
    constructor(){
        super();
        this.state = {
            clicked: false
        }
        this.click = this.click.bind(this)
    }

    click(){
        this.setState({
            clicked: !this.state.clicked
        })
    }

    render(){
        return (
            <div className="headerContainer">
                {this.state.clicked === false 
                ?
                <div className="headerNotNav">
                    <img alt="nav arrow" className="arrow" src={arrow} onClick={this.click}/>
                    <h1>GBBG</h1>
                    <div></div>
                    {/* <Link className="search" to={{pathname: "/search"}}><img alt="search button" src={searchIcon}/></Link> */}
                </div>
                :
                <div className="headerNav">
                    {/* <NavDrop /> */}
                    <h1 className="link" onClick={this.click}>X</h1>
                    <Link className="link" to={{pathname: "/"}} onClick={this.click}>HOME</Link>
                    <Link className="link" to={{pathname: "/about"}} onClick={this.click}>ABOUT</Link>
                    <Link className="link" to={{pathname: "/meetings"}} onClick={this.click}>MEETINGS</Link>
                    <Link className="link" to={{pathname: "/contact"}} onClick={this.click}>CONTACT</Link>
                    <Link className="link" to={{pathname: "/membership"}} onClick={this.click}>MEMBERSHIP</Link>
                </div>
                }
            </div>
        )
    }

    // {console.log(clicked)}
}