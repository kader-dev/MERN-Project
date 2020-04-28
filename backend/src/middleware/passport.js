const passport = require('passport');
const GoogleStrategy = require('passport-google-token').Strategy;
const User = require('../models/user')


passport.use('googleToken', new GoogleStrategy({
    clientID: '223699417515-n3cid348h0f557i948hi3g0cj9gb07uu.apps.googleusercontent.com',
    clientSecret: 'Yc6X3-Sh_p9mfB5TvlcSoJ8w',
}, async (accessToken, refreshToken, profile, done) => {
    try {
        // console.log(profile)
        const newUser = new User({
            method: 'google',
            First_name: profile._json.given_name,
            Last_name: profile._json.family_name,
            email: profile.emails[0].value,
            google: {
                id: profile.id,
                email: profile.emails[0].value
            }
        });
        done(null, newUser);
    } catch (error) {
        done(error, false, error.message);
    }
})
);
