jQuery(document).ready(function() {
    // Container
    if (window.cordova && !cordova.interceptExec) {
        document.addEventListener("deviceready", function() {
            console.log("onDeviceReady: cordova ready");

            //Call getAuthCredentials to get the initial session credentials
            cordova.require("com.salesforce.plugin.oauth").getAuthCredentials(
                function(creds) {
                    appStart( _.extend(creds, {userAgent: navigator.userAgent}), cordova.require("com.salesforce.plugin.oauth").forcetkRefresh);
                }, 
                function(error) { 
                    console.log("Auth failed: " + error); 
                });
        });
    }
    // Browser
    else {
        var loginUrl = "https://test.salesforce.com/";
        var consumerKey = "yourConsumerKey";
        var callbackUrl = "http://localhost:9000/";

        // Instantiating forcetk ClientUI
        var oauthClient = new ForceOAuth(loginUrl, consumerKey, callbackUrl,
             function forceOAuthUI_successHandler(forcetkClient) { // successCallback
                 console.log('OAuth success!');
                        console.log(oauthClient.oauthResponse);
                 creds = {
                    clientId: consumerKey,
                    loginUrl: loginUrl,
                    proxyUrl: callbackUrl,
                    accessToken: oauthClient.oauthResponse.access_token,
                    instanceUrl: oauthClient.oauthResponse.instance_url
                };
                 creds = _.extend(creds, oauthClient.oauthResponse);
                 appStart(creds);
             },
             function forceOAuthUI_errorHandler(error) { // errorCallback
                 console.log('OAuth error!');
                 if (confirm("Authentication Failed. Try again?")) oauthClient.login();
             });

        oauthClient.login();
    }
});

function appStart(creds, refresh)
{
    // Force init
    Force.init(creds, null, null, refresh);

    var event = new Event('loggedIn');
    document.dispatchEvent(event);
}
