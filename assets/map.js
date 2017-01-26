Game.Map = function(tiles, player) {
    this._tiles = tiles;

    this._width = tiles.length;
    this._height = tiles[0].length;

    this._entities = [];

    this._scheduler = new ROT.Scheduler.Simple();
    this._engine = new ROT.Engine(this._scheduler);

    this.addEntityAtRandomPosition(player);
    // add random fungi
    for (var i = 0; i < 1000; i++) {
      this.addEntityAtRandomPosition(new Game.Entity(Game.FungusTemplate));
    }
};

Game.Map.prototype.getWidth = function() {
    return this._width;
};
Game.Map.prototype.getHeight = function() {
    return this._height;
};
Game.Map.prototype.getTile = function(x, y) {
    // Check bounds
    if (x < 0 || x >= this._width || y < 0 || y >= this._height) {
        return Game.Tile.nullTile;
    } else {
        return this._tiles[x][y] || Game.Tile.nullTile;
    }
};
Game.Map.prototype.getEngine = function() {
  return this._engine;
}
Game.Map.prototype.getEntities = function() {
  return this._entities;
}
Game.Map.prototype.getEntityAt = function(x, y) {
  for (var i = 0; i < this._entities.length; i++) {
    if (this._entities[i].getX() == x && this._entities[i].getY() == y) {
      return this._entities[i];
    }
  }
  return false;
}
Game.Map.prototype.dig = function(x, y) {
  // if this tile is diggable, update it to a floorTile
  if (this.getTile(x, y).isDiggable()) {
    this._tiles[x][y] = Game.Tile.floorTile;
  }
}
Game.Map.prototype.getRandomFloorPosition = function() {
  var x, y;
  do {
    x = Math.floor(Math.random() * this._width);
    y = Math.floor(Math.random() * this._height);
  } while (this.getTile(x, y) != Game.Tile.floorTile);
  return {x: x, y: y};
}
Game.Map.prototype.addEntity = function(entity) {
  if (entity.getX() < 0 || entity.getX() >= this._width ||
      entity.getY() < 0 || entity.getY() >= this._height) {
    throw new Error('Adding entity out of bounds');
  }
  // update the entity's map
  entity.setMap(this);
  // add the entity to the set of entities
  this._entities.push(entity);
  // check if entity is an actor, if so add them to Scheduler
  if (entity.hasMixin('Actor')) {
    this._scheduler.add(entity, true);
  }
}
Game.Map.prototype.addEntityAtRandomPosition = function(entity) {
  var position = this.getRandomFloorPosition();
  entity.setX(position.x);
  entity.setY(position.y);
  this.addEntity(entity);
}
