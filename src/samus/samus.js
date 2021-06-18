//Samus
Quintus.Samus = function(Q) {
Q.Sprite.extend("Samus", {

    init: function(p) {
        this._super(p,{
            sheet: "samus",
            sprite: "samus_anim",
            points: HITBOX_SAMUS,
            frame: 0,
            jumpSpeed: -310,
            scale: 1,
            gravity: .6,
            dir: "right",
            morph: false,
            missiles: false,
            shoot_delay: 0,
            iframes: 0,
            invulnerable: true,
            onElevator: false,
            stand: false,
            s: 0,
            reload: 0.1, // disparos normales,
            t: 0,
            type: Q.SPRITE_FRIENDLY | Q.SPRITE_PLAYER,
            collisionMask: Q.SPRITE_ENEMY | Q.SPRITE_POWERUP | Q.SPRITE_DEFAULT

        });
        this.add("2d, platformerControls, animation");

        if(Q.state.get("morph"))
            this.add("morph");

        if(Q.state.get("salto"))
            this.add("salto");

        if(Q.state.get("iceB"))
            this.add("iceB");

        if(Q.state.get("supersuit")){
            this.p.sheet = "samus_super_missile";
            this.add("supersuit");
        }

        if(Q.state.get("missiles"))
            this.add("missiles");

        Q.input.on("down", this, "ball");
        Q.input.on("fire", this, "jump");
        this.on("damage", this, "hit");
        Q.input.on("D", this, "weapon");
        Q.input.on("S", this, "shoot");


    },

    shoot: function(){
        if(!this.p.morph && this.p.shoot_delay > this.p.reload) {
            //auxVx determina la direccion del disparo
            var auxVx =0;
            if (this.p.dir == "right") auxVx =1;
            else auxVx =-1;

            Q.inputs["S"] = false;

            var q = Q.stage(1);


            shooting = true;
            this.p.shoot_delay = 0;

            if (this.p.missiles ){ // missile

                if(Q.state.get("munition") > 0){
                    if(!this.p.pointUp) q.insert(new Q.Missile({x: this.p.x + 13*auxVx, y: this.p.y -2.5,vx:3*auxVx,dir:this.p.dir,initX: this.p.x + 13*auxVx}));
                    if(this.p.pointUp)  q.insert(new Q.Missile({x: this.p.x , y: this.p.y -18,vy:3,initY: this.p.y -18, angle: 90 }));

                    Q.state.dec("munition", 1);
                }


            }
            else{
                if(this.p.iceB){ // ice bullet
                    if(!this.p.pointUp) q.insert(new Q.Ice_Bullet({x: this.p.x + 13*auxVx, y: this.p.y -2.5,vx:3*auxVx,dir:this.p.dir,initX: this.p.x + 13*auxVx}));
                    if(this.p.pointUp)  q.insert(new Q.Ice_Bullet({x: this.p.x , y: this.p.y -18,vy:3,initY: this.p.y -18, angle: 90 }));


                }
                else{ // normal bullet

                    if(!this.p.pointUp) q.insert(new Q.Bullet({x: this.p.x + 13*auxVx, y: this.p.y -2.5,vx:3*auxVx,dir:this.p.dir,initX: this.p.x + 13*auxVx}));
                    if(this.p.pointUp)  q.insert(new Q.Bullet({x: this.p.x , y: this.p.y -18,vy:3,initY: this.p.y -18, angle: 90 }));

                }
            }
        }


    },

    ball: function(){

        Q.inputs["down"] = false;

        if(!this.p.morph && this.p.canMorph ){
            this.p.points = HITBOX_SAMUS_MORPH;
            if (this.p.dir == "right")this.play("morph_r")
            else this.play("morph_l")
            this.p.morph=true;
        }
        else{
            this.p.points = HITBOX_SAMUS;
            if (this.p.dir == "right")this.play("stand_r")
            else this.play("stand_l")
            this.p.morph=false;
        }
    },

    jump: function(){
        if(this.p.vy == 0){
            Q.audio.play("Jump.mp3");
        }

        this.p.points = HITBOX_SAMUS_JUMPING;
    },

    weapon: function(){

        this.p.reload = 0.1
        if(this.p.hasMissiles){
            this.p.missiles = !this.p.missiles;

        }

        if(this.p.missiles){
            this.p.sheet = "samus_missile";
            this.p.reload = 0.3
        }
        else if(this.p.supersuit){
            this.p.sheet = "samus_super_missile";
        } else{
            this.p.sheet = "samus";
        }
    },


    step: function(dt){

        this.p.s += dt;
        if(this.p.s < 0.2) this.p.stand = true;
        else this.p.stand = false;

        if(Q.state.get("time") <= 0){
            this.p.t += dt
            if(this.p.t > 1){
                Q.audio.stop();
                Q.clearStages();
                Q.stageScene("endGame", 1);
            }

        }

        this.p.gravity = 0.6;

        if(this.p.invulnerable){
            this.p.iframes += dt;

            if(this.p.iframes > 1){ // 1 sec de invulnerabilidad
                this.p.invulnerable = false;
                this.p.opacity = 1;
            }
        }

        this.p.shoot_delay += dt;
        shooting = false;

        //Ajustamos el HitBox y salto dependiendo de si esta en forma de bola o normal
        if(this.p.morph) {
            this.p.points = HITBOX_SAMUS_MORPH;
            this.p.jumpSpeed = -150;
        }
        else {
            if(this.p.vy != 0){
                this.p.points = HITBOX_SAMUS;
            }
            if(!this.p.salto) this.p.jumpSpeed = -310;
            else this.p.jumpSpeed = -400;
        }






        //Se determina la direccion en la que esta mirando Samus
        if(this.p.vx > 0){
            this.p.dir = "right";
        }
        else if(this.p.vx < 0){
            this.p.dir = "left";
        }

        //Si se pulsa up se posiciona con el arma hacia arriba
        if(Q.inputs["up"] && !this.p.morph ) {
            Q.inputs["up"] = false;
            this.p.pointUp = !this.p.pointUp;
        }



        //  Si Samus se esta moviendo hacia la derecha del mapa se ejecuta la animacion de correr
        //  si esta en forma de bola, se ejecuta la animacion de bola
        if(this.p.vx > 0 && this.p.vy==0) {

            if(this.p.morph)  {
                this.play("morph_r");
            }
            else if(!this.p.pointUp){
                if(shooting){
                    this.play("shoot_run_r");
                }else{
                    this.play("run_r");
                }
            }
            else{
                this.play("run_up_r");
            }
        }

            //  Si Samus se esta moviendo hacia la izquierda del mapa se ejecuta la animacion de correr
        //  si esta en forma de bola, se ejecuta la animacion de bola
        else if(this.p.vx < 0 && this.p.vy==0 ) {
            if(this.p.morph)  {
                this.play("morph_l");
            }
            else if(!this.p.pointUp){
                if(shooting){
                    this.play("shoot_run_l");
                }else{
                    this.play("run_l");
                }
            }
            else{
                this.play("run_up_l");
            }
        }
        //Si Samus esta parada se ejecuta la animacion de parada hacia la direccion en la que ha mirado por ultima vez
        else if(this.p.vy == 0){
            if(this.p.morph){
                if(this.p.dir == "left") this.play("morph_l");
                else if(this.p.dir == "right") this.play("morph_r");
            }else{
                if(this.p.pointUp){
                    if (this.p.dir == "right" ) this.play("up_r");
                    else if (this.p.dir == "left" )  this.play("up_l");
                }else{
                    if(this.p.dir == "left") {
                        if(shooting){
                            this.play("shoot_stand_l");
                        }else{
                            this.play("stand_l");
                        }

                    }
                    else if(this.p.dir == "right") {
                        if(shooting){
                            this.play("shoot_stand_r");
                        }else{
                            if(shooting){
                                this.play("shoot_stand_r");
                            }else{
                                this.play("stand_r");
                            }
                        }
                    }
                }

            }

        }





        //Si esta saltando y no en forma de bola se ejecuta la animacion de salto
        if( this.p.vy != 0 && !this.p.morph && !this.p.stand){


            if(shooting){ //TODO revisar superposicion de animaciones
                if(this.p.pointUp){
                    if (this.p.dir == "right" ) this.play("fall_shoot_up_r");
                    else if (this.p.dir == "left" )  this.play("fall_shoot_up_l");
                }else{
                    if (this.p.dir == "right" ) this.play("fall_shoot_r");
                    else if (this.p.dir == "left" )  this.play("fall_shoot_l");
                }
            }else{
                if(this.p.vy < 0){
                    if(this.p.dir == "left") this.play("jump_l");
                    else if(this.p.dir == "right") this.play("jump_r");
                }
                else if(this.p.vy > 0){
                    if(this.p.dir == "left") this.play("fall_l");
                    else if(this.p.dir == "right") this.play("fall_r");
                }
            }


        }



        if(this.p.onElevator){
            this.play("stand");
        }
    },

    hit: function(){

        //si Samus no es invulnerable se la dan iframes
        if(!this.p.invulnerable){
            this.p.iframes = 0;
            this.p.invulnerable = true;
            this.p.opacity = 0.5;
            if(this.p.supersuit) Q.state.dec("hp",2);
            else Q.state.dec("hp",5);
        }


        if(Q.state.get("hp") <= 0){


            Q.audio.stop();
            Q.clearStages();
            Q.stageScene("endGame", 1);

        }
    }




});

    //////////////////////////////////////////////////////////////////////////////////////////////
    //  Samus First Appear
    /////////////////////////////////////////////////////////////////////////////////////////////

    Q.Sprite.extend("Appear", {
        init: function(p){
            this._super(p,{
                sheet: "samus",
                sprite: "samus_anim",
                frame: 0,
                gravity: 0,
                x: 0,
                y: 0

            });
            this.add("animation");
            this.on("create", this, "create");
            this.play("appear");
        },

        create: function(){
            //insertamos a Samus a un bloque de distancia de la puerta
            samus = new Q.Samus({x: this.p.x, y: this.p.y, dir: "right"});
            Q.stage(1).insert(samus);
            //ajustamos la camara
            Q.stage(1).add("viewport").follow(samus,{x:true, y:true});
            Q.stage(1).viewport.scale = 1;
            Q.stage(1).viewport.offsetX = -50;

            Q.audio.stop();
            Q.audio.play("03_Brinstar_Rock_Stage.mp3", {loop: true});

            this.destroy();
        },

    });

    //////////////////////////////////////////////////////////////////////////////////////////////
    //  Mejoras de Samus
    /////////////////////////////////////////////////////////////////////////////////////////////

    Q.Sprite.extend("MorphBall", {
        init: function(p){
            this._super(p, {
                sheet: "powerUp",
                frame: 3,
                /**
                 * 0: Vacio
                 * 1: Misiles (incluir)
                 * 2: Tanque de energía
                 * 3: MorphBall
                 * 4: Bombas
                 * 5: Salto alto
                 * 6: Super salto
                 * 7: Super traje
                 * 8: Aumento de rango
                 * 9: Disparo de hielo
                 * 10: Daño del disparo
                 */
                gravity: 0,
                type: Q.SPRITE_POWERUP,
                collisionMask: Q.SPRITE_FRIENDLY
            });
            this.on("hit.sprite", this, "hit");
            this.add('2d');

        },
        step: function(){
            if(Q.state.get("morph")){
                this.destroy();
            }
        },

        hit: function (collision) {

            if (collision.obj.isA("Samus")) {

                var q = Q.stage();

                q.insert(new Q.SongManager({s1:"08_Get_Item_Jingle.mp3", s2:"03_Brinstar_Rock_Stage.mp3", retardo:4}));

                collision.obj.add("morph");
                Q.state.set("morph", true);
                this.destroy();
            }

        }


    });

    Q.component("morph", {


        added: function(){

            this.entity.p.canMorph = true;

        }
    });


    Q.Sprite.extend("SaltoAlto", {
        init: function(p){
            this._super(p, {
                sheet: "powerUp",
                frame:5,
                /**
                 * 0: Vacio
                 * 1: Misiles (incluir)
                 * 2: Tanque de energía
                 * 3: MorphBall
                 * 4: Bombas
                 * 5: Salto alto
                 * 6: Super salto
                 * 7: Super traje
                 * 8: Aumento de rango
                 * 9: Disparo de hielo
                 * 10: Daño del disparo
                 */
                gravity: 0,
                type: Q.SPRITE_POWERUP,
                collisionMask: Q.SPRITE_FRIENDLY
            });
            this.on("hit.sprite", this, "hit");
            this.add('2d');

        },
        step: function(){
            if(Q.state.get("salto")){
                this.destroy();
            }
        },

        hit: function (collision) {

            if (collision.obj.isA("Samus")) {
                var q = Q.stage();

                q.insert(new Q.SongManager({s1:"08_Get_Item_Jingle.mp3", s2:"03_Brinstar_Rock_Stage.mp3", retardo:4}));

                collision.obj.add("salto");
                Q.state.set("salto", true);
                this.destroy();
            }

        }





    });

    Q.component("salto", {


        added: function(){

            this.entity.p.salto = true;

        }
    });



    Q.Sprite.extend("IceBeam", {
        init: function(p){
            this._super(p, {
                sheet: "powerUp",
                frame:9,
                /**
                 * 0: Vacio
                 * 1: Misiles (incluir)
                 * 2: Tanque de energía
                 * 3: MorphBall
                 * 4: Bombas
                 * 5: Salto alto
                 * 6: Super salto
                 * 7: Super traje
                 * 8: Aumento de rango
                 * 9: Disparo de hielo
                 * 10: Daño del disparo
                 */
                gravity: 0,
                type: Q.SPRITE_POWERUP,
                collisionMask: Q.SPRITE_FRIENDLY
            });
            this.on("hit.sprite", this, "hit");
            this.add('2d');

        },
        step: function(){
            if(Q.state.get("iceB")){
                this.destroy();
            }
        },

        hit: function (collision) {

            if (collision.obj.isA("Samus")) {
                var q = Q.stage();

                q.insert(new Q.SongManager({s1:"08_Get_Item_Jingle.mp3", s2:"03_Brinstar_Rock_Stage.mp3", retardo:4}));

                collision.obj.add("iceB");
                Q.state.set("iceB", true);
                this.destroy();
            }

        }





    });

    Q.component("iceB", {


        added: function(){

            this.entity.p.iceB = true;

        }
    });

    Q.Sprite.extend("SuperSuit", {
        init: function(p){
            this._super(p, {
                sheet: "powerUp",
                frame:7,
                /**
                 * 0: Vacio
                 * 1: Misiles (incluir)
                 * 2: Tanque de energía
                 * 3: MorphBall
                 * 4: Bombas
                 * 5: Salto alto
                 * 6: Super salto
                 * 7: Super traje
                 * 8: Aumento de rango
                 * 9: Disparo de hielo
                 * 10: Daño del disparo
                 */
                gravity: 0,
                type: Q.SPRITE_POWERUP,
                collisionMask: Q.SPRITE_FRIENDLY
            });
            this.on("hit.sprite", this, "hit");
            this.add('2d');

        },
        step: function(){
            if(Q.state.get("supersuit")){
                this.destroy();
            }
        },

        hit: function (collision) {

            if (collision.obj.isA("Samus")) {
                var q = Q.stage();

                q.insert(new Q.SongManager({s1:"08_Get_Item_Jingle.mp3", s2:"03_Brinstar_Rock_Stage.mp3", retardo:4}));

                collision.obj.add("supersuit");
                Q.state.set("supersuit", true);
                this.destroy();
            }

        }





    });

    Q.component("supersuit", {


        added: function(){

            this.entity.p.supersuit = true;

        }
    });

    Q.Sprite.extend("P_missiles", {
        init: function(p){
            this._super(p, {
                sheet: "powerUp",
                frame:1,
                /**
                 * 0: Vacio
                 * 1: Misiles (incluir)
                 * 2: Tanque de energía
                 * 3: MorphBall
                 * 4: Bombas
                 * 5: Salto alto
                 * 6: Super salto
                 * 7: Super traje
                 * 8: Aumento de rango
                 * 9: Disparo de hielo
                 * 10: Daño del disparo
                 */
                gravity: 0,
                type: Q.SPRITE_POWERUP,
                collisionMask: Q.SPRITE_FRIENDLY
            });
            this.on("hit.sprite", this, "hit");
            this.add('2d');

        },
        step: function(){
            if(Q.state.get("missiles")){
                this.destroy();
            }
        },

        hit: function (collision) {

            if (collision.obj.isA("Samus")) {
                var q = Q.stage();

                q.insert(new Q.SongManager({s1:"08_Get_Item_Jingle.mp3", s2:"03_Brinstar_Rock_Stage.mp3", retardo:4}));

                collision.obj.add("missiles");
                Q.state.set("missiles", true);
                Q.state.inc("munition", 65);
                this.destroy();
            }

        }





    });

    Q.component("missiles", {


        added: function(){

            this.entity.p.hasMissiles = true;

        }
    });


    //////////////////////////////////////////////////////////////////////////////////////////////
    //  Consumibles de Samus
    /////////////////////////////////////////////////////////////////////////////////////////////
    Q.Sprite.extend("Consumibles", {
        init: function(p){
            this._super(p,{
                sheet: "vida",
                sprite: "consumibles_anim",
                scale: 1,
                frame: 0,
                gravity: 0,
                sensor: true,
                x: 0,
                y: 0,
                type: Q.SPRITE_POWERUP,
                collisionMask: Q.SPRITE_PLAYER,
                des: false

            });
            this.on("hit.sprite", this, "hit");
            this.add("2d, animation");
            if(Math.random() < 0.2) this.p.des = true;
            else if(Math.random() < 0.6) this.p.sheet = "municion";

        },
        step: function(dt){
            if(this.p.des) this.destroy();
            else{
                this.play("consum");
                if(this.p.sheet == "municion" && !Q.state.get("missiles")) this.p.sheet = "vida";
            }
        },

        hit: function(collision){

            if(collision.obj.isA("Samus")) {


                if(this.p.sheet == "vida" && Q.state.get("hp") < 95){
                    Q.audio.play("Consumible.mp3");

                    Q.state.inc("hp", 5);

                }
                else if(this.p.sheet == "vida"){
                    Q.audio.play("Consumible.mp3");
                    Q.state.inc("hp", 99 - Q.state.get("hp"));
                }
                else {
                    Q.audio.play("ConsumibleM.mp3");


                    Q.state.inc("munition", 5);

                }

                this.destroy();
            }

        }
    });


}