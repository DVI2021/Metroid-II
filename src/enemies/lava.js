
// lava
Quintus.Lava = function(Q) {
Q.Sprite.extend("Lava", {
    init: function(p) {
        this._super(p,{
            sheet: "lava_yellow",
            sprite: "lava_anim",
            frame: 0,
            gravity: 0,
            x: 0,
            y: 0,
            type: Q.SPRITE_ENEMY,
            collisionMask: Q.SPRITE_FRIENDLY,
            sensor:true
        });
        this.on("hit.sprite", this, "hit");
        this.add("animation");
        this.play("vida");
    },


    step: function(dt){

        this.play("idle");

    },

    hit: function(collision){

        if(collision.obj.isA("Samus")){

            collision.obj.hit();

        }
    }

});
}