import React, {Component} from "react";
import axios from "axios";
// import {browserHistory} from 'react-router';
import StripeCheckout from 'react-stripe-checkout';
import {Link, withRouter} from "react-router-dom";

import "./profile.css";

class Profile extends Component {
    constructor(){
        super();
        this.state = {
            memberId: null,
            auth_id: null,
            name: null,
            phone_home: null,
            phone_cell: null,
            email: null,
            address: null,
            city: null,
            state: "UT",
            zip: null,
            abana_bool: false,
            abana_num: null,
            referred_by: null,
            other: null,
            membershipType: "Induvidual",
            memberFeePaid: false,
            membershipFee: 2000,
            UTC: new Date(),
            today: null,
            requiredMet: false
        }
        this.flipRequired = this.flipRequired.bind(this);
        this.createMembership = this.createMembership.bind(this);
        this.updateMembership = this.updateMembership.bind(this);
        this.payForMembership = this.payForMembership.bind(this);
        this.cancelMembership = this.cancelMembership.bind(this);
    }
    
    flipRequired(bool){
        bool === this.state.requiredMet ? console.log() : this.setState({requiredMet: bool})
    }

    getMemberInfoAndPayments(id){
        axios.get(`/api/getMemberAndPaymentsById/${id}`)
    }

    componentDidMount(){
        // console.log("props",this.props)
        axios.get(`/auth/me`).then(res => this.getMemberInfoAndPayments(res.data.auth_id) & this.setState({
            membershipAge: res.data.membership_age,
            memberId: res.data.id,
            auth_id: res.data.auth_id,
            name: res.data.name,
            phone_home: res.data.phone_home,
            phone_cell: res.data.phone_cell,
            email: res.data.email,
            address: res.data.address,
            city: res.data.city,
            state: res.data.state,
            zip: res.data.zip,
            abana_bool: res.data.abana_bool,
            abana_num: res.data.abana_num,
            referred_by: res.data.referred_by,
            other: res.data.other
        }))
        this.setState({today: this.state.UTC.toLocaleDateString()})
    }

    // changeMembershipType(e){
    //     e == "Induvidual" ? this.setState({
    //         membershipFee: 2000
    //     }) :
    //     this.setState({
    //         membershipFee: 3000
    //     })
    // }

    onToken = (token) => {
        let amount = this.state.membershipFee;
        let time = Date.now();
        token.card = void 0;
        axios.post("/api/membershipPayment", {token, amount: amount, time: time}) & this.setState({
            memberFeePaid: true
        })
        this.createMembership(time)
        this.payForMembership()
    }

    payForMembership(){
        let payment = {
            memberId: this.state.memberId,
            amount: this.state.membershipFee,
            date: this.state.today,
            description: "Membership Fee"
        }
        axios.post("/api/saveMembershipPayment", payment)
    }

    updateMembership(){
        console.log("BUBU!")
        let profileUpdate = {
            auth_id: this.state.auth_id,
            name: this.state.name,
            phone_home: this.state.phone_home,
            phone_cell: this.state.phone_cell,
            email: this.state.email,
            address: this.state.address,
            city: this.state.city,
            state: this.state.state,
            zip: this.state.zip,
            abana_bool: this.state.abana_bool,
            abana_num: this.state.abana_num,
            referred_by: this.state.referred_by,
            other: this.state.other
        }
        axios.put("/api/createMembership", profileUpdate)
        .then(axios.get(`/auth/me`).then(res => this.getMemberInfoAndPayments(res.data.auth_id) & this.setState({
            membershipAge: res.data.membership_age,
            memberId: res.data.id,
            auth_id: res.data.auth_id,
            name: res.data.name,
            phone_home: res.data.phone_home,
            phone_cell: res.data.phone_cell,
            email: res.data.email,
            address: res.data.address,
            city: res.data.city,
            state: res.data.state,
            zip: res.data.zip,
            abana_bool: res.data.abana_bool,
            abana_num: res.data.abana_num,
            referred_by: res.data.referred_by,
            other: res.data.other
        })) & 
        this.setState({today: this.state.UTC.toLocaleDateString()}))
    }

    createMembership(time){
        let newMember = {
            membershipAge: null,
            memberId: null,
            auth_id: this.state.auth_id,
            date_created: this.state.today,
            name: this.state.name,
            phone_home: this.state.phone_home,
            phone_cell: this.state.phone_cell,
            email: this.state.email,
            address: this.state.address,
            city: this.state.city,
            state: this.state.state,
            zip: this.state.zip,
            abana_bool: this.state.abana_bool,
            abana_num: this.state.abana_num,
            referred_by: this.state.referred_by,
            other: this.state.other,
            time: time
        }
        axios.put("/api/createMembership", newMember)
        .then(axios.get(`/auth/me`).then(res => this.getMemberInfoAndPayments(res.data.auth_id) & this.setState({
            membershipAge: res.data.membership_age,
            memberId: res.data.id,
            auth_id: res.data.auth_id,
            name: res.data.name,
            phone_home: res.data.phone_home,
            phone_cell: res.data.phone_cell,
            email: res.data.email,
            address: res.data.address,
            city: res.data.city,
            state: res.data.state,
            zip: res.data.zip,
            abana_bool: res.data.abana_bool,
            abana_num: res.data.abana_num,
            referred_by: res.data.referred_by,
            other: res.data.other
        })) & 
        this.setState({today: this.state.UTC.toLocaleDateString()}))
    }

    editInfo(stateItem, input){
        this.setState({
            [stateItem]: input.target.value
        })
    }

    handleMembershipFee(value){
        if(value === "Induvidual"){
            this.setState({
                membershipFee: 2000
            })
        } else if (value === "Family"){
            this.setState({
                membershipFee: 3000
            })
        }
    }

    cancelMembership(){
        if(window.confirm("Are you sure? This means you forfeit your membership and all payments you have made.")) {this.props.history.push("/") & axios.delete(`/api/cancelMembership/${this.state.auth_id}`)}
    }

    render(){
        if(
            this.state.name !== null && 
            (this.state.phone_cell !== null || this.state.phone_home !== null) && 
            ((this.state.email !== null && this.state.email.includes("@"))|| 
                (this.state.address !== null && this.state.city !== null && this.state.state !== null && this.state.zip !== null))
        )
        {
            this.flipRequired(true)
        } else {this.flipRequired(false)}
        console.log(typeof this.state.membershipFee, this.state.membershipFee)
        // console.log(this.state);
        // console.log(this.state.memberId);
        // console.log(this.state.state);
        // console.log("zip: ", typeof this.state.zip, this.state.zip);
        // console.log(this.props)
        // let today = this.state.UTC.toLocaleDateString();
        return(
            
            <div>
            {this.state.auth_id === "" ? <h1>LOADING...</h1> : 
            <div className="profile1Div">
                <div className="aboutTitleContainer">
                <h1>GBBG PROFILE</h1>
            </div>
            <br/>
            <br/>
            <div className="blackButtonContainer">
            <Link onClick={() => axios.get(`/auth/logout`)} className="blackButton" to={{pathname: "/"}}> LOGOUT</Link>
            {(this.state.membershipAge + 31536000000) > Date.now() ? <Link className="blackButton" to={{pathname: "/payments"}} >PAYMENTS</Link>  : <div>
                    <p>Your membership is expired or you are not a member yet.</p><p>Become a member or renew your membership to manage meeting payments</p></div>}
                
            </div>
            <br/>
            <form className="profileForm">
                <h2>Membership Form</h2>
                <b>&nbsp; To become a member of the Great Basin Blacksmith Guild, or to renew your expired memebership, or simply update your information, fill out the following form and pay the membership fee if it is not currently up to date.</b>
                <br/>
                <br/>
                <div className="actualFormContainter">
                    <div className="formRow">
                        <div>
                            Name: <input placeholder={this.state.name !== null ? this.state.name : "Your name"} onChange={e => this.editInfo("name", e)} type="text" maxLength="80"/>
                        </div>
                        <div>
                            Home Phone: <input onChange={e => this.editInfo("phone_home", e)} placeholder={this.state.phone_home !== null ? this.state.phone_home : "(000) 000-0000"} type="tel" maxLength="15"/>
                        </div>
                    </div>
                    <br/>
                    <div className="formRow">
                        <div>
                            Cell Phone: <input placeholder={this.state.phone_cell !== null ? this.state.phone_cell : "(000) 000-0000"} onChange={e => this.editInfo("phone_cell", e)} type="tel" maxLength="15"/>
                        </div>
                        <div>
                            Email: <input onChange={e => this.editInfo("email", e)} placeholder={this.state.email !== null ? this.state.email : "your.email@something.com"} type="email" maxLength="64"/>
                        </div>
                    </div>
                    <br/>
                    <div className="formRow">
                        <div>
                           Address: <input onChange={e => this.editInfo("address", e)} placeholder={this.state.address !== null ? this.state.address : "1234 Street Name"} type="text" maxLength="128"/>
                        </div>
                        <div>
                            City: <input onChange={e => this.editInfo("city", e)} placeholder="City name" type="text" maxLength="64"/>
                        </div>
                    </div>
                    <br/>
                    <div className="formRow">
                        <div>
                            State: 
                            <select onChange={e => this.editInfo("state", e)}>
                                <option value="AL">Alabama</option>
                                <option value="AK">Alaska</option>
                                <option value="AZ">Arizona</option>
                                <option value="AR">Arkansas</option>
                                <option value="CA">California</option>
                                <option value="CO">Colorado</option>
                                <option value="CT">Connecticut</option>
                                <option value="DE">Delaware</option>
                                <option value="DC">District Of Columbia</option>
                                <option value="FL">Florida</option>
                                <option value="GA">Georgia</option>
                                <option value="HI">Hawaii</option>
                                <option value="ID">Idaho</option>
                                <option value="IL">Illinois</option>
                                <option value="IN">Indiana</option>
                                <option value="IA">Iowa</option>
                                <option value="KS">Kansas</option>
                                <option value="KY">Kentucky</option>
                                <option value="LA">Louisiana</option>
                                <option value="ME">Maine</option>
                                <option value="MD">Maryland</option>
                                <option value="MA">Massachusetts</option>
                                <option value="MI">Michigan</option>
                                <option value="MN">Minnesota</option>
                                <option value="MS">Mississippi</option>
                                <option value="MO">Missouri</option>
                                <option value="MT">Montana</option>
                                <option value="NE">Nebraska</option>
                                <option value="NV">Nevada</option>
                                <option value="NH">New Hampshire</option>
                                <option value="NJ">New Jersey</option>
                                <option value="NM">New Mexico</option>
                                <option value="NY">New York</option>
                                <option value="NC">North Carolina</option>
                                <option value="ND">North Dakota</option>
                                <option value="OH">Ohio</option>
                                <option value="OK">Oklahoma</option>
                                <option value="OR">Oregon</option>
                                <option value="PA">Pennsylvania</option>
                                <option value="RI">Rhode Island</option>
                                <option value="SC">South Carolina</option>
                                <option value="SD">South Dakota</option>
                                <option value="TN">Tennessee</option>
                                <option value="TX">Texas</option>
                                <option selected value="UT">Utah</option>
                                <option value="VT">Vermont</option>
                                <option value="VA">Virginia</option>
                                <option value="WA">Washington</option>
                                <option value="WV">West Virginia</option>
                                <option value="WI">Wisconsin</option>
                                <option value="WY">Wyoming</option>
                            </select>				
                        </div>
                        <div>
                            Zip: <input onChange={e => this.editInfo("zip", e)} placeholder="55555" type="text" maxLength="15"/>
                        </div>                    
                    </div>
                    <br/>
                    <div className="formRow">
                        <div>
                            Are you an ABANA member? <select onChange={e => this.editInfo("abana_bool", e)}>
                                <option selected="selected" value={false} >NO</option>
                                <option value={true}>YES</option>
                            </select>
                        </div>
                        {this.state.abana_bool === "true" ? 
                        <div>
                            ABANA number: <input onChange={e => this.editInfo("abana_num", e)} placeholder="ABANA number" type="text" maxLength="32"/>
                        </div> : console.log() }
                    </div>
                    <br/>
                    <div className="formRowLow">
                        <div>
                            How did you hear about GBBG? <select onChange={e => this.editInfo("referred_by", e)}>
                                <option value="Referred by Member">Referred by Member</option>
                                <option value="Internet Search">Internet Search</option>
                                <option value="Flyer">Flyer</option>
                                <option value="ABANA Newsletter">ABANA Newsletter</option>
                                <option value="Other" >Other</option>
                            </select>
                        </div>
                        <div>
                            {this.state.referred_by === "Other" ? <div>Please Specify &nbsp;<input onChange={e => this.editInfo("other", e)} type="text" maxLength="128"/></div> : () => {} }
                        </div>
                    </div>
                    <br/>
                    <div className="formRowLow">
                        <div>
                            Select your membership type
                            <select onChange={e => this.handleMembershipFee(e.target.value)}>
                                <option selected value="Induvidual">Induvidual $20.00</option>
                                <option value="Family">Family $30.00</option>
                            </select>
                        </div>
                    </div>
                </div>
                <br/>
                <br/>

                {this.state.requiredMet ? 
                    (this.state.membershipAge + 31536000000) < Date.now() ? 
                    <StripeCheckout
                        // onClick={() => this.payForMembership(this.state.membershipFee)}
                        className="stripeCheckout"
                        token={this.onToken}
                        stripeKey="pk_test_YNEj6SVPQwdwQ2IiTWAweyAK"
                        amount={this.state.membershipFee}
                    /> : 
                    <p className="blackButton" onClick={() => this.createMembership(this.state.membershipAge)} >SUBMIT CHANGES</p> : 
                    <div className="required">
                    You must provide your &nbsp;<b> name</b>,  at least one &nbsp;<b> phone number</b>, and either your &nbsp;<b> mailing address</b>&nbsp; or &nbsp;<b> Email address</b>.                
                    </div>}
                {this.state.memberFeePaid ? <div>Thank you for your payment! &nbsp;<p onClick={this.updateMembership} className="blackButton">SUBMIT CHANGES</p></div>  : console.log()}
            </form>
            <div className="blackButtonContainer">
                <p>Do you want to cancel your Great Basin Blacksmith Guild membership?</p>
                <br/>
                <p onClick={this.cancelMembership} className="blackButton">Cancel Membership</p>
                <br/>
                <br/>
            </div>
            </div>
            }
                
            </div>
        )
    }
}
export default withRouter(Profile);