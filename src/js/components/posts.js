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
  postsConteiner.innerHTML = "";
  for (let i = 0; i < posts.length; i++) {
    document.title = posts[i].id;
    const postDate = posts[i];
    const date = new Date(postDate.date);
    const formattedDate = date.toLocaleDateString();
    postsConteiner.innerHTML += `
    <div class="col">
    <a href="/post-project-results.html?post_id=${posts[i].id}"> 
              <div class="card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg post-img-thumbnai-zoom"
                style="background-image: url('${posts[i].jetpack_featured_media_url}')">
                <div class="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1 layer">
                  <h3 class="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">${posts[i].title.rendered}</h3>
                  <ul class="d-flex list-unstyled mt-auto">
                  <li class="d-flex align-items-center">
                      <small>${posts[i].excerpt.rendered}</small>
                    </li>
                  </ul>
                  <ul class="d-flex list-unstyled mt-auto">
                    <li class="me-auto">
                      <svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-hand-index-thumb-fill" viewBox="0 0 16 16">
                      <path d="M8.5 1.75v2.716l.047-.002c.312-.012.742-.016 1.051.046.28.056.543.18.738.288.273.152.456.385.56.642l.132-.012c.312-.024.794-.038 1.158.108.37.148.689.487.88.716.075.09.141.175.195.248h.582a2 2 0 0 1 1.99 2.199l-.272 2.715a3.5 3.5 0 0 1-.444 1.389l-1.395 2.441A1.5 1.5 0 0 1 12.42 16H6.118a1.5 1.5 0 0 1-1.342-.83l-1.215-2.43L1.07 8.589a1.517 1.517 0 0 1 2.373-1.852L5 8.293V1.75a1.75 1.75 0 0 1 3.5 0z"/>
                    </svg>
                    <small>${posts[i].status}:${formattedDate}</small>
                    </li>
                  </ul>
                </div>
              </div>
              </a>
            </div>`;
  }
}
