var Web3 = new Web3(Web3.givenProvider);
console.log(Web3);
$(document).ready(function() {

    $("#connectingWalletModal").modal("show");
    reload_account();

    $(document).on("click tap", ".connect_metamask", async function (e) {
        e.preventDefault();
        if( is_installed_metamask() ) {

            if( check_chain() ) {
                await connect_metamask();
                set_wallet_account_text(account);
                hide_connect_btn();
                $("#connectingWalletModal").modal("hide");

            } else {
                alert("Please change your network to BSC mainnet");
            }
            
        }
    });

    $(document).on("click tap", "#signin", async function () {

        if (account) {

            var wallet = account;
            var password = $("#password").val();
            var token = $("#token").val();
            $.post("login", {
                wallet: wallet,
                password: password,
                token: token
            }, function(data) {
                console.log(data);
                if (data.status) {
                    window.location.href = "/token";
                } else {
                    alert (data.message);
                }
            });

        } else {

            await connect_metamask();
            set_wallet_account_text(account);
            hide_connect_btn();
            $("#connectingWalletModal").modal("hide");
            
        }
        
    });

    $(document).on("click tap", "#signup", sign_up_function);

    ethereum.on('accountsChanged', async (accounts) => {
        $("#connectingWalletModal").modal("show");
        account = accounts[0];
        await connect_metamask();
        set_wallet_account_text(account);
        hide_connect_btn();
        $("#connectingWalletModal").modal("hide");
    });
    ethereum.on('chainChanged', (chainId) => {
        console.log(chainId);
    });
    ethereum.on('disconnect', (error) => {
        is_connected = false;
        console.log ("You are offline");
    });
    ethereum.on('connect', (error) => {
        is_connected = true;
        console.log ("You are online");
    });
    

});

var account = "";
var network = "";
var chain = "";
var is_connected = ethereum.isConnected();

function check_chain() {
    return ethereum.chainId == "0x38";
}

async function reload_account() {
    
    ethereum.request({ method: 'eth_requestAccounts' }).then((accounts) => {
        account = accounts[0];
        set_wallet_account_text(account);
        hide_connect_btn();
        setTimeout(function() {
            $("#connectingWalletModal").modal("hide");
        }, 1000);
    }).catch((error) => {
        account = "";
        show_connect_btn();
        setTimeout(function() {
            $("#connectingWalletModal").modal("hide");
            $("#connectingWalletFailedModal").modal("show");
        }, 1000);
    });
    
}

function hide_connect_btn() {
    $(".connect_metamask").hide();
}

function show_connect_btn() {
    $(".connect_metamask").show();
    set_wallet_account_text("");
}

function set_wallet_account_text(account) {
    $(".wallet_metamask").val(account);
}

function is_installed_metamask () {
    if ( typeof window.ethereum !== 'undefined' ) {
        return true;
    }
    return false;
}

async function connect_metamask () {

    $("#connectingWalletModal").modal("show");
    ethereum.request({ method: 'eth_requestAccounts' }).then((accounts) => {
        account = accounts[0];
        set_wallet_account_text(account);
        hide_connect_btn();
        setTimeout(function() {
            $("#connectingWalletModal").modal("hide");
        }, 1000);
    }).catch((error) => {
        account = "";
        show_connect_btn();
        setTimeout(function() {
            $("#connectingWalletModal").modal("hide");
            $("#connectingWalletFailedModal").modal("show");
        }, 1000);
    });

}

async function sign (msg, passcode) {
    if (account) {
        return Web3.eth.personal.sign(msg, account, passcode);
        // Web3.eth.personal.sign("Hello world", account, "test password!")
    } else {
        return false;
    }
}

function sign_up_function () {
    
    if (account) {

        var signature = $("#signature").val();

        if (signature && signature.length >= 1) {

            var company_name = $("#company_name").val();
            var company_email = $("#company_email").val();
            var tax_id = $("#tax_id").val();
            var wallet = account;
            var token = $("#token").val();

            if (wallet.length >= 1 && company_name && company_email && tax_id) {
                $.post("register", {
                    name: company_name,
                    email: company_email,
                    tax_id: tax_id,
                    wallet: wallet,
                    token: token,
                }, function(data) {
                    console.log(data);
                    if (data.status) {
                        $("#signup").hide();
                        $("#payment").show();
                        window.location.href = "/";
                    } else {
                        alert (data.message);
                    }
                });
            }

        } else {

            var company_name = $("#company_name").val();
            var company_email = $("#company_email").val();
            var tax_id = $("#tax_id").val();
            var wallet = account;
            var token = $("#token").val();

            if (!company_name || !company_email || !tax_id || !wallet) {
                return validat_sign_up_form();
            }

            var data = JSON.stringify({
                company_name: company_name,
                company_email: company_email,
                tax_id: tax_id,
                wallet: wallet
            });
            var signature = sign(data, window.location.host).then( (signature) => {

                if (signature && signature.length >= 1) {
                    $("#signature").val(signature);
                    return sign_up_function();
                }

            }).catch( (error) => {
                alert("Signature denied");
            });

        }
    } else {
        alert("Please login your wallet to use this function");
    }

}