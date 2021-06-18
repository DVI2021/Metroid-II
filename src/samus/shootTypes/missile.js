Quintus.Missile = function(Q) {

    Q.Sprite.extend("Missile", {
        init: function(p) {
            this._super(p,{
                sheet: "missile", // cambiar
                sprite: "missile_anim", // cambiar
                scale: 1,
                frame: 0,
                gravity: 0,
                x: 0,
                y: 0,
                vx: 0,
                vy:0,
                dir:"",
                initX:0,
                type: Q.SPRITE_FRIENDLY,
                collisionMask: Q.SPRITE_ENEMY | Q.SPRITE_DEFAULT

            });
            this.on("bump.left,bump.right,bump.bottom,bump.top", this, "hit");
            this.add("2d, animation");
            Q.audio.play("Missile.mp3");
        },

        step: function(dt){

            if(this.p.vx!=0) {
                if (this.p.vx > 0){ this.p.x += this.p.vx;
                    this.play("r");
                }
                else if(this.p.vx < 0){
                    this.p.x -= this.p.vx * -1;
                    this.play("l");
                }
            }
            else{
                this.p.y += this.p.vy * -1;
            }


        },

        hit: function(collision){

            if(!collision.obj.isA("Samus")) {

                this.destroy();
                var q = Q.stage();
                q.insert(new Q.Explosion({x: this.p.x ,y: this.p.y}));

            }



        }
    });

}