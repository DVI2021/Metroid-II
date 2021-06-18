//
Quintus.Waver = function(Q) {
Q.Sprite.extend("Waver", {

    init: function (p) {
        this._super(p, {
            sheet: "waver",
            sprite: "waver_anim",
            frame: 0,
            gravity: 1,
            x: 0,
            y: 0,
            vy: 1,
            vx: 40,
            frozen: false,
            stand: true,
            t: 0,
            f: 0,
            life: 40,
            type: Q.SPRITE_ENEMY,
            collisionMask: Q.SPRITE_FRIENDLY | Q.SPRITE_DEFAULT
        });

        this.on("bump.top", this, "onTop");
        this.on("bump.bottom", this, "onBot");
        this.on("hit.sprite", this, "hit");
        this.add("2d, aiBounce, animation");

    },

    step: function (dt) {
        this.p.f += dt;
        this.p.t += dt;

        if((this.p.t > 0.5 && this.p.stand) || Math.abs(this.p.vy) > 350){
            this.p.gravity = -this.p.gravity;
            this.p.t = 0;
            this.p.stand = false;
        }

        if(this.p.vx > 0){
            this.p.stand = false;
            this.play("l");
        }
        else if(this.p.vx < 0){
            this.p.stand = false;
            this.play("r");
        }

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
                this.p.sheet = "waver";
                this.p.vx = 40;
                this.p.vy = 1;
                this.p.gravity = 1;
            }

        }


    },

    onTop: function () {

        if(!this.p.stand){
            this.p.stand = true;
        }


    },

    onBot: function () {

        if(!this.p.stand){
            this.p.stand = true;
        }


    },


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
            if(!this.p.frozen)
                collision.obj.hit();
            else collision.obj.p.s = 0;

        }

        if (collision.obj.isA("Ice_Bullet")) {
            Q.audio.play("Impact.mp3");
            if(this.p.frozen) this.p.life -= BULLET_DAMAGE;
            this.p.frozen = true;
            this.p.sheet = "frozen_waver";
            this.p.f = 0;

        }

    }

});

}