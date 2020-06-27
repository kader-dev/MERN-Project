const passport = require('passport');
const GoogleStrategy = require('passport-google-token').Strategy;
const FacebookStrategy = require('passport-facebook-token');
const User = require('../models/user')


passport.use('googleToken', new GoogleStrategy({
    clientID: '223699417515-n3cid348h0f557i948hi3g0cj9gb07uu.apps.googleusercontent.com',
    clientSecret: 'Yc6X3-Sh_p9mfB5TvlcSoJ8w',
    passReqToCallback: true,
}, async (req, accessToken, refreshToken, profile, done) => {
    try {
        let existingUser1 = await User.findOne({ "google.id": profile.id });
        if (existingUser1) {
            return done(null, existingUser1);
        }
        let existingUser2 = await User.findOne({ "email": profile.emails[0].value });
        if (existingUser2) {
            return done(null, existingUser2);
        }
        const newUser = new User({
            method: 'google',
            First_name: profile._json.given_name,
            Last_name: profile._json.family_name,
            email: profile.emails[0].value,
            picture: profile._json.picture,
            roles: ['teacher'],
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








passport.use('facebookToken', new FacebookStrategy({
    clientID: '227671341851240',
    clientSecret: '997bfbf3e33e088fdc238e51168a0331',
    passReqToCallback: true
}, async (req, accessToken, refreshToken, profile, done) => {
    try {

        console.log(profile)

        let existingUser1 = await User.findOne({ "facebook.id": profile.id });
        if (existingUser1) {
            return done(null, existingUser1);
        }
        let existingUser2 = await User.findOne({ "email": profile.emails[0].value });
        if (existingUser2) {
            return done(null, existingUser2);
        }
        const newUser = new User({
            method: 'facebook',
            First_name: profile._json.first_name,
            Last_name: profile._json.last_name,
            email: profile.emails[0].value,
            picture: profile.photos[0].value,
            roles: ['teacher'],
            facebook: {
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