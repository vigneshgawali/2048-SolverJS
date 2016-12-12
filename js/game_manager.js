var agent = "";
function GameManager(size, InputManager, Actuator) {
  this.size         = size; // Size of the grid
  this.inputManager = new InputManager;
  this.actuator     = new Actuator;

  this.running      = false;

  this.inputManager.on("move", this.move.bind(this));
  this.inputManager.on("restart", this.restart.bind(this));
    
  agent = "MonteCarlo Tree Search";
    
  this.inputManager.on('Random', function(){
    agent = "Random";
    this.ai = new randomAI(this.grid);
    console.log("Agent selected: Random");
  }.bind(this));
    
  this.inputManager.on('Expectimax', function(){
    agent = "Expectimax";
    this.ai = new expectimaxAI(this.grid);
    console.log("Agent selected: Expectimax");
  }.bind(this));
    
  this.inputManager.on('MonteCarlo Tree Search', function(){
    agent = "MonteCarlo Tree Search";
    this.ai = new MonteCarloAI(this.grid);
    console.log("Agent selected: MonteCarlo Tree Search");
  }.bind(this));
  
  this.inputManager.on('run', function() {
    if (this.running) {
      this.running = false;
      this.actuator.setRunButton('Auto-run');
    } else {
      this.running = true;
      this.run()
      this.actuator.setRunButton('Stop');
    }
  }.bind(this));

  this.setup();
}

// Restart the game
GameManager.prototype.restart = function () {
  this.actuator.restart();
  this.running = false;
  this.actuator.setRunButton('Auto-run');
  this.setup();
};

// Set up the game
GameManager.prototype.setup = function () {
  this.grid         = new Grid(this.size);
  this.grid.addStartTiles();

//  this.ai           = new AI(this.grid);

//  this.ai           = new minimaxAI(this.grid);
  if(agent==="Random"){
    this.ai = new randomAI(this.grid);      
  }
  else if(agent==="Expectimax"){
    this.ai = new expectimaxAI(this.grid);
  }
  else if(agent==="MonteCarlo Tree Search"){
    this.ai = new MonteCarloAI(this.grid);
  }

  this.score        = 0;
  this.over         = false;
  this.won          = false;

  // Update the actuator
  this.actuate();
};

// Sends the updated grid to the actuator
GameManager.prototype.actuate = function () {
  this.actuator.actuate(this.grid, {
    score: this.score,
    over:  this.over,
    won:   this.won
  });
};

// makes a given move and updates state
GameManager.prototype.move = function(direction) {
  var result = this.grid.move(direction);
  this.score += result.score;

  if (!result.won) {
    if (result.moved) {
      this.grid.computerMove();
    }
  } else {
    this.won = true;
  }

  //console.log(this.grid.valueSum());

  if (!this.grid.movesAvailable()) {
    this.over = true; // Game over!
  }
  this.actuate();
}

// moves continuously until game is over
GameManager.prototype.run = function() {

  var nextMove = this.ai.getMove();
  this.move(nextMove);
  var timeout = animationDelay;
  if (this.running && !this.over && !this.won) {
    var self = this;
    setTimeout(function(){
      self.run();
    }, timeout);
  }
}
