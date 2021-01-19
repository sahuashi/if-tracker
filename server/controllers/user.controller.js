import passport from 'passport';
import User from '../models/user.model.js';

export const register = (req, res) => {
    User.register(new User({ username: req.body.username }), req.body.password, (err, user) => {
        if (err) {
            err.status = 404;
            return res.send(err);
        }
        
        passport.authenticate("local")(req, res, () => {
            return res.send(req.user);
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

export const checkAuthentication = (req, res) => {
    if(req.user || req.isAuthenticated()){
        return res.send(req.user);
    }
    res.send('not authenticated/no user');
    //res.redirect("/user/signup");
}

export const getAccount = (req, res) => {
    res.send(`welcome to ${req.user.username}'s account`);
}