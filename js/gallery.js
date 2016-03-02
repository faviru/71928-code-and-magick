'use strict';

(function() {
  /**
   * Конструктор объекта Gallery.
   * @constructor
     */
  var Gallery = function() {
    this.element = document.querySelector('.overlay-gallery');
    this.galleryClose = document.querySelector('.overlay-gallery-close');
    this.galleryControlLeft = document.querySelector('.overlay-gallery-control-left');
    this.galleryControlRight = document.querySelector('.overlay-gallery-control-right');
    this.galleryPreview = document.querySelector('.overlay-gallery-preview');
    this.galleryTotal = document.querySelector('.preview-number-total');
    this.galleryCurrentPic = document.querySelector('.preview-number-current');

    this._onCloseClick = this._onCloseClick.bind(this);
    this._onDocumentKeyDown = this._onDocumentKeyDown.bind(this);
    this._onClickLeft = this._onClickLeft.bind(this);
    this._onClickRight = this._onClickRight.bind(this);
  };

  /**
   * Сохраняет коллекцию скриншотов.
   * @param {Array.<Object>} pictures
     */
  Gallery.prototype.setPictures = function(pictures) {
    this._pictures = pictures;
  };

  /**
   * Показывает скриншот в соответствии с переданым номером.
   * @param {number|string} identifier
     */
  Gallery.prototype.setCurrentPicture = function(identifier) {
    if (typeof identifier === 'string') {
      var tempId = null;
      [].forEach.call(this._pictures, function(el) {
        if (el.photoSrc === identifier) {
          tempId = el.index;
        }
      });
      identifier = tempId;
    }

    this._currentPicture = this._pictures[identifier];

    var image = new Image();
    image.src = this._currentPicture.photoSrc;
    if (this.galleryPreview.firstChild) {
      this.galleryPreview.replaceChild(image, this.galleryPreview.firstChild);
    } else {
      this.galleryPreview.appendChild(image);
    }

    this.galleryCurrentPic.innerHTML = identifier + 1;
    this.galleryTotal.innerHTML = this._pictures.length;
  };

  /**
   * Открывает галерею и устанавливает события.
   */
  Gallery.prototype.show = function() {
    this.element.classList.remove('invisible');
    this.galleryClose.addEventListener('click', this._onCloseClick);
    document.addEventListener('keydown', this._onDocumentKeyDown);
    this.galleryControlLeft.addEventListener('click', this._onClickLeft);
    this.galleryControlRight.addEventListener('click', this._onClickRight);
  };

  /**
   * Закрывает галерею и снимает события.
   */
  Gallery.prototype.hide = function() {
    this.element.classList.add('invisible');
    this.galleryClose.removeEventListener('click', this._onCloseClick);
    document.removeEventListener('keydown', this._onDocumentKeyDown);
    this.galleryControlLeft.removeEventListener('click', this._onClickLeft);
    this.galleryControlRight.removeEventListener('click', this._onClickRight);
  };

  /**
   * Обработчик события закрытть.
   * @private
     */
  Gallery.prototype._onCloseClick = function() {
    this.hide();
    location.hash = '';
  };

  /**
   * Обработчик нажатия на клавиши.
   * @param {event} evt
   * @private
     */
  Gallery.prototype._onDocumentKeyDown = function(evt) {
    //escape
    if (evt.keyCode === 27) {
      this.hide();
      location.hash = '';
    }
    //left-arrow
    if (evt.keyCode === 37) {
      this._onClickLeft();
    }
    //right-arrow
    if (evt.keyCode === 39) {
      this._onClickRight();
    }
  };

  /**
   * Обработчик для перехода на предыдущий скриншот.
   * @private
     */
  Gallery.prototype._onClickLeft = function() {
    if (this._currentPicture.index > 0) {
      location.hash = '#photo/' + this._pictures[this._currentPicture.index - 1].photoSrc;
    }
  };

  /**
   * Обработчик для перехода на следующий скриншот.
   * @private
   */
  Gallery.prototype._onClickRight = function() {
    if (this._currentPicture.index < this._pictures.length - 1) {
      location.hash = '#photo/' + this._pictures[this._currentPicture.index + 1].photoSrc;
    }
  };

  module.exports = Gallery;
})();
