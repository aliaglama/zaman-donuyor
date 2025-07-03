let canvas = document.getElementById('gameCanvas');
let ctx = canvas.getContext('2d');
canvas.width = window.innerWidth - 50;
canvas.height = 400;

let player = { x: 50, y: 200, radius: 20 };
let obstacles = [];
let score = 0;
let speed = 4;
let timePower = 100;
let isTimeSlow = false;

function createObstacle() {
    let height = Math.random() * 100 + 50;
    obstacles.push({ x: canvas.width, y: canvas.height - height, width: 30, height: height });
}

function updateObstacles() {
    for (let i = 0; i < obstacles.length; i++) {
        obstacles[i].x -= speed;
    }
    obstacles = obstacles.filter(ob => ob.x + ob.width > 0);
}

function drawPlayer() {
    ctx.beginPath();
    ctx.arc(player.x, player.y, player.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'red';
    ctx.fill();
}

function drawObstacles() {
    ctx.fillStyle = 'green';
    obstacles.forEach(ob => {
        ctx.fillRect(ob.x, ob.y, ob.width, ob.height);
    });
}

function checkCollision() {
    for (let ob of obstacles) {
        if (player.x + player.radius > ob.x && player.x - player.radius < ob.x + ob.width &&
            player.y + player.radius > ob.y) {
            alert("Oyun Bitti! Skor: " + score);
            document.location.reload();
        }
    }
}

document.body.addEventListener('click', () => {
    if (timePower > 0) {
        isTimeSlow = true;
    }
});

setInterval(createObstacle, 1500);

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    speed = isTimeSlow ? 1 : 4;

    updateObstacles();
    drawObstacles();
    drawPlayer();
    checkCollision();

    if (isTimeSlow) {
        timePower -= 1;
        if (timePower <= 0) {
            isTimeSlow = false;
        }
    } else {
        if (timePower < 100) timePower += 0.5;
    }

    score++;
    document.getElementById('score').innerText = score;
    document.getElementById('timePower').innerText = Math.floor(timePower);

    requestAnimationFrame(gameLoop);
}

gameLoop();
