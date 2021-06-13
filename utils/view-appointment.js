// VARIABLES
var appointmentCardSection = document.querySelector(".appointment-cards");
var appointmentColumns = document.querySelector(".card-columns");

// Adding appointments to the appointment container
function addAppointment(appointmentDate, appointmentStartTime, appointmentWith, appointmentWhom, appointmentAddress) {
    //Create a column for each card
    var appointmentColumn = document.createElement("div");
    appointmentColumn.setAttribute("class", "column is-one-fifth card-columns-nested");

    //Create Card
    var appointmentCard = document.createElement("div");
    appointmentCard.setAttribute("class", "card");

    //Card Header and content
    var appointmentCardHeader = document.createElement("div");
    appointmentCardHeader.setAttribute("class", "card-header");
    var appointmentCardHeaderContent = document.createElement("div");
    appointmentCardHeaderContent.setAttribute("class", "card-header-title");
    var appointmentCardContent = document.createElement("div");
    appointmentCardContent.setAttribute("class", "card-content");
    // Access Appointment Date and Start time for Header Content
    var appointmentHeaderData = `
      <p class="my-3"><span class="has-text-weight-semibold">${appointmentDate}</span></p>
      <p class="my-3"><span class="has-text-weight-semibold">At : </span>${appointmentStartTime}</p>
    `;
    //Pull from arrays for Card Content
    var appointmentCardData = `
      <p class="my-3"><span class="has-text-weight-semibold">With:</span> ${appointmentWith}</p>
      <p class="my-3"><span class="has-text-weight-semibold">For Whom:</span> ${appointmentWhom}</p>
      <p class="my-3"><span class="has-text-weight-semibold">Address:</span> ${appointmentAddress}</p>
    `;
    //Create a card footer with edit and delete buttons
    var cardFooter = document.createElement("footer");
    cardFooter.setAttribute("class", "card-footer");
    editButton = document.createElement("button");
    editButton.setAttribute("class", "card-footer-item edit-btn");
    editButton.textContent = "Edit";
    deleteButton = document.createElement("button");
    deleteButton.setAttribute("class", "card-footer-item delete-btn");
    deleteButton.textContent = "Delete";

    //Append items to page dynamically
    appointmentCardHeaderContent.innerHTML = appointmentHeaderData;
    appointmentCardContent.innerHTML = appointmentCardData;
    appointmentColumns.append(appointmentColumn);
    appointmentCard.append(appointmentCardHeader, appointmentCardContent, cardFooter);
    appointmentCardHeader.append(appointmentCardHeaderContent);
    appointmentColumn.append(appointmentCard);
    cardFooter.append(editButton, deleteButton);
}

// Rendering the appointment cards
function renderAppointments() {
    appointmentCardSection.setAttribute("class", "appointment-cards is-block mx-3");
    appointmentDetailsSort = appointmentDetails.sort((a, b) => new Date(a.appointmentDate) - new Date(b.appointmentDate));
    appointmentColumns.innerHTML = "";
    for (let i = 0; i < appointmentDetails.length; i++) {
        addAppointment(appointmentDetails[i].appointmentDate, appointmentDetails[i].appointmentStartTime, appointmentDetails[i].appointmentWith, appointmentDetails[i].appointmentWhom, appointmentDetails[i].appointmentAddress);
        deleteButton.setAttribute("data-appointment-index", i);
    }
    if (appointmentDetails.length < 1) {
        var appointmentCardData = `<h4 id="no-appointments">No appointments have been currently saved.</h4>`;
        var appointmentCard = document.createElement("div");
        appointmentCard.setAttribute("class", "box");
        appointmentCard.innerHTML = appointmentCardData;
        appointmentColumns.append(appointmentCard);
    }
}