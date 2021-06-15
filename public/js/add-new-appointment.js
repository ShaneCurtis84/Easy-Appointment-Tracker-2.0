// VARIABLES
var appointmentDateSection = document.querySelector(".appointment-date");
var appointmentDetailsSection = document.querySelector(".appointment-details");

var dayArticle = document.querySelector(".days");
var hourArticle = document.querySelector(".appointment-hour");
var minuteArticle = document.querySelector(".appointment-minute");
var monthArticle = document.querySelector(".months");

var dateParagraphContainer = document.querySelector(".date-description");

// Using moment.js for the dates - year, month and day
var m = moment();
var currentDate = m.format("D");
var currentHour = m.format("HH");
var currentMinute = m.format("mm");
var currentMonth = m.format("MMMM");
var currentMonthNumber = m.format("MM");
var currentYear = m.format("YYYY");

var monthsArray = moment.months();
var daysArray = [];
var hoursArray = ["08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23",];
var minutesArray = ["00", "05", "10", "15", "20", "25", "30", "35", "40", "45", "50", "55",];
var appointmentDate, appointmentStartTime, currentMonthIndex, dayOfWeek, dateChosen, formattedDate, formattedMonth, monthChosen, monthChosenNumber;

currentMonthIndex = monthsArray.indexOf(currentMonth);
appointmentDetails = [];

// Function flow of EATen code
//loadAppointmentDetails--> onLoad -->startEntry -->monthSelected -->dateSelected -->hourSelectd -->minuteSelected -->
// setupAppointmentEntry -->createAppointmentEntry -->addNewAppointment-->
const buildButtons = async (itemArray, item=`item`, dataItem=`data-item`, itemSelected, itemArticle, valueAmount, additionalClass) => {
    for (i = 0; i < itemArray.length; i++) {
        const itemValue = itemArray[i];
        const itemButton = document.createElement("button");
        itemButton.setAttribute("class", `${item} button is-link mx-1 mt-3 ${additionalClass}`);
        itemButton.setAttribute(`${dataItem}`, itemValue);
        itemButton.setAttribute("id", itemValue);
        itemButton.textContent = itemValue;
        itemButton.addEventListener("click", itemSelected);
        itemArticle.append(itemButton);

        numberOfElementsShown(itemButton, valueAmount);
    }
};

// Function to highlight the button of the current month
function itemButtonHighlight(itemButtonSelect, itemIndex, item) {
    itemButtonSelect[itemIndex].setAttribute("class", `${item} button is-8 is-warning mx-1 mt-3`);
}

// When the Create Appointment Entry Button is clicked, a list of months will be displayed
const startEntry = async () => {
    // Creating the month buttons and appending it all to the month article
    buildButtons(monthsArray, item=`month`, dataItem=`data-month`, monthSelected, monthArticle, 12);

    // Attaching click event to current and future months in the year. The past month buttons are disabled
    var monthButtonSelect = monthArticle.querySelectorAll("button");
    for (i = currentMonthIndex - 1; i > -1; i--) {
        monthButtonSelect[i].setAttribute("title", "Disabled button");
        monthButtonSelect[i].setAttribute("disabled", "");
    }
    itemButtonHighlight(monthButtonSelect, currentMonthIndex, item=`month`);
}

// Once the month is selected by the user, a list of days for that month will be displayed
function monthSelected() {
    monthChosen = this.getAttribute("data-month");
    // Need to check that if there are any hours or minutes that these are cleared if and when the user changes the month
    clearButtons();

    // Changing the selected month button colour when clicked
    var monthChosenIndex = monthsArray.indexOf(monthChosen);
    var monthArticle = document.querySelector(".months");
    var monthButtonSelect = monthArticle.querySelectorAll("button");
    for (i = 0; i < monthsArray.length; i++) {
        monthButtonSelect[i].setAttribute("class", "month button is-link mx-1 mt-3");
        monthButtonSelect[currentMonthIndex].setAttribute("class", "month button is-link mx-1 mt-3");
        itemButtonHighlight(monthButtonSelect, monthChosenIndex);
    }
    monthChosenNumber = monthChosenIndex + 1;

    daysArray = [];
    getDaysArrayByMonth(currentYear, monthChosenNumber);

    // When the user selects a month, only the dates for that month will be shown - the dates for the previous month selected will be removed i.e. the number of buttons will equal the number of days in the month selected
    formattedMonth = ("0" + monthChosenNumber).slice(-2);
    const numberOfDaysInMonthChosen = moment(currentYear + "-" + formattedMonth).daysInMonth();
    // numberOfElementsShown(dayButtonSelect, numberOfDaysInMonthChosen);

    // Creating the day buttons and appending it all to the day article
    buildButtons(daysArray, item=`day`, dataItem=`data-day`, dateSelected, dayArticle, numberOfDaysInMonthChosen, additionalClass=`is-outlined`);

    var dayButtonSelect = appointmentDateSection.querySelectorAll(".day");
    // Get the current day and disable those days in the past
    if (currentMonthIndex === monthChosenIndex) {
        for (i = 0; i < daysArray.length; i++) {
            if (daysArray[i] < Number(currentDate)) {
                dayButtonSelect[i].setAttribute("disabled", "");
            }
        }
    }


}

// Once the day is selected, an option to add the time will be displayed
function dateSelected() {
    dateChosen = this.getAttribute("data-day");
    var hourButton, pItem;
    // Ensure Minutes are cleared from any previous months
    // var minutesSectionExists = appointmentDateSection.querySelectorAll(".minute");
    // numberOfElementsShown(minutesSectionExists, 0);

    var dayChosenIndex = daysArray.indexOf(dateChosen);
    var dayButtonSelect = appointmentDateSection.querySelectorAll(".day");
    // Changing the selected day button colour when clicked
    for (i = 0; i < daysArray.length; i++) {
        dayButtonSelect[i].setAttribute("class", "day button is-link is-outlined mx-1 mt-3");
        itemButtonHighlight(dayButtonSelect, dayChosenIndex, item=`day`);
    }

    hourArticle.setAttribute("class", "appointment-hour has-text-centered is-block mb-3");

    pItem = document.createElement("p");
    pItem.textContent = "Hour:";
    pItem.setAttribute("class", "has-text-weight-semibold");
    hourArticle.append(pItem);

    // Creating the hour buttons and appending it all to the hour article
    buildButtons(hoursArray, item=`hour`, dataItem=`data-hour`, hourSelected, hourArticle, 0);

    // Preventing the hour button and hour paragraph elements from being duplicated when the day is clicked on again by the user
    var hourButtonSelect = appointmentDateSection.querySelectorAll(".hour");
    numberOfElementsShown(hourButtonSelect, 16);
    var hourParagraphSelect = hourArticle.querySelectorAll("p");
    numberOfElementsShown(hourParagraphSelect, 1);

    if (currentMonthIndex === monthsArray.indexOf(monthChosen)) {
        var hourButtonSelect = appointmentDateSection.querySelectorAll(".hour");
        if (dateChosen === currentDate) {
            //Get the current hour and disable those hours in the past
            for (i = 0; i < hoursArray.length; i++) {
                if (hoursArray[i] < Number(currentHour)) {
                    hourButtonSelect[i].setAttribute("disabled", "");
                }
            }
        }
    }
}

function hourSelected() {
    var hourButtonSelect, minutesSection, minutesSectionExists, pItem;

    hourChosen = this.getAttribute("data-hour");
    var hourChosenIndex = hoursArray.indexOf(hourChosen);
    var hourButtonSelect = hourArticle.querySelectorAll(".hour");
    // Changing the selected hour button colour when clicked
    for (i = 0; i < hoursArray.length; i++) {
        hourButtonSelect[i].setAttribute("class", "hour button is-link mx-1 mt-3");
        hourButtonSelect[hourChosenIndex].setAttribute("class", "hour hourSelected button is-8 is-warning mx-1 mt-3");
    }

    minutesSection = document.querySelector(".appointment-minute");
    // need to empty minute data
    minutesSectionExists = minutesSection.querySelectorAll(".minute");
    numberOfElementsShown(minutesSectionExists, 0);
    minutesSectionExists = minutesSection.querySelectorAll("p");
    numberOfElementsShown(minutesSectionExists, 0);

    minuteArticle.setAttribute("class", "appointment-minute has-text-centered is-block mb-5");

    pItem = document.createElement("p");
    pItem.setAttribute("class", "has-text-weight-semibold");
    pItem.textContent = "Minutes:";
    minuteArticle.append(pItem);
    // Creating the minute buttons and appending it all to the minute article
    buildButtons(minutesArray, item=`minute`, dataItem=`data-minute`, minuteSelected, minuteArticle);

    var minuteButtonSelect = appointmentDateSection.querySelectorAll(".minute");

    if (currentMonthIndex === monthsArray.indexOf(monthChosen)) {
        //Get the current minute and disable those minutes in the past
        if (currentHour > "07" && hourChosen === currentHour) {
            for (i = 0; i < minutesArray.length; i++) {
                if (minutesArray[i] < Number(currentMinute)) {
                    minuteButtonSelect[i].setAttribute("disabled", "");
                }
            }
        }
    }
}

function minuteSelected() {
    hourChosen = document.querySelector(".hourSelected").getAttribute("data-hour");

    // Need to reset the minute selected in case user changes seletected minutes
    var minuteButtonSelect = minuteArticle.querySelectorAll("button");
    for (i = 0; i < minutesArray.length; i++) {
        minuteChosen = this.getAttribute("data-minute");
        minuteButtonSelect[i].setAttribute("class", "minute button is-link mx-1 mt-3");
        this.setAttribute("class", "minute minuteSelected is-8 button is-warning mx-1 mt-3");
    }

    var dateParagraph = document.createElement("p");
    dateParagraph.setAttribute("class", "chosen-appointment-date");

    appointmentStartTime = hourChosen + ":" + minuteChosen;
    appointmentDate = dateChosen + " " + monthChosen + " " + currentYear;

    // When the user selects a date, only the latest date paragraph will be shown - the previous one will be removed
    var dateParagraphClassSelect = document.querySelectorAll(".chosen-appointment-date");
    numberOfElementsShown(dateParagraphClassSelect, 0);

    var monthChosenIndex = monthsArray.indexOf(monthChosen);
    monthChosenNumber = monthChosenIndex + 1;
    formattedDate = currentYear + formattedMonth + dateChosen;
    dayOfWeek = moment(currentYear + "-" + monthChosenNumber + "-" + dateChosen, "YYYY-MM-DD").format("dddd");
    dateParagraph.innerHTML = `<span class="has-text-weight-semibold">Appointment Date:</span> ${dayOfWeek}, ${dateChosen} ${monthChosen} ${currentYear} at ${appointmentStartTime}`;
    dateParagraphContainer.append(dateParagraph);

    nextButtonCreate();
    var nextButtonSelect = document.querySelector(".next");
    nextButtonSelect.addEventListener("click", setupAppointmentEntry);
}

// The next button will appear when the user has selected a date for their appointment entry
function nextButtonCreate() {
    var nextButton = document.createElement("button");
    nextButton.setAttribute("class", "next button is-success is-right mt-3 px-5");
    nextButton.setAttribute("style", "margin-left: 75%; width: 25%;");
    nextButton.textContent = "Next";
    appointmentDateSection.append(nextButton);
    // Preventing the next button from duplicating
    var nextButtonSelect = document.querySelectorAll(".next");
    numberOfElementsShown(nextButtonSelect, 1);
}

/* FUNCTION FOR THE SECOND STEP IN THE CREATE APPOINTMENT PROCESS */
const setupAppointmentEntry = async () => {
    console.log("next button clicked");

    const appointmentForInput = document.getElementById("appointment-name-input");
    const appointmentWithInput = document.getElementById("person-appointment-with");
    const addressInput = document.getElementById("appointment-location");
    const notesInput = document.getElementById("notes");

    appointmentForInput.value = "";
    appointmentWithInput.value = "";
    addressInput.value = "";
    notesInput.value = "";
    appointmentDateSection.setAttribute("class", "is-hidden");
    appointmentDetailsSection.setAttribute("class", "appointment-details box is-block mx-3");
    const submitAppointmentEntryButton = document.querySelector(".submit-appointment");
    submitAppointmentEntryButton.addEventListener("click", addAppointmentFormHandler);
}

const addAppointmentFormHandler = async (event) => {
    event.preventDefault();
    const appointmentForInput = document.getElementById("appointment-name-input");
    const appointmentWithInput = document.getElementById("person-appointment-with");
    const addressInput = document.getElementById("appointment-location");
    const notesInput = document.getElementById("notes");

    const appointmentDate = currentYear + ("0" + monthChosenNumber).slice(-2) + ("0" + dateChosen).slice(-2);
    const appointmentTime = hourChosen + minuteChosen;
    const appointmentWhom = appointmentForInput.value;
    const appointmentWith = appointmentWithInput.value;
    const appointmentAddress = addressInput.value;
    const notesValue = notesInput.value;

    // console.log('appointmentDate', appointmentDate);
    // console.log('appointmentTime', appointmentTime);
    // console.log('appointmentWhom', appointmentWhom);
    // console.log('appointmentWith', appointmentWith);
    // console.log('appointmentAddress', appointmentAddress);
    // console.log('notesValue', notesValue);

    if (appointmentForInput && appointmentWhom && appointmentWithInput && appointmentWith && addressInput && appointmentAddress) {
        console.log("if statement entered");
        const response = await fetch('/api/appointments', {
            method: 'POST',
            body: JSON.stringify({ appointmentDate, appointmentTime, appointmentWhom, appointmentWith, appointmentAddress, notesValue }),
            headers: { 'Content-Type': 'application/json' },
        });
        // Redirecting user to the dashboard if response is ok
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            const error = `<p>*Failed to create appointment</p>`;
            document.querySelector('.error-message').innerHTML = error;
        }
    } else {
        const errorMessage = document.querySelector(".error");
        numberOfElementsShown(errorMessage, 0);
        let errorMessageListItem;
        if (!appointmentWhom) {
            errorMessageListItem ? errorMessageListItem = errorMessageListItem + `<li>• Appointment For Whom</li>`: errorMessageListItem = `<li>• Appointment For Whom</li>`;
        }
        if (!appointmentWith) {
            errorMessageListItem ? errorMessageListItem = errorMessageListItem + `<li>• Appointment With</li>` : errorMessageListItem = `<li>• Appointment With</li>`;
        }
        if (!appointmentAddress) {
            errorMessageListItem ? errorMessageListItem = errorMessageListItem + `<li>• Appointment Location</li>`: errorMessageListItem = `<li>• Appointment Location</li>`;
        }

        const errorMessageSection = document.querySelector('.error-message');
        errorMessageSection.setAttribute('class', 'error-message notification is-danger my-4 is-block');
        errorMessage.innerHTML = errorMessageListItem;
    }
}

// Getting the number of days in the month selected
function getDaysArrayByMonth(year, month) {
    formattedMonth = ("0" + month).slice(-2);
    var daysInMonth = moment(year + "-" + formattedMonth).daysInMonth();
    while (daysInMonth) {
        var monthUsed = moment(year + "-" + formattedMonth).date(daysInMonth);
        var dayNumber = monthUsed.format("D");
        daysArray.push(dayNumber);
        daysInMonth--;
    }
    daysArray.sort(function (a, b) {
        return a - b;
    });
}

// When the user selects a month/date, only the latest article will be shown - the previous one will be removed
function numberOfElementsShown(elementSelect, numberOfElements) {
    if (elementSelect.length > numberOfElements) {
        for (i = 0; i < elementSelect.length - numberOfElements; i++) {
            elementSelect[i].remove();
        }
    }
}

// Function to clear the date and time buttons
function clearButtons() {
    var dayButtonSelect = appointmentDateSection.querySelectorAll(".day");
    numberOfElementsShown(dayButtonSelect, 0);
    var hourButtonSelect = appointmentDateSection.querySelectorAll(".hour");
    numberOfElementsShown(hourButtonSelect, 0);
    var minutesSectionExists = appointmentDateSection.querySelectorAll(".minute");
    numberOfElementsShown(minutesSectionExists, 0);
    var minutesSectionExists = appointmentDateSection.querySelectorAll("p");
    numberOfElementsShown(minutesSectionExists, 0);
    var buttonSelect = appointmentDateSection.querySelectorAll(".next");
    numberOfElementsShown(buttonSelect, 0);
}

startEntry();


