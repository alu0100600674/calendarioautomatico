var num_evento = 0;
var datos = [];
//var datos2 = [];

Date.prototype.getDayEs = function() {
    return (this.getDay() == 0 ? 6 : this.getDay() -1 )
}

var meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
var mes = document.getElementById("elegirmes");
for(var m = 0; m < 12; m++){
    mes.innerHTML += '<option value="' + m + '">' + meses[m] + '</option>';
}

var fec = new Date();
var anyo = document.getElementById("elegiranyo");
for(var a = 0; a < 10; a++){
    anyo.innerHTML += '<option value="' + (fec.getFullYear() + a) + '">' + (fec.getFullYear() + a) + '</option>';
}

function generarCalendario(m, a){
    datos = [];
    num_evento = 0;
    var dia_semana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

    if(!m && !a){
        var mes = document.getElementById("elegirmes").value;
        var anyo = document.getElementById("elegiranyo").value;
    }else{
        mes = m;
        anyo = a;
    }

    var linea = 0;
    var fecha = new Date();
    fecha.setDate(1);
    fecha.setMonth(mes);
    fecha.setFullYear(anyo);

    datos.push([mes,anyo]); // Guardando mes y anyo en array de datos.

    var cal = document.getElementById("calendario");
    //cal.innerHTML = '';
    cal.innerHTML = '<h2>' + meses[mes] + ' ' + anyo + '</h2>';

    // Formulario para anadir eventos
    var ev = document.getElementById("eventos");
    ev.innerHTML = '';
    ev.innerHTML += '<div id="ev-add"></div>';
    ev.innerHTML += '<div class="dummy"></div>';
    ev.innerHTML += '<div id="ev-del"></div>';
    ev.innerHTML += '<div id="ev-edit"></div>';

    var ev_add = document.getElementById("ev-add");
    var ev_del = document.getElementById("ev-del");
    var ev_edit = document.getElementById("ev-edit");

    ev_add.innerHTML += '<h3>Añadir evento</h3>';
    ev_add.innerHTML += '<form id="anadirevento">';
    ev_add.innerHTML += '<select id="elegirdia"></select>';
    ev_add.innerHTML += '<select id="elegircolor"></select>';
    var elegircolor = document.getElementById("elegircolor");
    elegircolor.innerHTML += '<option>Negro</option>';
    elegircolor.innerHTML += '<option value="azul">Azul</option>';
    elegircolor.innerHTML += '<option value="verde">Verde</option>';
    elegircolor.innerHTML += '<option value="rojo">Rojo</option>';
    ev_add.innerHTML += '<input type="text" id="textoevento" pattern=".+" placeholder="Introduce tu evento"></input>';
    ev_add.innerHTML += '<input type="button" value="Añadir" onclick="anadirEvento()"></input>';
    ev_add.innerHTML += '</form>';

    // Formulario para eliminar eventos
    ev_del.innerHTML += '<h3>Eliminar evento</h3>';
    ev_del.innerHTML += '<form id="eliminarevento">';
    ev_del.innerHTML += '<select id="elegirevento"></select>';
    ev_del.innerHTML += '<input type="button" value="Eliminar" onclick="eliminarEvento()"></input>';
    ev_del.innerHTML += '</form>';

    // Formulario para editar eventos
    ev_edit.innerHTML += '<h3>Editar evento</h3>';
    ev_edit.innerHTML += '<form id="editarevento">';
    ev_edit.innerHTML += '<select id="elegirevento2"></select>';
    ev_edit.innerHTML += '<select id="elegircolor2"></select>';
    var elegircolor2 = document.getElementById("elegircolor2");
    elegircolor2.innerHTML += '<option>Negro</option>';
    elegircolor2.innerHTML += '<option value="azul">Azul</option>';
    elegircolor2.innerHTML += '<option value="verde">Verde</option>';
    elegircolor2.innerHTML += '<option value="rojo">Rojo</option>';
    ev_edit.innerHTML += '<input type="text" id="textoeditado" pattern=".+" placeholder="Introduce el texto nuevo"></input>';
    ev_edit.innerHTML += '<input type="button" value="Editar" onclick="editarEvento()"></input>';
    ev_edit.innerHTML += '</form>';

    // Generar de lunes a domingo
    for(var d = 0; d < 7; d++){
        cal.innerHTML += '<div class="dia-titulo">' + dia_semana[d] + '</div>';
    }
    cal.innerHTML += '<div class="dummy"></div>';

    // Generar los dias vacios
    for(var i = 7-fecha.getDayEs(); i < 7; i++){
        cal.innerHTML += '<div class="dia-vacio"></div>';
        linea++;
        if(linea == 7){
            linea = 0;
            cal.innerHTML += '<div class="dummy"></div>';
        }
    }

    // Generar todos los dias
    while(mes == fecha.getMonth()){
        cal.innerHTML += '<div id="dia' + fecha.getDate() + '" class="dia">' + fecha.getDate() + '<br /></div>';
        fecha.setDate(fecha.getDate() + 1);
        linea++;
        if(linea == 7){
            linea = 0;
            document.getElementById("dia" + (fecha.getDate() - 1)).setAttribute("class", "dia dia-festivo"); // Cambiar por addClass
            cal.innerHTML += '<div class="dummy"></div>'
        }
    }
    cal.innerHTML += '<div class="dummy"></div>';

    // Anadir los dias al formulario de anadir evento
    var add_dia = document.getElementById("elegirdia");
    fecha.setMonth(mes);
    fecha.setDate(1);
    add_dia.innerHTML = '';
    while(mes == fecha.getMonth()){
        add_dia.innerHTML += '<option value="' + fecha.getDate() + '">Día ' + fecha.getDate() + '</option>';
        fecha.setDate(fecha.getDate() + 1);
    }
}

function anadirEvento(d, c, t){
    if(d && c && t){
        var eleccion = d;
        var color = c;
        var texto = t;
    }else{
        var eleccion = document.getElementById("elegirdia").value;
        var texto = document.getElementById("textoevento").value;
        var color = document.getElementById("elegircolor").value;
    }

    var dia = document.getElementById("dia" + eleccion);

    //dia.innerHTML += '<li id="ev' + ++num_evento + '">' + texto + '</li><br />';
    dia.innerHTML += '<li id="ev' + ++num_evento + '" class="evento ' + color + '">' + texto + '</li>';

    var even = document.getElementById("ev" + num_evento).value;
    document.getElementById("elegirevento").innerHTML += '<option id="deleven' + num_evento + '" value="' + num_evento + '">' + 'Día ' + eleccion + ': ' + texto + '</option>';
    document.getElementById("elegirevento2").innerHTML += '<option id="editeven' + num_evento + '" value="' + num_evento + '">' + 'Día ' + eleccion + ': ' + texto + '</option>';

    // Guardando datos
    datos.push([eleccion, color.toLowerCase(), texto]);
}

function eliminarEvento(){
    var eleccion = document.getElementById("elegirevento").value;
    var evento = document.getElementById("ev" + eleccion);
    evento.remove(this);
    //eleccion.remove("even" + eleccion);

    var deleven = document.getElementById("deleven" + eleccion);
    deleven.remove(this);

    var editeven = document.getElementById("editeven" + eleccion);
    editeven.remove(this);

    // Guardando datos
    delete datos[eleccion];
}

function editarEvento(){
    var texto = document.getElementById("textoeditado").value;
    var eleccion = document.getElementById("elegirevento2").value;
    var color = document.getElementById("elegircolor2").value;
    var evento = document.getElementById("ev" + eleccion);
    evento.innerHTML = texto;
    evento.setAttribute("class", "evento " + color)


    var deleven = document.getElementById("deleven" + eleccion);
    var dia = deleven.innerHTML.split(':');
    deleven.innerHTML = dia[0] + ': ' + texto;

    var editeven = document.getElementById("editeven" + eleccion);
    editeven.innerHTML = dia[0] + ': ' + texto;

    // Guardando datos
    var dia = deleven.innerHTML.split(' ');
    var dia = dia[1].split(':');
    datos[eleccion] = [dia[0], color.toLowerCase(), texto];
}

function generarDatos(){
    var data = '';

    if(datos.length == 0){
        notificar("No hay datos.", "No hay datos que generar. No se ha generado ningún calendarió aún.", "images/calendar_azul.png");
    }else{
        //data += 'autoCal:' + datos[0][0] + ':' + datos[0][1] + '\n';
        data += 'autoCal$' + datos[0][0] + '$' + datos[0][1];

        for(var i = 1; i <= num_evento; i++){
            //data += datos[i][0] + ':' + datos[i][1] + ':' + datos[i][2] + '\n';
            if(datos[i] != undefined){
                data += '$' + datos[i][0] + '$' + datos[i][1] + '$' + datos[i][2];
            }
        }

        alert("Guarda los datos siguiente en un fichero:\n\n" + data);
    }
}

function leerDatos(){
    var str = document.getElementById("datos").value;
    var data = str.split('$');

    var er_mes = /^[0-9]{1,2}$/;
    var er_anyo = /^[0-9]{4}$/;

    if(data[0] == 'autoCal' && er_mes.test(data[1].toString()) && er_anyo.test(data[2].toString())){ // Comprobar que los datos se han introducidos en el formato adecuado.
        generarCalendario(parseInt(data[1]), parseInt(data[2])); //Generar el calendario

        // Crear los eventos
        for(var i = 3; i < data.length; i=i+3){
            anadirEvento(parseInt(data[i]), data[i+1], data[i+2]);
        }
    }else{
        notificar("Formato incorrecto", "Introduce los datos en un formato correcto para poder generar el calendario.", "images/calendar_azul.png");
    }
}

function notificar(t, b, i){
    title = t
    options = {
        body: b,
        icon: i
    };
    Notification.requestPermission(function() {
        new Notification(title, options);
    });
}
