//Metroid
Quintus.Metroid = function(Q) {
Q.Sprite.extend("Metroid", {

    init: function (p) {
        this._super(p, {
            sheet: "metroid",
            sprite: "metroid_anim",
            frame: 0,
            gravity: 0,
            x: 0,
            y: 0,
            life: 500,
            f: 0,
            frozen: false,
            points: [ [-12, -6], [12, -6], [12, 0], [-12, 0] ],
            type: Q.SPRITE_ENEMY,
            collisionMask: Q.SPRITE_FRIENDLY,
            sensor: true
        });
        this.add("2d, animation");
        this.on("hit.sprite", this, "hit");

        this.play("idle");
    },


    step: function (dt) {

        this.p.f += dt;

        var sameX = false;
        var sameY = false;

        samus = Q("Samus").first();

        if(this.p.x - samus.p.x > 1){
            this.p.vx = -50;
        }else if(this.p.x - samus.p.x < -1){
            this.p.vx = 50;
        }
        else if(!this.p.frozen){
            this.p.vx = 0;
            //this.p.x = samus.p.x;
            sameX = true;
        }

        if(this.p.y - samus.p.y > 20){
            this.p.vy = -50;
        }else if(this.p.y - samus.p.y < -20){
            this.p.vy = 50;
        }else if(!this.p.frozen){
            this.p.vy = 0;
            //this.p.y = samus.p.y -20;
            sameY = true;
        }




        if(this.p.frozen){
            this.p.sheet = "frozen_metroid";

            this.p.vy = 0;
            this.p.vx = 0;
            if(this.p.f > 5){
                this.p.frozen = false;
            }


        }
        else{

            if(sameX && sameY){
                samus.trigger("damage");
            }

            this.p.sheet = "metroid";
        }
    },



    hit: function (collision) {


        if (collision.obj.isA("Ice_Bullet")) {
            Q.audio.play("Impact.mp3");

            if(this.p.frozen){
                this.p.sheet = "frozen_metroid_hit";
            }

            this.p.frozen = true;
            this.p.sheet = "frozen_metroid";
            this.p.f = 0;

        }


    }



});
}