var RedditApi = require('reddit-oauth');
var reddit = new RedditApi({
    app_id: 'KQvXtN2BT_5XUw',
    app_secret: 'j_WiYj18OjH3BAbxWbPgRauJVPo',
    redirect_uri: 'http://127.0.0.1:3000/'
});

// Authenticate with username/password
reddit.passAuth(
    'your_reddit_username',
    'your_reddit_password',
    function (success) {
        if (success) {
            // Print the access token we just retrieved
            console.log(reddit.access_token);
        }
    }
);

// Get the OAuth URL to redirect users to
// Scopes are defined here: https://github.com/reddit/reddit/wiki/OAuth2
reddit.oAuthUrl('some_state', 'identity');

// After the user is redirected back to us, grab the query string
// object and exchange it for a set of access and refresh tokens.
// Scope has to be identical as the one provided to oAuthUrl. Can
// change for each authentication attempt.
reddit.oAuthTokens(
    'some_state',
    request.query,
    function (success) {
        // Print the access and refresh tokens we just retrieved
        console.log(reddit.access_token);
        console.log(reddit.refresh_token);
    }
);

// Returns true if access token exists
reddit.isAuthed();

// Force a refresh of the access token using the refresh token
reddit.refreshToken(
    function (success) {
        // Print the access token we just retrieved
        console.log(reddit.access_token);
    }
);

// Call authenticated GET endpoint
reddit.get(
    '/api/v1/me',
    {},
    function (error, response, body) {
        console.log(error);
        console.log(body);
    }
);

// Call authenticated GET listing endpoint with easy pagination
reddit.get(
    '/user/aihamh/submitted',
    {},
    function (error, response, body, next) {
        console.log(error);
        console.log(body);

        // next is not null, therefore there are more pages
        if (next) {
            next(); // Invoke next to retrieve the next page
        }
    }
);

// Call authenticated POST endpoint
reddit.post(
    '/api/comment',
    {
        api_type: 'json',
        text: 'Hello World!',
        thing_id: 'abc123'
    },
    function (error, response, body) {
        console.log(error);
        console.log(body);
    }
);