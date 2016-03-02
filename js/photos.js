'use strict';

(function() {
  var Photo = require('photo');
  var Video = require('video');
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
    if (item.getAttribute('data-replacement-video')) {
      return new Video(item, i);
    } else {
      return new Photo(item, i);
    }
  });

  window.addEventListener('hashchange', isHash);

  /**
   * Открытие/загрытие галереи по хэшу.
   */
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
      location.hash = '#photo/' + photo.photoSrc;
    });
  });
})();
