'use strict';

(function() {
  var Photo = require('photo');
  var inherit = require('inherit');

  /**
   * Конструктор объекта Video.
   * Создает элемент видео и вешает на него событие.
   * @constructor
     */
  function Video(video, index) {
    this.replacement = video.getAttribute('data-replacement-video');
    this._setCommonProperties(video, index);
    this.video = document.createElement('video');
    this.video.src = this.replacement;
    this.video.loop = true;
    this.video.autoplay = true;
    this.video.addEventListener('click', this._clickHandler.bind(this));
  }

  inherit(Video, Photo);

  /**
   * Остановка и проигрывание видео.
   * @private
     */
  Video.prototype._clickHandler = function() {
    if (this.video.paused) {
      this.video.play();
    } else {
      this.video.pause();
    }
  };

  module.exports = Video;
})();
