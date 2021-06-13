// Function to delete the appointment when the delete button is clicked
function deleteAppointment(event) {
    var element = event.target;
    if (element.matches(".delete-btn") === true) {
        var index = element.getAttribute("data-appointment-index");
        appointmentDetails.splice(index, 1);
        saveAppointmentDetails();
        renderAppointments();
    }
}
// Click event for the delete button in the appointment card
function deleteClickEvent() {
    deleteButton = document.querySelectorAll(".delete-btn");
    cardContainer = document.querySelector(".card-columns");
    cardContainer.addEventListener("click", deleteAppointment);
}

// Function to run when the webpage loads - user will see the Create Appointment Entry button on the top of the page below the header
function onLoad() {
    deleteClickEvent()
}

onLoad();