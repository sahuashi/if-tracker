import passport from 'passport';

import User from '../models/user.js';

export const register = (req, res) => {
  User.register(
    new User({ username: req.body.username }), req.body.password, (err, user) => {
      if (err) {
        err.status = 404;
        return res.send(err);
      }
      return res.sendStatus(200);
    },
  );
};

export const login = passport.authenticate('local', {
  successRedirect: '/fasts/',
  failureRedirect: '/user/login',
});

export const logout = (req, res) => {
  if (req.user || req.isAuthenticated()) {
    const { username } = req.user;
    req.logout();
    return res.json({
      status: 'logout',
      msg: username,
    });
  }
};

export const checkAuthentication = (req, res) => {
  if (req.user || req.isAuthenticated()) {
    return res.send(req.user);
  }
};
