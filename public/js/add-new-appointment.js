// VARIABLES
let appointmentDateSection = document.querySelector(".appointment-date");
let appointmentDetailsSection = document.querySelector(".appointment-details");

let dayArticle = document.querySelector(".days");
let hourArticle = document.querySelector(".appointment-hour");
let minuteArticle = document.querySelector(".appointment-minute");
let monthArticle = document.querySelector(".months");

let dateParagraphContainer = document.querySelector(".date-description");

// Using moment.js for the dates - year, month and day
let m = moment();
let currentDate = m.format("D");
let currentHour = m.format("HH");
let currentMinute = m.format("mm");
let currentMonth = m.format("MMMM");
let currentMonthNumber = m.format("MM");
let currentYear = m.format("YYYY");

let monthsArray = moment.months();
let daysArray = [];
const hoursArray = ["08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23",];
const minutesArray = ["00", "05", "10", "15", "20", "25", "30", "35", "40", "45", "50", "55",];
let appointmentDate, appointmentStartTime, currentMonthIndex, dayOfWeek, dateChosen, formattedDate, formattedMonth, monthChosen, monthChosenNumber;

currentMonthIndex = monthsArray.indexOf(currentMonth);
appointmentDetails = [];

// Building the buttons for the month, day, hour and minutes
const buildButtons = async (itemArray, item, dataItem, itemSelected, itemArticle, valueAmount, additionalClass) => {
    for (i = 0; i < itemArray.length; i++) {
        const itemValue = itemArray[i];
        const itemButton = document.createElement("button");
        itemButton.setAttribute("class", `${item} button is-link mx-1 mt-3 ${additionalClass}`);
        itemButton.setAttribute(dataItem, itemValue);
        itemButton.setAttribute("id", itemValue);
        itemButton.textContent = itemValue;
        itemButton.addEventListener("click", itemSelected);
        itemArticle.append(itemButton);
        numberOfElementsShown(itemButton, valueAmount);
    }
};
// When the user selects a month/date, only the latest article will be shown - the previous one will be removed
const numberOfElementsShown = async (elementSelect, numberOfElements) => {
    if (elementSelect.length > numberOfElements) {
        for (i = 0; i < elementSelect.length - numberOfElements; i++) {
            elementSelect[i].remove();
        }
    }
}

// Checks the current period and disables the buttons that relate to the past
const ifInThePast = async (chosenItem, currentItem, itemArray, currentPeriod, itemButtonSelect) => {
    if (currentMonthIndex === monthsArray.indexOf(monthChosen)) {
        if (chosenItem === currentItem) {
            for (i = 0; i < daysArray.length; i++) {
                if (itemArray[i] < Number(currentPeriod)) {
                    itemButtonSelect[i].setAttribute("title", "Disabled button");
                    itemButtonSelect[i].setAttribute("disabled", "");
                }
            }
        }
    } 
}

// Getting the number of days in the month selected
const getDaysArrayByMonth = async (year, month) => {
    formattedMonth = ("0" + month).slice(-2);
    let daysInMonth = moment(year + "-" + formattedMonth).daysInMonth();
    while (daysInMonth) {
        let monthUsed = moment(year + "-" + formattedMonth).date(daysInMonth);
        let dayNumber = monthUsed.format("D");
        daysArray.push(dayNumber);
        daysInMonth--;
    }
    daysArray.sort(function (a, b) {
        return a - b;
    });
}

// Building an h5 header
const buildHeading = async (paragraphContent, elementSelect) => {
    let headerItem = document.createElement("h5");
    headerItem.setAttribute("class", "has-text-weight-semibold mt-3");
    headerItem.textContent = paragraphContent;
    elementSelect.append(headerItem);
}

// Changing the selected button colour when clicked
const highlightSelectedButton = async (itemArray, periodChosen, elementChosen, item, additionalClass) => {
    const chosenIndex = itemArray.indexOf(periodChosen);
    const buttonSelect = appointmentDateSection.querySelectorAll(elementChosen);
    for (i = 0; i < itemArray.length; i++) {
        buttonSelect[i].setAttribute("class", `${item} button is-link mx-1 mt-3 ${additionalClass}`);
        itemButtonHighlight(buttonSelect, chosenIndex, item);
    }
}

// Function to clear the date and time buttons
const clearElements = async (elementSectionTarget, elementChosen) => {
    let elementSelector = elementSectionTarget.querySelectorAll(elementChosen);
    numberOfElementsShown(elementSelector, 0);
}

// Function to highlight the button of the current month
const itemButtonHighlight = async (itemButtonSelect, itemIndex, item) => {
    itemButtonSelect[itemIndex].setAttribute("class", `${item} button is-warning mx-1 mt-3`);
}

// Once the month is selected by the user, a list of days for that month will be displayed
async function monthSelected () {
    monthChosen = this.getAttribute("data-month");
    // Need to check that if there are any hours or minutes that these are cleared if and when the user changes the month
    clearElements(appointmentDateSection, `.day, .hour, .minute, h5, .next`);

    // Changing the selected month button colour when clicked
    const monthChosenIndex = monthsArray.indexOf(monthChosen);
    const monthButtonSelect = appointmentDateSection.querySelectorAll(".month");
    for (i = 0; i < monthsArray.length; i++) {
        monthButtonSelect[i].setAttribute("class", "month button is-link mx-1 mt-3");
        monthButtonSelect[currentMonthIndex].setAttribute("class", "month button is-link mx-1 mt-3");
        itemButtonHighlight(monthButtonSelect, monthChosenIndex, `month`);
    }
    monthChosenNumber = monthChosenIndex + 1;
    daysArray = [];
    getDaysArrayByMonth(currentYear, monthChosenNumber);

    // When the user selects a month, only the dates for that month will be shown - the dates for the previous month selected will be removed i.e. the number of buttons will equal the number of days in the month selected
    formattedMonth = ("0" + monthChosenNumber).slice(-2);
    const numberOfDaysInMonthChosen = moment(currentYear + "-" + formattedMonth).daysInMonth();
    // Creating the day buttons and appending it all to the day article
    buildButtons(daysArray, `day`, `data-day`, dateSelected, dayArticle, numberOfDaysInMonthChosen, additionalClass=`is-outlined`);

    // Get the current day and disable those days in the past
    const dayButtonSelect = appointmentDateSection.querySelectorAll(".day");
    ifInThePast(monthChosenIndex, currentMonthIndex, daysArray, currentDate, dayButtonSelect);
}

// Once the day is selected, an option to add the time will be displayed
async function dateSelected () {
    dateChosen = this.getAttribute("data-day");
    highlightSelectedButton(daysArray, dateChosen, `.day`, `day`,  `is-outlined`);

    // Clearing the hour, minute, paragraph and next elements when the date button is clicked
    clearElements(appointmentDateSection, `.hour, .minute, h5, .next`);

    // Building the Hour header above the button
    buildHeading(`Hour:`, hourArticle);

    // Creating the hour buttons and appending it all to the hour article
    buildButtons(hoursArray, `hour`, `data-hour`, hourSelected, hourArticle);

    //Get the current hour and disable those hours in the past
    const hourButtonSelect = appointmentDateSection.querySelectorAll(".hour");
    ifInThePast(dateChosen, currentDate, hoursArray, currentHour, hourButtonSelect);
}

async function hourSelected () {
    hourChosen = this.getAttribute("data-hour");
    highlightSelectedButton(hoursArray, hourChosen, `.hour`, `hour`);

    // Clearing the next, minute and paragraph elements when the hour button is clicked
    clearElements(appointmentDateSection, `.next`);
    clearElements(minuteArticle, `.minute, h5`);

    // Building the Minute header above the button
    buildHeading(`Minutes:`, minuteArticle);

    // Creating the minute buttons and appending it all to the minute article
    buildButtons(minutesArray, `minute`, `data-minute`, minuteSelected, minuteArticle);

    //Get the current minute and disable those minutes in the past
    const minuteButtonSelect = appointmentDateSection.querySelectorAll(".minute");
    ifInThePast(hourChosen, currentHour, minutesArray, currentMinute, minuteButtonSelect);
}

async function minuteSelected () {
    minuteChosen = this.getAttribute("data-minute");
    highlightSelectedButton(minutesArray, minuteChosen, `.minute`, `minute`);

    const dateParagraph = document.createElement("p");
    dateParagraph.setAttribute("class", "chosen-appointment-date");
    appointmentStartTime = hourChosen + ":" + minuteChosen;
    appointmentDate = dateChosen + " " + monthChosen + " " + currentYear;

    // When the user selects a date, only the latest date paragraph will be shown - the previous one will be removed
    clearElements(appointmentDateSection, `.chosen-appointment-date`);

    const monthChosenIndex = monthsArray.indexOf(monthChosen);
    monthChosenNumber = monthChosenIndex + 1;
    formattedDate = currentYear + formattedMonth + dateChosen;
    dayOfWeek = moment(currentYear + "-" + monthChosenNumber + "-" + dateChosen, "YYYY-MM-DD").format("dddd");
    dateParagraph.innerHTML = `<span class="has-text-weight-semibold">Appointment Date:</span> ${dayOfWeek}, ${dateChosen} ${monthChosen} ${currentYear} at ${appointmentStartTime}`;
    dateParagraphContainer.append(dateParagraph);
    // Adding the next button to the page
    nextButtonCreate();
    const nextButtonSelect = document.querySelector(".next");
    nextButtonSelect.addEventListener("click", setupAppointmentEntry);
}

// The next button will appear when the user has selected a date for their appointment entry
const nextButtonCreate = async () => {
    let nextButton = document.createElement("button");
    nextButton.setAttribute("class", "next button is-success is-right mt-3 px-5");
    nextButton.setAttribute("style", "margin-left: 75%; width: 25%;");
    nextButton.textContent = "Next";
    appointmentDateSection.append(nextButton);
    // Preventing the next button from duplicating
    const nextButtonSelect = document.querySelectorAll(".next");
    numberOfElementsShown(nextButtonSelect, 1);
}

/* FUNCTION FOR THE SECOND STEP IN THE CREATE APPOINTMENT PROCESS */
const setupAppointmentEntry = async () => {
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

const successMessage = async () => {
    appointmentDetailsSection.setAttribute("class", "appointment-details box is-block mx-3 is-hidden");
    appointmentDateSection.setAttribute("class", "appointment-date box is-block mx-3 is-hidden");
    let successMessageSection = document.querySelector(".success-message");
    successMessageSection.setAttribute("class", "success-message box is-block has-text-centered mx-3 notification is-success");
}

// Directs user to particular page depending on the button they click
document.querySelector(".new-appointment").addEventListener("click", async (event) => {
    event.preventDefault();
    document.location.replace('/appointment/new');
})
document.querySelector(".dashboard").addEventListener("click", async (event) => {
    event.preventDefault();
    document.location.replace('/dashboard');
})

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
    // Posting the data to the api/appointments router when the submit button is successfully submitted
    if (appointmentForInput && appointmentWhom && appointmentWithInput && appointmentWith && addressInput && appointmentAddress) {
        console.log("if statement entered");
        const response = await fetch('/api/appointments', {
            method: 'POST',
            body: JSON.stringify({ appointmentDate, appointmentTime, appointmentWhom, appointmentWith, appointmentAddress, notesValue }),
            headers: { 'Content-Type': 'application/json' },
        });
        // Invoke the successMessage function if the response is ok
        if (response.ok) {
            successMessage();
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

// Begins appointment entry process once the new appointment page loads
const init = async () => {
    // Creating the month buttons and appending it all to the month article
    buildButtons(monthsArray, `month`, `data-month`, monthSelected, monthArticle);
    // Attaching click event to current and future months in the year. The past month buttons are disabled
    const monthButtonSelect = appointmentDateSection.querySelectorAll(".month");
    for (i = currentMonthIndex - 1; i > -1; i--) {
        monthButtonSelect[i].setAttribute("title", "Disabled button");
        monthButtonSelect[i].setAttribute("disabled", "");
    }
    itemButtonHighlight(monthButtonSelect, currentMonthIndex, `month`);
}
init();