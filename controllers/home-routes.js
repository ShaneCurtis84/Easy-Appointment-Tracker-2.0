const router = require('express').Router();

router.get('/', async (request, response) => {
  if (request.session.loggedIn) {
    response.redirect('/dashboard');
    return;
  }
  response.render('homepage');
});

router.get('/login', async (request, response) => {
  if (request.session.loggedIn) {
    response.redirect('/dashboard');
    return;
  }
  response.render('login');
});

router.get('/signup', async (request, response) => {
  if (request.session.loggedIn) {
    response.redirect('/dashboard');
    return;
  }

  response.render('signup');
});

module.exports = router;
