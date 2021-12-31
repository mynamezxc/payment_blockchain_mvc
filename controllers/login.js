var Company = require("../models/company");

module.exports = function(app, web3) {

    app.get("/login", async function(req, res) {

        res.render('login', {title: "Register company", company: req.session.company});
        
    });

    app.get("/logout", (req, res) => {
        
        req.session.company = false;
        res.redirect('/login');
        return ;

    });

    app.post("/login-sign-data", async (req, res) => {

        if (req.session.company) {
            
            res.json({status: true, message: "", data: []});
            return ;

        } else {

            if (!req.body.wallet || !web3.utils.isAddress(req.body.wallet)) {

                res.json({status: false, message: "Request is invalid or expired. Please try again", data: []});
                return ;

            } else {

                var result = await Company.findOne({wallet: req.body.wallet}).exec();
                if (result) {

                    var sign_data = JSON.stringify({
                        company_name: company_name,
                        company_email: company_email,
                        tax_id: tax_id,
                        wallet: wallet
                    });
                    req.session.company = result;
                    res.json({status: true, message: "", data: [sign_data]});
                    return ;
                    
                } else {
                    res.json({status: false, message: "User and password does not matches in stored data", data: []});
                    return ;
                }

            }

        }

    });

    app.post("/login", async (req, res) => {

        if (req.session.company) {
            
            res.json({status: true, message: "", data: []});
            return ;

        } else {
            
            if (!req.body.wallet || !req.body.token || !req.body.signature) {

                res.json({status: false, message: "Request is invalid or expired. Please try again", data: []});
                return ;

            } else {

                var result = await Company.findOne({wallet: req.body.wallet}).exec();
                if (result && result["signature"] == req.body.signature) {
                    req.session.company = result;
                    res.json({status: true, message: "", data: [result]});
                    return ;
                } else {
                    res.json({status: false, message: "User and password does not matches in stored data", data: []});
                    return ;
                }
                
            }

        }
        
    });


}