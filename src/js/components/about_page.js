pageLandigUrl = "https://schoolassignment.adaptmedia.net/wp-json/wp/v2/pages?slug=aboutt";

pageConteiner = document.querySelector(".about-content");

async function getPage() {
  try {
    const response = await fetch(pageLandigUrl);
    const pageJson = await response.json();
    const pageDetails = pageJson[0];
    landigPage(pageDetails);
  } catch (error) {
    pageConteiner.innerHTML = "";
    pageConteiner.innerHTML += displayError("Error: Failed to fetch API data");
  }
}

getPage();

function landigPage(pageDetails) {
  document.title = pageDetails.title.rendered;
  pageConteiner.innerHTML = `
  <div class="row mb-3 text-center">
       ${pageDetails.content.rendered}
        </div>
  `;
}
