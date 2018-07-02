import React from "react";
import "./contact.css"

export default function Contact(){
    return (
        <div className="contact1Div">
            <div className="contactTitleContainer">
                <h1>CONTACT GBBG</h1>
            </div>
            <h1>GUILD OFFICERS</h1>
            <div className="contactContentContainer">
                <div className="contact">
                  <div className="constactInfo">
                        <h2>PRESIDENT</h2>
                        <p>Mike Nauta</p>
                        <p>(818) 468-6967</p>
                        <a href="mailto:maike.nauto@gmail.com">Email the President</a>
                    </div>
                </div>
                <div className="contact">
                    <div className="constactInfo">
                        <h2>VISE PRESIDENT</h2>
                        <p>Kyle Fisher</p>
                        <p>(480) 686-6645</p>
                        <a href="mailto:jakebrake42@gmail.com">Email the Vise President</a>
                    </div>
                </div>
                <div className="contact">
                  <div className="constactInfo">
                        <h2>EDITOR</h2>
                        <p>Micheal Mendenhall</p>
                        <p>​(435) 764-7901</p>
                        <a href="mailto:fighting.quaker@yahoo.com">Email the Editor</a>
                    </div>
                </div>
                <div className="contact">
                    <div className="constactInfo">
                        <h2>LIBRARIAN</h2>
                        <p>Lonnie Jensen</p>
                        <p>​(435) 730-3511</p>
                        <a href="mailto:ldblacksmith1@yahoo.com">Email the Librarian</a>
                    </div>
                </div>
                <div className="contact">
                    <div className="constactInfo">
                        <h2>TREASURER</h2>
                        <p>Claudia Freshman</p>
                        <p>​&nbsp;</p>
                        <a href="mailto:claudia@freshmans.com">Email the Treasurer</a>
                    </div>
                </div>
            </div>
        </div>
    )
}