let star = 1;
// Enemies our player must avoid
var Enemy = function() {
  this.positony = [213.5, 133.5, 53.5];
  this.y = this.positony[Math.floor(Math.random() * this.positony.length)]; // Variables applied to each of our instances go here,
  // we've provided one for you to get started
  this.x = 0;
  this.speed = Math.floor(Math.random() * 40 + 20) * star;
  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = "images/enemy-bug.png";
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
let allEnemies = [new Enemy(), new Enemy(), new Enemy(), new Enemy()];
Enemy.prototype.update = function(dt) {
  this.x = this.x + this.speed * dt;
  if (this.x >= 500) {
    this.x = 0;
    this.y = this.positony[Math.floor(Math.random() * this.positony.length)];
    this.speed = Math.floor(Math.random() * 30  + 20) * star;
  }
  if (
    this.x > player.x - 65 &&
    this.x < player.x + 65 &&
    (this.y > player.y - 65 && this.y < player.y + 65)
  ) {
    player.x = 202;
    player.y = 373.5;
    this.x = -10;
    this.y = this.positony[Math.floor(Math.random() * this.positony.length)];
    this.speed = Math.floor(Math.random() * 30 + 20) * star;
    star = 1;
    allEnemies = [new Enemy(), new Enemy(), new Enemy()];
  }
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
class Player {
  constructor(x, y) {
    this.x = 202;
    this.y = 373.5;
    this.picture = "images/char-boy.png";
  }

  render() {
    let s = "";
    for (let i = 0; i < star - 1; i = i + 1) {
      s = s + "&#9733";
    }

    document.getElementById("rt").innerHTML = "Star Rating " + s;
    ctx.drawImage(Resources.get(this.picture), this.x, this.y);
    if (star == 6) {
      window.alert("you win");
      location.reload(true);
    }
  }

  update() {}
  handleInput(val) {
    
    if (val === "left") {
      if (this.x == -2) {
        this.x = -2;
      } else {
        this.x = this.x - 102;
      }
    } else if (val === "right") {
      if (this.x == 406) {
        this.x = 406;
      } else {
        this.x = this.x + 102;
      }
    } else if (val === "up") {
      if (this.y == 53.5) {
        this.y = 373.5;
        this.x = 202;
        star = star + 1;
        if (star < 4) {
          allEnemies.push(new Enemy());
        }
      } else {
        this.y = this.y - 80;
        
      }
    } else if (val === "down") {
      if (this.y == 373.5) {
        this.y = 373.5;
      } else {
        this.y = this.y + 80;
        
      }
    }
  }
}
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

let player = new Player();
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener("keyup", function(e) {
  
  var allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down"
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
