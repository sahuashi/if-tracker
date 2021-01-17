import passport from 'passport';
import User from '../models/user.js';

export const register = (req, res) => {
    console.log(req.body.username);
    console.log(req.body.password);
    User.register(new User({username: req.body.username}), req.body.password, (err, user) => {
        if (err) {
            res.send(err);
        }
        passport.authenticate("local")(req, res, () => {
            res.send('user created and logged in');
            //res.redirect("/");
            res.send('/');
        });
    });
}

export const login = (req, res) => {
    //console.log('login route');
    res.send('login route');
}