document.getElementById('signin').addEventListener("click", signin, false);
document.getElementById('processSignin').addEventListener("click", processSigninResponse, false);

var settings = {
    authority: 'https://accounts.google.com',
    client_id: '624267653908-q9e46vve6397hpopvv76tk98mid7a0cq.apps.googleusercontent.com',
    redirect_uri: 'http://localhost:5000',
    post_logout_redirect_uri: 'http://localhost:5000',
    response_type: 'id_token token',
    scope: 'openid email',

    filterProtocolClaims: true,
    loadUserInfo: true
};

var client = new Oidc.OidcClient(settings);

function signin() {
    client.createSigninRequest({ state: { bar: 15 } }).then(function(req) {
        log("signin request", req, "<a href='" + req.url + "'>go signin</a>");
        if (followLinks()) {
            window.location = req.url;
        }
    }).catch(function(err) {
        log(err);
    });
    console.log('sign in');
}

function log() {
    document.getElementById('out').innerText = '';

    Array.prototype.forEach.call(arguments, function(msg) {
        if (msg instanceof Error){
            msg = "Error: " + msg.message;
        }
        else if (typeof msg !== 'string') {
            msg = JSON.stringify(msg, null, 2);
        }
        document.getElementById('out').innerHTML += msg + '\r\n';
    });
}

function followLinks() {
    return localStorage.getItem("follow") === "true";
}

var signinResponse;
function processSigninResponse() {
    client.processSigninResponse().then(function(response) {
        signinResponse = response;
        log("signin response", signinResponse);
    }).catch(function(err) {
        log(err);
    });
}
