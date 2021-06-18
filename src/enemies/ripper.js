//Ripper
Quintus.Ripper = function(Q) {
    Q.Sprite.extend("Ripper", {

        init: function (p) {
            this._super(p, {
                sheet: "ripper",
                sprite: "ripper_anim",
                frame: 0,
                gravity: 0,
                x: 0,
                y: 0,
                vx: 35,
                frozen: false,
                t: 0,
                type: Q.SPRITE_ENEMY,
                collisionMask: Q.SPRITE_FRIENDLY | Q.SPRITE_DEFAULT
            });
            this.on("hit.sprite", this, "hit");
            this.add("2d, aiBounce, animation");

        },

        step: function (dt) {
            this.p.t += dt;

            if (this.p.vx > 0) {
                this.play("l");
            } else {
                this.play("r");
            }

            if (this.p.frozen) {

                this.p.vx = 0;
                if (this.p.t > 5) {
                    this.p.frozen = false;
                    this.p.sheet = "ripper";
                    this.p.vx = 35;
                }

            }


        },


        hit: function (collision) {

            if (collision.obj.isA("Samus")) {
                    if (!this.p.frozen)
                        collision.obj.hit();
                    else collision.obj.p.s = 0;

                }



            if (collision.obj.isA("Ice_Bullet")) {

                this.p.frozen = true;
                this.p.sheet = "frozen_ripper";
                this.p.t = 0;

            }

        }

    });
}