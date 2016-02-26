'use strict';

(function() {
  function inherit(ChildFunc, ParentFunc) {
    var EmptyCtor = function() {};
    EmptyCtor.prototype = ParentFunc.prototype;
    ChildFunc.prototype = new EmptyCtor();
    ChildFunc.prototype.constructor = ChildFunc;
  }

  window.inherit = inherit;
})();
