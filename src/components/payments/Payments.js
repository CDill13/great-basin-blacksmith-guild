import React, {Component} from "react";
import axios from "axios";
import StripeCheckout from 'react-stripe-checkout';
import {Link} from "react-router-dom";
import "./payments.css";

export default class Payments extends Component{
    constructor(){
        super();
        this.state = {
            memberId: null,
            auth_id: null,
            selection: "",
            pillowForgingSelected: false,
            pillowForgingPaid: false,
            amount: 0,
            UTC: new Date(),
            today: null
        }
        this.getMemberInfoAndPayments = this.getMemberInfoAndPayments.bind(this);
        this.cancelPaymentSelection = this.cancelPaymentSelection.bind(this);
    }

    componentDidMount(){
        axios.get(`/auth/me`).then(res => this.getMemberInfoAndPayments(res.data.auth_id) & this.setState({
            memberId: res.data.id,
            auth_id: res.data.auth_id
        }))
        this.setState({today: this.state.UTC.toLocaleDateString()})
    }

    getMemberInfoAndPayments(id){
        axios.get(`/api/getMemberAndPaymentsById/${id}`).then(res => 
            console.log(res.data) &
            this.handleMemberInfoAndPayments(res.data)
        )
    }

    handleMemberInfoAndPayments(array){
        for(let i = 0; i < array.length; i++){
            if(array[i].description === "Pillow forging"){
                this.setState({
                    pillowForgingPaid: true
                })
            }
        }
    }

    onToken = (token) => {
        let amount = this.state.amount;
        let date = this.state.today;
        let description = this.state.selection;
        let memberId = this.state.memberId;
        token.card = void 0;
        axios.post("/api/stripeMeetingPayment", {token, amount: amount})
        axios.post("/api/saveMeetingPayment", {memberId, amount, date, description})
        .then(res => console.log("save payment res:",res.data))
        .then(this.getMemberInfoAndPayments(this.state.auth_id))
    }

    handlePaymentSelection(string){
        switch(string){
            case "Pillow forging":
                this.setState({
                    selection: "Pillow forging",
                    pillowForgingSelected: true,
                    amount: 500
                })
                break;
            default:
                alert("handlePaymentSelection switch statement defaulted")
        }
    }

    cancelPaymentSelection(){
        this.setState({
            selection: "",
            pillowForgingSelected: false,
            amount: null
        })
    }

    render(){
        console.log(this.state.amount, typeof this.state.amount)
        return(
            <div className="payments1Div">
                <div className="paymentsTitleContainer">
                    <h1>PAYMENTS</h1>
                </div>
                <div className="linksContainer">
                    <Link onClick={() => axios.get(`/auth/logout`)} className="blackButton" to={{pathname: "/"}}> LOGOUT</Link>
                    <Link className="blackButton" to={{pathname: "/profile"}}>PROFILE</Link>
                </div>
                <h2>Upcoming Meetings</h2>
                <div className="paymentsBody">
                    <div className="meetingContainer">
                        <h2>Monday July 2nd 5:00 - 8:00 PM</h2>
                        <div className="boldAndNormalTextInline">
                            <b>Content:</b>&nbsp;
                            <p>Historical Demonstrations</p>
                        </div>
                        <div className="boldAndNormalTextInline">
                            <b>Location:</b>&nbsp;
                            <p>SCERA Park at 600 South State Street Orem Utah.</p>
                        </div>
                        <div className="boldAndNormalTextInline">
                            <b>Fee:</b>&nbsp;
                            <p>Free Event</p>
                        </div>
                        <div className="boldAndNormalTextInline">
                            <b>No payment is needed for free events</b>
                        </div>                        
                    </div>
                    <div className="meetingContainer">
                        <h2>Saturday July 21st 9:00 AM</h2>
                        <div className="boldAndNormalTextInline">
                            <b>Content:</b>&nbsp;
                            <p>Pillow forging</p>
                        </div>
                        <div className="boldAndNormalTextInline">
                            <b>Location:</b>&nbsp;
                            <p>7212 West 900 South, Ogden Utah</p>
                        </div>
                        <div className="boldAndNormalTextInline">
                            <b>Fee:</b>&nbsp;
                            <p>$5.00</p>
                        </div>
                        <div className="blackButtonContainer">
                            {this.state.pillowForgingPaid ?(
                                <b>You have paid for this event</b>
                            ) :
                            this.state.pillowForgingSelected ?
                            <div>
                                <p onClick={this.cancelPaymentSelection} className="blackButton">Nevermind</p>
                                <StripeCheckout 
                                    className="stripeCheckout"
                                    token={this.onToken}
                                    stripeKey="pk_test_YNEj6SVPQwdwQ2IiTWAweyAK"
                                /> 
                            </div>
                            :
                            <p onClick={() => this.handlePaymentSelection("Pillow forging")} className="blackButton">Pay for Meeting</p>

                            }
                        </div>
                    </div>
                </div>
                <div className="linksContainer">
                    <Link onClick={() => axios.get(`/auth/logout`)} className="blackButton" to={{pathname: "/"}}> LOGOUT</Link>
                </div>
            </div>
        )
    }
}