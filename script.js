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

var now = moment().format("H");
console.log(now);
for (i in hourArray) {
    var dt = moment(hourArray[i], ["hA"]).format("H");

    console.log(dt)
}