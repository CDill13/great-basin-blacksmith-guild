import React, {Component} from "react";
import facebookIcon from "./facebook.jpg";
import "./footer.css";
import {withRouter} from "react-router";

class Footer extends Component{
    constructor(props){
        super(props);
        this.state = {
            isHome: props.match.isExact
        }
    }

    componentWillReceiveProps(nextProps){
        console.log(nextProps.match.isExact)
        this.setState({
            isHome: nextProps.match.isExact
        })
    }

    render(){
        return (
            //May need to convert to class component and use a lifecycle method to force a rerender
            <div className="footerContainer">
            {/* {console.log("props:",props.match.path, typeof props.match.path)} */}
                <div className="footerContentContainer">
                    <br/>
                    <br/>
                    <p>Hope To See You Soon!</p>
                    <br/>
                    <br/>
                    <a href="https://www.facebook.com/groups/393686534311373/" rel="noopener noreferrer" target="_blank"><img alt="link to GBBG facebook page" src={facebookIcon} /></a>
                </div>
                <br/>
                <br/>
                <br/>
                {this.state.isHome ? <p className="footerContentContainer">Photo used under Creative Commons from <a href="http://www.flickr.com/photos/39415781@N06/35805091376">Elliot Brown</a></p> : <p></p>}
            </div>
        )
    }
}
export default withRouter(Footer);