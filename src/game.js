//Daño de la bala
const BULLET_DAMAGE=10;
const MISSILE_DAMAGE=20;

//Coordenadas del HitBox para cada uno de los diferentes Samus(normal,saltando,bola)
const HITBOX_SAMUS=[
    [-8, -12], [8, -12], [8, 20], [-8, 20]
];
const HITBOX_SAMUS_MORPH=[
    [-7, 4], [7, 4], [7, 20],[-7, 20]
];
const HITBOX_SAMUS_JUMPING=[
    [-7, -5], [7, -5], [7, 20], [-7, 20]
];

var game = function() {

    var Q = window.Q = Quintus()
        .include(["Sprites", "Scenes", "Input", "2D", "UI", "Anim", "TMX", "Audio", "Touch","HUD","Samus","Bullet","Ice_Bullet","Missile","Skree","Zommer","Zebetite","Waver","Ripper","Geruta","Metroid","Dessageega","Explosion","Lava","MotherBrain","Transicion"])
        .setup("myGame",{
            width: 800,
            height: 500,
            scaleToFit: true
        })
        .controls().enableSound().touch();


    Q.load([ "samus.json","Transiciones.png","Forbidden.mp3","Explosion.mp3","Transicion.mp3","Missile.mp3","ConsumibleM.mp3","Consumible.mp3","12_Ending.mp3","11_Escape.mp3","10_Zebetite.mp3","09_Tourian__Base_Stage_.mp3","08_Get_Item_Jingle.mp3", "07_Silence.mp3","05_Norfair__Flame_Stage_.mp3","02_Samus_Appears_jingle.mp3","transicion.json","Ascensor.png","tourian_3.tmx", "ascensor.json","Missile_explosion.png","missile_explosion.json","Missile.png","missile.json","Lava.png","lava.json","transicion_3.tmx","tourian_1.tmx","tourian_2.tmx","Samus.png","nofair_3.tmx","hielo.tmx","salto.tmx","transicion_2.tmx","transicion_1.tmx","nofair_2.tmx","nofair_1.tmx","brinstar_3.tmx","PowerUps.png","powerUp.json","Bullet.png","Dessageega.png","dessageega.json","Geruta.png","geruta.json","MotherBrain.png","motherBrain.json","Zebetite.png","zebetite.json","Ripper.png","ripper.json", "Waver.png","waver.json","Metroid.png","metroid.json", "01_Title_BGM.mp3", "Estrellas.png","stars.json", "GameOver.png","EndTitle.png","end.json","bullet.json","Skree.png","skree.json","zommer.png","zommer.json", "mapa_inicial.tmx","transicion.tmx", "Brinstar.png", "Tourian.png", "Nofair.png", "Sammus_tile.png", "PowerUps.png", "UI.png","03_Brinstar_Rock_Stage.mp3", "01_Title_BGM.mp3","Shoot.mp3","Jump.mp3","Impact.mp3","Explosion.png" ,"explosion.json", "ui.json", "uiNumber.json", "Numeros_UI.png", "Creditos.png", "puertas.png", "puerta.json", "brinstar_2.tmx", "brinstar_1.tmx", "brinstar_3.tmx","TitleScreen.png","start_menu.json","Intro.png","lore.json","Ice_bullet.png","icebullet.json", "Consumibles.png", "consumibles.json"], function() {

        Q.compileSheets("Samus.png","samus.json");
        Q.compileSheets("Bullet.png","bullet.json");
        Q.compileSheets("Consumibles.png", "consumibles.json");
        Q.compileSheets("Ice_bullet.png", "icebullet.json");
        Q.compileSheets("Skree.png","skree.json");
        Q.compileSheets("Explosion.png","explosion.json");
        Q.compileSheets("zommer.png","zommer.json");
        Q.compileSheets("UI.png","ui.json");
        Q.compileSheets("Numeros_UI.png","uiNumber.json");
        Q.compileSheets("puertas.png","puerta.json");
        Q.compileSheets("TitleScreen.png","start_menu.json");
        Q.compileSheets("Intro.png","lore.json");
        Q.compileSheets("EndTitle.png","end.json");
        Q.compileSheets("Estrellas.png","stars.json");
        Q.compileSheets("Metroid.png","metroid.json");
        Q.compileSheets("Waver.png","waver.json");
        Q.compileSheets("Ripper.png","ripper.json");
        Q.compileSheets("Zebetite.png","zebetite.json");
        Q.compileSheets("MotherBrain.png","motherBrain.json");
        Q.compileSheets("Geruta.png","geruta.json");
        Q.compileSheets("Dessageega.png","dessageega.json");
        Q.compileSheets("PowerUps.png","powerUp.json");
        Q.compileSheets("Lava.png","lava.json");
        Q.compileSheets("Missile.png","missile.json");
        Q.compileSheets("Missile_explosion.png","missile_explosion.json");
        Q.compileSheets("Ascensor.png","ascensor.json");
        Q.compileSheets("Transiciones.png","transicion.json");

        //Q.debug = true;

        //Animaciones Samus
        Q.animations("samus_anim",{

            stand_l: {frames: [2] , flip: false},
            run_stand_l:{frames: [18] , rate: 1/11,next:"stand_down_l", flip: false},

            shoot_stand_l: {frames: [3] ,  rate: 1/6,next: "stand_l", flip: false },

            stand_r: {frames: [4] , flip: false},
            run_stand_r:{frames: [19] ,rate: 1/11,next:"stand_down_r", flip: false},

            shoot_stand_r: {frames: [5] , next: "stand_r" , flip: false},

            stand_down_l: {frames: [0] }, shoot_stand_down_l: {frames: [1] , next: "stand_down_l", flip: false },

            stand_down_r: {frames: [7] }, shoot_stand_down_r: {frames: [6] , next: "stand_down_r", flip: false },


            up_l: {frames: [8] }, shoot_up_l: {frames: [9] , next: "up_l", flip: false },

            up_r: {frames: [11] }, shoot_up_r: {frames: [10] , next: "up_r", flip: false },


            run_l: {frames: [12, 13, 14] , rate: 1/6, next: "stand_l", flip: false }, shoot_run_l: {frames: [29, 30, 31] , rate: 1/6, next: "run_l", flip: false},

            run_r: {frames: [15, 16, 17] , rate: 1/6, next: "stand_r", flip: false }, shoot_run_r: {frames: [32, 33, 34] , rate: 1/6, next: "run_r", flip: false},


            run_up_l: {frames: [35, 36, 37] , rate: 1/6, next: "up_l" , flip: false},

            run_up_r: {frames: [38, 39, 40] , rate: 1/6, next: "up_r", flip: false },


            fall_l: {frames: [18], flip: false },  fall_shoot_l: {frames: [20], flip: false },  fall_up_l: {frames: [22], flip: false },  fall_shoot_up_l: {frames: [23] , next: "fall_up_l", flip: false},  fall_shoot_down_l: {frames: [26], flip: false },

            fall_r: {frames: [19], flip: false },  fall_shoot_r: {frames: [21], flip: false },  fall_up_r: {frames: [24], flip: false },  fall_shoot_up_r: {frames: [25] , next: "fall_up_r", flip: false}, fall_shoot_down_r: {frames: [27], flip: false },


            jump_l: {frames: [28, 55, 56, 57] ,  rate: 1/10, next: "stand_l", loop: true, flip: false},

            jump_r: {frames: [28, 55, 56, 57],  rate: 1/10 ,next: "stand_r", loop: true, flip: "x"},


            morph_l: {frames: [41, 42, 43, 44], rate: 1/6 , flip: false ,next:"morph_l"},

            morph_r: {frames: [41, 42, 43, 44], rate: 1/6 , flip: "x", next:"morph_r"},


            spider_morph_l: {frames: [45, 46, 47, 48], rate: 1/6, flip: false },

            spider_morph_r: {frames: [45, 46, 47, 48], rate: 1/6 , flip: "x"},


            stand: {frames: [54] },

            appear: {frames: [50, 50, 51, 51, 52, 52, 53, 53, 54, 54, 54], rate: 1, loop: false, flip: false, trigger: "create" },


            super_jump_l: {frames: [49, 58, 59, 60],  rate: 1/10 , loop: true , flip: false},

            super_jump_r: {frames: [49, 58, 59, 60],  rate: 1/10, loop: true, flip: "x" }




        });

        //Animación Bala
        Q.animations('bullet_anim', {

            bullet : { frames: [0] },

            explode: { frames: [1], rate: 1/3, loop:false, trigger: "goAway" }

        });

        //Animación Consumibles
        Q.animations('consumibles_anim', {

            consum : { frames: [0, 1], rate: 1/6, loop: true}

        });

        //Animación bala de hielo
        Q.animations('icebullet_anim', {

            icebullet : { frames: [0] },

            explode: { frames: [1], rate: 1/3, loop:false, trigger: "goAway" }

        });


        //Animacion Explosión
        Q.animations('explosion_anim', {
            explode: {frames: [0, 1, 2], rate:1/6, loop:false, trigger: "goAway"}
        });

        //Animacion Explosión
        Q.animations('missile_explosion_anim', {
            explode: {frames: [0, 1, 2, 3], rate:1/6, loop:false, trigger: "goAway"}
        });

        //Animacion Misil
        Q.animations('missile_anim', {
            l: {frames: [0], flip: false},

            r: {frames: [0], flip: "x"}
        });

        //Animacion Lava
        Q.animations('lava_anim', {
            idle : { frames: [0, 1], rate:1/5, loop:true}
        });

        //Animación Puertas
        Q.animations('door_anim', {

            open : { frames: [0, 1, 2], rate:1/6, loop:false, trigger: "open"},

            close: { frames: [2, 1, 0], rate:1/6, loop:false, trigger: "close" }

        });

        //Animación menu de inicio
        Q.animations('title_anim', {

            opening : { frames: [0, 1, 2, 3, 4, 5, 6, 7], rate:1/2, loop:false},

            refresh : { frames: [8, 9, 10, 11, 12, 8, 9, 10, 11, 12, 7], rate:1/6, loop:false},

            ending: { frames: [13, 14, 15, 0], rate:1/2, loop:false, trigger: "click"}

        });

        //Animación de la historia
        Q.animations('intro_anim', {

            opening : { frames: [0, 1, 2, 3], rate:1/4, loop:false},

            ending: { frames: [3, 2, 1], rate:1/4, loop:false, trigger: "click"}

        });

        //Animación de la historia
        Q.animations('end_anim', {

            ending: { frames: [0, 1, 2, 2, 3, 3, 3], rate:1, loop:false, trigger: "click"}

        });

        //////////////////////////////////////////////////////////////////////////////////////////////////////////
        //  Animaciones de los enemigos
        /////////////////////////////////////////////////////////////////////////////////////////////////////////

        //Animación Zommer
        Q.animations('zommer_anim', {


            run_x_u : { frames: [0, 1], rate:1/6, loop:true , flip: "y"},

            run_x_d : { frames: [0, 1], rate:1/6, loop:true , flip: false},

            run_y_r : { frames: [2, 3], rate:1/6, loop:true , flip: false},

            run_y_l : { frames: [2, 3], rate:1/6, loop:true, flip: "x"},


        });

        //Animación Skree
        Q.animations('skree_anim', {

            idle:{frames: [0]},

            fall: {frames: [0, 1, 0, 2], rate:1/6, loop: true}

        });

        //Animación de los metroid
        Q.animations('metroid_anim', {

            idle: { frames: [0, 1], rate: 1/2, loop: true}

        });


        //Animación de los waver
        Q.animations('waver_anim', {

            l: { frames: [0, 1, 2], rate: 1/2, flip: false},

            r: { frames: [0, 1, 2], rate: 1/2, flip: "x"}

        });

        //Animación de los ripper
        Q.animations('ripper_anim', {

            l: { frames: [0], flip: false},

            r: { frames: [0], flip: "x"}

        });


        //Animación de los geruta
        Q.animations('geruta_anim', {

            up_stand: { frames: [1] },

            up_flying: { frames: [0] },

            down_stand: { frames: [3] },

            down_flying: { frames: [2] }

        });

        //Animación de los dessageega
        Q.animations('dessageega_anim', {

            stand: { frames: [0]},

            jump: { frames: [0, 1],rate: 1/8,  next: "air"},

            land: { frames: [1, 0], rate: 1/8, next: "stand"},

            air: { frames: [2]}

        });

        //Animación de Mother Brain
        Q.animations('brain_anim', {

            idle: { frames: [0, 1, 2, 3, 4, 5, 6, 7], rate:1/2, loop: true},

            hit: { frames: [8, 9, 8, 9], rate: 1/16, next: "idle"},

            die: { frames: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31], rate:1, loop: false, trigger:"kill"}

        });


        ///////////////////////////////////////////////////////////////////////////////////////////////////
        //  Escenas
        //////////////////////////////////////////////////////////////////////////////////////////////////


        Q.scene("level1", function(stage) {

            Q.stageTMX("mapa_inicial.tmx", stage);


            samus = Q("Appear").first();


            stage.add("viewport").follow(samus,{x:true, y:true});
            stage.viewport.scale = 1;
            stage.viewport.offsetX = -50;
            stage.viewport.offsetY = 500;


            Q.state.reset({hp: 30, munition: 0, count: false, time: 300, morph: false, iceB: false , salto: false, supersuit: false, missiles: false});
            Q.audio.stop();
            Q.audio.play("02_Samus_Appears_jingle.mp3");


        });



        Q.scene("transicion", function(stage) {

            Q.stageTMX("transicion.tmx", stage);


            door = Q("Door_Transicion").first();

            stage.add("viewport").follow(door,{x:false, y:false});
            stage.viewport.scale = 1;

            stage.on("destroy",function() {
                door.destroy();
            });


        });

        Q.scene("brinstar_1", function(stage) {

            Q.stageTMX("brinstar_1.tmx", stage);
            Q.audio.stop();
            Q.audio.play("03_Brinstar_Rock_Stage.mp3", {loop: true});

        });

        Q.scene("brinstar_2", function(stage) {

            Q.stageTMX("brinstar_2.tmx", stage);
            Q.audio.stop();
            Q.audio.play("03_Brinstar_Rock_Stage.mp3", {loop: true});

        });

        Q.scene("brinstar_3", function(stage) {

            Q.stageTMX("brinstar_3.tmx", stage);
            Q.audio.stop();
            Q.audio.play("03_Brinstar_Rock_Stage.mp3", {loop: true});
        });


        Q.scene("transicion_1", function(stage) {

            Q.stageTMX("transicion_1.tmx", stage);

            Q.audio.stop();
            Q.audio.play("07_Silence.mp3", {loop: true});

        });

        Q.scene("transicion_2", function(stage) {

            Q.stageTMX("transicion_2.tmx", stage);

            Q.audio.stop();
            Q.audio.play("07_Silence.mp3", {loop: true});

        });


        Q.scene("transicion_3", function(stage) {

            Q.stageTMX("transicion_3.tmx", stage);

            Q.audio.stop();
            Q.audio.play("07_Silence.mp3", {loop: true});

        });


        Q.scene("nofair_1", function(stage) {

            Q.stageTMX("nofair_1.tmx", stage);

            Q.audio.stop();
            Q.audio.play("05_Norfair__Flame_Stage_.mp3", {loop: true});

        });

        Q.scene("nofair_2", function(stage) {

            Q.stageTMX("nofair_2.tmx", stage);

            Q.audio.stop();
            Q.audio.play("05_Norfair__Flame_Stage_.mp3", {loop: true});

        });

        Q.scene("nofair_3", function(stage) {

            Q.stageTMX("nofair_3.tmx", stage);

            Q.audio.stop();
            Q.audio.play("05_Norfair__Flame_Stage_.mp3", {loop: true});

        });

        Q.scene("tourian_1", function(stage) {

            Q.stageTMX("tourian_1.tmx", stage);

            Q.audio.stop();
            Q.audio.play("09_Tourian__Base_Stage_.mp3", {loop: true});

        });

        Q.scene("tourian_2", function(stage) {

            Q.stageTMX("tourian_2.tmx", stage);

            Q.audio.stop();
            Q.audio.play("10_Zebetite.mp3", {loop: true});

        });

        Q.scene("tourian_3", function(stage) {

            Q.stageTMX("tourian_3.tmx", stage);


        });


        Q.scene("salto", function(stage) {

            Q.stageTMX("salto.tmx", stage);

            Q.audio.stop();
            Q.audio.play("07_Silence.mp3", {loop: true});

        });

        Q.scene("hielo", function(stage) {

            Q.stageTMX("hielo.tmx", stage);

            Q.audio.stop();
            Q.audio.play("07_Silence.mp3", {loop: true});

        });


        //Pantalla de Inicio
        Q.scene("mainTitle", function(stage){

            var button = new Q.UI.Button({
                x: Q.width/2,
                y: Q.height/2,
                w: Q.width,
                h: Q.height
            });

            title = new Q.Titulo({
                x: Q.width/2,
                y: Q.height/2
            });


            for(i = 0; i < 80; i++){
                stage.insert(new Q.Stars({
                        x: Math.floor(Math.random() * Q.width),
                        y: Math.floor(Math.random() *  Q.height),
                        frame: Math.floor(Math.random() * 41),
                        max: 1 + Math.random() * 11
                    })
                );
            }

            stage.insert(title);
            stage.insert(button);

            title.play("opening");

            button.on("click", function(){
                title.play("ending");
            });
            Q.audio.stop();
            Q.audio.play("01_Title_BGM.mp3", {loop: true});


        })

        //Pantalla de Inicio
        Q.scene("intro", function(stage){

            var button = new Q.UI.Button({
                x: Q.width/2,
                y: Q.height/2,
                w: Q.width,
                h: Q.height
            });

            title = new Q.Intro({
                x: Q.width/2,
                y: Q.height/2
            });

            for(i = 0; i < 80; i++){
                stage.insert(new Q.Stars({
                        x: Math.floor(Math.random() * Q.width),
                        y: Math.floor(Math.random() *  Q.height),
                        frame: Math.floor(Math.random() * 41),
                        max: 1 + Math.random() * 11
                    })
                );
            }

            stage.insert(title);
            stage.insert(button);
            title.play("opening");

            button.on("click", function(){
                title.play("ending");
            });


        })

        //Pantalla Fin de Juego
        Q.scene('endGame',function(stage) {

            var button = new Q.UI.Button({
                x: Q.width/2,
                y: Q.height/2,
                scale: 1.95,
                asset: "GameOver.png"
            });


            stage.insert(button);

            button.on("click",function() {
                Q.clearStages();
                Q.stageScene('mainTitle');
            });


        });
        Q.scene('winGame',function(stage) {


            var button = new Q.UI.Button({
                x: Q.width/2,
                y: Q.height/2,
                w: Q.width,
                h: Q.height
            });

            title = new Q.EndTitle({
                x: Q.width/2,
                y: Q.height/2
            });

            for(i = 0; i < 80; i++){
                stage.insert(new Q.Stars({
                        x: Math.floor(Math.random() * Q.width),
                        y: Math.floor(Math.random() *  Q.height),
                        frame: Math.floor(Math.random() * 41),
                        max: 1 + Math.random() * 11
                    })
                );
            }

            stage.insert(title);
            stage.insert(button);


            button.on("click", function(){
                title.play("ending");
            });


            Q.audio.stop();
            Q.audio.play("12_Ending.mp3", {loop: true});
        });

        //Pantalla Fin de Juego
        Q.scene('creditos',function(stage) {

            var button = new Q.UI.Button({
                x: Q.width/2,
                y: Q.height/2,
                scale: 1.95,
                asset: "Creditos.png"
            });

            // When the button is clicked, clear all the stages
            // and restart the game.
            stage.insert(button);

            button.on("click",function() {
                Q.clearStages();
                Q.stageScene('mainTitle');
            });


        });



        Q.stageScene("mainTitle");

    });

    //Title screen
    Q.Sprite.extend("Titulo", {
        init: function(p) {
            this._super(p,{
                sheet: "menu",
                sprite: "title_anim",
                scale: 1.95,
                frame: 0,
                x: 0,
                y: 0,
                t: 0
            });
            this.add("animation");
            this.on("click", this, "setup");
        },

        setup: function(){
            Q.clearStages();
            Q.stageScene("intro", 1);
        },

        step: function(dt){

            this.p.t += dt;

            if (this.p.t > 10){
                this.p.t = 0;
                this.play("refresh");
            }
        }

    });

    //Estrellas
    Q.Sprite.extend("Stars", {
        init: function(p) {
            this._super(p,{
                sheet: "stars",
                //sprite: "stars_anim",
                scale: 1.95,
                frame: 0,
                x: 0,
                y: 0,
                max: 10,
                t: 0
            });
            this.add("animation");
        },

        step: function(dt){

            this.p.t += dt;

            if (this.p.t > this.p.max){
                this.p.t = 0;
                this.p.frame += 1;

                if(this.p.frame > 40){
                    this.p.frame = 0;
                }
            }
        }

    });

    //Title screen
    Q.Sprite.extend("Intro", {
        init: function(p) {
            this._super(p,{
                sheet: "lore",
                sprite: "intro_anim",
                scale: 1.95,
                frame: 0,
                x: 0,
                y: 0,
                t: 0
            });
            this.add("animation");
            this.on("click", this, "setup");
        },

        setup: function(){
            Q.clearStages();
            Q.stageScene("level1", 1);
            Q.stageScene("hud", 2);
        },

        step: function(dt){

        }

    });

    // victory screen
    Q.Sprite.extend("EndTitle", {
        init: function(p) {
            this._super(p,{
                sheet: "end",
                sprite: "end_anim",
                scale: 1.95,
                frame: 0,
                x: 0,
                y: 0,
                t: 0
            });
            this.add("animation");
            this.on("click", this, "setup");
        },

        setup: function(){
            Q.clearStages();
            Q.stageScene('creditos');
        },


    });

    // ascensor
    Q.Sprite.extend("Elevator", {
        init: function(p) {
            this._super(p,{
                sheet: "ascensor",
                sprite: "ascensor_anim",
                scale: 1,
                frame: 0,
                gravity: 0,
                x: 0,
                y: 0,
                ready: false
            });
            this.on("bump.top", this, "hit");
            this.add("2d");
        },


        step: function(dt){
            if(this.p.ready)
                this.p.gravity = -5;

            if(this.p.y < 0){ 
                Q.clearStages();
                Q.stageScene('winGame');
            }

        },

        hit: function(collision){

            if(collision.obj.isA("Samus")){
                
                collision.obj.p.x = this.p.x;
                collision.obj.p.vy = this.p.vy;
                collision.obj.p.onElevator = true;
                this.p.ready = true;
            }
        }

    });


    //Para el audio, reproduce el que le indiques y despues de un retardo reproduce la siguiente cancion
    Q.Sprite.extend("SongManager", {
        init: function(p){
            this._super(p, {
                s1:"",
                s2:"",
                t:0,
                retardo: 20,
            });
            Q.audio.stop();
            Q.audio.play(this.p.s1);
        },
        

        step: function(dt){
            this.p.t += dt;

            if(this.p.t > this.p.retardo){
                Q.audio.stop();
                Q.audio.play(this.p.s2, {loop: true});
                this.destroy();
            }
        }


    });


}