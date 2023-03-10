$(document).ready(function () {
  displayLink();
});

function displayLink() {
  if (localStorage.getItem("token") === null) {
    $("#nastavniPlanBtn").hide();
    $("#odjaviSeBtn").hide();
    $("#prijaviSeBtn").show();
  } else {
    $("#nastavniPlanBtn").show();
    $("#odjaviSeBtn").show();
    $("#prijaviSeBtn").hide();
  }
}

function showLinks(event) {
  event.preventDefault();
  // Get the container for the links
  var linksContainer = document.getElementById("r_links");
  // Show the container
  linksContainer.style.display = "block";
}
