'use strict';

(function() {

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

  Gallery.prototype.setPictures = function(pictures) {
    this._pictures = pictures;
  };

  Gallery.prototype.setCurrentPicture = function(number) {
    this._currentPicture = this._pictures[number];

    var image = new Image(300, 300);
    image.src = this._currentPicture.photoSrc;
    if (this.galleryPreview.firstChild) {
      this.galleryPreview.replaceChild(image, this.galleryPreview.firstChild);
    } else {
      this.galleryPreview.appendChild(image);
    }

    this.galleryCurrentPic.innerHTML = number + 1;
    this.galleryTotal.innerHTML = this._pictures.length;
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
    //escape
    if (evt.keyCode === 27) {
      this.hide();
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

  Gallery.prototype._onClickLeft = function() {
    if (this._currentPicture.index > 0) {
      this.setCurrentPicture(this._currentPicture.index - 1);
    }
  };

  Gallery.prototype._onClickRight = function() {
    if (this._currentPicture.index < this._pictures.length - 1) {
      this.setCurrentPicture(this._currentPicture.index + 1);
    }
  };

  window.Gallery = Gallery;
})();
