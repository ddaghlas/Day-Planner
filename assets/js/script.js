var day = moment().format('dddd'); // day of the week
var date = moment().format("MMM Do, YYYY"); // today's date
var time = moment().format('h:mm a'); // current time
var currentHour = moment().format('H'); // current hour -- this will effect the color of the timeblocks depending on the current time of day
var hour = ["9:00 am", 
"10:00 am", 
"11:00 am", 
"12:00 pm", 
"1:00 pm", 
"2:00 pm", 
"3:00 pm", 
"4:00 pm", 
"5:00 pm", 
"6:00 pm",
"7:00 pm", 
"8:00 pm", 
"9:00 pm",
"10:00 pm",
"11:00 pm"
]

// this will set the display for the jumbotron to the current day of the week, date and time
$("#currentDay").text(day); // sets the text to display the functions above

$("#currentDate").text(date);

$("#currentTime").text(time);

// displays the timeblocks for standard business hours (9am-5pm)
for( var i = 0; i < hour.length; i++) {
    var hourBlock = $("<div>");
    var hour24 = i + 9;
    var p = $("<p>");
    hourBlock.addClass("hour row time-block");
    hourBlock.attr("data-hour", hour[i]);
    p.text(hour[i]).addClass("col-md-2 col-sm-1");
    // console.log(hour24);
    // console.log(currentHour);

    // this will color code the timeblocks according to real time
    // if it's 10:15 am, the 10:00 am hour block will be red
        // 9:00 am will be grey 
        // all future hours will be green 
    if (hour24 < parseInt(currentHour)) {
        hourBlock.addClass("past");
    } else if (hour24 > parseInt(currentHour)) {
        hourBlock.addClass("future")
    
    } else {
        hourBlock.addClass("present")
    }

    // created text input area within each of the timeblocks
    var textArea = $("<textarea>").addClass("col-md-9"); // links the textarea element in the CSS 

    // created a save button for each of the timeblocks
    // it should be saved to local storage
    var saveBtn = $("<div>").addClass("col-md-1 saveBtn").text("Save"); // links to .saveBtn in CSS

    // appending to the container class in HTML
    hourBlock.append(p, textArea, saveBtn);
    $(".container").append(hourBlock);
    var task = localStorage.getItem(hour[i]);
    textArea.val(task); // allowing the user to save their text to local storage
}

// preventing the default reload of the browser page when the user clicks the "save" button
$(".saveBtn").on("click", function(event) {
    event.preventDefault();
    console.log(hour[i], textArea.val());
    console.log(saveBtn);

    var task = $(this).siblings("textarea").val();
    var key = $(this).siblings("p").text();
    localStorage.setItem(key, task)
})