var hourArray = [
    "9AM",
    "10AM",
    "11AM",
    "12PM",
    "1PM",
    "2PM",
    "3PM",
    "4PM",
    "5PM",
]

document.getElementById("currentDay").textContent = moment().format('dddd, MMMM Do');

function saveSchedule(event) {
    console.log("save");
    localStorage.setItem(event.data.hourName, event.data.content.val());
}

function constructTimeBlock(currentHour, thisHour24, thisHourName) {
    var timeBlockDiv = $("<div />");
    timeBlockDiv.addClass("row time-block");

    //Construct div to hold hour name
    var hourDiv = $("<div />");
    hourDiv.addClass("col-md-1 col-sm-2 col-2 hour");
    hourDiv.append(thisHourName);
    timeBlockDiv.append(hourDiv);

    //Construct div to hold saved tasks
    var descriptionDiv = $("<textarea />");
    descriptionDiv.val(localStorage.getItem(thisHourName));
    if (thisHour24 < currentHour) {
        descriptionDiv.addClass("col-md-10 col-sm-8 col-6 past");
    } else if (thisHour24 == currentHour) {
        descriptionDiv.addClass("col-md-10 col-sm-8 col-6 present");
    } else {
        descriptionDiv.addClass("col-sm-10 col-sm-8 col-6 future");
    }
    timeBlockDiv.append(descriptionDiv);


    //Construct Div to hold save button
    var saveDiv = $("<div />");
    saveDiv.addClass("saveBtn col-md-1 col-sm-2 col-2");
    saveDiv.click({hourName: thisHourName, content: descriptionDiv}, saveSchedule);
    var saveIcon = $("<I />");
    saveIcon.addClass("fas fa-save");
    saveDiv.append(saveIcon);
    //<i class="fas fa-save"></i>
    timeBlockDiv.append(saveDiv);

    var container = $(".container")[0];
    container.append(timeBlockDiv[0]);

}

var now = moment().format("H");

for (i in hourArray) {
    var dt = moment(hourArray[i], ["hA"]).format("HH");
    constructTimeBlock(now, dt, hourArray[i]);
}
