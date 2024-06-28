const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const player = {
    x: canvas.width / 2,
    y: canvas.height - 50,
    width: 50,
    height: 50,
    color: '#00f'
};

const fallingObjects = [];
const objectSpeed = 2;
let score = 0;

function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawObjects() {
    for (let i = 0; i < fallingObjects.length; i++) {
        const obj = fallingObjects[i];
        ctx.fillStyle = obj.color;
        ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
    }
}

function updateObjects() {
    for (let i = 0; i < fallingObjects.length; i++) {
        const obj = fallingObjects[i];
        obj.y += objectSpeed;

        if (obj.y > canvas.height) {
            fallingObjects.splice(i, 1);
            score--;
        }

        if (checkCollision(obj, player)) {
            fallingObjects.splice(i, 1);
            score++;
        }
    }
}

function spawnObject() {
    const objWidth = 30 + Math.random() * 40;
    const objX = Math.random() * (canvas.width - objWidth);
    const newObj = {
        x: objX,
        y: 0,
        width: objWidth,
        height: 20,
        color: `#${Math.floor(Math.random()*16777215).toString(16)}`
    };
    fallingObjects.push(newObj);
}

function checkCollision(obj, player) {
    return obj.x < player.x + player.width &&
           obj.x + obj.width > player.x &&
           obj.y < player.y + player.height &&
           obj.y + obj.height > player.y;
}

function drawScore() {
    ctx.fillStyle = '#000';
    ctx.font = '24px Arial';
    ctx.fillText(`Score: ${score}`, 20, 30);
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawPlayer();
    drawObjects();
    updateObjects();
    drawScore();

    spawnObject();

    requestAnimationFrame(gameLoop);
}

gameLoop();

document.addEventListener('mousemove', function(event) {
    const mouseX = event.clientX - canvas.offsetLeft;
    player.x = mouseX - player.width / 2;
});
