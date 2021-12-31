var Company = require("../models/company");
var HelperString = require("../helper/string");
var { default: Web3 } = require("web3");
var md5 = require('md5');
require("ethereumjs-util");
// var web3js = new Web3();

module.exports = function(app, web3) {

    app.get("/register", (req, res) => {
        
        if (req.session.company) {
            res.status(200).redirect("/home");
        } else {
            var token = HelperString.random_str(36);
            req.session.token = token;
            res.render('register', {title: "Safe Block Pay - Register", company: false, token: token});
        }

    });

    app.post("/register", async (req, res) => {

        if (!req.session.company) {

            if (req.session.token && req.session.token == req.body.token) {
                if (!req.body.name || !req.body.tax_id || !req.body.wallet || !req.body.email || !web3.utils.isAddress(req.body.wallet) || !req.body.signature || req.body.signature.length < 4) {
                    res.status(200).json({status: false, message: "Input data is missing or incorrectly! Please try again.", data: []});
                    return ;
                }
        
                var result = await Company.findOne({
                    $or: [{
                        wallet: req.body.wallet
                    },{
                        tax_id: req.body.tax_id
                    }]
                }).exec();
        
                if (result) {
                    res.status(200).json({status: false, message: "This company or address already exists", data: []});
                    return ;
                }
        
                var company = new Company({
                    name: req.body.name,
                    tax_id: req.body.tax_id,
                    email: req.body.email,
                    wallet: req.body.wallet,
                    signature: req.body.signature,
                    subscription: false
                });
        
                company.save(function(err) {
                    if (err) {
                        res.status(200).json({status: false, message: "Insert data failed", data: []});
                        return ;
                    } else {
                        req.session.company = company;
                        res.status(200).json({status: true, message: "", data: company});
                        return ;
                    }
                });
            } else {
                res.status(200).json({status: false, message: "Request time out", data: []});
            }

            
        } else {
            res.status(200).json({status: false, message: "You already logged", data: []});
            return ;
        }
        
    });


}