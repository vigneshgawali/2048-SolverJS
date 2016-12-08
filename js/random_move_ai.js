function randomAI(grid) {
  this.grid = grid;
}


// performs iterative deepening over the alpha-beta search
randomAI.prototype.getRandomMove = function() {
  var start = (new Date()).getTime();
  var depth = 0;
  var value = Math.floor((Math.random() * 4));
    return {move: value};
}

randomAI.prototype.translate = function(move) {
 return {
    0: 'up',
    1: 'right',
    2: 'down',
    3: 'left'
  }[move];
}
