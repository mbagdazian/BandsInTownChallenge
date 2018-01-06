
//search artist function - bringsup artist name, image, and upcoming events with tickets link; 
//else "artist does not exist" else "no upcoming events"
var search = window.location.search;
var value = search.split('=');
var encodedArtist = value[value.length - 1]
var decodedArtist = decodeURIComponent(encodedArtist);
      
var artistQueryUrl = "https://rest.bandsintown.com/artists/"  + encodedArtist + "?app_id=bit_challenge";
var eventQueryUrl = "https://rest.bandsintown.com/artists/"+ encodedArtist +"/events?app_id=bit_challenge"
  
// ARTIST INFO    
// call to the BIT API
$.ajax({
	url: artistQueryUrl,
	method: "GET"
}).done(displayArtistInfo);

// EVENT INFO
$.ajax({
	url: eventQueryUrl,
	method: "GET"
}).done(displayEventsData)


function displayArtistInfo(response) {
	var imagelink = response.thumb_url;
	var name = response.name;

	$('.img').attr("src", imagelink);
	$('.name').html(name);
};

//dynamically build the table
function displayEventsData(response){
	console.log(response);

	// if no response, early return
	if (!response.length) {

		$(".theEventsTable").append("<tr><th>"+ 'Sorry, artist has no upcoming shows. Please check back soon' + "</th>");

		return;
	}

	response.forEach(function(eventInfo, i) {

		//create var of date with moment.js
		var dateTime = moment(eventInfo.datetime).format("MMM DD");

		//create var of location to adjust for Foreign and Domestic shows
		var location = eventInfo.venue.country === "United States" ? eventInfo.venue.region : eventInfo.venue.country; 
		var venue = eventInfo.venue.name;
		var offers = eventInfo.offers;

		var row = $('<div class="row">');

		var innerWrapper = $('<div class="wrapper"></div>')
		row.append(innerWrapper);
		console.log(innerWrapper.classList);
		innerWrapper.append('<div class="date">' + dateTime + '</div>');
		innerWrapper.append('<div class="venueName">' + venue + '</div>');
		innerWrapper.append('<div class="location">' + location + '</div>');

		if (offers.length === 0) {
			row.append('<div class="noTixMessage">No Tickets</div>')
		} else {
			var offerUrl = eventInfo.offers[0].url;
			row.append('<a class="buttonContainer" href="' + offerUrl + '"><button class="button">Tickets</button></a>')
		}


		$('.theEventsTable').append(row);

	})
};

