'use strict';

(function() {
  var Review = require('review');

  var PAGE_SIZE = 3;
  var FILTER_RECENT_THRESHOLD = new Date() - (14 * 24 * 60 * 60 * 1000);
  var container = document.querySelector('.reviews-list');
  var reviewsFilter = document.querySelector('.reviews-filter');
  var reviewsList = document.querySelector('.reviews');
  var reviewsMore = document.querySelector('.reviews-controls-more');
  var activeFilter = 'reviews-all';
  var filteredReviews = [];
  var loadedReviews = null;
  var currentPage = 0;

  reviewsFilter.classList.add('invisible');

  var filters = document.querySelector('.reviews-filter');
  filters.addEventListener('click', function(evt) {
    var clickedElement = evt.target;
    if (clickedElement.tagName === 'input') {
      setActiveFilter(clickedElement.id);
    }
  });

  for (var i = 0; i < filters.length; i++) {
    filters[i].onclick = function(evt) {
      var clickedElementID = evt.target.id;
      setActiveFilter(clickedElementID);
    };
  }

  reviewsMore.addEventListener('click', function() {
    if (currentPage < Math.ceil(filteredReviews.length / PAGE_SIZE)) {
      renderReviews(filteredReviews);
      if (currentPage === Math.ceil(filteredReviews.length / PAGE_SIZE)) {
        reviewsMore.classList.add('invisible');
      }
    }
  });

  getReviews();

  function renderReviews(reviews) {
    var fragment = document.createDocumentFragment();
    var from = currentPage * PAGE_SIZE;
    var to = from + PAGE_SIZE;
    var pageReviews = reviews.slice(from, to);

    pageReviews.forEach(function(review) {
      var reviewElement = new Review(review);
      reviewElement.render();
      fragment.appendChild(reviewElement.element);
      reviewsFilter.classList.remove('invisible');
    });

    container.appendChild(fragment);
    currentPage++;
  }

  function setActiveFilter(id, skipCheck) {
    if (!skipCheck && activeFilter === id) {
      return;
    }

    filteredReviews = loadedReviews.slice(0);
    switch (id) {
      case 'reviews-all':
        break;
      case 'reviews-recent':
        var recentReviews = filteredReviews.filter(function(elt) {
          return new Date(elt.date) > FILTER_RECENT_THRESHOLD;
        });
        filteredReviews = recentReviews.sort(function(a, b) {
          return new Date(b.date) > new Date(a.date);
        });
        break;
      case 'reviews-good':
        filteredReviews = filteredReviews.filter(function(elt) {
          return elt.rating >= 3;
        });
        filteredReviews = filteredReviews.sort(function(a, b) {
          return b.rating - a.rating;
        });
        break;
      case 'reviews-bad':
        filteredReviews = filteredReviews.filter(function(elt) {
          return elt.rating <= 2;
        });
        filteredReviews = filteredReviews.sort(function(a, b) {
          return a.rating - b.rating;
        });
        break;
      case 'reviews-popular':
        filteredReviews = filteredReviews.sort(function(a, b) {
          return b.review_usefulness - a.review_usefulness;
        });
        break;
    }
    currentPage = 0;
    activeFilter = id;

    var renderedElements = container.querySelectorAll('.review');
    [].forEach.call(renderedElements, function(el) {
      container.removeChild(el);
    });
    renderReviews(filteredReviews);
    reviewsMore.classList.remove('invisible');
  }

  function getReviews() {
    reviewsList.classList.add('reviews-list-loading');
    var xhr = new XMLHttpRequest();
    xhr.open('get', '//o0.github.io/assets/json/reviews.json');
    xhr.onload = function(evt) {
      reviewsList.classList.remove('reviews-list-loading');
      var rawData = evt.target.response;
      loadedReviews = JSON.parse(rawData);
      setActiveFilter('reviews-all', true);
    };

    xhr.onerror = function() {
      reviewsList.classList.remove('reviews-list-loading');
      reviewsList.classList.add('reviews-load-failure');
    };

    xhr.send();
  }
})();
