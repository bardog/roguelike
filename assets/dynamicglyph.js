Game.DynamicGlyph = function(properties) {
  properties = properties || {};
  Game.Glyph.call(this, properties);
  this._name = properties['name'] || '';
  this._attachedMixins = {};
  this._attachedMixinGroups = {};
  var mixins = properties['mixins'] || [];
  for (var i = 0; i < mixins.length; i++) {
    // copy over all properties from each mixin as long
    // as it's not the name or init property
    // also don't override any already existing properties
    for (var key in mixins[i]) {
      if (key != 'init' && key != 'name' && !this.hasOwnProperty(key)) {
        this[key] = mixins[i][key];
      }
    }

    this._attachedMixins[mixins[i].name] = true;

    if (mixins[i].groupName) {
      this._attachedMixinGroups[mixins[i].groupName] = true;
    }

    if (mixins[i].init) {
      mixins[i].init.call(this, properties);
    }
  }
};

Game.DynamicGlyph.extend(Game.Glyph);

Game.DynamicGlyph.prototype.hasMixin = function(obj) {
  if (typeof obj === 'object') {
    return this._attachedMixins[obj.name];
  } else {
    return this._attachedMixins[obj] || this._attachedMixinGroups[obj];
  }
};

Game.DynamicGlyph.prototype.setName = function(name) {
  this._name = name;
};

Game.DynamicGlyph.prototype.getName = function() {
  return this._name;
};

Game.DynamicGlyph.prototype.describe = function() {
  return this._name;
};

Game.DynamicGlyph.prototype.describeA = function(capitalize) {
  var prefixes = capitalize ? ['A', 'An'] : ['a', 'an'];
  var string = this.describe();
  var firstLetter = string.charAt(0).toLowerCase();

  var prefix = 'aeiou'.indexOf(firstLetter) >= 0 ? 1 : 0;
  return prefixes[prefix] + ' ' + this.describe();
};

Game.DynamicGlyph.prototype.describeThe = function(capitalize) {
  var prefix = capitalize ? 'The' : 'the';
  return prefix + ' ' +  this.describe();
};
