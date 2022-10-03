// API for get requests
const wpUrl = "https://schoolassignment.adaptmedia.net/wp-json/wp/v2/posts";
const postsConteiner = document.querySelector(".content");
let pageNumber = 1;
let maxPageNumber;
const blogTitle = document.title;

async function getPosts() {
  try {
    document.title = "lodding | Portfolio";
    const response = await fetch(wpUrl + "?page=" + pageNumber);
    maxPageNumber = parseInt(response.headers.get("x-wp-totalpages"));

    console.log(pageNumber, maxPageNumber, pageNumber >= maxPageNumber);
    if (pageNumber >= maxPageNumber) {
    }
    pageNumber++;
    const posts = await response.json();
    postsListDetails(posts);
    document.title = blogTitle;
  } catch (error) {
    console.error("error catched ", error);
    postsConteiner.innerHTML = "";
    postsConteiner.innerHTML += displayError("Error: Failed to fetch API data");
  }
}

getPosts(pageNumber);

function postsListDetails(posts) {
  for (let i = 0; i < posts.length; i++) {
    document.title = posts[i].id;
    const postDate = posts[i];
    const date = new Date(postDate.date);
    const formattedDate = date.toLocaleDateString();
    console.log(formattedDate);
    console.log(posts[i]);
    postsConteiner.innerHTML += `
    <div class="col">
    <a href="/post-project-results.html?post_id=${posts[i].id}"> 
              <div class="card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg post-img-thumbnai-zoom"
                style="background-image: url('${posts[i].jetpack_featured_media_url}')">
                <div class="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1 layer">
                  <h3 class="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">${posts[i].title.rendered}</h3>
                  <ul class="d-flex list-unstyled mt-auto">
                    <li class="me-auto">
                      <img
                        src="https://github.com/twbs.png"
                        alt="Bootstrap"
                        width="32"
                        height="32"
                        class="rounded-circle border border-white"
                      />
                    </li>
                    <li class="d-flex align-items-center me-3">
                      <svg class="bi me-2" width="1em" height="1em">
                        <use xlink:href="/post-project-results.html?post_id=${posts[i].id}"></use>
                      </svg>
                      <small>${posts[i].title.rendered}</small>
                    </li>
                    <li class="d-flex align-items-center">
                      <svg class="bi me-2" width="1em" height="1em">
                        <use xlink:href="#calendar3"></use>
                      </svg>
                      <small>${posts[i].type} ${posts[i].status}:${formattedDate}</small>
                    </li>
                  </ul>
                </div>
              </div>
              </a>
            </div>`;
  }
}
