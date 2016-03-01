'use strict';

(function() {

  /**
   * Конструктор объекта Photo. Сохраняет элемент фотографии,
   * ее адрес и порядок в массиве фотографий.
   * @param {Element} photo
   * @param {number} index
   * @constructor
   */

  function Photo(photo, index) {
    this.element = photo;
    this.photoSrc = photo.firstChild.getAttribute('src');
    this.index = index;
  }

  module.exports = Photo;
})();
