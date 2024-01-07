// Press Enter to search
var enterInput = document.getElementById("searchInput");
enterInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("searchBtn").click();
  }
});

