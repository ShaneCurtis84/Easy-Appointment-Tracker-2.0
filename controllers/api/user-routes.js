const router = require('express').Router();
const { User } = require('../../models');

// CREATE new user
router.post('/', async (request, response) => {
  try {
    const dbUserData = await User.create({
      username: request.body.username,
      email: request.body.email,
      password: request.body.password,
    });

    request.session.save(() => {
      request.session.user_id = dbUserData.id;
      request.session.username = dbUserData.username;
      request.session.email = dbUserData.email;
      request.session.loggedIn = true;
      response.status(200).json(dbUserData);
    });
  } catch (error) {
    response.status(500).json(error);
  }
});

// Login
router.post('/login', async (request, response) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        email: request.body.email,
      },
    });

    if (!dbUserData) {
      response.status(400).json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    const validPassword = await dbUserData.checkPassword(request.body.password);

    if (!validPassword) {
      response.status(400).json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    request.session.save(() => {
      request.session.user_id = dbUserData.id;
      request.session.username = dbUserData.username;
      request.session.email = dbUserData.email;
      request.session.loggedIn = true;
      response.status(200).json({ user: dbUserData, message: 'You are now logged in!' });
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

// Logout
router.post('/logout', (request, response) => {
  if (request.session.loggedIn) {
    request.session.destroy(() => {
      response.status(204).end();
    });
  } else {
    response.status(404).end();
  }
});

module.exports = router;
