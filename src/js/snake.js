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
            }
        });
    }
    colidiuComOChao() {
        return this.y >= GameArea.canvas.height - this.height;
    }
    addGravidade() {
        if (!this.colidiuComOChao()) {
            this.speedY = this.speedY + (this.gravity * this.gravitySpeed);

            this.y += this.speedY;
        } else if (this.colidiuComOChao()) {
            this.speedY = 0;
            this.y -= this.speedY;
            this.jumping = false;
        }
    }
    jump() {
        if (!this.jumping) {
            // this.angle += 1 * Math.PI / 180;
            this.speedY = -this.jumpHeight;
            this.y += this.speedY;
            this.jumping = true;

        }
    }
}

class Obstacle extends Snake {
    check_collision_x() {
        return this.x < -30;
    }
    increments_x() {
        this.speedX = -5;
        this.x += this.speedX;
        if (this.check_collision_x()) {
            this.x = GameArea.canvas.width + 30;
        }
    }
}