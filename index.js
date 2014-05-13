var path = require("path");
var Filter = require('broccoli-filter')

module.exports = SerenadeFilter
SerenadeFilter.prototype = Object.create(Filter.prototype)
SerenadeFilter.prototype.constructor = SerenadeFilter

function SerenadeFilter (inputTree, options) {
  if (!(this instanceof SerenadeFilter)) return new SerenadeFilter(inputTree, options)

  Filter.call(this, inputTree, options)

  this.options = options || {}

  this.Serenade = require(this.options.serenadePath || "./serenade.0.5.0.min.js").Serenade
}

SerenadeFilter.prototype.extensions = ['serenade']
SerenadeFilter.prototype.targetExtension = 'js'

SerenadeFilter.prototype.processString = function(string, name) {
  var name = JSON.stringify(name.replace(/\.serenade$/, "").replace(/views\//, ""));
  var ast = JSON.stringify(this.Serenade.view(string).parse());
  return "Serenade.view(" + name + ", " + ast + ")";
}
