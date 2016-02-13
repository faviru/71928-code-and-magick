/*global reviews*/
'use strict';

(function() {
  var IMAGE_TIMEOUT = 10000;
  var imageLoadTimeout;
  var template = document.querySelector('#review-template');
  var container = document.querySelector('.reviews-list');
  var reviewsFilter = document.querySelector('.reviews-filter');

  reviewsFilter.classList.add('invisible');

  reviews.forEach(function(review) {
    var element = getElementFromTemplate(review);
    container.appendChild(element);
  });

  function getElementFromTemplate(data) {
    var element;
    var authorAvatar = new Image(124, 124);

    if ('content' in template) {
      element = template.content.children[0].cloneNode(true);
    } else {
      element = template.children[0].cloneNode(true);
    }

    element.querySelector('.review-text').textContent = data.description;
    var ratingValue = data.rating;
    var star = element.querySelector('.review-rating');
    switch (ratingValue) {
      case 2:
        star.classList.add('review-rating-two');
        break;
      case 3:
        star.classList.add('review-rating-three');
        break;
      case 4:
        star.classList.add('review-rating-four');
        break;
      case 5:
        star.classList.add('review-rating-five');
        break;
    }

    authorAvatar.onload = function() {
      clearTimeout(imageLoadTimeout);
      element.replaceChild(authorAvatar, element.querySelector('.review-author'));
      authorAvatar.classList.add('review-author');
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
