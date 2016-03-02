'use strict';

(function() {
  var Video = require('video');
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

    var element;
    this._currentPicture = this._pictures[identifier];

    if (this._pictures[identifier] instanceof Video) {
      element = this._pictures[identifier].video;
    } else {
      element = new Image();
      element.src = this._currentPicture.photoSrc;
    }

    if (this.galleryPreview.firstChild) {
      this.galleryPreview.replaceChild(element, this.galleryPreview.firstChild);
    } else {
      this.galleryPreview.appendChild(element);
    }

    if (this._pictures[identifier] instanceof Video) {
      this._pictures[identifier].video.play();
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
    this._pictures.forEach(function(el) {
      if (el instanceof Video) {
        el.video.pause();
      }
    });
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
      this._onCloseClick();
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
   * Записывает хэш скриншота по переданному индексу.
   * @param {number} index
   * @private
     */
  Gallery.prototype._setHash = function(index) {
    location.hash = '#photo/' + this._pictures[index].photoSrc;
  };

  /**
   * Обработчик для перехода на предыдущий скриншот.
   * @private
     */
  Gallery.prototype._onClickLeft = function() {
    if (this._currentPicture.index > 0) {
      this._setHash(this._currentPicture.index - 1);
    }
  };

  /**
   * Обработчик для перехода на следующий скриншот.
   * @private
   */
  Gallery.prototype._onClickRight = function() {
    if (this._currentPicture.index < this._pictures.length - 1) {
      this._setHash(this._currentPicture.index + 1);
    }
  };

  module.exports = Gallery;
})();
