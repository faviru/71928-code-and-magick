'use strict';

(function() {
  /**
   * @param {object} ChildFunc
   * @param {object} ParentFunc
     */
  function inherit(ChildFunc, ParentFunc) {
    var EmptyCtor = function() {};
    EmptyCtor.prototype = ParentFunc.prototype;
    ChildFunc.prototype = new EmptyCtor();
    ChildFunc.prototype.constructor = ChildFunc;
  }

  module.exports = inherit;
})();
