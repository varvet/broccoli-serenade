var path = require("path");
var Filter = require("broccoli-filter")
var Serenade = require("serenade")

module.exports = SerenadeFilter
SerenadeFilter.prototype = Object.create(Filter.prototype)
SerenadeFilter.prototype.constructor = SerenadeFilter

function SerenadeFilter (inputTree, options) {
  if (!(this instanceof SerenadeFilter)) return new SerenadeFilter(inputTree, options)

  Filter.call(this, inputTree, options)

  this.options = options || {}

  this.Serenade = this.options.Serenade || Serenade;
}

SerenadeFilter.prototype.extensions = ['serenade']
SerenadeFilter.prototype.targetExtension = 'js'

SerenadeFilter.prototype.processString = function(string) {
  var ast = JSON.stringify(this.Serenade.template(string).ast);
  return "module.exports = require('serenade').template(" + ast + ")";
}
