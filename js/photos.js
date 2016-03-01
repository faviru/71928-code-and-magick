'use strict';

(function() {
  var Photo = require('photo');
  var Gallery = require('gallery');
  /**
   * Выбирает скриншоты игры.
   * @type {NodeList}
     */
  var photoGallery = document.querySelectorAll('.photogallery-image');

  /**
   * @type {Gallery}
   */
  var gallery = new Gallery();

  var photoGalleryMapped = [].map.call(photoGallery, function(item, i) {
    return new Photo(item, i);
  });

  gallery.setPictures(photoGalleryMapped);

  photoGalleryMapped.forEach(function(photo) {
    photo.element.addEventListener('click', function(evt) {
      evt.preventDefault();
      gallery.show();
      gallery.setCurrentPicture(photo.index);
    });
  });
})();
