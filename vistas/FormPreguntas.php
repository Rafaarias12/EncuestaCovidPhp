<?php

    require("../conexion/conexion.php");
    $modelo = new Conexion();

    $conexion = mysqli_connect('localhost', 'root', '', 'encuesta');

    mysqli_set_charset($conexion,"utf8");

    $sql = "call spMostrarEncuesta()";

    $resultado = mysqli_query($conexion, $sql);
    
    $json = array();

    while($row = mysqli_fetch_array($resultado)){
        $json[] = array(
            'idPreguntas' => $row['idPreguntas'],
            'pregunta' => $row['pregunta']
        );
    }
    $jsonstring = json_encode($json);
    echo $jsonstring;


?>