//Samus
Quintus.Transicion = function(Q) {

    //Sprite para animar las transiciones
    Q.Sprite.extend("Door_Transicion", {
        init: function(p) {
            this._super(p,{
                sheet: "blue_blue",
                scale: 1,
                frame: 0,
                gravity: 0,
                x: 0,
                y: 217,
                sx: 0, // lugar donde spawnea Samus
                sy: 217,
                t: 0, //tiempo
                dir:"dcha",
                end: 10, // numero de bloques que esta la puerta del borde del mapa
                escena: "level1" // controla la escena a la que se va a mover Samus
            });
        },

        step: function(dt){

            this.p.t += dt;

            // delay para claridad visual
            if(this.p.t > 0.5) {

                if(this.p.dir == "dcha"){
                    //desplazamos hasta el lugar de la puerta en la siguiente escena
                    if(this.p.x > ((this.p.end - 1)* 16)){
                        this.p.x -=2.5;

                        //prepara un delay antes de terminar
                        if(this.p.x <= ((this.p.end - 1)* 16)){
                            this.p.t = 0;
                        }
                    }
                    else{
                        //cambiamos a escena
                        Q.clearStages();
                        Q.stageScene(this.p.escena, 1);
                        Q.stageScene("hud", 2);

                        //insertamos a Samus a un bloque de distancia de la puerta
                        samus = new Q.Samus({x: this.p.sx + 16, y: this.p.sy, dir: "right"})
                        Q.stage(1).insert(samus);
                        //ajustamos la camara
                        Q.stage(1).add("viewport").follow(samus,{x:true, y:true});
                        Q.stage(1).viewport.scale = 1;
                        Q.stage(1).viewport.offsetX = -50;
                    }
                }
                else if(this.p.dir == "izq"){
                    //desplazamos hasta el lugar de la puerta en la siguiente escena
                    if(this.p.x < Q.width - (this.p.end * 16)){
                        this.p.x += 2.5;

                        //prepara un delay antes de terminar
                        if(this.p.x >= Q.width - (this.p.end * 16)){
                            this.p.t = 0;
                        }
                    }
                    else{
                        //cambiamos a escena
                        Q.clearStages();
                        Q.stageScene(this.p.escena, 1);
                        Q.stageScene("hud", 2);

                        //insertamos a Samus a un bloque de distancia de la puerta
                        samus = new Q.Samus({x: this.p.sx - 16, y: this.p.sy, dir: "left"})
                        Q.stage(1).insert(samus);
                        //ajustamos la camara
                        Q.stage(1).add("viewport").follow(samus,{x:true, y:true});
                        Q.stage(1).viewport.scale = 1;
                        Q.stage(1).viewport.offsetX = -50;
                    }
                }

            }

        }
    });


    // Puertas
    Q.Sprite.extend("Door", {
        init: function(p) {
            this._super(p,{
                sheet: "blue_r",
                sprite: "door_anim",
                scale: 1,
                frame: 0,
                gravity: 0,
                x: 0,
                sx: 0, // x donde spawnea Samus
                sy: 217, // y donde spawnea Samus
                y: 217,
                dir:"dcha",
                trans_sheet: "blue_blue",
                open: false,
                t: 0,
                type: Q.SPRITE_ENEMY,
                collisionMask: Q.SPRITE_FRIENDLY| Q.SPRITE_ENEMY| Q.SPRITE_DEFAULT,
                hits: 3, //golpes necesarios para abrirla
                start: 0, // indica el numero de casillas a las que esta la puerta del borde
                end: 0, // indica el numero de casillas a las que esta la puerta del siguiente mapa del borde
                escena: "level1" // controla la escena a la que se va a mover Samus
            });
            this.add("animation");
            this.on("hit.sprite", this, "hit");
            this.on("open", this, "open");
            this.on("close", this, "close");
        },

        open: function(){
            Q.audio.play("Transicion.mp3");
            this.p.open = true;
            this.p.t = 0;
            this.p.frame = 2; // permanece abierta
        },

        close: function(){
            this.p.open = false;
            this.p.hits = 3;
            this.p.frame = 0; // permanece cerrada
        },

        step: function(dt){

            this.p.t += dt;

            if(this.p.open && this.p.hits <= 0){

                if(this.p.t > 2){
                    this.p.t = 0;
                    this.play("close");
                }
            }

        },

        hit: function (collision) {

            if((this.p.sheet == "yellow_r" || this.p.sheet == "yellow_l") && !this.p.open){Q.audio.play("Forbidden.mp3");} // Las amarillas no hacen nada

            else if ( ((this.p.sheet == "red_r" || this.p.sheet == "red_l") && collision.obj.isA("Missile")) && !this.p.open) {

                Q.audio.play("Impact.mp3");
                this.p.hits -= 1;

                if(this.p.hits <= 0){
                    this.play("open");
                }

            }
            //si colisiona con una bala se resta un contador hasta abrirla
            else if (((collision.obj.isA("Bullet") || collision.obj.isA("Ice_Bullet")) && !((this.p.sheet == "red_r" || this.p.sheet == "red_l"))) && !this.p.open) {

                Q.audio.play("Impact.mp3");
                this.p.hits -= 1;

                if(this.p.hits <= 0){
                    this.play("open");
                }

            }
            // si Samus intenta cruzarla, se cambia la escena a la transicion
            else if( this.p.open && collision.obj.isA("Samus")){

                Q.clearStages();
                Q.stageScene("transicion", 3);

                if(this.p.dir == "dcha"){

                    //se ajusta la x para que cuadre la animacion de transicion
                    Q.stage(3).insert(new Q.Door_Transicion({x: (Q.width - (this.p.start * 16)), dir: this.p.dir, escena: this.p.escena, end: this.p.end, sx: this.p.sx, sy: this.p.sy, sheet: this.p.trans_sheet}));

                }
                else if(this.p.dir == "izq"){

                    Q.stage(3).insert(new Q.Door_Transicion({x: this.p.start * 16, dir: this.p.dir, escena: this.p.escena, end: this.p.end, sx: this.p.sx, sy: this.p.sy, sheet: this.p.trans_sheet}));

                }

            }





        }
    });

}