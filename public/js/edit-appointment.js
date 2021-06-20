const body = document.querySelector("body");
body.setAttribute("style", "display: block;");

// Adding the flatpickr Date Picker to the appointment date input
flatpickr("#appointment-date", {
    altInput: true,
    altFormat: "j F Y",
    dateFormat: "Y-m-d",
    minDate: "today",
});
// Adding the flatpickr Time Picker to the appointment time input
flatpickr("#appointment-time", {
    enableTime: true,
    noCalendar: true,
    dateFormat: "H:i",
    minTime: "08:00",
    time_24hr: true
});

// Once the user submits their update, a success message will be display with a link to take them back to the dashboard
const successMessage = async () => {
    document.querySelector(".appointment-date").setAttribute("class", "appointment-date box is-block mx-3 is-hidden");
    let successMessageSection = document.querySelector(".success-message");
    successMessageSection.setAttribute("class", "success-message box is-block has-text-centered mx-3 notification is-success");
}

// Directs user to dashboard page when button clicked
document.querySelector(".dashboard").addEventListener("click", async (event) => {
    event.preventDefault();
    document.location.replace('/dashboard');
})

// Prevents duplication of elements - e.g. error message
const numberOfElementsShown = async (elementSelect, numberOfElements) => {
    if (elementSelect.length > numberOfElements) {
        for (i = 0; i < elementSelect.length - numberOfElements; i++) {
            elementSelect[i].remove();
        }
    }
}

// Once the user submits their edit, a PUT request is sent
const editAppointmentHandler = async (event) => {
    event.preventDefault();

    const time = document.querySelector('#appointment-time').value.trim();
    const hour = time.slice(0, 2);
    const minute = time.slice(3, 5);
    const appointmentTimeNew = `${hour}${minute}`;
    
    const appointmentDate = document.querySelector('#appointment-date').value.trim();
    const appointmentTime = appointmentTimeNew;
    const appointmentFor = document.querySelector('#appointment-for').value.trim();
    const appointmentWith = document.querySelector('#appointment-with').value.trim();
    const appointmentLocation = document.querySelector('#appointment-location').value.trim();
    const appointmentNotes = document.querySelector('#appointment-notes').value.trim();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    if (appointmentDate && appointmentTime && appointmentFor && appointmentWith && appointmentLocation) {
        const response = await fetch(`/api/appointments/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ appointmentDate, appointmentTime, appointmentFor, appointmentWith, appointmentLocation, appointmentNotes }),
            headers: { 'Content-Type': 'application/json' },
        });
        // Invoke the successMessage function if the response is ok
        if (response.ok) {
            successMessage();
        } else {
            const error = `<p>*Failed to edit appointment</p>`;
            document.querySelector('.error-message').innerHTML = error;
            alert(response.statusText);
        }
    } else {
        const errorMessage = document.querySelector(".error");
        numberOfElementsShown(errorMessage, 0);
        let errorMessageListItem;
        if (!appointmentDate) {
            errorMessageListItem ? errorMessageListItem = errorMessageListItem + `<li>• The Date of the Appointment</li>` : errorMessageListItem = `<li>• The Date of the Appointment</li>`;
        }
        if (!appointmentTime) {
            errorMessageListItem ? errorMessageListItem = errorMessageListItem + `<li>• The Appointment Start Time</li>` : errorMessageListItem = `<li>• The Appointment Start Time</li>`;
        }
        if (!appointmentFor) {
            errorMessageListItem ? errorMessageListItem = errorMessageListItem + `<li>• Who the Appointment is For</li>` : errorMessageListItem = `<li>• Who the Appointment is For</li>`;
        }
        if (!appointmentWith) {
            errorMessageListItem ? errorMessageListItem = errorMessageListItem + `<li>• Who the Appointment is Being Booked With</li>` : errorMessageListItem = `<li>• Who the Appointment is Being Booked With</li>`;
        }
        if (!appointmentLocation) {
            errorMessageListItem ? errorMessageListItem = errorMessageListItem + `<li>• The Address of the Appointment</li>` : errorMessageListItem = `<li>• The Address of the Appointment</li>`;
        }

        const errorMessageSection = document.querySelector('.error-message');
        errorMessageSection.setAttribute('class', 'error-message notification is-danger my-4 is-block');
        errorMessage.innerHTML = errorMessageListItem;
    }
};

// When the user clicks the edit appointment button, the editAppointmentHandler will be called
document.querySelector('#edit-appointment-button').addEventListener('click', editAppointmentHandler);
