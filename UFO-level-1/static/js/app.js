//
//   UFO Application Code
//

// Rename data to something more human readable 
var ufos = data;

// grab a reference to the table body we want to change
var tbody = d3.select("tbody");

// Do the initial display of all UFO data
ufos.forEach((ufo) => {
      
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