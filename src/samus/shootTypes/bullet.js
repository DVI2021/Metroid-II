Quintus.Bullet = function(Q) {

    //Bullet
    Q.Sprite.extend("Bullet", {
        init: function(p) {
            this._super(p,{
                sheet: "fire",
                sprite: "bullet_anim",
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
            Q.audio.play("Shoot.mp3");
        },

        step: function(dt){

            if(this.p.vx!=0) {
                if (this.p.vx > 0) this.p.x += this.p.vx;
                else if (this.p.vx < 0) this.p.x -= this.p.vx * -1;

                var that = this;

                if (this.p.dir == "right") {
                    if (this.p.x > this.p.initX + 35) that.destroy();
                } else {
                    if (this.p.x < this.p.initX - 35) that.destroy();
                }
            }
            else{
                this.p.y += this.p.vy * -1;
                var that = this;
                if (this.p.y < this.p.initY -35) that.destroy();
            }

        },

        hit: function(collision){

            if(!collision.obj.isA("Samus")) {
                this.destroy();
                var q = Q.stage();
                q.insert(new Q.Explosion({x: this.p.x ,y: this.p.y, sheet: "fire", sprite: "bullet_anim"}));
            }



        }
    });

}