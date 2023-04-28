const tmdbId = new URLSearchParams(window.location.search).get("id");
const seasonNumber = new URLSearchParams(window.location.search).get("s");
const episodeNumber = new URLSearchParams(window.location.search).get("e");
const api = "&api_key=feb6f0eeaa0a72662967d77079850353";
const endpoint = `https://api.themoviedb.org/3/tv/${tmdbId}?append_to_response=credits${api}`;
const episodesEndpoint = `https://api.themoviedb.org/3/tv/${tmdbId}/season/${seasonNumber}?append_to_response=credits${api}`;
const embedUrl = `https://www.2embed.to/embed/tmdb/tv?id=${tmdbId}&s=${seasonNumber}&e=${episodeNumber}`;

$.getJSON(endpoint, function(data) {
  const seasons = data.seasons;

  // create season dropdown
  let seasonDropdownHtml = "<select id='season-select'>";
  for (let i = 0; i < seasons.length; i++) {
    const seasonNumber = seasons[i].season_number;
    const seasonName = seasons[i].name;
    seasonDropdownHtml += `<option value="${seasonNumber}">${seasonName}</option>`;
  }
  seasonDropdownHtml += "</select>";
  $(".season-dropdown").html(seasonDropdownHtml);

  // set the season select to the selected season number
  $('#season-select').val(seasonNumber);

  // get episodes data for the selected season
  $.getJSON(episodesEndpoint, function(data) {
    const episodes = data.episodes;
    let episodesHtml = "";

    // create HTML for episode buttons
    for (let i = 0; i < episodes.length; i++) {
      const episodeNumber = episodes[i].episode_number;
      const episodeName = episodes[i].name;
      episodesHtml += `<button class="episode-button" data-season-number="${seasonNumber}" data-episode-number="${episodeNumber}" data-tmdb-id="${episodes[i].show_id}">${episodeNumber}. ${episodeName}</button>`;
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
// load video embed
const embedHtml = `<iframe src="${embedUrl}" frameborder="0" allowfullscreen ></iframe>`;
$(".embed-container").html(embedHtml);
