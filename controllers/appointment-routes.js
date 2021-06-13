const router = require('express').Router();
const { Appointment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/new-appointment', withAuth, async (request, response) => {
  try {
    const dbAppointmentData = await Appointment.findAll({
    });

    const appointments = dbAppointmentData.map((appointmentData) =>
      appointmentData.get({ plain: true })
    );
    response.render('appointment', {
      appointments,
      loggedIn: request.session.loggedIn,
    });
  } catch (error) {
    response.status(500).json(error);
  }
});
router.get('/daily-itinerary', withAuth, async (request, response) => {
  try {
    const dbAppointmentData = await Appointment.findAll({
    });

    const appointments = dbAppointmentData.map((appointmentData) =>
      appointmentData.get({ plain: true })
    );
    response.render('appointment', {
      appointments,
      loggedIn: request.session.loggedIn,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});
router.get('/view-appointments', withAuth, async (request, response) => {
  try {
    const dbAppointmentData = await Appointment.findAll({
    });

    const appointments = dbAppointmentData.map((appointmentData) =>
      appointmentData.get({ plain: true })
    );
    response.render('appointment', {
      appointments,
      loggedIn: request.session.loggedIn,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});
router.get('/:id', async (request, response) => {
  try {
    const dbAppointmentData = await Appointment.findByPk(req.params.id, {
    });
    const appointment = dbAppointmentData.get({ plain: true });
    res.render('appointment', { appointment, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;