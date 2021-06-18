//HUD
Quintus.HUD = function(Q) {
    Q.scene("hud", function (stage) {


        decenas_hp = new Q.Numero({x: 40, y: 150, frame: Math.floor(Q.state.get("hp") / 10)});
        unidades_hp = new Q.Numero({x: 48, y: 150, frame: Math.floor(Q.state.get("hp") % 10)});

        centenas_m = new Q.Numero({
            x: 32,
            y: 159,
            frame: Math.floor(Q.state.get("munition") / 100),
            hidden: !Q.state.get("missiles")
        });
        decenas_m = new Q.Numero({
            x: 40,
            y: 159,
            frame: Math.floor(Math.floor(Q.state.get("munition") / 10) % 10),
            hidden: !Q.state.get("missiles")
        });
        unidades_m = new Q.Numero({
            x: 48,
            y: 159,
            frame: Math.floor(Q.state.get("munition") % 10),
            hidden: !Q.state.get("missiles")
        });

        centenas_t = new Q.Numero({x: 33, y: 168, frame: Math.floor(Q.state.get("time") / 100), hidden: true});
        decenas_t = new Q.Numero({
            x: 41,
            y: 168,
            frame: Math.floor(Math.floor(Q.state.get("time") / 10) % 10),
            hidden: true
        });
        unidades_t = new Q.Numero({x: 49, y: 168, frame: Math.floor(Q.state.get("time") % 10), hidden: true});

        image = new Q.UserInterface();

        stage.insert(image);
        stage.insert(decenas_hp);
        stage.insert(unidades_hp);

        stage.insert(centenas_m);
        stage.insert(decenas_m);
        stage.insert(unidades_m);

        stage.insert(centenas_t);
        stage.insert(decenas_t);
        stage.insert(unidades_t);


        Q.state.on("change.hp", this, function () {

            //Se extraen las cifras de la vida de samus
            ud_hp = Math.floor(Q.state.get("hp") % 10);
            dec_hp = Math.floor(Q.state.get("hp") / 10);
            //Se colocan los frames adecuadamente
            unidades_hp.p.frame = ud_hp;
            decenas_hp.p.frame = dec_hp;

        })

        Q.state.on("change.munition", this, function () {
            unidades_m.p.hidden = false;
            decenas_m.p.hidden = false;
            centenas_m.p.hidden = false;

            //Se extraen las cifras de la municion de samus
            ud_m = Math.floor(Q.state.get("munition") % 10);
            dec_m = Math.floor(Math.floor(Q.state.get("munition") / 10) % 10);
            cen_m = Math.floor(Q.state.get("munition") / 100);
            //Se colocan los frames adecuadamente
            unidades_m.p.frame = ud_m;
            decenas_m.p.frame = dec_m;
            centenas_m.p.frame = cen_m;

        })

        Q.state.on("change.time", this, function () {

            unidades_t.p.hidden = false;
            decenas_t.p.hidden = false;
            centenas_t.p.hidden = false;

            //Se extraen las cifras del tiempo
            ud_t = Math.floor(Q.state.get("time") % 10);
            dec_t = Math.floor(Math.floor(Q.state.get("time") / 10) % 10);
            cen_t = Math.floor(Q.state.get("time") / 100);
            //Se colocan los frames adecuadamente
            unidades_t.p.frame = ud_t;
            decenas_t.p.frame = dec_t;
            centenas_t.p.frame = cen_t;

        })


    })


    //imagen del UI
    Q.Sprite.extend("UserInterface", {
        init: function(p) {
            this._super(p,{
                sheet: "ui",
                scale: 1,
                frame: 0,
                gravity: 0,
                x: 23,
                y: 150
            });
        },

        step: function(dt){

            if(Q.state.get("missiles")){
                this.p.sheet = "ui_missile";
            }

            if(Q.state.get("count")){
                this.p.sheet = "ui_time";
                Q.state.dec("time",dt);

                if(Q.state.get("time") <= 0){
                    var q = Q.stage(1);

                    for(i = 0; i < 80; i++){
                        q.insert(new Q.Explosion({
                                x: Math.floor(Math.random() * 2000),
                                y: Math.floor(Math.random() * 1500),
                                sheet: "explosion",
                                sprite: "explosion_anim"
                            })
                        );
                    }

                }
            }

        }
    });

    //Numeros del UI
    Q.Sprite.extend("Numero", {
        init: function(p) {
            this._super(p,{
                sheet: "number",
                scale: 1,
                frame: 0,
                gravity: 0,
                x: 0,
                y: 0,
            });
        },

        step: function(dt){
            //Controles de seguridad
            if(this.p.frame > 9){
                this.p.frame = 0;
            }
            else if (this.p.frame < 0){
                this.p.frame = 0;
            }
        }

    });

}
