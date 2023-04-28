const tmdbId = new URLSearchParams(window.location.search).get("id");
console.log("tmdbId:", tmdbId);
const api = "&api_key=feb6f0eeaa0a72662967d77079850353";
const endpoint = `https://api.themoviedb.org/3/tv/${tmdbId}?append_to_response=credits${api}`;

$.getJSON(endpoint, function(data) {
  const poster = `https://image.tmdb.org/t/p/w500${data.poster_path}`;
  const name = data.name;
  const overview = data.overview;
  const voteAverage = data.vote_average;
  const firstAirDate = new Date(data.first_air_date);
  const lastAirDate = new Date(data.last_air_date);
  const status = data.status;
  const genres = data.genres.map(genre => genre.name).join(", ");
  const createdBy = data.created_by.map(creator => creator.name).join(", ");
  const seasons = data.seasons;
  const cast = data.credits.cast;
  const crew = data.credits.crew;

  const detailsHtml = `
    <div class="poster-container">
      <img class="poster" src="${poster}" alt="${name} poster">
    </div>
    <div class="info">
      <h2 class="name">${name}</h2>
      <p class="overview">${overview}</p>
      <p class="rating">Rating: ${voteAverage}/10</p>
      <p class="air-date">First aired: ${firstAirDate.toLocaleDateString()}</p>
      <p class="air-date">Last aired: ${lastAirDate.toLocaleDateString()}</p>
      <p class="status">Status: ${status}</p>
      <p class="genres">Genres: ${genres}</p>
      <p class="created-by">Created by: ${createdBy}</p>
    </div>
  `;

  $(".details").html(detailsHtml);

  // create season dropdown
let seasonDropdownHtml = "<select id='season-select'>";
for (let i = 0; i < seasons.length; i++) {
  const seasonNumber = seasons[i].season_number;
  const seasonName = seasons[i].name;
  seasonDropdownHtml += `<option value="${seasonNumber}">${seasonName}</option>`;
}
seasonDropdownHtml += "</select>";
$(".season-dropdown").html(seasonDropdownHtml);

// set the season select to season 1 by default
$('#season-select').val(1);

// get episodes data for season 1
const selectedSeasonNumber = 1;
const episodesEndpoint = `https://api.themoviedb.org/3/tv/${tmdbId}/season/${selectedSeasonNumber}?append_to_response=credits${api}`;
$.getJSON(episodesEndpoint, function(data) {
  const episodes = data.episodes;
  let episodesHtml = "";

  // create HTML for episode buttons
  for (let i = 0; i < episodes.length; i++) {
    const episodeNumber = episodes[i].episode_number;
    const episodeName = episodes[i].name;
    episodesHtml += `<button class="episode-button" data-season-number="${selectedSeasonNumber}" data-episode-number="${episodeNumber}" data-tmdb-id="${episodes[i].show_id}">${episodeNumber}. ${episodeName}</button>`;
  }

  // display episode buttons
  $(".episodes").html(episodesHtml);

  // handle click on episode button
  $(".episode-button").on("click", function() {
    const tmdbId = $(this).data("tmdb-id");
    const seasonNumber = $(this).data("season-number");
    const episodeNumber = $(this).data("episode-number");
    window.location.href = `episode.html?id=${tmdbId}&s=${seasonNumber}&e=${episodeNumber}`;
  });
});

// set up event listener for season dropdown
$("#season-select").on("change", function() {
  const selectedSeasonNumber = $(this).val();
  const episodesEndpoint = `https://api.themoviedb.org/3/tv/${tmdbId}/season/${selectedSeasonNumber}?append_to_response=credits${api}`;

  // get episodes data for selected season
  $.getJSON(episodesEndpoint, function(data) {
      const episodes = data.episodes;
      let episodesHtml = "";
  
      // create HTML for episode buttons
      for (let i = 0; i < episodes.length; i++) {
          const episodeNumber = episodes[i].episode_number;
          const episodeName = episodes[i].name;
          episodesHtml += `<button class="episode-button" data-season-number="${selectedSeasonNumber}" data-episode-number="${episodeNumber}" data-tmdb-id="${episodes[i].show_id}">${episodeNumber}. ${episodeName}</button>`;
      }
  
      // display episode buttons
      $(".episodes").html(episodesHtml);
  
      // handle click on episode button
      $(".episode-button").on("click", function() {
          const tmdbId = $(this).data("tmdb-id");
          const seasonNumber = $(this).data("season-number");
          const episodeNumber = $(this).data("episode-number");
          window.location.href = `episode.html?id=${tmdbId}&s=${seasonNumber}&e=${episodeNumber}`;
      });
  });
});
})
