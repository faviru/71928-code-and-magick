'use strict';

(function() {

  var Gallery = function() {
    this.element = document.querySelector('.overlay-gallery');
    this.galleryClose = document.querySelector('.overlay-gallery-close');
    this.galleryControlLeft = document.querySelector('.overlay-gallery-control-left');
    this.galleryControlRight = document.querySelector('.overlay-gallery-control-right');

    this._onCloseClick = this._onCloseClick.bind(this);
    this._onDocumentKeyDown = this._onDocumentKeyDown.bind(this);
  };

  Gallery.prototype.show = function() {
    this.element.classList.remove('invisible');
    this.galleryClose.addEventListener('click', this._onCloseClick);
    document.addEventListener('keydown', this._onDocumentKeyDown);
    this.galleryControlLeft.addEventListener('click', this._onClickLeft);
    this.galleryControlRight.addEventListener('click', this._onClickRight);
  };

  Gallery.prototype.hide = function() {
    this.element.classList.add('invisible');
    this.galleryClose.removeEventListener('click', this._onCloseClick);
    document.removeEventListener('keydown', this._onDocumentKeyDown);
    this.galleryControlLeft.removeEventListener('click', this._onClickLeft);
    this.galleryControlRight.removeEventListener('click', this._onClickRight);
  };

  Gallery.prototype._onCloseClick = function() {
    this.hide();
  };

  Gallery.prototype._onDocumentKeyDown = function(evt) {
    if (evt.keyCode === 27) {
      this.hide();
    }
  };

  Gallery.prototype._onClickLeft = function() {};

  Gallery.prototype._onClickRight = function() {};

  window.Gallery = new Gallery();
})();
