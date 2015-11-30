(function() {
  if (typeof Circles === "undefined") {
    window.Circles = {};
  }


  // This is the "Game" attribute of the Circles object.  It is initialized with the
  // maximum x and y of the canvas, and loads random circles into an array of circles.
  // Game.NUM_CIRCLES determines how many circles we have.
  var Game = Circles.Game = function(xDim, yDim) {
    this.xDim = xDim;
    this.yDim = yDim;

    this.circles = [];
    for (var i = 0; i < Game.NUM_CIRCLES; i++) {
      this.circles.push(Circles.Circle.randomCircle(xDim, yDim, Game.NUM_CIRCLES));
    }
  };

  Game.NUM_CIRCLES = 4000;

  Game.prototype.render = function(ctx) {
    // "This will empty the canvas."
    ctx.clearRect(0, 0, this.xDim, this.yDim);


    // this renders each of the circles.
    this.circles.forEach(function(circle) {
      circle.render(ctx);
    });
  };


  // This moves all the circles in the game by looping through the
  // array of circles and moving each of them individually.
  Game.prototype.moveCircles = function() {
    var game = this;
    this.circles.forEach(function(circle) {
      circle.moveRandom(game.xDim, game.yDim);
    });
  };

  Game.prototype.start = function (canvasEl) {
    var ctx = canvasEl.getContext("2d");

    var animateCallback = function() {
      this.moveCircles();
      this.render(ctx);
      requestAnimationFrame(animateCallback);
    }.bind(this);
    animateCallback();
  };

  // This function is also an IFFE;
})();
