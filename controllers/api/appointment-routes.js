const router = require('express').Router();
const { Appointment } = require('../../models');


router.get('/', async (request, response) => {
    try {
        const dbAppointmentData = await Appointment.findAll({
            attributes: [
                'id',
                'appnt_date',
                'appnt_time',
                'appnt_for_whom',
                'appnt_with_whom',
                'appnt_location',
                'appnt_note',
                'created_at',
            ],
        });
        const appointments = dbAppointmentData.map((appointment) =>
            appointment.get({ plain: true })
        );
        response.json(appointments);
    } catch (err) {
        console.log(err);
        response.status(500).json(err);
    }   
});
router.post('/', async (request, response) => {
    try {
        const dbAppointmentData = Appointment.create({
            appnt_date: request.body.appointmentDate,
            appnt_time: request.body.appointmentTime,
            appnt_for_whom: request.body.appointmentWhom,
            appnt_with_whom: request.body.appointmentWith, 
            appnt_location: request.body.appointmentAddress, 
            appnt_note: request.body.notesValue,
            user_id: request.session.user_id,
        });

        response.status(200).json(dbAppointmentData);
    } catch (err) {
        console.log(err);
        response.status(500).json(err);
    }   
});

module.exports = router;