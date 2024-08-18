const form = document.getElementById("search-form");
const boxElement = document.getElementById("search-box");
const searchButton = document.getElementById("search-button");
const showMore = document.getElementById("show-more-btn");
const searchResult = document.getElementById("search-result");

let page = 1;
let keyWord = "";
const accesskey = "Your-API-Key";
async function GetPictures() {
  keyWord = boxElement.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyWord}&client_id=${accesskey}&per_page=12`;
   
  try {
    const response = await fetch(url);
    const data = await response.json();
    const results = data.results;
    if (page===1) {
        searchResult.innerHTML="";
        
    }
     results.map((result) => {
      const img = document.createElement('img');
      img.src = result.urls.small;
      const imageLink = document.createElement('a');
      imageLink.href = result.links.html;
      imageLink.target ='_blank';
      imageLink.appendChild(img);
      searchResult.appendChild(imageLink);
    });
    showMore.style.display = 'block';
  } catch {
    alert("Error in Loading Data......");
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  page = 1;
  GetPictures();

});

showMore.addEventListener("click", () => {
  page++;
  GetPictures();
});
