'use strict';

(function() {
  function Photo(photo, index) {
    this.element = photo;
    this.photoSrc = photo.firstChild.getAttribute('src');
    this.index = index;
  }

  window.Photo = Photo;
})();
