import passport from 'passport';
import User from '../models/user.model.js';

export const register = (req, res) => {
    User.register(new User({ username: req.body.username }), req.body.password, (err, user) => {
        if (err) {
            res.send(err);
        }
        
        passport.authenticate("local")(req, res, () => {
            res.send('user created and logged in');
            //res.redirect("/");
            res.send('/');
        })
    })
}

export const login = passport.authenticate("local", {
    successRedirect: "/fasts/",
    failureRedirect: "/user/signup"
})

export const logout = (req, res) => {
    console.log(`logging out user: ${req.user.username}`);
    req.logout();
    res.redirect("/user/signup");
}

export const checkAuthentication = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/user/signup");
}

export const getAccount = (req, res) => {
    res.send(`welcome to ${req.user.username}'s account`);
}