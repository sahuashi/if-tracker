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
    successRedirect: "/user",
    failureRedirect: "/user/signup"
})

export const logout = (req, res) => {
    req.logout();
    //res.send('Logged out successfully!');
    res.redirect("/user/signup");
}