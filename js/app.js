// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    // choose random number between 2 and 3 for enemy
    // starting row
    var staringRow =  getRandomInt(2,4);
    
    this.x = -100 ;
    this.y = convertRowToY(staringRow) - 16;
    this.speed = getRandomInt(150,300);
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += Math.floor(this.speed * dt);

    if( this.x >= ctx.canvas.width){
        Enemy.call(this);
    }

    // did player collide with enemy
    if(collision(player.x,this.x) && collision(player.y,this.y)){

        player.reset('collision');
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';

    this.currentCol = 3;
    this.currentRow = 6;
    this.lives = 3;
    this.score = 0;
}

/**
 * update player
 */
Player.prototype.update = function() {
    //var colWidth = 101;
    var colHeight = 80;

    this.x = convertColToX(this.currentCol);
    this.y = convertRowToY(this.currentRow);

    // safe
    if(this.currentRow < 2){
        player.reset('safe');
    }
}

/**
 * render player on canvas
 */
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

/**
 * player input
 * @param  string
 */
Player.prototype.handleInput = function(key) {
    if (key === 'left' && this.currentCol > 1) {
        this.currentCol--;
    }else if (key === 'right' && this.currentCol < 5){
        this.currentCol++;
    }else if (key === 'up' && this.currentRow > 1){
        this.currentRow--;
    }else if (key === 'down' && this.currentRow < 6){
        this.currentRow++;
    }
}

/**
 * reset player
 * @param  string
 */
Player.prototype.reset = function(action) {
    if(action === 'collision'){
        player.lives --;
    }else if (action === 'safe') {
        player.score += 10;
    };

    if(player.lives === 0) {
        player.lives = 3;
        player.score = 0;
    }

    player.currentCol = 3;
    player.currentRow = 6;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];

// create 5 ememies
for(var i = 0; i < 5; i++){
    allEnemies.push(new Enemy());
}

// player
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

/**
 * convert column to x 
 * @param  integer
 * @return integer
 */
function convertColToX(col) {
    var colWidth = 101;
    
    return (col -1) * colWidth;
}

/**
 * convert row to y
 * @param  integer
 * @return integer
 */
function convertRowToY(row) {
    var colHeight = 80;

    return (row -1) * colHeight;
}

/**
 * determine if player and enemy are close enough to say they
 * have collided.
 * @param  integer
 * @param  integer
 * @return boolean
 */
function collision(player,enemy) {
    var collision = false;

    if(Math.abs(player - enemy) < 50) {
        collision = true;
    }

    return collision;
}

/**
 * Returns a random number between min (inclusive) and max (inclusive)
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
 * @param  integer
 * @param  integer
 * @return integer
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}