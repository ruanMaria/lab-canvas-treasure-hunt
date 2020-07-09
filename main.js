const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

const width = canvas.width;
const height = canvas.height;

const tileCount = 10;
const tileSize = width / tileCount;

// Iteration 1
function drawGrid() {
    context.lineWidth = 2;
    for (let x = 0; x <= height; x += tileSize) {
      context.beginPath();
      context.moveTo(x, 0);
      context.lineTo(x, height);
      context.stroke();
    }
    for (let y = 0; y <= width; y += tileSize) {
      context.beginPath();
      context.moveTo(0, y);
      context.lineTo(width, y);
      context.stroke();
    }
  }
  //iteration 2
  class Character {
    constructor(col, row) {
      this.col = col;
      this.row = row;
      this.direction = 'down';
      
      const imagePaths = {
        left: '/images/character-left.png',
        up: '/images/character-up.png',
        right: '/images/character-right.png',
        down: '/images/character-down.png'
      };

      this.images = {};
  
      for (let direction in imagePaths) {
        this.images[direction] = new Image();
        this.images[direction].src = imagePaths[direction];
      }
    }

    moveUp() {
      this.row--;
      this.direction = 'up';
    } 
    moveRight() {
        this.col++;
        this.direction = 'right';
      }

    moveDown() {
      this.row++;
      this.direction = 'down';
    }

    moveLeft() {
      this.col--;
      this.direction = 'left';
    }
}
const player = new Character(0, 0);

// Iteration 3
function drawPlayer() {
    context.drawImage(
      player.images[player.direction],
      player.col * tileSize,
      player.row * tileSize,
      tileSize,
      tileSize
    );
  }

  // Iteration 4

class Treasure {
    constructor() {
      this.setRandomPosition();
      this.image = new Image();
      this.image.src = 'images/treasure.png';
    }
    setRandomPosition() {
      this.col = Math.floor(Math.random() * tileCount);
      this.row = Math.floor(Math.random() * tileCount);
    }
  }
  
  const treasure = new Treasure();
  
  function drawTreasure() {
    context.drawImage(
      treasure.image,
      treasure.col * tileSize,
      treasure.row * tileSize,
      tileSize,
      tileSize
    );
  }
  
  // Iteration 5
  
  document.addEventListener('keydown', event => {   
    event.preventDefault();
    switch (event.keyCode) {
      case 37:
        player.moveLeft();
        break;
      case 38:
        player.moveUp();
        break;
      case 39:
        player.moveRight();
        break;
      case 40:
        player.moveDown();
        break;
    }
  
    if (player.row === treasure.row && player.col === treasure.col) {
      treasure.setRandomPosition();
    }
  
    drawEverything();
  });
  function drawEverything() {
    context.clearRect(0, 0, width, height);
    drawGrid();
    drawTreasure();
    drawPlayer();
  }
  setTimeout(drawEverything, 500);