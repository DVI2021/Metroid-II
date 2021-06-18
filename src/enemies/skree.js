//Skree
Quintus.Skree = function(Q) {
    Q.Sprite.extend("Skree", {

        init: function (p) {
            this._super(p, {
                sheet: "skree",
                sprite: "skree_anim",
                frame: 0,
                gravity: 0,
                x: 0,
                y: 0,
                vy: 0,
                life: 40,
                frozen: false,
                f: 0,
                type: Q.SPRITE_ENEMY,
                collisionMask: Q.SPRITE_FRIENDLY | Q.SPRITE_DEFAULT
            });
            this.on("hit.sprite, bump.bottom", this, "hit");
            this.on("bump.bottom", this, "explosion");
            this.add("2d, animation");

        },

        explosion: function (collision) {

            if (!collision.obj.isA("Bullet") && !collision.obj.isA("Ice_Bullet") && !collision.obj.isA("Missile")) {

                this.p.vx = 0;
                var q = Q.stage();
                q.insert(new Q.Explosion({x: this.p.x, y: this.p.y}));
                this.destroy();

            }

        },

        step: function (dt) {


            this.p.f += dt;

            if (this.p.frozen) {
                this.p.sheet = "frozen_skree";

                this.p.vy = 0;
                this.p.vx = 0;
                if (this.p.f > 5) { //se descongela
                    this.p.frozen = false;
                    this.p.sheet = "skree";
                }


            } else {
                var samus = Q("Samus").first();
                if (samus) {

                    if (Math.abs(this.p.x - samus.p.x) < 50) {
                        this.p.vy = 120;
                        if (this.p.x - samus.p.x < 0) {
                            this.p.vx = 80;

                        } else if (this.p.x - samus.p.x > 0) {
                            this.p.vx = -80;

                        }
                    }

                }


            }


            //Animacion según si está quieto o cayendo
            if (this.p.vy == 0) this.play("idle");
            else this.play("fall");

            if (this.p.life <= 0) {

                var q = Q.stage();

                q.insert(new Q.Explosion({x: this.p.x, y: this.p.y, sheet: "explosion", sprite: "explosion_anim"}));
                q.insert(new Q.Consumibles({x: this.p.x, y: this.p.y}));
                this.destroy();
            }

        },


        hit: function (collision) {


            if (collision.obj.isA("Bullet")) {
                Q.audio.play("Impact.mp3");

                this.p.vx = 0;
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
                this.p.sheet = "frozen_skree";
                this.p.f = 0;

            }


        }


    });
}