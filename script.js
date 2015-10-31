var num_evento = 0;

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

function generarCalendario(){

    var dia_semana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
    var mes = document.getElementById("elegirmes").value;
    var anyo = document.getElementById("elegiranyo").value;
    var linea = 0;
    var fecha = new Date();
    fecha.setDate(1);
    fecha.setMonth(mes);
    fecha.setFullYear(anyo);
    var cal = document.getElementById("calendario");
    //cal.innerHTML = '';
    cal.innerHTML = '<h2>' + meses[mes] + '</h2>';

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
    ev_add.innerHTML += '<select id="elegirdia">';
    ev_add.innerHTML += '</select>';
    ev_add.innerHTML += '<select id="elegircolor">';
    var elegircolor = document.getElementById("elegircolor");
    elegircolor.innerHTML += '<option>Negro</option>';
    elegircolor.innerHTML += '<option value="azul">Azul</option>';
    elegircolor.innerHTML += '<option value="verde">Verde</option>';
    elegircolor.innerHTML += '<option value="rojo">Rojo</option>';
    ev_add.innerHTML += '</select>';
    ev_add.innerHTML += '<input type="text" id="textoevento" pattern=".+" placeholder="Introduce tu evento"></input>';
    ev_add.innerHTML += '<input type="button" value="Añadir evento" onclick="anadirEvento()"></input>';
    ev_add.innerHTML += '</form>';

    // Formulario para eliminar eventos
    ev_del.innerHTML += '<h3>Eliminar evento</h3>';
    ev_del.innerHTML += '<form id="eliminarevento">';
    ev_del.innerHTML += '<select id="elegirevento">';
    ev_del.innerHTML += '</select>';
    ev_del.innerHTML += '<input type="button" value="Eliminar evento" onclick="eliminarEvento()"></input>';
    ev_del.innerHTML += '</form>';

    // Formulario para editar eventos
    ev_edit.innerHTML += '<h3>Editar evento</h3>';
    ev_edit.innerHTML += '<form id="editarevento">';
    ev_edit.innerHTML += '<select id="elegirevento2">';
    ev_edit.innerHTML += '<input type="text" id="textoeditado" pattern=".+" placeholder="Introduce el texto nuevo"></input>';
    ev_edit.innerHTML += '</select>';
    ev_edit.innerHTML += '<input type="button" value="Editar evento" onclick="editarEvento()"></input>';
    ev_edit.innerHTML += '</form>';

    /*ev.innerHTML = '';
    ev.innerHTML += '<h3>Añadir evento</h3>';
    ev.innerHTML += '<form id="anadirevento">';
    ev.innerHTML += '<select id="elegirdia">';
    ev.innerHTML += '</select>';
    ev.innerHTML += '<input type="text" id="textoevento" pattern=".+" placeholder="Introduce tu evento"></input>';
    ev.innerHTML += '<input type="button" value="Añadir evento" onclick="anadirEvento()"></input>';
    ev.innerHTML += '</form>';

    // Formulario para eliminar eventos
    ev.innerHTML += '<h3>Eliminar evento</h3>';
    ev.innerHTML += '<form id="eliminarevento">';
    ev.innerHTML += '<select id="elegirevento">';
    ev.innerHTML += '</select>';
    ev.innerHTML += '<input type="button" value="Eliminar evento" onclick="eliminarEvento()"></input>';
    ev.innerHTML += '</form>';

    // Formulario para editar eventos
    ev.innerHTML += '<h3>Editar evento</h3>';
    ev.innerHTML += '<form id="editarevento">';
    ev.innerHTML += '<select id="elegirevento2">';
    ev.innerHTML += '<input type="text" id="textoeditado" pattern=".+" placeholder="Introduce el texto nuevo"></input>';
    ev.innerHTML += '</select>';
    ev.innerHTML += '<input type="button" value="Editar evento" onclick="editarEvento()"></input>';
    ev.innerHTML += '</form>';*/

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

function anadirEvento(){
    var eleccion = document.getElementById("elegirdia").value;
    var dia = document.getElementById("dia" + eleccion);
    var texto = document.getElementById("textoevento").value;
    var color = document.getElementById("elegircolor").value;
    //dia.innerHTML += '<li id="ev' + ++num_evento + '">' + texto + '</li><br />';
    dia.innerHTML += '<li id="ev' + ++num_evento + '" class="evento ' + color + '">' + texto + '</li>';

    var even = document.getElementById("ev" + num_evento).value;
    document.getElementById("elegirevento").innerHTML += '<option id="deleven' + num_evento + '" value="' + num_evento + '">' + texto + '</option>';
    document.getElementById("elegirevento2").innerHTML += '<option id="editeven' + num_evento + '" value="' + num_evento + '">' + texto + '</option>';
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
}

function editarEvento(){
    var texto = document.getElementById("textoeditado").value;
    var eleccion = document.getElementById("elegirevento2").value;
    var evento = document.getElementById("ev" + eleccion);
    evento.innerHTML = texto;

    var deleven = document.getElementById("deleven" + eleccion);
    deleven.innerHTML = texto;

    var editeven = document.getElementById("editeven" + eleccion);
    editeven.innerHTML = texto;
}
