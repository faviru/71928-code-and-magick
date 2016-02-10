/*global reviews*/
'use strict';

(function() {
  var container = document.querySelector('.reviews-list');
  var reviewsFilter = document.querySelector('.reviews-filter');

  reviewsFilter.classList.add('invisible');

  reviews.forEach(function(review) {
    var element = getElementFromTemplate(review);
    container.appendChild(element);
  });

  function getElementFromTemplate(data) {
    var IMAGE_TIMEOUT = 10000;
    var template = document.querySelector('#review-template');
    var element;
    var authorAvatar = new Image();
    var imageLoadTimeout;

    if ('content' in template) {
      element = template.content.children[0].cloneNode(true);
    } else {
      element = template.children[0].cloneNode(true);
    }

    element.querySelector('.review-text').textContent = data.description;
    var ratingValue = data.rating;
    var star = element.querySelector('.review-rating');
    star.style.display = 'inline-block'; //Похоже какая-то недоработка в css

    for (var i = 1; i < ratingValue; i++) {
      element.insertBefore(star, element.querySelector('.review-text'));
      star = star.cloneNode(true);
    }

    authorAvatar.onload = function() {
      clearTimeout(imageLoadTimeout);
      element.replaceChild(authorAvatar, element.querySelector('.review-author'));
      authorAvatar.classList.add('review-author');
      authorAvatar.style.height = '124';
      authorAvatar.style.width = '124';
    };

    authorAvatar.onerror = function() {
      element.classList.add('review-load-failure');
    };

    authorAvatar.src = data.author.picture;

    imageLoadTimeout = setTimeout( function() {
      authorAvatar.src = '';
      element.classList.add('review-load-failure');
    }, IMAGE_TIMEOUT);

    reviewsFilter.classList.remove('invisible');

    return element;
  }
})();
