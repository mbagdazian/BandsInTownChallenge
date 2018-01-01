
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

                          //create var of date with moment.js
                          var dateTime = response[i].datetime.moment().format("MMM, DD, YY") + "@" + response[i].datetime.moment().format("h:mm");

                          $("#theEventsTable").append("<tr><td>"+ dateTime + "</td>"+ "<td>"+ response[i].venue.name + "</td>" + "<td>"+ response[i].venue.city + "</td></tr>");
                            };
                            };
                            };
              //call function to cycle through events
              displayEventsData();
           });
        };



