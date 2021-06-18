//Zebetite
Quintus.Zebetite = function(Q) {
Q.Sprite.extend("Zebetite", {

    init: function (p) {
        this._super(p, {
            sheet: "zebetite",
            frame: 0,
            gravity: 0,
            x: 0,
            y: 0,
            life: 20,
            type: Q.SPRITE_ENEMY,
            collisionMask: Q.SPRITE_FRIENDLY | Q.SPRITE_DEFAULT
        });
        this.on("bump.left, bump.right", this, "hit");
        this.add("2d");

    },

    step: function (dt) {

        if(this.p.frame > 3){
            this.destroy();
        }

        switch(this.p.frame){
            case 0:{
                this.p.points = [ [-8, -16], [8, -16], [8, 16], [-8, 16] ];
            }break;

            case 1:{
                this.p.points = [ [-6, -16], [6, -16], [6, 16], [-6, 16] ];
            }break;

            case 2:{
                this.p.points = [ [-4, -16], [4, -16], [4, 16], [-4, 16] ];
            }break;

            case 3:{
                this.p.points = [ [-2, -16], [2, -16], [2, 16], [-2, 16] ];
            }break;
        }

    },


    hit: function (collision) {

        if (collision.obj.isA("Missile")) {
            Q.audio.play("Impact.mp3");

            this.p.life -= MISSILE_DAMAGE;
            if(this.p.life <= 0){
                this.p.life = 20;
                this.p.frame += 1;
            }


        }


    }



});


}