//
//   UFO Level 1 Application Code
//

// Rename data to something more human readable 
var ufos = data;

// grab a reference to the table body we want to change
var tbody = d3.select("tbody");

// Do the initial display of all UFO data
function displayUfos(ufosDisplay) {

    // Clear the tbody element of prevous output
    tbody.text("");

    // loop through each element to display in the table
    ufosDisplay.forEach((ufo) => {
        
        var row = tbody.append("tr");

        var cell = row.append("td")
        cell.text(ufo.datetime)

        cell = row.append("td")
        cell.text(ufo.city)

        cell = row.append("td")
        cell.text(ufo.state)

        cell = row.append("td")
        cell.text(ufo.country)

        cell = row.append("td")
        cell.text(ufo.shape)

        cell = row.append("td")
        cell.text(ufo.durationMinutes)

        cell = row.append("td")
        cell.text(ufo.comments)

    });

};

// After initial load display all UFOs
displayUfos(ufos);

// Select the button
var button = d3.select("#filter-btn");

// Select the form
var form = d3.select("#ufo-form");

// Get trigger events
button.on("click", searchDate);
form.on("submit", searchDate)

// Call the search function when event is triggered
function searchDate() {
    // Prevent the page from refreshing
    d3.event.preventDefault();
    
    console.log("initiated search");

    // Select the input element and get the raw HTML node
    var inputElement = d3.select("#datetime");

    // Get the value property of the input element
    var inputValue = inputElement.property("value");

    // log the input
    console.log(inputValue);
    
    // filter based on input value
    var filteredUfos = ufos.filter(ufo => ufo.datetime === inputValue);

    console.log(filteredUfos);

    displayUfos(filteredUfos);

}