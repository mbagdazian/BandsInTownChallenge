
//search artist function - bringsup artist name, image, and upcoming events with tickets link; 
//else "artist does not exist" else "no upcoming events"
      


      

      var getArtistFN = function(artistRequested){
      
      var queryURL = "https://rest.bandsintown.com/artists/"  + encodeURIComponent(artistRequested) + "?app_id=bit_challenge";
      
      // call to the BIT API
        $.ajax({
            url: queryURL,
             method: "GET"
           }).done(function(response) {
              //log the response JSON Object
              console.log(response);
                //puts image and band name on page
              var displayImage = function() {
                var imagelink = response.thumb_url;
                $('#img').attr("src", imagelink);
                $('#name').html(response.name);
              };
                  
            //calls image function
                  displayImage();

           });
      };
      
      //takes in user input and runs GetEventsFN and Get ArtistFN. 

      var capturedArtistName = function(){
        var artistName = ($('#uname').val());
        getArtistFN(artistName);
        $("#theEventsTable").empty();
        getEvents(artistName);
      };

      var gotoOffer = function(offerQueryURL){
          // for debugging
          console.log(offerQueryURL);
          // send the browser off to the new url. (There may be other ways to do this, but this works.)
          window.location.href = offerQueryURL;
          };


      var getEvents = function(artistRequested){
        var queryURLEvents = "https://rest.bandsintown.com/artists/"+ encodeURIComponent(artistRequested) +"/events?app_id=bit_challenge"

      // call to the BIT API
        $.ajax({
            url: queryURLEvents,
             method: "GET"
           }).done(function(response) {
              //log the response JSON Object
              console.log(response);
              //sets up new function to tell user if artist has shows and displayes them in the HTML table element. 
              var displayEventsData = function(){
                //if no shows, return message
                if (response.length === 0){
                  $("#theEventsTable").append("<tr><th>"+ 'Sorry, artist has no upcoming shows. Please check back soon' + "</th>");
                
                } else {
                  //if there are events, return list of events
                  for (i = 0; i < response.length; i++){
                    console.log(response.length);
                    //create var of tickets button
                      var tixSTR = "";

                      if (response[i].offers.length === 0) {
                        tixSTR = "Sorry, tix not available";
                      } else {
                        // this will create the callback string that you want                           
                        var onclickhandler = 'gotoOffer(\'' + response[i].offers[0].url + '\')';
                        // this is for debugging
                        console.log(onclickhandler);
                        // this sets up the callback handler on the button.
                        tixSTR ='<button id="mybutton" onclick="'+onclickhandler+'">Tickets</button>';
                      };

                    //create var of date with moment.js
                    var dateTime = moment(response[i].datetime).format("MMM, DD, YY") + " @ " + moment(response[i].datetime).format("h:mm");
                    
                    //create var of location to adjust for Foreign and Domestic shows
                    var location = response[i].venue.country == "United States" ? response[i].venue.region : response[i].venue.country;  

                    //dynamically build the table

                    $("#theEventsTable").append("<tr><td>"+ dateTime + "</td>"+ "<td id ='venueName'>"+ response[i].venue.name + "</td>" + "<td>"+ response[i].venue.city +", " + location + "</td>" + "<td id='tixBTN'>"+ tixSTR + "</td></tr>");
                  };
                };
              };
              //call function to cycle through events
              displayEventsData();
           });
        };



