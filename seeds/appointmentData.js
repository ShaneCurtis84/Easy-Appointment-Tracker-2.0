const { Appointment } = require('../models');

const appointmentData = [
  {
    appnt_date: '20210701',
    appnt_time: '0910',
    appnt_for_whom: 'Self',
    appnt_with_whom: 'Dr Sam',
    appnt_location: '26 Vanzuilecom Street Kojonup, Western Australia, 6395',
    appnt_note:'Bring your liscense',
    user_id:1
  },
  {
    appnt_date: '20210701',
    appnt_time: '1310',
    appnt_for_whom: 'Self',
    appnt_with_whom: 'Dr Sam',
    appnt_location: '26 Vanzuilecom Street Kojonup, Western Australia, 6395',
    appnt_note:'Bring your liscense',
    user_id:1
  },
  {
    appnt_date: '20210701',
    appnt_time: '1310',
    appnt_for_whom: 'Friend',
    appnt_with_whom: 'Dr Sam',
    appnt_location: '26 Vanzuilecom Street Kojonup, Western Australia, 6395',
    appnt_note:'Bring your liscense',
    user_id:1
  },
  {
    appnt_date: '20211001',
    appnt_time: '1220',
    appnt_for_whom: 'Friend',
    appnt_with_whom: 'Mechanic',
    appnt_location: '26 Clive Street Katanning, Western Australia, 6317',
    appnt_note:'Bring your liscense',
    user_id:1
  },
  {
    appnt_date: '20211101',
    appnt_time: '1320',
    appnt_for_whom: 'Peta',
    appnt_with_whom: 'Dr Smith',
    appnt_location: '49 Albany Highway, Kojonup, Western Australia, 6395',
    appnt_note:'Bring your liscense',
    user_id:2
  },
  {
    appnt_date: '20210715',
    appnt_time: '1020',
    appnt_for_whom: 'Sandra',
    appnt_with_whom: 'Dentist Sam',
    appnt_location: '26 Wellington Street, Perth, Western Australia, 6001',
    appnt_note: null,
    user_id:3
  },
];

const seedAppointment = () => Appointment.bulkCreate(appointmentData);

module.exports = seedAppointment;
