//declare global variables
const container = document.getElementById("container");
const searchBar = document.getElementById("search-bar");
const searchSubmit = document.getElementById("search-submit");
const resetSearch = document.getElementById("reset-search");

let data;

window.addEventListener("DOMContentLoaded", getSheet);

//define the function sending call to api and returning json object
async function fetchSheet() {
  let url =
    "https://spreadsheets.google.com/feeds/list/1FWgLmvtOVbV1JImUgjfyLYOB5ZBGsoQgk68CEmG4iag/od6/public/values?alt=json";
  let res = await fetch(url);
  if (!res.ok) throw "status is not ok";
  let json = await res.json();
  data = [];
  json.feed.entry.forEach((el) => {
    let row = {};
    Object.keys(el).forEach((col) => {
      if (col.slice(0, 4) === "gsx$") {
        let title = col.slice(4);
        row[title] = el[col].$t;
      }
    });
    data.push(row);
  });
  return data;
}

function getSheet() {
  fetchSheet().then((data) => {
    //  renderVideos
    console.log(data);
    renderVideos(data);
  });
}

//displaying videos five at a time
function renderVideos(data) {
  //clean out previous feed
  container.innerHTML = "";

  data.forEach((entry, index) => {
    //load first 5 videos
    if (index > 5) return;
    const videoContainer = document.createElement("div");
    videoContainer.classList.add("video-container");

    const video = document.createElement("video");
    video.src = entry.videourl;
    video.controls = true;
    videoContainer.appendChild(video);

    const name = document.createElement("p");
    name.innerHTML = entry.firstname + " " + entry.lastname;
    name.addEventListener("click", function () {
      console.log(entry.location);
    });
    videoContainer.appendChild(name);
    container.appendChild(videoContainer);
  });
}

//filtering data for search
searchSubmit.addEventListener("click", () => {
  console.log(searchBar.value);
  const searchResults = data.filter((entry) => {
    //sanitization - make all lowercase
    //eliminate keywordslike and,or,etc
    //don't search based on spaces

    const firstNameMatch = entry.firstname
      .toLowerCase()
      .includes(searchBar.value);
    const lastNameMatch = entry.lastname
      .toLowerCase()
      .includes(searchBar.value);
    return firstNameMatch || lastNameMatch;
  });

  console.log(searchResults);
  renderVideos(searchResults);

  //once we are done with everything,
  //we want to clear the search bar
  searchBar.value = "";
});

//resetting search
resetSearch.addEventListener("click", () => {
  renderVideos(data);
});
