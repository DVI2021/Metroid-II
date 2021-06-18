
//Zommer
Quintus.Zommer = function(Q) {
    Q.Sprite.extend("Zommer", {

        init: function (p) {
            this._super(p, {
                sheet: "zommer",
                sprite: "zommer_anim",
                frame: 0,
                vx: 1,
                vy: 0,
                x: 0,
                y: 0,
                vy: 0,
                life: 30,
                dir: "bot",
                type: Q.SPRITE_ENEMY,
                collisionMask: Q.SPRITE_FRIENDLY | Q.SPRITE_DEFAULT,
                f: 0,
                frozen: false,
                onWall: true // controla si Zoomer esta en una pared o no
            });
            this.on("bump.top", this, "hitTop");
            this.on("bump.bottom", this, "hitBot");
            this.on("bump.right", this, "hitR");
            this.on("bump.left", this, "hitL");

            this.on("hit.sprite", this, "hit");

            this.add("2d, animation");

        },


        step: function (dt) {

            this.p.f += dt;

            if (this.p.frozen) {
                this.p.sheet = "frozen_zommer";

                this.p.vy = 0;
                this.p.vx = 0;
                if (this.p.f > 10) { //se descongela
                    this.p.frozen = false;
                    this.p.sheet = "zommer";
                }


            } else {

                // si no esta agarrado a una pared (zona convexa) se pega de nuevo
                if (!this.p.onWall) {

                    switch (this.p.dir) {
                        case "right": {
                            this.p.x += 1;
                            this.p.vy = 1;
                            this.p.vx = 0;
                            this.p.gravityX = 0;
                            this.p.gravityY = 10;
                        }
                            break;
                        case "left": {
                            this.p.x -= 1;
                            this.p.vy = -1;
                            this.p.vx = 0;
                            this.p.gravityX = 0;
                            this.p.gravityY = -10;
                        }
                            break;
                        case "top": {
                            this.p.y -= 1;
                            this.p.vy = 0;
                            this.p.vx = 1;
                            this.p.gravityX = 10;
                            this.p.gravityY = 0;
                        }
                            break;
                        case "bot": {
                            this.p.y += 1;
                            this.p.vy = 0;
                            this.p.vx = -1;
                            this.p.gravityX = -10;
                            this.p.gravityY = 0;
                        }
                            break;
                    }

                }

                // camina por la pared
                this.p.x += this.p.vx * 0.1;
                this.p.y += this.p.vy * 0.1;

            }
            if (this.p.life <= 0) {

                var q = Q.stage();

                q.insert(new Q.Explosion({x: this.p.x, y: this.p.y, sheet: "explosion", sprite: "explosion_anim"}));
                q.insert(new Q.Consumibles({x: this.p.x, y: this.p.y}));
                this.destroy();
            }

            //se resetea la variable de estar en la pared
            this.p.onWall = false;

        },

        hitTop: function (col) {
            this.p.onWall = true;

            if (!col.obj.isA("Samus") && !col.obj.isA("Bullet") && !col.obj.isA("Ice_Bullet") && !col.obj.isA("Missile")) {
                this.play("run_x_u");
                this.p.onWall = true;
                // si no esta en esta direccion
                if (this.p.dir != "top") {
                    this.p.x -= 1; // se da un saltito a la nueva pared
                    this.p.dir = "top";
                }

                this.p.vx = -1;
                this.p.vy = 0;
                //cambio en la gravedad
                this.p.gravityX = 0;
                this.p.gravityY = -10;
            }

        },

        hitBot: function (col) {
            this.p.onWall = true;

            if (!col.obj.isA("Samus") && !col.obj.isA("Bullet") && !col.obj.isA("Ice_Bullet") && !col.obj.isA("Missile")) {

                this.play("run_x_d");
                this.p.onWall = true;
                // si no esta en esta direccion
                if (this.p.dir != "bot") {
                    this.p.x += 1; // se da un saltito a la nueva pared
                    this.p.dir = "bot";
                }

                this.p.vx = 1;
                this.p.vy = 0;
                //cambio en la gravedad
                this.p.gravityY = 10;
                this.p.gravityX = 0;
            }

        },

        hitR: function (col) {
            this.p.onWall = true;

            if (!col.obj.isA("Samus") && !col.obj.isA("Bullet") && !col.obj.isA("Ice_Bullet") && !col.obj.isA("Missile")) {
                this.play("run_y_r");
                this.p.onWall = true;
                // si no esta en esta direccion
                if (this.p.dir != "right") {
                    this.p.y -= 1; // se da un saltito a la nueva pared
                    this.p.dir = "right";
                }

                this.p.vy = -1;
                this.p.vx = 0;
                //cambio en la gravedad
                this.p.gravityY = 0;
                this.p.gravityX = 10;
            }

        },

        hitL: function (col) {
            this.p.onWall = true;
            if (!col.obj.isA("Samus") && !col.obj.isA("Bullet") && !col.obj.isA("Ice_Bullet") && !col.obj.isA("Missile")) {
                this.play("run_y_l");

                this.p.onWall = true;
                // si no esta en esta direccion
                if (this.p.dir != "left") {
                    this.p.y += 1; // se da un saltito a la nueva pared
                    this.p.dir = "left";
                }

                this.p.vy = 1;
                this.p.vx = 0;
                //cambio en la gravedad
                this.p.gravityY = 0;
                this.p.gravityX = -10;
            }


        },

        // colision normal
        hit: function (collision) {

            if (collision.obj.isA("Bullet")) {
                Q.audio.play("Impact.mp3");
                this.p.life -= BULLET_DAMAGE;
            }

            if (collision.obj.isA("Missile")) {
                Q.audio.play("Impact.mp3");

                this.p.vx = 0;
                this.p.life -= MISSILE_DAMAGE;

            }

            if (collision.obj.isA("Samus")) {
                if (!this.p.frozen)
                    collision.obj.hit();
                else collision.obj.p.s = 0;

            }

            if (collision.obj.isA("Ice_Bullet")) {
                Q.audio.play("Impact.mp3");
                if (this.p.frozen) this.p.life -= BULLET_DAMAGE;
                this.p.frozen = true;
                this.p.sheet = "frozen_zommer";
                this.p.f = 0;

            }

        },


    })
}
