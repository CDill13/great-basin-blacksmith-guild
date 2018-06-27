import React from "react";
import {HashRouter, Switch, Route} from "react-router-dom";
import Home from "./components/home/Home";
import About from "./components/about/About";
import Contact from "./components/contact/Contact";
import Meetings from "./components/meetings/Meetings";
import Membership from "./components/membership/Membership";
import Profile from "./components/profile/Profile";
import Payments from "./components/payments/Payments";
// import Search from "./components/search/Search";
import Header from "./components/headerFooter/Header";
import Footer from "./components/headerFooter/Footer";

export default (
    <HashRouter>
        <div>
            <Header />
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/about" component={About}/>
                <Route path="/contact" component={Contact}/>
                <Route path="/meetings" component={Meetings}/>
                <Route path="/membership" component={Membership}/>
                <Route path="/profile" component={Profile}/>
                <Route path="/payments" component={Payments}/>
                {/* <Route path="/search" component={Search}/> */}
            </Switch>
            <Footer/>
        </div>
    </HashRouter>
)