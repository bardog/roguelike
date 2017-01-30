Game.Room = function(shape, width, height) {
  this._shape = new Shape(shape) || new Shape();
  this._width = width || 10;
  this._height = height || 10;
};

Game.Room.prototype.getWidth() {
  return this._width;
}
Game.Room.prototype.getHeight() {
  return this._height;
}
Game.Room.prototype.getShape() {
  return new Shape(this._shape, this._width, this._height);
}
