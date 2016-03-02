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

  window.addEventListener('hashchange', isHash);

  function isHash() {
    var checkedHash = location.hash.match(/#photo\/(\S+)/);
    if (checkedHash !== null) {
      gallery.setCurrentPicture(checkedHash[1]);
      gallery.show();
    } else {
      gallery.hide();
    }
  }

  gallery.setPictures(photoGalleryMapped);

  isHash();

  photoGalleryMapped.forEach(function(photo) {
    photo.element.addEventListener('click', function(evt) {
      evt.preventDefault();
      gallery.setCurrentPicture(photo.index);
      location.hash = '#photo/' + photo.photoSrc;
    });
  });
})();
