//Explosion
Quintus.Explosion = function(Q) {

Q.Sprite.extend("Explosion", {
    init: function(p) {
        this._super(p,{
            sheet: "missile_explosion",
            sprite: "missile_explosion_anim",
            scale: 1,
            frame: 0,
            gravity: 0,
            x: 0,
            y: 0,
            type: Q.SPRITE_PARTICLE
        });
        this.add("animation");
        this.on("goAway", this, "destroy");
        if(this.p.sheet == "explosion"){
            Q.audio.play("Explosion.mp3");
        }

    },


    step: function(dt){
        this.play("explode")

    }

});
}