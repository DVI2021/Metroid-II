//Dessageega
Quintus.Dessageega = function(Q) {
Q.Sprite.extend("Dessageega", {

    init: function (p) {
        this._super(p, {
            sheet: "dessageega",
            sprite: "dessageega_anim",
            frame: 0,
            gravity: 1,
            x: 0,
            y: 0,
            vy: 40,
            vx: 40,
            frozen: false,
            f: 0,
            life: 40,
            type: Q.SPRITE_ENEMY,
            collisionMask: Q.SPRITE_FRIENDLY | Q.SPRITE_DEFAULT
        });

        this.on("bump.bottom", this, "onBot");
        this.on("bump.top, bump.bottom, bump.right, bump.left", this, "hit");
        this.add("2d, aiBounce, animation");

    },

    step: function (dt) {
        this.p.f += dt;


        if(this.p.life <= 0) {

            var q = Q.stage();

            q.insert(new Q.Explosion({x: this.p.x ,y: this.p.y, sheet:"explosion", sprite: "explosion_anim"}));
            q.insert(new Q.Consumibles({x: this.p.x ,y: this.p.y}));
            this.destroy();
        }

        if(this.p.frozen){
            this.p.vy = 0;
            this.p.vx = 0;
            this.p.gravity = 0;
            if(this.p.f > 5){
                this.p.frozen = false;
                this.p.sheet = "dessageega";
                this.p.vy = -400;
                this.p.vx = 40;
                this.p.gravity = 1;
            }

        }


    },


    onBot: function (collision) {
        if(!collision.obj.isA("Bullet") && !collision.obj.isA("Missile") && !collision.obj.isA("Ice_Bullet")){
            this.play("land");
            this.p.vy = -400;
            this.p.gravity = 1;
            this.play("jump");
        }
    },


    hit: function (collision) {

        if (collision.obj.isA("Bullet")) {
            Q.audio.play("Impact.mp3");
            this.p.life -= BULLET_DAMAGE;
        }

        if (collision.obj.isA("Missile")) {
            Q.audio.play("Impact.mp3");

            this.p.life -= MISSILE_DAMAGE;

        }

        if (collision.obj.isA("Samus")) {
            if(!this.p.frozen)
                collision.obj.hit();
            else collision.obj.p.s = 0;

        }

        if (collision.obj.isA("Ice_Bullet")) {
            Q.audio.play("Impact.mp3");

            this.p.frozen = true;
            this.p.sheet = "frozen_d";
            this.p.f = 0;
            this.p.life -= BULLET_DAMAGE;

        }

    }

});
}