
const GameArea = {
    canvas: document.createElement("canvas"),
    snake: new Snake(),
    obj: new Obstacle(),
    start: function () {
        this.canvas.height = 600;
        this.canvas.width = 900;
        document.body.append(this.canvas);
        this.context = this.canvas.getContext('2d');
        const config = {
            x: (this.canvas.width / 2) - 300,
            y: (this.canvas.height / 2),
            width: 30,
            height: 30,
            color: "rgb(0, 174, 255)",
            jumping: false
        };
        this.snake.set_attributes(config);
        const config_obstacle = {
            x: (this.canvas.width / 2) + 300,
            y: (this.canvas.height / 2),
            width: 10,
            height: 90,
            color: "red",
            jumping: false
        };
        this.obj.set_attributes(config_obstacle);
        GameArea.snake.moviment();
        requestAnimationFrame(updateGameArea)
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    draw: function (x, y, width, height,color) {
        this.context.shadowColor = "rgba(0, 174, 255, 0.406)";
        this.context.shadowBlur = 12;
        this.context.shadowOffsetX = 2;
        this.context.shadowOffsetY = 2;

        this.context.fillStyle = color;
        this.context.fillRect(x,y, width, height);
    },
    drawText: function (textString, x, y) {
        this.context.font = "Arial";
        this.context.fillText(textString, x, y);
    }
}

const randomColor = () => {
    const colors = ["blue", "red", "green"]
    let randomIndex = Math.floor(Math.random() * colors.length);
    GameArea.snake.color = colors[randomIndex];
}

const drawCordText = () => {

}


const updateGameArea = () => {
    GameArea.clear();
    GameArea.draw(GameArea.snake.x, GameArea.snake.y, GameArea.snake.width, GameArea.snake.height,GameArea.snake.color);
    GameArea.draw(GameArea.obj.x, GameArea.obj.y, GameArea.obj.width, GameArea.obj.height, GameArea.obj.color);
    GameArea.snake.addGravidade();
    GameArea.obj.addGravidade();
    GameArea.obj.increments_x();
    // GameArea.snake.jump();
    requestAnimationFrame(updateGameArea);

}

start = () => {
    GameArea.start();
}

start();