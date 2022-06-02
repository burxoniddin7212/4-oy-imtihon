//to call elements from form
let elForm = $(".news-form");
let elInput = $(".news-form-input", elForm);
let elSelect = $(".news-form-selct", elForm);
let elButtonSearch = $(".js-button-form", elForm)

//to call elements from HTML
let elListNews = $(".js-news-list");
let elListBookmark = $(".js-bookmark-list");
let elTemplateNews = $(".news-item-template").content;
let elTemplateNewsBookmark = $(".template-bookmark").content;

//Query value

//News render function
let renderNews = function(inputvalue,selectvalue){

  elListNews.innerHTML = "";

  let API = `https://newsapi.org/v2/everything?q=${inputvalue}&sortBy=${selectvalue}&apiKey=3071761379724631b5fdd5005776672e`;
  
  fetch(API)
  .then((response) => {return response.json()})
  .then((data) => {
    let fragment = document.createDocumentFragment();
    data.articles.forEach((news) => {
    let elTemplateNewsClone = elTemplateNews.cloneNode(true);

    $(".card-name", elTemplateNewsClone).textContent = news.source.name;
    $(".card-title", elTemplateNewsClone).textContent =news.title;
    $(".card-description", elTemplateNewsClone).textContent =news.description;
    $(".card-content", elTemplateNewsClone).textContent =news.content;
    $(".card-img-but", elTemplateNewsClone).src =news.urlToImage;
    $(".card-url", elTemplateNewsClone).href =news.url;
    $(".card-publishedAt", elTemplateNewsClone).textContent =news.publishedAt;
    $(".span-a-box", elTemplateNewsClone).dataset.id =news.title;
    $(".span-a-box", elTemplateNewsClone).dataset.name =news.source.name;
    $(".span-a-box", elTemplateNewsClone).dataset.publishedAt =news.publishedAt;
    
    fragment.append(elTemplateNewsClone);
  })
  elListNews.append(fragment);
  })
}
renderNews(elInput.value,elSelect.value)


//Creat bookmark arry
let bookMarkArry = JSON.parse(localStorage.getItem("news")) || [];

//Bookmark render
let bookmarkRender = function(arry){
  elListBookmark.innerHTML = "";
  let fragmentBookmark = document.createDocumentFragment();

  arry.forEach((news) => {
  let elTemplateNewsBookmarkClone = elTemplateNewsBookmark.cloneNode(true);

  $(".bookmark-name", elTemplateNewsBookmarkClone).textContent = news.name;
  $(".bookmark-publishedAt", elTemplateNewsBookmarkClone).textContent = news.publishedAt;
  $(".bookmark-titleitext", elTemplateNewsBookmarkClone).textContent = news.title;
  $(".bookmark-item", elTemplateNewsBookmarkClone).dataset.id = news.publishedAt;
  

  fragmentBookmark.append(elTemplateNewsBookmarkClone)
  })
  elListBookmark.append(fragmentBookmark);
}
bookmarkRender(bookMarkArry);

//Buttendi listining
elButtonSearch.addEventListener("click", (e) => {
  e.preventDefault();

  renderNews(elInput.value,elSelect.value)
})

//News list listining
elListNews.addEventListener("click", (evt) => {
  evt.preventDefault();

  if(evt.target.matches(".modal-button")){
    let modalWrapperBoxId = evt.target.closest(".span-a-box").dataset.id;
    console.log(modalWrapperBoxId);
    $(".modal-title").textContent = modalWrapperBoxId;
  }

  if(evt.target.matches(".bookmark-btn")){
    let a = evt.target.closest(".span-a-box").dataset.name;
    let c = evt.target.closest(".span-a-box").dataset.publishedAt;
    let q = evt.target.closest(".span-a-box").dataset.id;
    let b = {
      name: a,
      publishedAt: c,
      title: q
    }
    
    let k = 0;
    bookMarkArry.forEach((a) => {
      if(a.publishedAt == b.publishedAt){
        k++
      }
    })

     if(k == 0){
     bookMarkArry.push(b);
     bookmarkRender(bookMarkArry);
     localStorage.setItem("news", JSON.stringify(bookMarkArry));
    }
  }
})

//Bookmark list listining
elListBookmark.addEventListener("click", evt => {
  evt.preventDefault();

  if(evt.target.matches(".bookmark-delete")){
    let deleteBookmarId = evt.target.closest(".bookmark-item").dataset.id;
    let findIndexDelete = bookMarkArry.findIndex((news) => {
      return news.publishedAt == deleteBookmarId
    })

    console.log(findIndexDelete);
    console.log(bookMarkArry);

    bookMarkArry.splice(findIndexDelete,1);
    bookmarkRender(bookMarkArry);
    localStorage.setItem("news", JSON.stringify(bookMarkArry));
  }
})