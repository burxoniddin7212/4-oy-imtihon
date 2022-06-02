//to call elements from form
let elForm = $(".news-form");
let elInput = $(".news-form-input", elForm);
let elSelect = $(".news-form-selct", elForm);

//to call elements from HTML
let elListNews = $(".js-news-list");
let elListBookmark = $(".js-bookmark-list");
let elTemplateNews = $(".news-item-template").content;


//News render function
let renderNews = function(){
  fetch("https://newsapi.org/v2/everything?q=tesla&sortBy=publishedAt&apiKey=0afdb1d1b7ed4974be58124c47d306a4")
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
    
    fragment.append(elTemplateNewsClone);
    
  })
  elListNews.append(fragment);
  })


}

renderNews()