import React from "react";
import "./about.css";
import abanaLogo from "./AbanaLogoFull.png";

export default function About(){
    return (
        <div className="about1Div">
            <div className="aboutTitleContainer">
                <h1>ABOUT GREAT BASIN BLACKSMITH GUILD</h1>
            </div>
            <div className="aboutBodyText">
                <p>The Great Basin Blacksmith Guild (GBBG) is a local chapter organization charted under the Artist Blacksmiths Association of North America (ABANA) and formerly known as the Bonneville Forge Council.</p>
                <p>The Chapter is organized exclusively for educational purposes, including the following: to encourage and facilitate the establishment of training programs for aspiring smiths; to disseminate information about sources of material and equipment; to expose the art of blacksmithing to the public; to serve as a center of information about blacksmithing for architects, interior designers, other interested groups and the general public.</p>
                <p>No part of the net earnings of the Chapter are to the benefit of, or be distributable to its members, trustees, officers, or other private persons, except that the Association shall be authorized and empowered to pay reasonable compensation for services rendered.</p>
                <p>Membership is open to ALL for a small annual membership fee. The Benefits of joining include: </p>
                <ul>
                    <li>ABANA Chapters are your best place to find other people interested in blacksmithing, to learn about blacksmithing and to find sources of tools and supplies.</li>
                    <li>ABANA Chapters maintain libraries of hard to find books on blacksmithing and related subjects.</li>
                    <li>Membership has the advantage of making it easier for people to identify you as a blacksmith.</li>
                    <li>ABANA was established on the premise that information about the trade must be shared in order to preserve it. That tradition of sharing and friendship is the most unique aspect of ABANA and the blacksmithing community it represents.</li>
                </ul>
            </div>
            <div className="abanaContainer">
                <img alt="ABANA Logo" src={abanaLogo} />
                <h1>Support Artist-Blacksmith's Association of North America</h1>
                <b>The Artists-Blacksmith's Association of North America was established in 1973 and since its inception has played a major role<br/>in the recognition and resurgence of Artist-Blacksmiths in North America. </b>
            </div>
        </div>
    )
}