import passport from "passport";
import User from "../models/user.model.js";

export const register = (req, res) => {
  User.register(
    new User({
      username: req.body.username,
    }),
    req.body.password,
    (err, user) => {
      if (err) {
        err.status = 404;
        return res.send(err);
      }

      return res.sendStatus(200);
    }
  );
};

export const login = passport.authenticate("local", {
  successRedirect: "/fasts/",
  failureRedirect: "/user/signup",
});

export const logout = (req, res) => {
  if (req.user || req.isAuthenticated()) {
    const username = req.user.username;
    req.logout();
    return res.json({
      status: "logout",
      msg: username,
    });
  }
  //res.send("unauth/noone is logged in");
};

export const checkAuthentication = (req, res) => {
  if (req.user || req.isAuthenticated()) {
    return res.send(req.user);
  }
  return res.json({
    status: "unauth",
    msg: "not authorized",
  });
};
