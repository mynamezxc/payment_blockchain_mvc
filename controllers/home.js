var Company = require("../models/company");
var Token = require("../models/token");
var Order = require("../models/order");

module.exports = function(app, web3) {


    app.get("/", (req, res) => {

        if (req.session.company) {
            res.render('home', {title: "Safe Block Pay - Home page", company: req.session.company});
            return ;
        } else {
            res.status(302).redirect("/login");
            return ;
        }

    });


}