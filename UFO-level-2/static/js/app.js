//
//   UFO Level 2 Application Code
//

// Rename data to something more human readable 
var ufos = data;

//
// Displays the filtered or unfiltered UFO data
//

function displayUfos(ufosDisplay) {

    // grab a reference to the table body we want to change
    var tbody = d3.select("tbody");

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

}

//
// Check to see if inputValue is present and matched the
// UFO object value that is passed
//
// A blank value is equivalent to selecting all values for
// that UFO attribute and returns a "value is present" 
// (true)
//

function isValuePresent(element, ufoValue) {
    
    var valuePresent = true;

    // Select the input element and get the raw HTML node
    var inputElement = d3.select(element);

    // Get the value property of the input element
    var inputValue = inputElement.property("value");

    // If input is present and doesn't match return false
    if (inputValue.length > 0 && (inputValue != ufoValue)) {
        valuePresent = false;
    }
    
    //console.log(`input value: ${inputValue} is ${valuePresent}`)

    return valuePresent;
}

function isAll(element) {

     // Select the input element and get the raw HTML node
    var inputElement = d3.select(element);

    // Get the value property of the input element
    var inputValue = inputElement.property("value");

    return inputValue == 'all';
}

//
// Cycle through all the filter inputs to see if any match
//
// Remember a blank of missing input value means I want all
// possible values for that UFO attribute 
//

function checkInputValues(ufo) {

    // match the filtered elements if all true then show
    var matched = true;

    // Check each of the elements one at a time
    if ((matched === true) && !isValuePresent("#datetime", ufo.datetime)) {
        matched = false;
    }

    if ((matched === true) && !isValuePresent("#city", ufo.city)) {
        matched = false;
    }

    if ((matched === true) && !isValuePresent("#state", ufo.state)) {
        matched = false;
    }

    if ((matched === true) && 
        !isAll("#shape") && 
        !isValuePresent("#shape", ufo.shape)) {
        matched = false;
    }

    if ((matched === true) && !isValuePresent("#duration", ufo.durationMinutes)) {
        matched = false;
    }

    // pass back state to filter 
    return matched;

}

//
// Call the search function when event is triggered
//

function searchInputs() {

    // Prevent the page from refreshing
    d3.event.preventDefault();
    
    // filter based on input values
    var finalUfoList = ufos.filter(ufo => checkInputValues(ufo));

    // display the final list of UFOs after the filter
    displayUfos(finalUfoList);

}

function onchange() {
   selectValue = d3.select(this).property('value')
   console.log(selectValue); 
   searchInputs();
}

// Select the button
var button = d3.select("#filter-btn");

// Select the form
var form = d3.select("#ufo-form");

// Get trigger events
button.on("click", searchInputs);
form.on("submit", searchInputs);

//
// We want the enter button on all inputs fields to 
// trigger a search
//
d3.selectAll("input").on("keypress", function() {
    // Look for enter button, if so then call search
    if (d3.event.keyCode === 13) {
        searchInputs();
    }
});

var uniqueShapes = [...new Set(ufos.map(ufo => ufo.shape))].sort();

console.log(uniqueShapes);

var shapeDropdown = d3.select("#shape");

var options = shapeDropdown
    .selectAll('option')
    .data(uniqueShapes).enter()
    .append('option')
      .text(function(d) { return d; })
      .attr("value", function (d) {
        return d;});
      
shapeDropdown.on('change', onchange)


// After initial load display all UFOs
displayUfos(ufos);