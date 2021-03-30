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

function saveSchedule() {
    console.log("save");
    var contentArray = document.getElementsByTagName('textarea');
    for (i in hourArray) {
        console.log(hourArray[i], contentArray[i].value);
        localStorage.setItem(hourArray[i], contentArray[i].value);
    }
}

function constructTimeBlock(currentHour, thisHour24, thisHourName) {
    var timeBlockDiv = $("<div />");
    timeBlockDiv.addClass("row time-block");

    //Construct div to hold hour name
    var hourDiv = $("<div />");
    hourDiv.addClass("col-sm-1 hour");
    hourDiv.append(thisHourName);
    timeBlockDiv.append(hourDiv);

    //Construct div to hold saved tasks
    var descriptionDiv = $("<textarea />");
    descriptionDiv.val(localStorage.getItem(thisHourName));
    if (thisHour24 < currentHour) {
        descriptionDiv.addClass("col-sm-10 past");
    } else if (thisHour24 == currentHour) {
        descriptionDiv.addClass("col-sm-10 present");
    } else {
        descriptionDiv.addClass("col-sm-10 future");
    }
    timeBlockDiv.append(descriptionDiv);


    //Construct Div to hold save button
    var saveDiv = $("<div />");
    saveDiv.addClass("saveBtn col-sm-1");
    saveDiv.click(saveSchedule);
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
