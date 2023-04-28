function loadData(event) {
  event.preventDefault();

  let search;
  // check if no input
  // set default search to bond
  if (!$("input").val()) {
    search = "bond";
  } else {
    search = $("input").val();
    $("input").val("");
  }

  // api and end points
  // create search with user input
  const api = "&api_key=feb6f0eeaa0a72662967d77079850353";
  const endpoint = `https://api.themoviedb.org/3/search/multi?query=${search}${api}`;
  const poster = "https://image.tmdb.org/t/p/w500";

  let gridHtml = "";

  $.getJSON(endpoint, function(data) {

    // if no results display error message
    if (data.results.length == 0) {
      $(".error").html("No data found, search again.");
    }

    // create the film layout
    for (let i = 0; i < data.results.length; i++) {
      const mediaResult = data.results[i];
      
      // check if the poster_path is null or undefined
      if (!mediaResult.poster_path) {
        // skip this movie and move on to the next one
        continue;
      }
      
      let mediaType = mediaResult.media_type;

      // create li element with poster image and data attribute for the id
      gridHtml += `<li data-tmdb-id="${mediaResult.id}" data-media-type="${mediaType}">
        <img class="poster" src="${poster}${mediaResult.poster_path}">
      </li>`;
    }
    
    $(".films").html(gridHtml);

    // handle click of poster image
    $(".poster").on("click", function() {
      const tmdbId = $(this).parent().data("tmdb-id");
      const mediaType = $(this).parent().data("media-type");
      if (mediaType == "movie") {
        window.location.href = `movie.html?id=${tmdbId}`;
      } else if (mediaType == "tv") {
        window.location.href = `tv.html?id=${tmdbId}`;
      }
    });
    
  });
}

// start app
// use submit to load the data
const form = $(".form");
form.submit(loadData);
