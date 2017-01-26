// Create our Mixins namespace
Game.Mixins = {};

// Define our Moveable mixin
Game.Mixins.Moveable = {
    name: 'Moveable',
    tryMove: function(x, y, map) {
        var tile = map.getTile(x, y);
        var target = map.getEntityAt(x, y);
        // Check if we can walk on the tile
        // and if so simply walk onto it
        if (target) {
          return false;
        } else if (tile.isWalkable()) {
            // Update the entity's position
            this._x = x;
            this._y = y;
            return true;
        // Check if the tile is diggable, and
        // if so try to dig it
        } else if (tile.isDiggable()) {
            map.dig(x, y);
            return true;
        }
        return false;
    }
}

Game.Mixins.PlayerActor = {
  name: 'PlayerActor',
  groupName: 'Actor',
  act: function() {
    Game.refresh();
    this.getMap().getEngine().lock();
  }
}

Game.Mixins.FungusActor = {
  name: 'FungusActor',
  groupName: 'Actor',
  act: function() { }
}

Game.FungusTemplate = {
  character: 'F',
  foreground: 'green',
  mixins: [Game.Mixins.FungusActor]
}
// Player template
Game.PlayerTemplate = {
    character: 'B',
    foreground: 'white',
    background: 'black',
    mixins: [Game.Mixins.Moveable, Game.Mixins.PlayerActor]
}

Game.Mixins.FungusActor = {
  name: 'FungusActor',
  groupName: 'Actor',
  act: function() { }
}
