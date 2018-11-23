var app = {
    inicio: function() {
        this.iniciaBotones();
        this.iniciaFastClick();
        this.iniciaHammer();
    },
    iniciaBotones: function() {
        var btnClaro = document.getElementById('claro');
        var btnOscuro = document.getElementById('oscuro');
        btnClaro.addEventListener('click', this.ponloClaro, false)
        btnOscuro.addEventListener('click', this.ponloOscuro, false)
    },
    iniciaFastClick: function() {
        FastClick.attach(document.body);
    },
    iniciaHammer: function() {
        var zona = document.getElementById('zona-gestos');
        var hammertime = new Hammer(zona);

        hammertime.get('pinch').set({ enable: true });
        hammertime.get('rotate').set({ enable: true });

        zona.addEventListener('webkitAnimationEnd', function(e) {
            zona.className = '';
        });
        hammertime.on('doubletap', function(ev) {
            zona.className = 'doubletap';
        });
        hammertime.on('press', function(ev) {
            zona.className = 'press';
        })

        hammertime.on('swipe', function(ev) {
            var clase = undefined;
            direccion = ev.direction;
            if (direccion == 4) clase = 'swipe-derecha';
            if (direccion == 2) clase = 'swipe-izquierda';
            zona.className = clase
        });
        hammertime.on('rotate', function(ev) {
            var umbral = 25;
            if (ev.distance > umbral) zona.className = 'rotate';
        });

        hammertime.on('tap doubletap swipe press rotate', function(ev) {
            document.getElementById('info').innerHTML = ev.type + '!';
        })
    },

    ponloClaro: function() {
        document.body.className = 'claro'
    },
    ponloOscuro: function() {
        document.body.className = 'oscuro'

    }
};
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        app.inicio();
    }, false)
}