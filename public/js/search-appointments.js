const searchAppointmentsFormHandler = async (event) => {
    event.preventDefault();
    console.log('searchAppointmentsFormHandler');

    let searchDateFrom = document.querySelector('#date-from').value.trim();
    let searchDateTo = document.querySelector('#date-to').value.trim();
    let appointmentForWhom = document.querySelector('#appointment-for-whom').value.trim();

    day = ('0' + new Date().getDate()).slice(-2);
    month = ('0' + (new Date().getMonth() + 1)).slice(-2);
    year = new Date().getFullYear();

    if (searchDateFrom !== '') {
        if (searchDateTo === '') {
            searchDateTo = (year +1) + '-' + month + '-' + day;
        }
    }

    if (searchDateTo !== '') {
        if (searchDateFrom === '') {
            searchDateFrom = year + '-' + month + '-' + day;
        }
    }

    if (searchDateTo < searchDateFrom) {
        alert('Date to search to cannot be before the search from date');
    }

    // partial page reload fetch cant redirect to another location
    document.location.replace(`/appointment/view-appointments?startDate=${searchDateFrom}&endDate=${searchDateTo}&appntForWhom=${appointmentForWhom}`);
};

document.querySelector('.search-appointment-form').addEventListener('submit', searchAppointmentsFormHandler);
