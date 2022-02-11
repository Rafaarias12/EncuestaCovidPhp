var preguntas =  "";
    var cony = 'Si';
    var conn = 'No';
    var id = 0;

    // document.addEventListener('DOMContentLoaded',function(){
    //     alert("hola mundo");
    // });
    

    function CargaPreguntas(){
        var datosUsuario = document.getElementById("CargaPreguntas");
        $.ajax({
            url:"vistas/FormPreguntas.php",
            type: 'POST',
            data: {},
            async:true,
            beforeSend: function(){

            },
            success: function(response){
                var dato = JSON.parse(response);
                var item = CargaItem(dato);
                datosUsuario.innerHTML = item;
            },
            error: function(error){
                console.log(error);
            }
        });
    }

    function CargarDatosUsuario(datos) {
        var carga = "";

        //Carga los datos del usuario
        $.each(datos, function (ind, elem) {
            carga = "</br>" +
                "<div class='card'>" + //
                "<div class='card-header'>" +//
                "<label id='lbUsuario'>Datos de Usuario</label>" +
                "</div>" + //
                "<div class='card-body'>" +// //
                "<div class='container'>" +
                "<div class='row'>" +//
                "<div class='col-md-6'>" + "<label>" + elem.cedula + "</label>" + "</div>" +
                "<div class='col-md-6'>" + "<label>" + elem.nombre + " " + elem.apellido + "</label>" + "</div>" +
                "</div>" +//
                "<div class='row'>" +//
                "<div class='col-md-6'>" + "<label>" + elem.Empresa + "</label>" + "</div>" +
                "<div class='col-md-6'>" + "<label>" + elem.cargo + "</label>" + "</div>" +
                "</div>" +//
                "<div class='row'>" +
                "<div class='col-md-6'> <label>Oficina</label></div>" +
                "<div class='col-md-6'>" +
                "<div class='form-check'>" +
                "<label class='labelradio' for='exampleRadios1'>" +
                "Biocosta" +
                "</label>" +
                "<input class='form-check-input radio3' type='radio' name='LugarEmpresa' id='radioBiocosta' value='usuario' />" +
                "</div>" +
                "<div class='form-check'>" +
                "<label class='labelradio' for='exampleRadios2'>" +
                "Bgreen" +
                "</label>" +
                "<input class='form-check-input radio3' type='radio' name='LugarEmpresa' id='radioBgreen' value='externo' />" +
                "</div>" +

                "</div>" +
                "</div>" +// //
                "</div>" +
                "</div>";
            id = elem.Dato;

        });
        document.getElementById("CargaUsuarios").innerHTML = carga;
        CargaPreguntas();
        //CargarPreguntas();
    }
    
    function CargaItem(datos) {
        var carga = "";
        var codigo = "";
        var cont = 0;
        var canti = datos.length - 2;
        for (var x = 0; x < datos.length; x++) {
            codigo = datos[x].idPreguntas;

            if (codigo === "29") {
                carga += "</br>" +
                    "<div class='card'>" +
                    "<div class='card-header'>" +
                    "<p>" + datos[x].pregunta + "</p>" +
                    "</div>" +
                    "<div class='card-body'>" +
                    "<input type='number' class='form-control texto' id='txtPersonas' placeholder='Número de Personas'/>" +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "</div>";
                preguntas += codigo.toString() + "/";
            }
            else if (cont === (datos.length - 1)) {

                carga += "</br>" +
                    "<div class='card'>" +
                    "<div class='card-header'>" +
                    "<p>" + datos[x].pregunta + "</p>" +
                    "</div>" +
                    "<div class='card-body'>" +
                    "<div class='form-check' id='" + codigo + "radio'>" +
                    "<label class='labelradio'>Si</label>" +
                    "<input type='radio' name='dradio" + codigo + "' class='form-check-input radio' value='Si' onclick='GuardarPregunta(" + codigo +
                    ", cony)' name='radio" + codigo + "'/>" +

                    "</div>" +
                    "<div class='form-check'>" +
                    "<label class='labelradio'>No</label>" +
                    "<input type='radio' name='dradio" + codigo + "' class='form-check-input radio ' onclick='GuardarPregunta(" + codigo +
                    ", conx)' value='No' name='radio" + codigo + "'/>" +

                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "<div class='card-footer bg-transparent'><button class='btn btn-success buttom' onclick='EnviarEncuesta()' id='btnEnviar'>Enviar</button></div>" +
                    "</div>";
                preguntas += datos[x].idPreguntas.toString();

            }
            else {
                carga += "</br>" +
                    "<div class='card'>" +
                    "<div class='card-header'>" +
                    "<p>" + datos[x].pregunta + "</p>" +
                    "</div>" +
                    "<div class='card-body'>" +
                    "<div class='form-check' id='" + codigo + "radio'>" +
                    "<label class='labelradio'>Si</label>" +
                    "<input type='radio' name='dradio" + codigo + "' class='form-check-input radio preguntas' onclick='GuardarPregunta(" + codigo +
                    ",cony)' value='Si' name='radio" + codigo + "'/>" +

                    "</div>" +
                    "<div class='form-check'>" +
                    "<label class='labelradio'>No</label>" +
                    "<input type='radio' name='dradio" + codigo + "' class='form-check-input radio preguntas'  onclick='GuardarPregunta(" + codigo +
                    ", conn)' value='No' name='radio" + codigo + "'/>" +

                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "</div>";
                preguntas += datos[x].idPreguntas.toString() + "/";
            }
            cont++;
        }

        return carga;
    }

    function GuardarPregunta(pregunta, valor) {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();
        var lugar = "";
        if (document.getElementById('radioBiocosta').checked) {
            lugar = 'Biocosta';
        }
        else if (document.getElementById('radioBgreen').checked) {
            lugar = 'Bgreen';
        }
        else {
            swal("Error", "Ingrese la oficina donde va a ingresar hoy", "error");

            return;
        }

        today = yyyy + '-' + mm + '-' + dd;
        ScriptEncuesta(pregunta, valor, lugar, today, "no");
    }

    function ScriptEncuesta(pregunta, respuesta, lugar, fecha, final) {
        
        if ($("input:radio[name=TipoUsuario]:checked").val() == "externo") {
            if (id === 0) {
                UsuarioExterno(pregunta, respuesta, lugar, fecha);
                
            }
            else {
                NuevoUsuario(pregunta, respuesta, lugar, final);
            }


        }
        else {
            var array = {
                'usuario': id,
                'pregunta':pregunta,
                'respuesta': respuesta,
                'lugar': lugar,
                'final': "no"
            };
            $.ajax({
                url: 'vistas/FormIngresoEncuesta.php',
                type: 'POST',
                data: array,
                async:true,
                success(msg){
                    var rpta = JSON.parse(msg);
                    console.log(rpta);
                }
            })
        }
    }

    function EnviarEncuesta() {
        var cont = 0;
        var radio = preguntas.split("/");
        var lugar = "";
        var rpta = "";

        if ($("input:radio[name=TipoUsuario]:checked").val() == "externo") {
            usuario = "externo";
        }
        else {
            usuario = "interno";
        }

        if (document.getElementById('radioBiocosta').checked) {
            lugar = 'Biocosta';
        }
        else if (document.getElementById('radioBgreen').checked) {
            lugar = 'Bgreen';
        }
        else {
            swal("Error", "Ingrese la oficina donde va a ingresar hoy", "error");
            return;
        }
        var conteo;
        var alerta = 0;
        var input;

        for (var i = 0; i < radio.length; i++) {
            input = document.getElementsByName("dradio" + radio[i]);
            
            cont = 0;
            if (i === 13) {
                if (document.getElementById("txtPersonas").value === "") {
                    swal("Casilla Faltante", "Registre todas las casillas", "warning");
                    return;
                }
            } else {
                for (let x = 0; x < input.length; x++) {
                    if (input[x].checked) {
                        cont++;
                        conteo = input[x].value;
                        if (conteo === "Si" && (i > 0 && i < 12)) {
                            alerta++;
                        }
                    }
                }
                if (cont === 0) {
                    swal("Casilla Faltante", "Registre todas las casillas", "warning");
                    return;
                }

            }

        }

        if (alerta > 0) {
            AlertaEncuesta();
        }

        var final = "si";

        ScriptEncuesta(29, document.getElementById("txtPersonas").value, lugar, final);

        location.href = "final.html";

    }

    //Ingreso Externo
    
    function UsuarioExterno(pregunta, respuesta, lugar, fecha) {
        $.ajax({
            url: 'vistas/FormExterno.php',
            type: 'POST',
            data: {
                'cedula': document.getElementById("txtCedula").value,
                'nombre': document.getElementById("txtNombre").value,
                'empresa': document.getElementById("txtEmpresa").value,
                'motivo': document.getElementById("txtMotivo").value
            },
            async:true,
            success(msg){
                var dato = JSON.parse(msg);
                id = parseInt(dato.usuario);
                NuevoUsuario(pregunta, respuesta, lugar, 'no');
            }
        });
        
        
    }

    function NuevoUsuario(pregunta, respuesta, lugar, final) {
        
        var array = {
            'usuario': id,
            'pregunta': pregunta,
            'respuesta': respuesta,
            'lugar': lugar,
            'final': final
        }

        $.ajax({
            url: 'vistas/FormIngresoExt.php',
            type: 'POST',
            data: JSON.stringify(array),
            async:true,
            success(msg){
                data = JSON.parse(msg);
                console.log(data);
            }
        });
        
        
    }

    function AlertaEncuesta(){
        $.ajax({
                url: 'vistas/FormIngresoEncuesta.php',
                type: 'POST',
                data: array,
                async:true,
                success(msg){
                    var rpta = JSON.parse(msg);
                    console.log(rpta);
                }
            })
    }