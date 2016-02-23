'use strict';

(function() {

  function Review(data) {
    this._data = data;
  }
  Review.prototype.render = function() {
    var template = document.querySelector('#review-template');
    var authorAvatar = new Image(124, 124);

    if ('content' in template) {
      this.element = template.content.children[0].cloneNode(true);
    } else {
      this.element = template.children[0].cloneNode(true);
    }

    this.element.querySelector('.review-text').textContent = this._data.description;
    var ratingValue = this._data.rating;
    var star = this.element.querySelector('.review-rating');
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
      this.element.replaceChild(authorAvatar, this.element.querySelector('.review-author'));
      authorAvatar.classList.add('review-author');
    }.bind(this);

    authorAvatar.onerror = function() {
      this.element.classList.add('review-load-failure');
    }.bind(this);

    var IMAGE_TIMEOUT = 10000;
    var imageLoadTimeout = setTimeout( function() {
      authorAvatar.src = '';
      this.element.classList.add('review-load-failure');
    }.bind(this), IMAGE_TIMEOUT);

    authorAvatar.src = this._data.author.picture;

    return this.element;
  };
  window.Review = Review;
})();
