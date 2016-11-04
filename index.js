// We import all the needed libraries and dependencies
var express = require('express'), moment = require('moment'), app = new express();

// We use a static webpage for instructions
app.use(express.static('public'));

// We get a route parameter and analyze it (if it's a valid date or not)
app.get("/:date_input", function(req, res) {

	/* 
	
	We declate an empty variable called naturalDate, which will take the value of our input's natural date
	We also use a ternary operator to validate a possible Unix timestamp
	
	*/
	var naturalDate, unixTimestamp = Number(req.params.date_input) ? Number(req.params.date_input) : null;
	
	// If our input equals a Unix timestamp, we convert it into a natural date
	if (unixTimestamp !== null) naturalDate = moment.unix(unixTimestamp).format("MMMM Do, YYYY");
	// If our input doesn't equal a Unix timestamp, we try to convert it into a natural date first, then into a Unix timestamp
	else naturalDate = moment(req.params.date_input).format("MMMM Do, YYYY"), unixTimestamp = moment(req.params.date_input).format("X");
	
	var dateObj = {"unix": null, "natural": null};
	
	// If we receive invalid dates as a route parameter, we equal our JSON object's values as null
	if (unixTimestamp !== "Invalid date" && naturalDate !== "Invalid date") {
		dateObj = {
			"unix": unixTimestamp,
			"natural": naturalDate
		};
	}
	
	res.json(dateObj);
});

app.listen(process.env.PORT || 7000);