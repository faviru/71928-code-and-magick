'use strict';
/*global Photo: true, Gallery: true*/

(function() {
  var photoGallery = document.querySelectorAll('.photogallery-image');
  var gallery = new window.Gallery();

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
