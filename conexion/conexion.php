<?php

class Conexion{
    function CargaConexion(){
        $conn = mysqli_connect('localhost', 'root', '', 'encuesta');
        return $conn;
    }
}

?>