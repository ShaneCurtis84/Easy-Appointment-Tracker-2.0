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
  console.log('Appointment Routes - daily-itinerary ', request.query);
  try {
    const dbAppointmentData = await Appointment.findAll({
      where: {
        user_id: request.session.user_id,
      },
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

// Get all the appointments
router.get('/view-all-appointments', withAuth, async (request, response) => {
  try {
    const dbAppointmentData = await Appointment.findAll({
      where: {
        user_id: request.session.user_id,
      },
      order: [
        ['appnt_date', 'ASC'],
        ['appnt_time', 'ASC'],
      ],
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
  console.log('Appointment Routes - search appointment');
  try {

    const dbAppointmentSearchData = await Appointment.findAll({
      attributes: ['appnt_for_whom']
    });

    const appointments = dbAppointmentSearchData.map((appointmentData) =>
      appointmentData.get({ plain: true })
    );
    const appointmentsForWhomUnique = [... new Set(appointments.map((appointmentData) =>
      appointmentData.appnt_for_whom
    ))];

    appointmentsForWhomUnique.sort();
    response.render('search-appointments', {
      appointmentsForWhomUnique,
      loggedIn: request.session.loggedIn,
    });

  } catch (error) {
    response.status(500).json(error);
  }
});

router.get('/view-appointments', withAuth, async (request, response) => {
  console.log('Appointment Routes - view appointment ', request.query);
  try {
    const dbAppointmentData = await Appointment.findAll();

    const searchDateFrom = request.query.startDate;
    const searchDateTo = request.query.endDate;
    const searchAppntForWhom = request.query.appntForWhom;

    let appointmentsFiltered = {};
    if (searchDateFrom !== '') {
      appointmentsFiltered = dbAppointmentData.filter(appntDate => appntDate.appnt_date >= searchDateFrom && appntDate.appnt_date <= searchDateTo);
      if (searchAppntForWhom != '') {
        appointmentsFiltered = appointmentsFiltered.filter(appnt => appnt.appnt_for_whom === searchAppntForWhom);
      }
    } else if (searchAppntForWhom != '') {
      appointmentsFiltered = dbAppointmentData.filter(appnt => appnt.appnt_for_whom === searchAppntForWhom);
    } else {
      appointmentsFiltered = dbAppointmentData;
    }

    const appointments = appointmentsFiltered.sort((firstAppnt, secondAppnt) => new Date(firstAppnt.appnt_date) - new Date(secondAppnt.appnt_date)).map((appointmentData) =>
      appointmentData.get({ plain: true }));

    response.render('appointment', { appointments, loggedIn: request.session.loggedIn, });

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