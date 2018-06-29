import React from "react";
// import {Link} from "react-router-dom";
import "./membership.css"

export default function Membership(){
    return (
        <div className="membership1Div">
            <div className="membershipTitleContainer">
                <h1>GBBG MEMBERSHIP</h1>
            </div>
            <div className="loginContainer">
                <h2>LOGIN OR CREATE AN ACCOUNT</h2>
                <div className="linksContainer">
                    <a className="blackButton" href={process.env.REACT_APP_LOGIN}>Login / Register</a>
                </div>
            </div>
            <div className="membershipTextContainer">
                <div>
                    <h2>GBBG MEMBERSHIP</h2>
                    <p>A GBBG membership will allow you to be part of the only blacksmith group in Utah. You will receive 6 newsletters a year with information about upcoming meetings, pictures and updates. You will also have access the the BFC library including DVD's and Books. Join today!</p>
                </div>
                <div>
                    <h3>Membership Application</h3>
                    <p>To apply for a membership you will first use the secure login at the top or bottom of this page and create an account with your Google account or email. We promise we won't bombard you with emails. Fill out your information on the next page. Then pay the annual membership fee. There is an opportunity to apply for a family membership, with details written below.</p>
                </div>
                <div>
                    <h3>Family Membership</h3>
                    <p>Any GBBG member who is accompanied by a family member of the same household who attends meetings and conferences solely as a companion would be considered a nonactive member at no additional charge. (meals etc. would need to be paid) A GBBG member who is regularly accompanied by a family member in the same household to gain additional knowledge and to further develop their blacksmithing skills would qualify for a family membership of $30.00 rather than the usual $20.00. The first active member would pay full price for the conference and the additional active member would pay ½ the conference fee. A family membership would entitle one additional family member to participate in workshop as long as they worked jointly on one project at no additional charge. If both family active members choose to work on separate projects they will be expected to pay for two workshop fees at the full price. All youth members (under 18) need to be accompanied by an adult at all times during meetings, workshops and projects and no under the age of 18 is permitted to use any machinery.</p>
                </div>
            </div>
            <div className="blackButtonContainer">
                <a className="blackButton" href="http://localhost:4200/auth/">Login / Register</a>
            </div>
        </div>
    )
}