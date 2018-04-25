// Enemies our player must avoid
class Enemy {
    constructor(y) {
        // Variables applied to each of our instances go here,
        // we've provided one for you to get started

        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        this.sprite = 'images/enemy-bug.png';
        this.y = y;
        this.x = 0;
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.

        // move enemies!
        // if on canvas then move else reset off canvas and generate new speed
        if (this.x <= 505) {
            this.x = this.x + this.speed * dt;
        } else {
            this.x = -101;
            // speed between 100 and 400
            // https://www.w3schools.com/jsref/jsref_random.asp
            // todo: increase difficulty later on
            this.speed = Math.floor((Math.random() * 400) + 100);
        }

        this.collisionDetection();
    }

    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    // collision detection
    collisionDetection() {
        // we draw invisible rectangles around player and enemy only, not whole block
        const playerRect = {x: player.x + 22, y: player.y + 63, width: 58, height: 78};
        const enemyRect = {x: this.x, y: this.y + 77, width: 97, height: 67};

        if (playerRect.x < enemyRect.x + enemyRect.width &&
            playerRect.x + playerRect.width > enemyRect.x &&
            playerRect.y < enemyRect.y + enemyRect.height &&
            playerRect.height + playerRect.y > enemyRect.y) {

            // collision detected! resetPosition
            player.resetPosition();
            scores.clear();
        }
    }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor() {
        this.sprite = 'images/char-boy.png';
        this.resetPosition();
    }

    update() {
        // if player reaches last block reset to starting position
        if (this.y < 0) {
            this.resetPosition();
            scores.update();
        }
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput(e) {
        this.pressedKey = e;

        //column widht is the same as image 101px
        (this.pressedKey === 'left' && this.x > 0) ? this.x = this.x - 101 : null;
        (this.pressedKey === 'right' && this.x < 404) ? this.x = this.x + 101 : null;

        // row height = 83px, ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
        (this.pressedKey === 'up' && this.y > 0) ? this.y = this.y - 83 : null;
        (this.pressedKey === 'down' && this.y < 390) ? this.y = this.y + 83 : null;
    }

    // resetPosition to starting position
    resetPosition() {
        // 505 is width, 101 is one block, so 202 will be center
        this.x = 202;
        // 606 is height, 171 is one block, so 435 will be center, but we need to be be off a bit,
        // so it will be 435 - 45px
        this.y = 390;
    }
}

class Scores {
    constructor() {
        this.scoreHTML = document.getElementById('score');
        this.clear();
    }

    update() {
        this.score++;
        this.scoreHTML.innerText = this.score;
        console.log(this.score);
    }

    clear() {
        this.score = 0;
        this.scoreHTML.innerText = this.score;
    }
}

let scores = new Scores;

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
let allEnemies = [];
// Place the player object in a variable called player
let player = new Player();

//create 3 new enemies and push them to array
for (let i = 0; i < 3; i++) {
    // add new enemy to array, 60px offset, each other 83px apart
    allEnemies.push( new Enemy(60 + (83 * i)) );
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
