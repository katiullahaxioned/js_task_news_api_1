var articlesWrapper = document.querySelector(".articles .wrapper");
var apiKey = "99ede85475c44049b10c290ad6ca22da";

// fetch news
function fetchNews(numOne, numTwo) {
  articlesWrapper.innerHTML = "loading...";

  var apiLink =
    "https://newsapi.org/v2/everything?q=india&from=2022-08-30&sortBy=popularity&apiKey=" +
    apiKey;

  fetch(apiLink)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      articlesWrapper.innerHTML = "";
      return showNews(data.articles, numOne, numTwo);
    })
    .catch(function (error) {
      console.log(error);
    });
}

// show news
function showNews(data, numOne, numTwo) {
  for (var i = numOne; i < numTwo; i++) {
    articlesWrapper.innerHTML +=
      '<article class="article-card"><h2 class="article-author">author: ' +
      data[i].author +
      '</h2><p class="article-title">' +
      data[i].title +
      '</p><p class="article-description">description: ' +
      data[i].description +
      '</p><figure><img src="' +
      data[i].urlToImage +
      '" alt="news" class="article-image"></figure><span class="article-publishedAt">published at: ' +
      data[i].publishedAt +
      "</span></article>";
  }
}

// fetchNews() invoked to display first 5 articles
fetchNews(0, 5);

// added control 10 buttons using for loop
var controlBox = document.querySelector(".control-box");

for (var j = 2; j <= 10; j++) {
  controlBox.innerHTML += '<span class="control">' + j + "</span>";
}

var controls = document.querySelectorAll(".control");

controls[0].classList.add("active");

// click event to all control buttons
controls.forEach(function (control, index) {
  control.addEventListener("click", function () {
    var numOne = index * 5;
    var numTwo = numOne + 5;

    for (var elem of controls) {
      elem.classList.remove("active");
    }

    control.classList.add("active");
    articlesWrapper.innerHTML = "";
		
    fetchNews(numOne, numTwo);
  });
});