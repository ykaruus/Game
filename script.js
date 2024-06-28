const GameArea = {
    canvas: document.createElement("canvas"),
    snake: new Snake(),
    GAMEOVER: false,
    obj: new CactoBig(),
    text: "Score: ",
    score: 0,
    debug: false,
    Player_image: new Image(),
    Player_image_src : "",
    Obstacle_image : new Image(),
    Obstacle_image_src : "",
    spawnrate : 2,
    initialTime : performance.now(),

    start: function () {
        this.canvas.height = 600;
        this.canvas.width = 900;
        document.body.appendChild(this.canvas);
        this.context = this.canvas.getContext('2d');
        
        // Initialize snake
        const snakeConfig = {
            x: this.canvas.height / 2 + 100,
            y: this.canvas.height - 105,
            width: 100,
            height: 100,
            color: "rgb(0, 174, 255)",
        };
        this.snake.set_attributes(snakeConfig);
        this.snake.moviment(); // Assuming this sets movement keys
        
        // Initialize obstacle
        const obstacleConfig = {
            x: this.canvas.width - 10,
            y: this.canvas.height - 90,
            width: 10,
            height: 90,
            color: "red",
        };
        this.obj.set_attributes(obstacleConfig);

        this.Player_image.onload = () => {
            requestAnimationFrame(updateGameArea);
        };
        this.Player_image.src = './src/sprites.png';        

    },
    
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    
    draw: function (img, x, y, width, height) {
        //this.context.drawImage(img, x, y, width, height);
        this.context.drawImage(img,this.snake.sx,this.snake.sy,43,60, x, y, width , height);
    },
    drawHitBox: function() {
        this.context.fillStyle = this.obj.color;
        this.context.fillRect(this.obj.x,this.obj.y, this.obj.width, this.obj.height)
    },
    drawText: function (textString, x, y, size) {
        this.context.font = `${size} Arial`;
        this.context.fillStyle = "white";
        this.context.fillText(textString, x, y);
    },
    
    checkCollisionWithObj: function () {
        return this.snake.x + this.snake.width > this.obj.x
            && this.obj.x + this.obj.width > this.snake.x
            && this.snake.y + this.snake.height > this.obj.y
            && this.obj.y + this.obj.height > this.snake.y;
    },

    spriteupdate : function(Dino, Sprite){
        console.log(Dino.src, Sprite)
        if (Dino.src == Sprite) {
            return;
        };
        Dino.src = Sprite;
        this.Player_image.onload = () => {
            requestAnimationFrame(this.clear());
        };
    },
    

    checkGameover: function () {
        if (this.checkCollisionWithObj()) {
            this.snake.state = "gameover";
            
        }
    },
    
    randomDecision: function () {
        let decision = Math.floor(Math.random() * 20);
        this.obj.speedX = (decision === 10) ? 10 : 5;
    },
    
    check_collision_stop_area: function () {
        if (this.obj.x === 700) {
            this.obj.speedX = 0;
        }
        this.randomDecision();
    },
};

const updateGameArea = () => {
    GameArea.clear();
    GameArea.draw(GameArea.Player_image, GameArea.snake.x, GameArea.snake.y, GameArea.snake.width, GameArea.snake.height);
    GameArea.drawHitBox();
    GameArea.drawText("SCORE: " + GameArea.score, GameArea.canvas.width / 2 + 300, GameArea.canvas.height / 2 - 250, "20px");
    GameArea.snake.addGravidade();
    GameArea.snake.AnimationUpdate();
    GameArea.checkGameover();
    GameArea.obj.update_object();
    // GameArea.update_sprite();
    GameArea.score++;
    
    if (GameArea.debug) {
        GameArea.drawText("VelocidadeY: " + GameArea.snake.speedY, GameArea.canvas.width / 2 - 400, GameArea.canvas.height / 2 - 250, "20px");
        GameArea.drawText("VelocidadeX: " + GameArea.snake.speedX, GameArea.canvas.width / 2 - 400, GameArea.canvas.height / 2 - 150, "20px");
        GameArea.drawText("AnimationDelta: " + GameArea.snake.AnimationDelta, GameArea.canvas.width / 2 - 400, GameArea.canvas.height / 2 - 75, "20px");        
        GameArea.drawText("InitialTimeRate: " + (Math.abs(GameArea.initialTime - performance.now()) / 1000), GameArea.canvas.width / 2 - 25, GameArea.canvas.height / 2 - 75, "20px");     
        GameArea.drawText("State: " + GameArea.snake.state, GameArea.canvas.width / 2 - 25, GameArea.canvas.height / 2 - 50, "20px");      
        
        //(GameArea.initialTime - new Date().getMilliseconds()
    }

    if (Math.abs(GameArea.initialTime - performance.now()) / 1000 > GameArea.spawnrate) {
       GameArea.initialTime = performance.now();
       console.log("spawn new object")
    }
    requestAnimationFrame(updateGameArea)

};

const start = () => {
    GameArea.start();
};

start();


/*
        __________
        |        |
        |________|
        |        |
        |--------|   - Codded By Ykarus & Ryu
        |        |
    ----|--------|----
    |                |
    ------------------
*/