const chalk = require("chalk");
let ctrlrChalk = chalk.blue;
module.exports = {
    createId: (req, res) => {
        console.log(ctrlrChalk(req.body))
        const dbInstance = req.app.get("db");
        const {date_created, name, phone_home, phone_cell, email, address, city, state, zip, abana_bool, abana_num, referred_by, auth_id} = req.body;
    
        dbInstance.create_id([auth_id])
        .then(() => {res.status(200).send()})
        .catch((err) => console.log("create_id err:" + err) )
    },
    getUserOnSession: (req, res, next) => {
        console.log(ctrlrChalk("geMemberInfo", req))
        if(!req.session.passport.user){
            console.log(chalk.red("YOU JUST LOST THE SESSION YOU LOSER!"))
            .then(res.status(403).send("403"))
        } else{
            res.status(200).send(req.session.passport.user)
        }
    },
    // createMembership: (req, res) => {
    //     console.log(ctrlrChalk("update", req.body))
    //     const dbInstance = req.app.get("db");
    //     const {date_created, name, phone_home, phone_cell, email, address, city, state, zip, abana_bool, abana_num, referred_by, auth_id} = req.body;
        
    //     dbInstance.update_membership_info([date_created, name, phone_home, phone_cell, email, address, city, state, zip, abana_bool, abana_num, referred_by, req.user.auth_id])
    //     .then(() => {
    //         res.status(200).send()})
    //         .catch((err) => console.log("update_membership_info err:" + err) )
    // },
    getMemberInfoFromDb: (req, res) => {
        const dbInstance = req.app.get("db")
        dbInstance.find_session_member([req.session.passport.user])
        .then (response => {
            res.status(200).send(response)})
            .catch(err => console.log("find_session_member", err))
    },
    createMembership: (req, res) => {
        const dbInstance = req.app.get("db");
        const {auth_id, date_created, name, phone_home, phone_cell, email, address, city, state, zip, abana_bool, abana_num, referred_by, other, time} = req.body
        // console.log("CREATE MEMBERSHIP:",req.body);
        dbInstance.updateMembership([auth_id, date_created, name, phone_home, phone_cell, email, address, city, state, zip, abana_bool, abana_num, referred_by, other, time])
        .then(response => {res.status(200).send(response)})
        .catch(err => console.log("createMembership err:",err))
    },
    getPaymentsForMember: (req, res, next) => {
    },
    getMemberAndPaymentsById: (req, res) => {
        const dbInstance = req.app.get("db");
        const id = req.params.id;

        dbInstance.getMemberAndPaymentsById(id)
        .then(response => {res.status(200).send(response)})
        .catch(err => console.log("getMemberAndPaymentsById:",err))
    },
    saveMembershipPayment: (req, res) => {
        const dbInstance = req.app.get("db");
        const {memberId, amount, date, description} = req.body;
        // console.log("MEMBERSHIP PAYMENT:",req.body)
        dbInstance.savePayment([memberId, amount, date, description])
        .then(response => {res.status(200).send(response)})
        .catch(err => console.log("saveMembershipPayment err: ", err));
    },
    saveMeetingPayment: (req, res) => {
        const dbInstance = req.app.get("db");
        const {memberId, amount, date, description} = req.body;
        // console.log("MEETING PAYMENT:", req.body)
        dbInstance.savePayment([memberId, amount, date, description])
        .then(response => {res.status(200).send(response)})
        .catch(err => console.log("saveMeetingPayment err: ", err));
    },
    cancelMembership: (req, res) => {
        const dbInstance = req.app.get("db");
        const id = req.params.id;
        dbInstance.cancelMembership(id)
        .then(response => res.status(200).send(response))
        .catch(err => console.log("cancelMembership err:",err))
    }
}