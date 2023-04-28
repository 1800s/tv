// get TMDB movie ID from URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const tmdbId = urlParams.get("id");

// construct embedded iframe code
const embedUrl = `https://www.2embed.to/embed/tmdb/movie?id=${tmdbId}`;
const iframeCode = `<iframe src="${embedUrl}" frameborder="0" allowfullscreen></iframe>`;
$(".movie-embed").attr("src", embedUrl);

// API endpoint to retrieve movie details
const api = "&api_key=feb6f0eeaa0a72662967d77079850353";
const endpoint = `https://api.themoviedb.org/3/movie/${tmdbId}?${api}`;

// retrieve movie details from API
$.getJSON(endpoint, function(data) {
  const poster = `https://image.tmdb.org/t/p/w500/${data.poster_path}`;
  const title = data.original_title;
  const overview = data.overview;

  // display movie details on the page
  $(".poster").attr("src", poster);
  $(".title").text(title);
  $(".overview").text(overview);
});