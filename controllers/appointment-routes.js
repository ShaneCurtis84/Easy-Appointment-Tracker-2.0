const router = require('express').Router();
const { Appointment } = require('../models');
const withAuth = require('../utils/auth');

// Get the add new appointment page
router.get('/new', withAuth, async (request, response) => {
  try {
    response.render('add-new-appointment', { loggedIn: request.session.loggedIn });
  } catch (err) {
    console.log(err);
    response.status(500).json(err);
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
    response.status(500).json(error);
  }
});
router.get('/search-appointments', withAuth, async (request, response) => {
  console.log('Appointment Routes -search appointment');
  try {

    response.render('search-appointments', {
      loggedIn: request.session.loggedIn,
    });

  } catch (error) {
    response.status(500).json(error);
  }
});
router.get('/view-appointments', withAuth, async (request, response) => {
  try {
    const dbAppointmentData = await Appointment.findAll({
    });
    const searchDateFrom = request.query.startDate;
    const searchDateTo = request.query.endDate;

    const appointmentsFiltered = dbAppointmentData.filter(appntDate => appntDate.appnt_date >= searchDateFrom && appntDate.appnt_date <= searchDateTo);

    const appointments = appointmentsFiltered.sort((a,b) => new Date(a.appnt_date) - new Date(b.appnt_date)).map((appointmentData) =>
    appointmentData.get({ plain: true }));

    response.render('appointment', {appointments, loggedIn: request.session.loggedIn, });
    
  } catch (error) {
    response.status(500).json(error);
  }
});
router.get('/:id', async (request, response) => {
  try {
    const dbAppointmentData = await Appointment.findByPk(request.params.id, {
    });
    const appointment = dbAppointmentData.get({ plain: true });
    response.render('appointment', { appointment, loggedIn: request.session.loggedIn });
  } catch (err) {
    console.log(err);
    response.status(500).json(err);
  }
});

module.exports = router;