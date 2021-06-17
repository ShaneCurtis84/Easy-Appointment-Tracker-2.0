const searchAppointmentsFormHandler = async (event) => {
    event.preventDefault();
    console.log('searchAppointmentsFormHandler');

    let searchDateFrom = document.querySelector('#date-from').value.trim();
    let searchDateTo = document.querySelector('#date-to').value.trim();
    let today = new Date();

    day = ('0' + new Date(today).getDate()).slice(-2);
    month = ('0' + (new Date(today).getMonth() + 1)).slice(-2);
    year = new Date(today).getFullYear();

    if (searchDateFrom === '') {
        searchFromDate = year + '-' + month + '-' + day;
    }

    if (searchDateTo === '') {
        searchDateTo = year + '-' + month + '-' + day;
    }

    if (searchDateTo < searchDateFrom) {
        alert('Date to search to cannot be before the search from date');
    }
    
    // partial page reload fetch cant redirect to another location
    document.location.replace(`/appointment/view-appointments?startDate=${searchDateFrom}&endDate=${searchDateTo}`);
};

document.querySelector('.search-appointment-form').addEventListener('submit', searchAppointmentsFormHandler);
