import express from 'express';
import passport from 'passport';

const router = express.Router();

// Redirect to Google for authentication
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'], // Request access to these fields
  })
);

// Google callback URL
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Successful login, redirect to frontend
    res.redirect('http://localhost:3000/dashboard');
   console.log("Login Successful!")
  }
);

// Logout
router.get('/logout', (req, res) => {
  req.logout(() => {
    res.json({ msg: 'Logged out successfully!' });
  });
});

// Get the current user
router.get('/current_user', (req, res) => {
  res.json(req.user || null);
});

export default router;
