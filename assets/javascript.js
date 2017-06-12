 $(document).ready(function() {

      // Function for displaying movie data
      function renderButtons() {

        // Deleting the buttons prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-show").empty();

        // Looping through the array of movies
        for (var i = 0; i < gifStarter.length; i++) {

          // Then dynamicaly generating buttons for each movie in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class of movie to our button
          a.addClass("gifClass btn-md btn-info");
          // Adding a data-attribute
          a.attr("data-name", gifStarter[i]);
          // Providing the initial button text
          a.text(gifStarter[i]);
          // Adding the button to the buttons-view div
          $("#buttons-show").append(a);
        }
      }


      var gifStarter = ["Tacos", "Cats", "Fail", "Puppies"];

      // Function for dumping the JSON content for each button into the div
      function displayGif() {

        var gifImage = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gifImage + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
      
          var results = response.data;

        //creating a new img div to hold the image
        for (var i = 0; i < results.length; i++){
          var image = $("<img>");

        //this is setting the attributes to the new image div 

          image.attr("src", results[i].images.fixed_height.url);

        //prepend -- puts said image at the top of the page

        $("#gifShow").prepend(image);

}

          renderButtons();
        });
      }

  

      // This function handles events where one button is clicked
      $("#add-gif").on("click", function(event) {
        event.preventDefault();

        // This line grabs the input from the textbox
        var gifGrab = $("#gif-input").val().trim();

        // Adding the movie from the textbox to our array
        gifStarter.push(gifGrab);
        console.log(gifGrab);

        var state = $(this).attr("data-state");
      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }

        renderButtons();
      });

      // Function for displaying the movie info
      // Using $(document).on instead of $(".movie").on to add event listenersto dynamically generated elements
      $(document).on("click", ".gifClass", displayGif);

      // Calling the renderButtons function to display the intial buttons
      renderButtons();



});