'use strict';

(function() {
  /**
   * Конструктор для отзыва.
   * @param {Object} data
   * @constructor
     */
  function Review(data) {
    this._data = data;

    this._onQuizClick = this._onQuizClick.bind(this);
  }

  /**
   * Отрисовка отзыва в соответствии шаблону.
   * @returns {Node|*}
     */
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

    this.element.querySelector('.review-quiz').addEventListener('click', this._onQuizClick);

    return this.element;
  };
  /**
   * Голосование полезности отзыва.
   * @param {event} evt
   * @private
     */
  Review.prototype._onQuizClick = function(evt) {
    if (evt.target.classList.contains('review-quiz-answer-yes')) {
      this._data.rating_usefulness += 1;
      evt.target.classList.add('review-quiz-answer-active');
      this.element.querySelector('.review-quiz-answer-no').classList.remove('review-quiz-answer-active');
    }
    if (evt.target.classList.contains('review-quiz-answer-no')) {
      this._data.rating_usefulness -= 1;
      evt.target.classList.add('review-quiz-answer-active');
      this.element.querySelector('.review-quiz-answer-yes').classList.remove('review-quiz-answer-active');
    }
  };

  module.exports = Review;
})();
