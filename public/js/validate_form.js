$(document).ready(function() {


    $(document).on("click tap", "#confirm_token", function () {

        $("#create-token-form").submit();

    });


});

if($("#create-token-form").length >= 1) {
    $("#create-token-form").validate({
        rules: {
            name: {
                required: true,
                minlength: 2
            },
            symbol: {
                required: true,
                minlength: 2
            },
            network: "required",
            total_supply: {
                required: true,
                min: 1
            },
            init_supply: {
                required: true,
                min: 1
            },
        },
    
        messages: {
            name: {
                required: "Please enter your token name",
                minlength: "Your token name must be at least 5 characters long"
            },
            symbol: {
                required: "Please enter your token symbol",
                minlength: "Your token symbol must be at least 5 characters long"
            },
            network: "Please select your network to deploy",
            total_supply: {
                required: "Please enter your token total supply",
                min: "Your token total supply must be at least 1"
            },
            init_supply: {
                required: "Please enter your token total supply",
                min: "Your token total supply must be at least 1"
            }
        },
    
        submitHandler: async function () {
            alert(123);
        }
        
    });
}

function validat_sign_up_form() {
    $("#signup-form").validate({
        rules: {
            company_name: {
                required: true,
                minlength: 5
            },
            company_email: {
                required: true,
            },
            tax_id: {
                required: true,
                minlength: 6
            },
            wallet: {
                required: true,
                minlength: 20
            },
            signature: {
                required: true,
                minlength: 1
            },
            token: {
                required: true
            }
        },
    
        messages: {
            company_name: {
                required: "Please enter your company name, this will be use for company verification",
                minlength: "Your company name must be at least 5 characters long"
            },
            company_email: {
                required: "Please enter your valid contact email",
                minlength: "Email is invalid"
            },
            tax_id: {
                required: "Fill your company tax id, this will be use for company verification",
                minlength: "Tax id invalid"
            },
            wallet: {
                required: "Please connect to your wallet before sign up",
                minlength: "Your wallet is invalid"
            },
            signature: {
                required: "Please use your wallet to sign data first",
                minlength: "signature invalid"
            },
        },
    
        submitHandler: async function () {
            // alert();
        }
        
    });
}


if($("#signin-form").length >= 1) {
    $("#signin-form").validate({
        rules: {
            wallet: {
                required: true,
                minlength: 20
            },
            signature: {
                required: true,
                minlength: 1
            },
        },
    
        messages: {
            wallet: {
                required: "Please connect to your wallet before sign up",
                minlength: "Your wallet is invalid"
            },
            signature: {
                required: "Please use your wallet to sign data first",
                minlength: "signature invalid"
            },
        },
    
        submitHandler: async function () {
            // alert();
        }
        
    });
}