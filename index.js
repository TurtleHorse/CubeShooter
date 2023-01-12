const Canvas = document.querySelector("canvas");
Canvas.width = window.innerWidth;
Canvas.height = window.innerHeight;

const c = Canvas.getContext("2d");
const gravity = 0.5;
class character {
  constructor() {
    this.speed = 10;
    this.position = {
      x: 300,
      y: 600,
    };
    this.velocity = {
      x: 0,
      y: 1,
    };
    this.width = 30;
    this.height = 30;
  }

  draw() {
    c.fillStyle = "red";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update() {
    this.draw();
    this.position.y += this.velocity.y;

    if (this.position.y + this.height + this.velocity.y <= Canvas.height)
      this.velocity.y += gravity;
    else this.velocity.y = 0;

    if (keys.right.pressed === true) {
      Character.position.x += this.speed;
    }
    if (keys.left.pressed === true) {
      Character.position.x -= this.speed;
    }
  }
}

class Projectile {
  constructor({ position, velocity }) {
    this.position = position;
    this.velocity = velocity;
    this.radius = 3;
  }

  draw() {
    c.beginPath();
    c.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
    c.fillStyle = "blue";
    c.fill();
    c.closePath();
  }

  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}

const keys = {
  right: {
    pressed: false,
  },
  left: {
    pressed: false,
  },
};

class meteorites {
  constructor() {
    this.width = Math.random() * 40 + 20;
    this.height = Math.random() * 40 + 20;
    this.position = {
      x: Math.random() * innerWidth,
      y: Math.random(),
    };
    this.velocity = {
      x: 0,
      y: 1,
    };
  }
  draw() {
    c.fillStyle = "hsl(" + 360 * Math.random() + ", 50%, 50%)";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    //Collision detection for Meteorite and Character
    if (
      Character.position.x + Character.width >= this.position.x &&
      Character.position.x <= this.position.x + this.width &&
      Character.position.y + Character.height >= this.position.y &&
      Character.position.y <= this.position.y + this.height
    ) {
      life--;
      init();
    }
  }
}

//Objects
let Character = new character();
let Meteorites = [];
let Projectiles = [];
Character.update();
// Produces more Meteorites falling and set speed
let life = 1;
setInterval(moreMeteorites, Math.random() * 500 + 400);
function moreMeteorites() {
  if (life) {
    Meteorites.push(new meteorites());
  } else {
    init();
  }
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, Canvas.width, Canvas.height);

  Meteorites.forEach((Meteorite) => {
    Meteorite.update();
  });
  Projectiles.forEach((Projectile, j) => {
    Projectile.update();
    
  });
  Character.update();
}
animate();

//game over!!! Resets meteorites
function init() {
  Meteorites = [];
}

window.addEventListener("keydown", ({ key }) => {
  switch (key) {
    case "w": //W-key
      Character.velocity.y -= 15;
      break;
    case "d": //D-key
      keys.right.pressed = true;
      break;
    case "a": // A-key
      keys.left.pressed = true;
      break;
    case "s":
      // S-key No action needed
      break;
    case " ": //Spacebar
      Projectiles.push(
        new Projectile({
          position: {
            x: Character.position.x + 15,
            y: Character.position.y,
          },
          velocity: {
            x: 0,
            y: -10,
          },
        })
      );
      break;
  }
});

window.addEventListener("keyup", ({ key }) => {
  switch (key) {
    case "w":
      break;
    case "d":
      keys.right.pressed = false;
      break;
    case "a":
      keys.left.pressed = false;
      break;
    case "s":
      break;
    case " ":
      break;
  }
});
