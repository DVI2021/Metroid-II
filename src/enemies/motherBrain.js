
//Mother Brain
Quintus.MotherBrain = function(Q) {
Q.Sprite.extend("MotherBrain", {

    init: function (p) {
        this._super(p, {
            sheet: "motherBrain",
            sprite: "brain_anim",
            frame: 0,
            gravity: 0,
            x: 0,
            y: 0,
            life: 200,
            iframes: 0,
            invulnerable: false,
            type: Q.SPRITE_ENEMY,
            collisionMask: Q.SPRITE_FRIENDLY | Q.SPRITE_DEFAULT
        });
        this.add("2d, animation");
        this.on("bump.left, bump.right", this, "hit");
        this.on("kill", this, "die");
        this.play("idle");
    },

    die: function(){
        Q.state.set("count", true);
        Q.audio.stop();
        Q.audio.play("11_Escape.mp3", {loop: true});
        this.destroy();
    },

    step: function (dt) {


        if(this.p.invulnerable && this.p.life > 0){
            this.p.iframes += dt;

            if(this.p.iframes > 0.5){ //medio segundo de invulnerabilidad
                this.p.invulnerable = false;
            }
        }

    },


    hit: function (collision) {

        if (collision.obj.isA("Missile")) {
            Q.audio.play("Impact.mp3");

            if(!this.p.invulnerable){

                this.p.life -= BULLET_DAMAGE;
                this.play("hit");
                this.p.invulnerable = true;

                if(this.p.life <= 0){

                    this.play("die");
                }

            }

        }


    }



});

}