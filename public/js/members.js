$(document).ready(function() {
  $.get("/api/user_data").then(function(data) {
    $(".member-name").text(data.email);
  });
});



// the infamous members page!




// this page runs a get request to check which user is login and updates the HTML on the page based on the user