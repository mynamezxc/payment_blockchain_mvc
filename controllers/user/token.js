var Company = require("../../models/company");
var Token = require("../../models/token");
var Order = require("../../models/order");

module.exports = function(app, web3) {


    app.get("/token", async function (req, res) {

        if (req.session.company) {

            token_list = await Token.find({company_id: req.session.company.id});
            res.render("token", {title: "Token manage", company: req.session.company, token_list: token_list});
            return ;

        } else {

            return res.redirect("/register");

        }

    });

    app.post("/token/create", async function (req, res) {

        if (req.session.company && req.session.company.subscription) {

            

        } else if (req.session.company) {
            
            res.json({status: false, message: "Your account is under review", data: []});

        } else {

            res.json({status: false, message: "You need login to use this method", data: []});

        }

    });


}