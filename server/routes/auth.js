const router = require('express').Router();
const passport = require('passport');

const authController = require('../controllers/authController.js');

router.get(
  '/spotify',
  passport.authenticate('spotify', {
    scope: ['user-read-email', 'user-read-private'],
    showDialog: true,
  }),
  function (req, res) {
    // The request will be redirected to spotify for authentication, so this
    // function will not be called.
  }
);

router.get('/fail', (req, res) => {
  res.status(401).send('FAILURE TO AUTHENTICATE');
});

router.get(
  '/spotify/callback',
  passport.authenticate('spotify', {
    // if failure to authenticate:
    // placeholder
    failureRedirect: '/fail',
  }),
  authController.saveAccessToken,
  (req, res) => {
    // if successful authentication:

    console.log('SUCCESSFUL AUTHENTICATION');
    res.redirect('/dashboard');
  }
);

module.exports = router;
