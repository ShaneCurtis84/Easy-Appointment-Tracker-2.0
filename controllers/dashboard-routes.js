const router = require('express').Router();
const { Appointment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (request, response) => {
    try {
        response.render('dashboard', {
            loggedIn: request.session.loggedIn,
        });
    } catch (error) {
        response.status(500).json(err);
    }
});


module.exports = router;
