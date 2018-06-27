require("dotenv").config();
const {
    SERVER_PORT,
    SESSION_SECRET,
    CONNECTION_STRING,
    CLIENT_ID,
    DOMAIN,
    CLIENT_SECRET,
    CALLBACK_URL,
    STRIPE_SECRET_KEY
} = process.env;

const express = require("express");
const session = require("express-session");
const chalk = require("chalk");
const massive = require("massive");
const bodyParser = require("body-parser");
const ctrlr = require("./controller");
const passport = require("passport");
const Auth0Strategy = require("passport-auth0");
const axios = require("axios");
const stripe = require("stripe")(STRIPE_SECRET_KEY);
// const swal = require("sweetalert");

// const charge = stripe.charges.create({
//     amount: 350,
//     currency: "usd",
//     source: "tok_visa",
//     receipt_email: "cody.dillman13@gmail.com"
// });

const app = express();
app.use(bodyParser.json())

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))
app.use(passport.initialize());
app.use(passport.session());

//massive connection
massive(CONNECTION_STRING).then(
    db => {
        app.set("db", db)
     console.log(dbChalk("Massive Demon listens"))
    }
);

//auth0
passport.use( new Auth0Strategy({
    domain: DOMAIN,
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: CALLBACK_URL,
    scope: "openid profile"
}, function(accessToken, refreshToken, extraParams, profile, done) {
    //db calls
    const db = app.get("db");
    // console.log("login attempt:",profile.id)
    db.findMember([profile.id]).then( memberResult => {
        if (!memberResult[0]) {
            // console.log(memberResult)
            db.createId([profile.id]).then( createdMember => {
                console.log("created", createdMember)
                return done(null, createdMember[0].auth_id)
            })
            .catch( err => console.log("create id err:",err))
        } else {
            // console.log("memberresult", memberResult[0].auth_id)
            return done(null, memberResult[0].auth_id)
        }
    })
    .catch( err => console.log("auth0Strat err: " + err));
}))

passport.serializeUser( (id, done) => {
    // the user information from Google is put on the session here
    done(null, id);
    //whatever is passed out goes on to req.user
})
// this is used every time the user hits an endpoint so they don't have to log in every time.
passport.deserializeUser((id, done) => {
        //putis info on req.user
        console.log("Auth0_ID:",id)
    app.get("db").findUserOnSession([id]).then( loggedInMember => {
        done(null, loggedInMember[0]);
    })
    .catch(err => console.log("findMember err: " + err))
})


app.get("/auth", passport.authenticate("auth0"));
app.get("/auth/callback", passport.authenticate("auth0", {
    successRedirect: "http://localhost:3000/#/profile",
    failureRedirect: "http://localhost:3000/#/membership"
}))

app.get("/auth/me", function(req, res) {
    if(req.user) {
        //req.user is the session store
        // console.log(req.user)
        res.status(200).send(req.user);
    } else {
        res.status(401).send("AH AH AH! YOU DIDN'T SAY THE MAGIC WORD!")
    }
})

//This is how we get the session...or at least this is how it should work.
app.get("/api/getUserOnSession", ctrlr.getUserOnSession);
app.get("/api/get_member_info_from_db", ctrlr.getMemberInfoFromDb);

app.put("/api/update_membership/", ctrlr.createMembership);

// axios.post("/api/save_membership", ctrlr.create)

app.get("/auth/logout", (req, res) => {
    console.log(sChalk("logging out"));
    req.logOut();
    res.redirect("/");
})

//STRIPE BEGIN
app.post("/api/membershipPayment", function(req, res){
    // const dbInstance = req.app.get("db");
    // let time = req.body.time;
    // const {token, amount, time} = req.body;
    // console.log(sChalk("stripey stripe!", req.body.time))
    const charge = stripe.charges.create({
        amount: req.body.amount,
        currency: "usd",
        source: req.body.token.id,
        description: "Membership payment"
    }, function(err, charge){
        if(err) return res.sendStatus(500), console.log(err)
        return res.sendStatus(200), console.log(sChalk("stripe status 200"))
    })
    
});

app.post("/api/stripeMeetingPayment", function(req, res){
    const charge = stripe.charges.create({
        amount: req.body.amount,
        currency: "usd",
        source: req.body.token.id,
        description: "Meeting payment"
    }, function(err, charge){
        if(err) return res.sendStatus(500), console.log(err)
        return res.sendStatus(200)
    })
});
//STRIPE END

app.delete(`/api/cancelMembership/:id`, ctrlr.cancelMembership)
app.post("/api/saveMeetingPayment", ctrlr.saveMeetingPayment)
app.post("/api/saveMembershipPayment", ctrlr.saveMembershipPayment)
app.put("/api/createMembership", ctrlr.createMembership)
app.get(`/api/getMemberAndPaymentsById/:id`, ctrlr.getMemberAndPaymentsById)

let dbChalk = chalk.cyan;
let port = SERVER_PORT || 4200;
let sChalk = chalk.blue;
app.listen(port, () => {
    console.log(sChalk(`Node Demon speaks`))
})