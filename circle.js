// Issues:
// ctx.beginPath();
// ctx.arc();
// ctx.fill();

(function() {
  if (typeof Circles === "undefined") {
    //Creates a new Circles object bound to the window if one isn't there already.
    window.Circles = {};
  }

  // Circle is a function that stores the attributes of a particular circle.  Also,
  // it looks like this is bound to Circles by that additional assignment.
  var Circle = Circles.Circle = function(centerX, centerY, radius, color) {
    this.centerX = centerX;
    this.centerY = centerY;
    this.radius = radius;
    this.color = color;
  };

  Circle.randomCircle = function(maxX, maxY, numCircles) {
    return new Circle(
      maxX * Math.random(),
      maxY * Math.random(),
      Circle.radius(maxX, maxY, numCircles),
      Circle.randomColor()
    );
  };

  var HEX_DIGITS = "0123456789ABCDEF";
  // This function generates a random hexidecimal string 6 characters long (preceeded by #)
  Circle.randomColor = function() {
    var color = "#";
    for (var i = 1; i <= 6; i++) {
      color += HEX_DIGITS[Math.floor((Math.random() * 16))];
    }

    return color;
  };

  // It looks like this function gets the target circle area by finding the total area of the canvas
  // and dividing by the number of circles.  This is pretty sensible.  They are doubling it for some
  // reason.  Maybe to compensate for the fact that the circle will be covered by other circles.
  Circle.radius = function(maxX, maxY, numCircles) {
    var targetCircleArea = (maxX * maxY) / numCircles;
    var targetRadius = Math.sqrt(targetCircleArea / Math.PI);
    return 2 * targetRadius;
  };


  // It looks like this function winds up moving the circle by changing the coordinates
  // of its center by a little bit.
  // dx and dy are calculated by doubling a random number and subtracting 1.
  // I think this is to generate a change in the negative direction 50% of the time.
  // The coordinates of the center move in a way that's small proportional to the
  // radius of the circle.

  Circle.prototype.moveRandom = function(maxX, maxY) {
    var dx = (Math.random() * 2) - 1;
    var dy = (Math.random() * 2) - 1;
    this.centerX = Math.abs((this.centerX + (dx * this.radius * 0.1)) % maxX);
    this.centerY = Math.abs((this.centerY + (dy * this.radius * 0.1)) % maxY);
  };

  Circle.prototype.render = function(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();

    ctx.arc(
      this.centerX,
      this.centerY,
      this.radius,
      0,
      2 * Math.PI,
      false
    );

    ctx.fill();
  };
  //this function is an IFFE.
})();
