class Snake {
    set_attributes(config) {
        this.x = config.x;
        this.y = config.y;
        this.height = config.height;
        this.width = config.width;
        this.color = config.color;
        this.direction = "stops";
        this.speed = 6;
        this.angle = 0;
        this.gravity = 0.75;
        this.speedY = 0;
        this.jumpHeight = 10;
        this.jumpSpeed = 0;
        this.jumping = config.jumping;
        this.gravitySpeed = 0.4;
        this.state = "Ground"
        this.AnimationDelta = 0.0;
        this.sx = 0.0;
        this.sy = 0.0;

        //Animation
        this.FPS = 60.0;
        this.Idle = [
            {
                x: 0,
                y: 0
            },
        ]

        this.skewered = [
            {
                x: 150,
                y: 0
            }
        ]

        this.Run = [
            {
                __current: 0,
                __delta: 0,
            },

            {
                x: 88.5,
                y: 0
            },

            {
                x: 132.5,
                y: 0
            },
        ]


    }
    moviment() {
        document.addEventListener('keydown', (ev) => {
            switch (ev.key) {
                case " ":
                    this.jump();
                    console.log("clicou");
                    break;
                case "o":
                    window.alert("pausado");
                    break;
                case "p":
                    GameArea.debug = !GameArea.debug
                    break;
            }
        });
    }
    colidiuComOChao() {
        return this.y >= GameArea.canvas.height - this.height;
    }
    AnimationUpdate() {
        if (this.state == "Ground") {
            this.Run[0].__delta += 1;

            if (this.Run[0].__delta > this.FPS / 12) {
                this.Run[0].__delta = 0;
                this.Run[0].__current += 1;

                if (this.Run[0].__current > 2) {
                    this.Run[0].__current = 1;
                }
            };
            //   console.log("Lenght do array : " + this.Run.length + "\n" + "Delta : " + this.Run[0].__delta);

            this.sx = this.Run[this.Run[0].__current].x;
            this.sy = this.Run[this.Run[0].__current].y;
        } else if (this.state == "Jumping") {
            this.sx = this.Idle[0].x;
            this.sy = this.Idle[0].y;
        } else if (this.state == "gameover") {
            this.sx = this.skewered[0].x;
            this.sy = this.skewered[0].y
        }
    }
    addGravidade() {
        this.AnimationDelta += 1.0;

        if (!this.colidiuComOChao()) {
            this.speedY = this.speedY + (this.gravity * this.gravitySpeed);

            this.y += this.speedY;
        } else if (this.colidiuComOChao()) {
            this.speedY = 0;
            this.jumping = false;
            this.y = GameArea.canvas.height - this.height;
            this.state = "Ground";
        }
    }
    jump() {
        if (!this.jumping) {
            this.speedY = -this.jumpHeight;
            this.y += this.speedY;
            this.jumping = true;
            this.state = "Jumping"
        }
    }
}

class CactoBig {
    set_attributes(config) {
        this.y = config.y;
        this.x = config.x;
        this.width = config.width;
        this.height = config.height;
        this.color = config.color;
    }
    check_collision(target_x, target_y, target_width, target_height) {
        return target_x + target_width > this.x
            && this.x + this.width > target_x
            && target_y + target_height > this.y
            && this.y + this.height > target_y;
    }
    update_object() {
        this.x -= 1;
    }
}
