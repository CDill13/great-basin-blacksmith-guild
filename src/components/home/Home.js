import React from "react";
import "./home.css";
import gbbgCollaborate from "./gbbgCollaborate.jpg";
import gbbgLearn from "./gbbgLearn.jpg";
import gbbgHaveFun from "./gbbgHaveFun.jpg";
import {Link} from "react-router-dom";

export default function Home(){
    return (
        <div className="home1Div">
            <div className="homeTitleContainer" >
                <br/>
                <br/>
                <h1>GREAT</h1>
                <h1>BASIN</h1>
                <h1>BLACKSMITH</h1>
                <h1>GUILD</h1>
                <br/>
            </div>
            <div className="marqueeBorder"><marquee>LATEST GBBG NEWS</marquee></div>
            <div className="homeText">
                <h1>JULY MEETINGS</h1>
                <h1>THERE WILL BE TWO MEETINGS IN JULY</h1>
                <h2>HISTORICAL DEMONSTRATIONS WITH MICHEAL MENDENHALL</h2>
                <h2>MONDAY JULY 2ND  5:00 PM -8:00 PM AT SCERA PARK AT 600 SOUTH STATE STREET OREM UTAH.</h2>
                <h3>ENTER THE COLONIAL FESTIVAL AND ASK FOR THE BLACKSMITH SHOP.</h3>
                <h4>MICHEAL MENDENHALL WILL BE HOSTING AT HIS 18TH CENTURY HISTORICAL FORGE TENT. THIS WILL BE IN CONJUNCTION WITH THE COLONIAL HERITAGE FESTIVAL THAT IS HELD AT THE PARK AS PART OF THE JULY 4TH CELEBRATIONS. THE COLONIAL FESTIVAL IS A FREE EVENT WITH ACTIVITIES FOR THE WHOLE FAMILY.</h4>
                <h4>MICHEAL IS THE PROPRIETOR OF FIGHTING QUAKER FORGE AND WILL BE DISCUSSING TECHNIQUES ON HOW TO DO PERIOD HISTORICAL DEMONSTRATIONS AND HOW TO SUCCESSFULLY RUN A BUSINESS AS A DEMONSTRATOR. COME AND SEE HIS HISTORICAL FORGE COMPLETE WITH AN ORIGINAL DOUBLE ACTION BELLOWS. HE IS IN THE PROCESS OF RESTORING AN OLD BELLOWS AND WILL ALSO HAVE A DISCUSSION ON HOW TO MAKE AN HISTORIC BELLOWS WITH POSSIBLE DIMENSIONS AND PLANS.</h4>
                <h2>PILLOW FORGING WITH NEIL DAVIS.</h2>
                <h2>SATURDAY JULY 21ST 9:00 AM, 7212 WEST 900 SOUTH, OGDEN UTAH</h2>
                <h3>TAKE THE OGDEN 12TH STREET EXIT AND GO WEST ABOUT 7 MILES.</h3>
                <h4>NEIL DAVIS WILL BE DEMONSTRATING INFLATING HOLLOW FORMS WITH COMPRESSED AIR TO ACHIEVE THREE-DIMENSIONAL RELIEF OBJECTS. THESE OBJECTS CAN BE USED ON ITEMS LIKE A WEATHER VANE.</h4>
                <h4>THIS INFLATION FORGING TECHNIQUE WAS DEVELOPED BY BLACKSMITH ELIZABETH BRIM IN MAKING IRON PILLOWS. SEARCH YOUTUBE FOR “ELIZABETH BRIM STEEL INFLATION DEMO”</h4>
                <h4>NEIL WILL BE PROVIDING LUNCH. $5 FEE.</h4>
                <iframe title="Pillow Forging" width="300" height="190" src="https://www.youtube.com/embed/mZKdXuGfjMI" frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
                <p>Checkout the Meeting Page for all upcoming meetings and information</p>
                <p>Hope to see you all there! </p>
            </div>
            <div className="homeThreeImages">
                <div>
                    <img alt="collaborate" src={gbbgCollaborate}/>
                    <p>COLLABORATE</p>
                </div>
                <div>
                    <img alt="learn" src={gbbgLearn}/>
                    <p>LEARN</p>
                </div>
                <div>
                    <img alt="have fun" src={gbbgHaveFun}/>
                    <p>HAVE FUN</p>
                </div>
            </div>
            <br/>
            <br/>            <p>The Great Basin Blacksmith Guild is a blacksmithing group for those in Utah and surrounding states that are interested in learning more about the craft of blacksmithing. Meetings are held every other month of the year in various locations throughout Utah. We welcome new and experienced smiths to our group.</p>
            <br/>
            <br/>
            <div className="quoteContainer">
                <div className="opaqueLayer">
                    {/* <div className="notOpaque"> */}
                        <p>GBBG</p>
                        <h1>The Future Belongs To The Few Of Us Still Willing To Get Our Hands Dirty</h1>
                        {/* <p>&nbsp;</p> */}
                    {/* </div> */}
                </div>
            </div>
            <center className="homeLinks">
                <Link className="link" to={{pathname: "/"}} ><p>HOME</p></Link>
                <Link className="link" to={{pathname: "/about"}} ><p>ABOUT</p></Link>
                <Link className="link" to={{pathname: "/meetings"}} ><p>MEETINGS</p></Link>
            </center>
        </div>
    )
}