// Creating the application namespace
var app = {
    models: {},
    views: {},
    utils: {}
};

jQuery(document).ready(function() {
    //Add event listeners and so forth here
    console.log("onLoad: jquery ready");
    // FastClick
    new FastClick(document.body);

    // Browser
    if (cordova.interceptExec) {
        force.init({loginURL: "https://test.salesforce.com/",
                    appId: "3MVG9sLbBxQYwWqvigZkG451mOeRQ1HZ0.CMHfbrXp0v5m1gOwd9BjeA0tQRidGJn5MndsavpBExwVfmS4D7r",
                    oauthCallbackURL: "http://localhost:9000/oauthcallback.html",
                    useCordova: false 
                   });
    }
       
    force.login(
        function(event) {
            console.log("Auth succeeded"); 
            appStart();
        },
        function(error) {
            console.log("Auth failed: " + error); 
        }
    );
});

function appStart(creds, refresh)
{
    // Force init
    Force.init();

    // Go!
    Backbone.history.start();
}