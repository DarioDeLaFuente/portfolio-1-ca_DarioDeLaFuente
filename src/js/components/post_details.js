// Get calls
const detailsConteiner = document.querySelector(".post-results");
const postQueryString = document.location.search;
const params = new URLSearchParams(postQueryString);
const id = params.get("post_id");

// API for get requests
const detailsUrlPost = "https://schoolassignment.adaptmedia.net/wp-json/wp/v2/posts/" + id;

async function detailsOfPost() {
  try {
    const response = await fetch(detailsUrlPost);
    const details = await response.json();
    postDetails(details);
  } catch (error) {
    detailsConteiner.innerHTML = displayError("Error: Failed to fetch API data");
  }
}
detailsOfPost();

function postDetails(details) {
  document.title = details.title.rendered;
  detailsConteiner.innerHTML = `      
 <div class="container text-left">
${details.title.rendered}
${details.content.rendered}
</div>
`;
}
